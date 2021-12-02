import { Position, Robot } from './Robot'
import * as assert from 'assert'
import { Tabletop } from './Tabletop'

describe('Robot', () => {
    describe('constructor', () => {
        it('should have expected initial state', () => {
            const robot = new Robot()
            assert.strictEqual(robot.tabletop, undefined)
            assert.strictEqual(robot.position, undefined)
        })
    })

    describe('placeOnTabletaop', () => {
        it('should be placed on a given tabletop', () => {
            const robot = seedRobotOnTabletop({ tabletop: new Tabletop() })
            assert.strictEqual(robot.tabletop instanceof Tabletop, true)
            assert.deepEqual(robot.position, { x: 0, y: 0 })
        })
        it('should be placed on a given tabletop with initial position', () => {
            const position: Readonly<Position> = { x: 2, y: 3 }
            const robot = seedRobotOnTabletop({ position })
            assert.strictEqual(robot.tabletop instanceof Tabletop, true)
            assert.strictEqual(robot.position, position)
        })
    })

    describe('move', () => {
        describe('up', () => {
            it('should move up', () => {
                const robot = seedRobotOnTabletop({ position: { x: 0, y: 0 } })
                robot.move('UP')
                assert.deepEqual(robot.position, { x: 0, y: 1 })
            })
            it('should not move up', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 1, y: 3 } })
                robot.move('UP')
                assert.deepEqual(robot.position, { x: 1, y: 3 })
            })
        })
        describe('down', () => {
            it('should move down', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('DOWN')
                assert.deepEqual(robot.position, { x: 3, y: 2 })
            })
            it('should not move down', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 1, y: 0 } })
                robot.move('DOWN')
                assert.deepEqual(robot.position, { x: 1, y: 0 })
            })
        })
        describe('left', () => {
            it('should move left', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('LEFT')
                assert.deepEqual(robot.position, { x: 2, y: 3 })
            })
            it('should not move left', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 0, y: 0 } })
                robot.move('LEFT')
                assert.deepEqual(robot.position, { x: 0, y: 0 })
            })
        })
        describe('right', () => {
            it('should move right', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('RIGHT')
                assert.deepEqual(robot.position, { x: 4, y: 3 })
            })
            it('should not move right', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 3, y: 3 } })
                robot.move('RIGHT')
                assert.deepEqual(robot.position, { x: 3, y: 3 })
            })
        })
    })
})

function seedRobotOnTabletop(options?: { tabletop?: Readonly<Tabletop>; position?: Readonly<Position> }) {
    const robot = new Robot()
    const tabletop =
        options?.tabletop ??
        new Tabletop(
            options?.position?.x ? options.position.x * 2 : undefined,
            options?.position?.y ? options.position.y * 2 : undefined,
        )
    robot.placeOnTabletaop(tabletop, options?.position)
    return robot
}
