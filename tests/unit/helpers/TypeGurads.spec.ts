import { isInteger, isPositiveInteger } from '../../../src/helpers/TypeGurads';

describe('TypeGuards', () => {
    describe('isPositiveInteger', () => {
        const testCases: [string | number, boolean][] = [
            [12, true],
            ['12', true],
            ['ab', false],
            ['12a', false],
            ['0', false],
            [0, false],
        ];
        it.each(testCases)('should return %s for %s', (input, expectedReturn) => {
            expect(isPositiveInteger(input)).toBe(expectedReturn);
        });
    });
    describe('isInteger', () => {
        const testCases: [string | number, boolean][] = [
            [12, true],
            ['12', true],
            ['ab', false],
            ['12a', false],
            ['0', true],
            [0, true],
        ];
        it.each(testCases)('should return %s for %s', (input, expectedReturn) => {
            expect(isInteger(input)).toBe(expectedReturn);
        });
    });
});
