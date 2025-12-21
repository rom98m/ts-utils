export class AsyncBatch {
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
                task: lastBatch.length, // `push` takes place after this, hence task no. should be +1'ed
            };
            lastBatch.push(() => task()
                .then(r => ({ error: undefined, result: r, ...counter }))
                .catch(e => ({ error: e, result: undefined, ...counter })));
            this._totalTasks++;
        });
        return this;
    }
    run() {
        if (this._isRunning || this._isFinished) {
            throw new Error(`Cannot re-run the ${this._isRunning ? "running" : "finished"} batch`);
        }
        this._isRunning = true;
        // This wrapper allows using simple `async/awiat` approach AND fail fast in case of running/finished batch.
        // The `
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
