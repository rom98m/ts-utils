type AsyncResult<T> = {
    error: undefined | string | object;
    result: T;
    batch: number;
    task: number;
};
export declare class AsyncBatch<T = any> {
    readonly batchSize: number;
    private readonly batches;
    private _isRunning;
    private _isFinished;
    private _totalTasks;
    private readonly _results;
    constructor({ batchSize }?: {
        batchSize?: number;
    });
    get isRunning(): boolean;
    get isFinished(): boolean;
    get totalTasks(): number;
    get results(): AsyncResult<T>[][];
    add(...tasks: Array<() => Promise<T>>): this;
    run(): Promise<AsyncResult<T>[][]>;
}
export {};
//# sourceMappingURL=async-utils.d.ts.map