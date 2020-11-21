import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class OutsizePlaygroundError implements AppError {
    public readonly name = 'OutsizePlaygroundError';
    public readonly code = AppErrorCode.OUT_OF_PLAYGROUND;
    public message = 'The requested position is out of playground.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
