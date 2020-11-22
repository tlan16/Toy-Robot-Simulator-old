export function isInteger(input: unknown): input is number {
    return Number(input) !== Number.NaN && Number.isSafeInteger(input) && Number.isFinite(input);
}
