import { Player } from '../../../src/classes/Player';
import { EmptyPlayerNameError } from '../../../src/errors/EmptyPlayerNameError';
import { Playground } from '../../../src/classes/Playground';
import { Facing } from '../../../src/types/Facing';
import { OutsizePlaygroundError } from '../../../src/errors/OutsizePlaygroundError';
import { PlayerNotOnPlaygroundError } from '../../../src/errors/PlayerNotOnPlaygroundError';
import { PlayerFallsOutOfPlaygroundError } from '../../../src/errors/PlayerFallsOutOfPlaygroundError';

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

    describe('move', () => {
        const player = new Player('John');

        it('should not move when player is not on a playground', () => {
            expect.assertions(1);
            try {
                player.move();
            } catch (e) {
                expect(e).toBeInstanceOf(PlayerNotOnPlaygroundError);
            }
        });

        describe('when player is on playground', () => {
            const playground = new Playground({
                size: { x: BigInt(10), y: BigInt(10) },
            });

            const testCase1: [number, number, Facing, number, number][] = [
                [0, 0, Facing.NORTH, 0, 1],
                [0, 1, Facing.SOUTH, 0, 0],
                [0, 0, Facing.EAST, 1, 0],
                [1, 0, Facing.WEST, 0, 0],
            ];
            test.each(testCase1)(
                'should move when player is at %i,%i and facing %s',
                (initialPositionX, initialPositionY, facing, afterMovePositionX, afterMovePositionY) => {
                    player.placeOnPlayground({
                        playground,
                        facing,
                        position: { x: BigInt(initialPositionX), y: BigInt(initialPositionY) },
                    });
                    player.move();
                    expect(player.position).toMatchObject({
                        x: BigInt(afterMovePositionX),
                        y: BigInt(afterMovePositionY),
                    });
                },
            );

            const testCase2: [number, number, Facing][] = [
                [0, 10, Facing.NORTH],
                [0, 0, Facing.SOUTH],
                [10, 0, Facing.EAST],
                [0, 0, Facing.WEST],
            ];
            test.each(testCase2)(
                'should not move when player is at %i,%i and facing %s',
                (initialPositionX, initialPositionY, facing) => {
                    player.placeOnPlayground({
                        playground,
                        facing,
                        position: { x: BigInt(initialPositionX), y: BigInt(initialPositionY) },
                    });
                    expect.assertions(1);

                    try {
                        player.move();
                    } catch (e) {
                        expect(e).toBeInstanceOf(PlayerFallsOutOfPlaygroundError);
                    }
                },
            );
        });
    });

    describe('rorate', () => {
        const player = new Player('John Superstar');
        const playground = new Playground({
            size: { x: BigInt(10), y: BigInt(10) },
        });

        describe('rotateClockwise', () => {
            const testCases: [Facing, Facing][] = [
                [Facing.NORTH, Facing.EAST],
                [Facing.EAST, Facing.SOUTH],
                [Facing.SOUTH, Facing.WEST],
                [Facing.WEST, Facing.NORTH],
            ];
            it.each(testCases)(
                'should facing %s after rotation when currently facing %s',
                (currentFacing: Facing, expectedFacing: Facing) => {
                    player.placeOnPlayground({
                        playground,
                        facing: currentFacing,
                    });
                    player.rotateClockwise();

                    expect(player.facing).toBe(expectedFacing);
                },
            );
        });

        describe('rotateCounterclockwise', () => {
            const testCases: [Facing, Facing][] = [
                [Facing.NORTH, Facing.WEST],
                [Facing.WEST, Facing.SOUTH],
                [Facing.SOUTH, Facing.EAST],
                [Facing.EAST, Facing.NORTH],
            ];
            it.each(testCases)(
                'should facing %s after rotation when currently facing %s',
                (currentFacing: Facing, expectedFacing: Facing) => {
                    player.placeOnPlayground({
                        playground,
                        facing: currentFacing,
                    });
                    player.rotateCounterclockwise();

                    expect(player.facing).toBe(expectedFacing);
                },
            );
        });
    });
});
