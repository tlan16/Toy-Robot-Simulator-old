export function isPositiveInteger(input: unknown): input is number {
    return isInteger(input) && Number(input) > 0;
}

export function isInteger(input: unknown): input is number {
    return Number(input) !== Number.NaN && Number.isSafeInteger(Number(input)) && Number.isFinite(Number(input));
}
