import { Player } from '../../../src/classes/Player';
import { Playground } from '../../../src/classes/Playground';
import { PlayerReporter } from '../../../src/classes/PlayerReporter';
import { PlayerNotOnPlaygroundError } from '../../../src/errors/PlayerNotOnPlaygroundError';

describe('PlayerReporter', () => {
    describe('when player is on a playground', () => {
        const player = new Player('John Superstar');
        const playground = new Playground({
            size: { x: BigInt(10), y: BigInt(10) },
        });
        beforeAll(() => {
            player.placeOnPlayground({ playground });
        });

        it('asString', () => {
            const report = PlayerReporter.asString(player);
            expect(report).toBe('0,0,NORTH');
        });

        it('asStandardOut', () => {
            const mock = jest.spyOn(console, 'info');
            PlayerReporter.asStandardOut(player);
            expect(mock).toBeCalledTimes(1);
            expect(mock).toBeCalledWith('0,0,NORTH');
            mock.mockRestore();
        });
    });

    describe('when player is not on a playground', () => {
        const player = new Player('John Superstar');
        it('asString', () => {
            expect.assertions(1);
            try {
                PlayerReporter.asString(player);
            } catch (e) {
                expect(e).toBeInstanceOf(PlayerNotOnPlaygroundError);
            }
        });

        it('asStandardOut', () => {
            expect.assertions(1);
            try {
                PlayerReporter.asStandardOut(player);
            } catch (e) {
                expect(e).toBeInstanceOf(PlayerNotOnPlaygroundError);
            }
        });
    });
});
