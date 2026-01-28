/**
 * A wrapper for the result of an async task.
 */
type AsyncResult<T> = {
    error: undefined | string | object;
    result: T;
    batch: number;
    task: number;
};
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
export declare class AsyncBatch<T = any> {
    readonly batchSize: number;
    private readonly batches;
    private _isRunning;
    private _isFinished;
    private _totalTasks;
    private readonly _results;
    /**
     * Create a new container for async tasks.
     *
     * @param {object?} [param={}] Configuration of the task container.
     * @param {number} [param.batchSize=10] The size of the batch (number of task to run simultaneously).
     */
    constructor({ batchSize }?: {
        batchSize?: number;
    });
    get isRunning(): boolean;
    get isFinished(): boolean;
    get totalTasks(): number;
    get results(): AsyncResult<T>[][];
    /**
     * Add given tasks to the container.
     *
     * @param {...() => Promise<T>} tasks Tasks to add.
     * @returns {AsyncBatch} The instance of the AsyncBatch (`this`) to make the method chainable.
     * @throws When trying to add the task to a running or finished batch.
     */
    add(...tasks: Array<() => Promise<T>>): this;
    /**
     * Run all tasks in batches.
     *
     * @returns {Promise<AsyncResult<T>[][]>} Promise that resolves with all task results
     *                                       combined in sub-arrays (per batch).
     * @throws When trying to run the batch for the 2nd time.
     */
    run(): Promise<AsyncResult<T>[][]>;
}
export {};
//# sourceMappingURL=async-utils.d.ts.map