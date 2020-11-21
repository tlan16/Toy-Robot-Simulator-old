import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class EmptyPlayerNameError implements AppError {
    public readonly name = 'EmptyPlayerNameError';
    public readonly code = AppErrorCode.EMPTY_PLAYER_NAME;
    public message = 'The player name must not be empty.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
