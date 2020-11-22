import { Player } from './Player';

export class PlayerReporter {
    public static asString(player: Readonly<Player>): string {
        if (!player.isOnPlayground) {
            return `Player "${player.name}" is currently not on a playground.`;
        }
        return `Player "${player.name}" is at ${player.position!.x},${player.position!.y} facing ${player.facing}.`;
    }

    public static asStandardOut(player: Readonly<Player>): void {
        console.info(PlayerReporter.asString(player));
    }
}
