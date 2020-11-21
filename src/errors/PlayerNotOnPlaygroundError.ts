import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class PlayerNotOnPlaygroundError implements AppError {
    public readonly name = 'PlayerNotOnPlaygroundError';
    public readonly code = AppErrorCode.PLAYER_NOT_ON_PLAYGROUND;
    public message = 'The player is not on a playground.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
