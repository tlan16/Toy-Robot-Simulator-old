import * as assert from 'assert'
import { Tabletop } from './tabletop'

describe('Tabletop', () => {
    it('should construct with positive width and height', () => {
        const tabletop = new Tabletop(3, 4)
        assert.equal(tabletop.height, 3)
        assert.equal(tabletop.width, 4)
    })
    it('should construct with zero width and height', () => {
        const tabletop = new Tabletop(0, 0)
        assert.equal(tabletop.height, 0)
        assert.equal(tabletop.width, 0)
    })
    it('should throw error then width or height is negative', () => {
        try {
            new Tabletop(0, 1)
            assert.equal('no error', 'error')
        } catch (e) {
            assert.equal(e instanceof Error, true)
        }
    })
})
