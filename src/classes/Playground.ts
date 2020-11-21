import { Zero } from '../helpers/BigIntHelper';
import { Position } from '../types/Position';
import { PlaygroundSize } from '../types/PlaygroundSize';
import { ZeroPlayGroundAxisSizeError } from '../errors/ZeroPlayGroundAxisSizeError';
import { OriginOutSizePlaygroundError } from '../errors/OriginOutSizePlaygroundError';

export class Playground {
    public readonly origin: Position = { x: Zero, y: Zero };
    public readonly size: PlaygroundSize;

    constructor(options: { size: Playground['size']; origin?: Playground['origin'] }) {
        const defaultOrigin: Position = { x: Zero, y: Zero };
        const { size, origin = defaultOrigin } = options;
        // validation
        if (size.x === Zero || size.y === Zero) {
            throw new ZeroPlayGroundAxisSizeError();
        }
        if (origin.x > size.x || origin.y > size.y) {
            throw new OriginOutSizePlaygroundError();
        }

        // set class properties
        this.size = size;
        if (origin) {
            this.origin = origin;
        }
    }

    public isPositionInPlayground(position: Readonly<Position>): boolean {
        return position.x >= Zero && position.x <= this.size.x && position.y >= Zero && position.y <= this.size.y;
    }
}
