import { Player } from '../../../src/classes/Player';
import { Playground } from '../../../src/classes/Playground';
import { CommandAdapter } from '../../../src/adapters/CommandAdapter';
import { Facing } from '../../../src/types/Facing';
import { PlayerFallsOutOfPlaygroundError } from '../../../src/errors/PlayerFallsOutOfPlaygroundError';
import { InvalidCommandError } from '../../../src/errors/InvalidCommandError';

describe('CommandAdapter', () => {
    let commandAdapter: CommandAdapter;
    beforeEach(() => {
        commandAdapter = new CommandAdapter({
            player: new Player('John'),
            playground: new Playground({
                size: { x: BigInt(10), y: BigInt(10) },
            }),
        });
    });

    describe('executeCommand', () => {
        const testCases: [string, Facing, number, number][] = [
            ['PLACE 1,2,WEST', Facing.WEST, 1, 2],
            ['PLACE 0,0,WEST', Facing.WEST, 0, 0],
            ['PLACE 1,2,WEST MOVE', Facing.WEST, 0, 2],
            ['PLACE 1,2,WEST MOVE', Facing.WEST, 0, 2],
            ['PLACE 1,2,WEST RIGHT MOVE', Facing.NORTH, 1, 3],
            ['PLACE 1,2,WEST LEFT MOVE', Facing.SOUTH, 1, 1],
            ['PLACE 0,0,NORTH MOVE', Facing.NORTH, 0, 1],
            ['PLACE 0,0,NORTH LEFT', Facing.WEST, 0, 0],
        ];

        it.each(testCases)('should execute command %s', (command, facing, x, y) => {
            expect.assertions(2);
            commandAdapter.reporter = (player: Readonly<Player>) => {
                expect(player.facing).toBe(facing);
                expect(player.position).toMatchObject({
                    x: BigInt(x),
                    y: BigInt(y),
                });
            };
            commandAdapter.execute(command + ' REPORT');
        });

        it('should throw error when command is invalid', () => {
            expect.assertions(1);
            try {
                new CommandAdapter({
                    player: new Player('John'),
                    playground: new Playground({
                        size: { x: BigInt(10), y: BigInt(10) },
                    }),
                    reporter: () => {
                        throw new Error('this error is not expected');
                    },
                }).execute(`PLACE ${Number.MAX_SAFE_INTEGER + 1},0,NORTH MOVE`);
            } catch (e) {
                expect(e).toBeInstanceOf(InvalidCommandError);
            }
        });

        it('should not execute REPORT when player is not on a playground', () => {
            commandAdapter.reporter = () => {
                throw new Error('this error should not be thrown');
            };
            commandAdapter.execute('REPORT');
        });
    });

    describe('should throw error when player falls out of the playground', () => {
        const testCases: [string][] = [
            ['PLACE 0,0,WEST MOVE'],
            ['PLACE 10,0,EAST MOVE'],
            ['PLACE 0,10,NORTH MOVE'],
            ['PLACE 0,0,SOUTH MOVE'],
        ];

        it.each(testCases)('when execute command %s', (command) => {
            expect.assertions(1);
            try {
                commandAdapter.execute(command);
            } catch (e) {
                expect(e).toBeInstanceOf(PlayerFallsOutOfPlaygroundError);
            }
        });
    });
});
