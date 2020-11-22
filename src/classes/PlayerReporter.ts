import { Player } from './Player';
import { PlayerNotOnPlaygroundError } from '../errors/PlayerNotOnPlaygroundError';

export class PlayerReporter {
    public static asString(player: Readonly<Player>): string {
        if (!player.isOnPlayground) {
            throw new PlayerNotOnPlaygroundError();
        }
        return `${player.position!.x},${player.position!.y},${player.facing!.toUpperCase()}`;
    }

    public static asStandardOut(player: Readonly<Player>): void {
        console.info(PlayerReporter.asString(player));
    }
}
