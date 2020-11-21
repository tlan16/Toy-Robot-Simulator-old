export enum AppErrorCode {
    OUT_OF_PLAYGROUND,
    EMPTY_PLAYER_NAME,
    ZERO_PLAYGROUND_AXIS_SIZE,
}

export interface AppError extends Error {
    code: AppErrorCode;
    info: Iterable<object | string>;
}

export interface AppErrorConstructorOptions {
    message?: string;
    info?: Iterable<object | string>;
}
