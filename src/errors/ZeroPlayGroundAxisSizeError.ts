import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class ZeroPlayGroundAxisSizeError implements AppError {
    public readonly name = 'ZeroPlayGroundAxisSizeError';
    public readonly code = AppErrorCode.ZERO_PLAYGROUND_AXIS_SIZE;
    public message = 'The playground axis cannot have a size of zero.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
