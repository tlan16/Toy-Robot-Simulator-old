import { Player } from '../../../src/classes/Player';
import { EmptyPlayerNameError } from '../../../src/errors/EmptyPlayerNameError';
import { Playground } from '../../../src/classes/Playground';
import { Facing } from '../../../src/types/Facing';
import { OutsizePlaygroundError } from '../../../src/errors/OutsizePlaygroundError';

describe('Player', () => {
    it('should construct', () => {
        const name = 'John Superstar';
        const player = new Player(name);
        expect(player.name).toBe(name);
        expect(player.position).toBeUndefined();
        expect(player.facing).toBeUndefined();
        expect(player.playground).toBeUndefined();
    });

    it('should not construct with empty name', () => {
        expect(() => {
            new Player('');
        }).toThrowError(new EmptyPlayerNameError());
    });

    describe('placeOnPlayground', () => {
        const player = new Player('John');
        const playground = new Playground({
            size: { x: BigInt(10), y: BigInt(10) },
        });

        let testCases: [number, number][] = [];
        for (let x = 0; x <= 10; x++) {
            for (let y = 0; y <= 10; y++) {
                testCases.push([x, y]);
            }
        }
        it.each(testCases)('should place player on a 10x10 playground at %i,%i', (x, y) => {
            const facing = Facing.EAST;
            const position = { x: BigInt(x), y: BigInt(y) };
            player.placeOnPlayground({ playground, facing, position });
            expect(player).toMatchObject({ facing, position, playground });
        });

        testCases = [];
        for (let x = 11; x <= 20; x++) {
            for (let y = 11; y <= 20; y++) {
                testCases.push([x, y]);
            }
        }
        it.each(testCases)('should not place player outsize playground at %i,%i', (x, y) => {
            expect.assertions(1);
            const position = { x: BigInt(x), y: BigInt(y) };

            try {
                player.placeOnPlayground({ playground, position });
            } catch (e) {
                expect(e).toBeInstanceOf(OutsizePlaygroundError);
            }
        });
    });
});
