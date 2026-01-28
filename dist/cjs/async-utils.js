"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncBatch = void 0;
/**
 * A container for async tasks that should be run in batches.
 * For instance, 1000 requests to a remote server:
 * - running them sequentially is too slow;
 * - running them all at once can overwhelm/DoS the server.
 *
 * But running (for instance) a sequence of 40 batches of 25 simultanious requests
 * might be a good balance:
 * ```
 * parallel(25_requests)
 *   .then(() => parallel(25_requests))
 *   .then(() => parallel(25_requests))
 *   // ...
 *   .then(() => parallel(25_requests))
 * ```
 */
class AsyncBatch {
    /**
     * Create a new container for async tasks.
     *
     * @param {object?} [param={}] Configuration of the task container.
     * @param {number} [param.batchSize=10] The size of the batch (number of task to run simultaneously).
     */
    constructor({ batchSize = 10 } = {}) {
        this.batches = [[]];
        this._isRunning = false;
        this._isFinished = false;
        this._totalTasks = 0;
        this._results = [];
        if (batchSize <= 0)
            throw new RangeError("The `batchSize` value must be positive integer");
        this.batchSize = batchSize;
    }
    get isRunning() { return this._isRunning; }
    get isFinished() { return this._isFinished; }
    get totalTasks() { return this._totalTasks; }
    get results() { return this._results; }
    /**
     * Add given tasks to the container.
     *
     * @param {...() => Promise<T>} tasks Tasks to add.
     * @returns {AsyncBatch} The instance of the AsyncBatch (`this`) to make the method chainable.
     * @throws When trying to add the task to a running or finished batch.
     */
    add(...tasks) {
        if (this._isRunning || this._isFinished) {
            throw new Error("Cannot add tast to a running or finished batch");
        }
        tasks.forEach(task => {
            let lastBatch = this.batches[this.batches.length - 1];
            if (lastBatch.length >= this.batchSize) {
                lastBatch = [];
                this.batches.push(lastBatch);
            }
            const counter = {
                batch: this.batches.length - 1,
                task: lastBatch.length, // `push` takes place after this, hence task number should be +1'ed
            };
            lastBatch.push(() => task()
                .then(r => ({ error: undefined, result: r, ...counter }))
                .catch(e => ({ error: e, result: undefined, ...counter })));
            this._totalTasks++;
        });
        return this;
    }
    /**
     * Run all tasks in batches.
     *
     * @returns {Promise<AsyncResult<T>[][]>} Promise that resolves with all task results
     *                                       combined in sub-arrays (per batch).
     * @throws When trying to run the batch for the 2nd time.
     */
    run() {
        if (this._isRunning || this._isFinished) {
            throw new Error(`Cannot re-run the ${this._isRunning ? "running" : "finished"} batch`);
        }
        this._isRunning = true;
        // This wrapper allows using simple `async/awiat` approach AND fail fast in case of running/finished batch.
        // The `async run()` _always_ rerturn the Promise which fails by aforementioned conditions.
        // The `run()` can fail fast _before_ returnign any Promise.
        return (async () => {
            for (const batch of this.batches) {
                this._results.push(await Promise.all(batch.map(task => task())));
            }
            this._isRunning = false;
            this._isFinished = true;
            return this._results;
        })();
    }
}
exports.AsyncBatch = AsyncBatch;
