import { Playground } from './Playground';
import { OutsizePlaygroundError } from '../errors/OutsizePlaygroundError';
import { EmptyPlayerNameError } from '../errors/EmptyPlayerNameError';
import { Facing } from '../types/Facing';
import { Position } from '../types/Position';
import { PlayerNotOnPlaygroundError } from '../errors/PlayerNotOnPlaygroundError';

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

    public get isOnPlayground(): boolean {
        return this.playground !== undefined && this.facing !== undefined && this.position !== undefined;
    }

    public rotateClockwise(): void {
        if (this.facing !== undefined) {
            switch (this.facing) {
                case Facing.EAST:
                    this.facing = Facing.SOUTH;
                    break;
                case Facing.WEST:
                    this.facing = Facing.NORTH;
                    break;
                case Facing.NORTH:
                    this.facing = Facing.EAST;
                    break;
                case Facing.SOUTH:
                    this.facing = Facing.WEST;
                    break;
            }
        }
    }

    public rotateCounterclockwise(): void {
        if (this.facing !== undefined) {
            switch (this.facing) {
                case Facing.EAST:
                    this.facing = Facing.NORTH;
                    break;
                case Facing.WEST:
                    this.facing = Facing.SOUTH;
                    break;
                case Facing.NORTH:
                    this.facing = Facing.WEST;
                    break;
                case Facing.SOUTH:
                    this.facing = Facing.EAST;
                    break;
            }
        }
    }

    public move(): void {
        if (!this.isOnPlayground) {
            throw new PlayerNotOnPlaygroundError();
        }
        switch (this.facing) {
            case Facing.EAST:
                this.moveRight();
                break;
            case Facing.WEST:
                this.moveLeft();
                break;
            case Facing.NORTH:
                this.moveUp();
                break;
            case Facing.SOUTH:
                this.moveDown();
                break;
        }
        this.checkPlayerIsInPlayground();
    }

    private moveLeft(): void {
        if (this.position?.x !== undefined) {
            this.position.x = BigInt(this.position.x.valueOf() - BigInt(1));
        }
    }

    private moveRight(): void {
        if (this.position?.x !== undefined) {
            this.position.x = BigInt(this.position.x.valueOf() + BigInt(1));
        }
    }

    private moveUp(): void {
        if (this.position?.y !== undefined) {
            this.position.y = BigInt(this.position.y.valueOf() + BigInt(1));
        }
    }

    private moveDown(): void {
        if (this.position?.y !== undefined) {
            this.position.y = BigInt(this.position.y.valueOf() - BigInt(1));
        }
    }

    private checkPlayerIsInPlayground(): void {
        if (this.playground && this.position) {
            if (!this.playground.isPositionInPlayground(this.position)) {
                throw new PlayerNotOnPlaygroundError();
            }
        }
    }
}
