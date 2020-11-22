import { AppError, AppErrorCode, AppErrorConstructorOptions } from './types';

export class PlayerFallsOutOfPlaygroundError implements AppError {
    public readonly name = 'PlayerFallsOutOfPlaygroundError';
    public readonly code = AppErrorCode.PLAYER_FALLS_OUT_OF_PLAYGROUND;
    public message = 'The player falls out of the playground.';
    public info: AppError['info'];

    constructor(options: AppErrorConstructorOptions = {}) {
        const { message, info } = options;
        if (message) {
            this.message = message;
        }
        this.info = info ?? [];
    }
}
