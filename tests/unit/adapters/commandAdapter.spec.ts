import { Player } from '../../../src/classes/Player';
import { Playground } from '../../../src/classes/Playground';
import { CommandAdapter } from '../../../src/adapters/CommandAdapter';
import { Facing } from '../../../src/types/Facing';
import { PlayerFallsOutOfPlaygroundError } from '../../../src/errors/PlayerFallsOutOfPlaygroundError';

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

        it('should execute REPORT when player is not on a playground', () => {
            expect.assertions(4);
            commandAdapter.reporter = (player: Readonly<Player>) => {
                expect(player.isOnPlayground).toBe(false);
                expect(player.playground).toBeUndefined();
                expect(player.facing).toBeUndefined();
                expect(player.position).toBeUndefined();
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
