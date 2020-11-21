import { Playground } from './Playground';
import { OutsizePlaygroundError } from '../errors/OutsizePlaygroundError';
import { EmptyPlayerNameError } from '../errors/EmptyPlayerNameError';
import { Facing } from '../types/Facing';
import { Position } from '../types/Position';

export class Player {
    public name: String;
    public facing?: Facing;
    public position?: Position;
    public playground?: Playground;

    constructor(name: Player['name']) {
        if (name.length === 0) {
            throw new EmptyPlayerNameError();
        }
        this.name = name;
    }

    public placeOnPlayground(options: {
        playground: NonNullable<Player['playground']>;
        facing?: NonNullable<Player['facing']>;
        position?: Player['position'];
    }): void {
        const { playground, facing = Facing.NORTH, position = playground.origin } = options;
        // validation
        if (!playground.isPositionInPlayground(position)) {
            throw new OutsizePlaygroundError({
                message:
                    `Player "${this.name}" cannot be place outsize` +
                    ` a ${playground.size.x} x ${playground.size.y} playground` +
                    ` at ${position.x},${position.y}`,
                info: [{ player: this, position, playground }],
            });
        }

        // init class properties
        this.playground = playground;
        this.facing = facing;
        this.position = position;
    }
}
