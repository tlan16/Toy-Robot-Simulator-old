import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class InvalidCommandError implements AppError {
    public readonly name = 'InvalidCommandError';
    public readonly code = AppErrorCode.INVALID_COMMAND;
    public message = 'The input command is invalid.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
