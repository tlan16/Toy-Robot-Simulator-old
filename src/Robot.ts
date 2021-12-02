import { Tabletop } from './Tabletop'

export interface Position {
    x: number
    y: number
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FORWARD' | 'BACKWARD'
export type Facing = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST'
export type Rotation = 'CLOCKWISE' | 'COUNTERCLOCKWISE'

export class Robot {
    #position: Position = { x: 0, y: 0 }
    #facing: Facing = 'NORTH'
    public tabletop: Tabletop | undefined

    get position(): Readonly<Position> | undefined {
        return this.tabletop ? this.#position : undefined
    }

    get facing(): Readonly<Facing> | undefined {
        return this.tabletop ? this.#facing : undefined
    }

    public placeOnTabletaop(
        tableTop: Readonly<Tabletop>,
        options?: {
            initialPosition?: Readonly<Position>
            initialFacing?: Readonly<Facing>
        },
    ): void {
        this.tabletop = tableTop
        if (options?.initialPosition) this.#position = options.initialPosition
        if (options?.initialFacing) this.#facing = options.initialFacing
    }

    public move(direction: Direction): void {
        if (!this.tabletop) return
        switch (direction) {
            case 'UP':
                return this.#moveUp()
            case 'DOWN':
                return this.#moveDown()
            case 'LEFT':
                return this.#moveLeft()
            case 'RIGHT':
                return this.#moveRight()
            case 'FORWARD':
                return this.#moveForward()
            case 'BACKWARD':
                return this.#moveBackward()
        }
    }

    public rotate(rotation: Rotation): void {
        switch (rotation) {
            case 'CLOCKWISE':
                return this.#rotateClockwise()
            case 'COUNTERCLOCKWISE':
                return this.#rotateCounterclockwise()
        }
    }

    #moveUp(persistFacing = false): void {
        if (this.#position.y < this.tabletop.width - 1) ++this.#position.y
        if (!persistFacing && this.#facing !== 'NORTH') this.#facing = 'NORTH'
    }

    #moveDown(persistFacing = false): void {
        if (this.#position.y > 0) --this.#position.y
        if (!persistFacing && this.#facing !== 'SOUTH') this.#facing = 'SOUTH'
    }

    #moveLeft(persistFacing = false): void {
        if (this.#position.x > 0) --this.#position.x
        if (!persistFacing && this.#facing !== 'WEST') this.#facing = 'WEST'
    }

    #moveRight(persistFacing = false): void {
        if (this.#position.x < this.tabletop.height - 1) ++this.#position.x
        if (!persistFacing && this.#facing !== 'EAST') this.#facing = 'EAST'
    }

    #moveForward(): void {
        switch (this.#facing) {
            case 'EAST':
                return this.#moveRight()
            case 'SOUTH':
                return this.#moveDown()
            case 'WEST':
                return this.#moveLeft()
            case 'NORTH':
                return this.#moveUp()
        }
    }

    #moveBackward(): void {
        switch (this.#facing) {
            case 'EAST':
                return this.#moveLeft(true)
            case 'SOUTH':
                return this.#moveUp(true)
            case 'WEST':
                return this.#moveRight(true)
            case 'NORTH':
                return this.#moveDown(true)
        }
    }

    #rotateClockwise(): void {
        switch (this.#facing) {
            case 'EAST':
                this.#facing = 'SOUTH'
                break
            case 'SOUTH':
                this.#facing = 'WEST'
                break
            case 'WEST':
                this.#facing = 'NORTH'
                break
            case 'NORTH':
                this.#facing = 'EAST'
                break
        }
    }

    #rotateCounterclockwise(): void {
        switch (this.#facing) {
            case 'EAST':
                this.#facing = 'NORTH'
                break
            case 'SOUTH':
                this.#facing = 'EAST'
                break
            case 'WEST':
                this.#facing = 'SOUTH'
                break
            case 'NORTH':
                this.#facing = 'WEST'
                break
        }
    }
}
