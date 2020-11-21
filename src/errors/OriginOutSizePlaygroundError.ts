import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class OriginOutSizePlaygroundError implements AppError {
    public readonly name = 'OriginOutSizePlaygroundError';
    public readonly code = AppErrorCode.ZERO_PLAYGROUND_AXIS_SIZE;
    public message = 'The origin of a playground must be inside of it.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
