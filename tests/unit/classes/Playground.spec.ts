import { Playground } from '../../../src/classes/Playground';
import { Zero } from '../../../src/helpers/BigIntHelper';
import { OriginOutSizePlaygroundError } from '../../../src/errors/OriginOutSizePlaygroundError';
import { ZeroPlayGroundAxisSizeError } from '../../../src/errors/ZeroPlayGroundAxisSizeError';

describe('Playground', () => {
    it('should construct without specifying origin', () => {
        const size = { x: BigInt(10), y: BigInt(10) };
        const origin = { x: Zero, y: Zero };
        const playground = new Playground({ size });
        expect(playground).toMatchObject({ size, origin });
    });

    let testCases: [number, number][] = [];
    for (let x = 0; x <= 10; x++) {
        for (let y = 0; y <= 10; y++) {
            testCases.push([x, y]);
        }
    }
    it.each(testCases)('should construct with origin at %i,%i', (x, y) => {
        const size = { x: BigInt(10), y: BigInt(10) };
        const origin = { x: BigInt(x), y: BigInt(y) };
        const playground = new Playground({ size, origin });
        expect(playground).toMatchObject({ size, origin });
    });

    testCases = [];
    for (let x = 11; x <= 20; x++) {
        for (let y = 11; y <= 20; y++) {
            testCases.push([x, y]);
        }
    }
    it.each(testCases)('should not construct with origin outsize at %i,%i', (x, y) => {
        const size = { x: BigInt(10), y: BigInt(10) };
        const origin = { x: BigInt(x), y: BigInt(y) };
        expect.assertions(1);

        try {
            new Playground({ size, origin });
        } catch (e) {
            expect(e).toBeInstanceOf(OriginOutSizePlaygroundError);
        }
    });

    testCases = [
        [0, 0],
        [0, 1],
        [1, 0],
    ];
    it.each(testCases)('should not construct with size %ix%i', (x, y) => {
        const size = { x: BigInt(x), y: BigInt(y) };
        expect.assertions(1);

        try {
            new Playground({ size });
        } catch (e) {
            expect(e).toBeInstanceOf(ZeroPlayGroundAxisSizeError);
        }
    });
});
