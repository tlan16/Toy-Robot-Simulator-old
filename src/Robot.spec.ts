import { Facing, Position, Robot } from './Robot'
import * as assert from 'assert'
import { Tabletop } from './Tabletop'

describe('Robot', () => {
    describe('constructor', () => {
        it('should have expected initial state', () => {
            const robot = new Robot()
            assert.strictEqual(robot.tabletop, undefined)
            assert.strictEqual(robot.position, undefined)
            assert.strictEqual(robot.facing, undefined)
        })
    })

    describe('placeOnTabletaop', () => {
        it('should be placed on a given tabletop', () => {
            const robot = seedRobotOnTabletop({ tabletop: new Tabletop() })
            assert.strictEqual(robot.tabletop instanceof Tabletop, true)
            assert.deepEqual(robot.position, { x: 0, y: 0 })
            assert.deepEqual(robot.facing, 'NORTH')
        })
        it('should be placed on a given tabletop with initial values', () => {
            const position: Readonly<Position> = { x: 2, y: 3 }
            const facing: Readonly<Facing> = 'EAST'
            const robot = seedRobotOnTabletop({ position, facing })
            assert.strictEqual(robot.tabletop instanceof Tabletop, true)
            assert.strictEqual(robot.position, position)
            assert.strictEqual(robot.facing, facing)
        })
    })

    describe('move', () => {
        describe('up', () => {
            it('should move up', () => {
                const robot = seedRobotOnTabletop({ position: { x: 0, y: 0 }, facing: 'EAST' })
                robot.move('UP')
                assert.deepStrictEqual(robot.position, { x: 0, y: 1 })
                assert.strictEqual(robot.facing, 'NORTH')
            })
            it('should not move up', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 1, y: 3 } })
                robot.move('UP')
                assert.deepStrictEqual(robot.position, { x: 1, y: 3 })
                assert.strictEqual(robot.facing, 'NORTH')
            })
        })
        describe('down', () => {
            it('should move down', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('DOWN')
                assert.deepStrictEqual(robot.position, { x: 3, y: 2 })
                assert.strictEqual(robot.facing, 'SOUTH')
            })
            it('should not move down', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 1, y: 0 } })
                robot.move('DOWN')
                assert.deepStrictEqual(robot.position, { x: 1, y: 0 })
                assert.strictEqual(robot.facing, 'SOUTH')
            })
        })
        describe('left', () => {
            it('should move left', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('LEFT')
                assert.deepStrictEqual(robot.position, { x: 2, y: 3 })
                assert.strictEqual(robot.facing, 'WEST')
            })
            it('should not move left', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 0, y: 0 } })
                robot.move('LEFT')
                assert.deepStrictEqual(robot.position, { x: 0, y: 0 })
                assert.strictEqual(robot.facing, 'WEST')
            })
        })
        describe('right', () => {
            it('should move right', () => {
                const robot = seedRobotOnTabletop({ position: { x: 3, y: 3 } })
                robot.move('RIGHT')
                assert.deepStrictEqual(robot.position, { x: 4, y: 3 })
                assert.strictEqual(robot.facing, 'EAST')
            })
            it('should not move right', () => {
                const robot = seedRobotOnTabletop({ tabletop: new Tabletop(3, 3), position: { x: 3, y: 3 } })
                robot.move('RIGHT')
                assert.deepStrictEqual(robot.position, { x: 3, y: 3 })
                assert.strictEqual(robot.facing, 'EAST')
            })
        })
    })
})

function seedRobotOnTabletop(options?: {
    tabletop?: Readonly<Tabletop>
    position?: Readonly<Position>
    facing?: Readonly<Facing>
}) {
    const robot = new Robot()
    const tabletop =
        options?.tabletop ??
        new Tabletop(
            options?.position?.x ? options.position.x * 2 : undefined,
            options?.position?.y ? options.position.y * 2 : undefined,
        )
    robot.placeOnTabletaop(tabletop, {
        initialPosition: options?.position,
        initialFacing: options?.facing,
    })
    return robot
}
