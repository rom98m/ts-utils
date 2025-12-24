type GeneratorWithDo = Generator<number, void, unknown> & {
    do(action: (value: number) => void): void;
};
/**
 * Return an iterable that runs given number of times.
 * Use for:
 * ```
 * for (const x of times(5)) {
 *   // Do something
 * }
 * ```
 *
 * Alternative syntax:
 * ```
 * times(5).do(n => console.info(n))
 * ```
 *
 * @param {number} n
 * @returns {Generator<number> & { do(action: (value: number) => void): void }}
 */
export declare function times(n: number): GeneratorWithDo;
export {};
//# sourceMappingURL=various-utils.d.ts.map