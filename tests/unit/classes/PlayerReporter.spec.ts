import { Player } from '../../../src/classes/Player';
import { Playground } from '../../../src/classes/Playground';
import { PlayerReporter } from '../../../src/classes/PlayerReporter';

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
            expect(report).toBe('Player "John Superstar" is at 0,0 facing north.');
        });

        it('asStandardOut', () => {
            const mock = jest.spyOn(console, 'info');
            PlayerReporter.asStandardOut(player);
            expect(mock).toBeCalledTimes(1);
            expect(mock).toBeCalledWith('Player "John Superstar" is at 0,0 facing north.');
            mock.mockRestore();
        });
    });

    describe('when player is not on a playground', () => {
        const player = new Player('John Superstar');
        it('asString', () => {
            const report = PlayerReporter.asString(player);
            expect(report).toBe('Player "John Superstar" is currently not on a playground.');
        });

        it('asStandardOut', () => {
            const mock = jest.spyOn(console, 'info');
            PlayerReporter.asStandardOut(player);
            expect(mock).toBeCalledTimes(1);
            expect(mock).toBeCalledWith('Player "John Superstar" is currently not on a playground.');
            mock.mockRestore();
        });
    });
});
