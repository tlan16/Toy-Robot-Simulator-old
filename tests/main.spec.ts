import { foo } from '../src/main';

describe('example test', () => {
    it('should pass', () => {
        expect(foo).toStrictEqual({
            foo: 'bar',
        });
    });
});
