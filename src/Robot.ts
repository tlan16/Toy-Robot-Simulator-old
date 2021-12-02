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

    placeOnTabletaop(
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

    move(direction: Direction): void {
        if (!this.tabletop) return
        switch (direction) {
            case 'UP':
                if (this.#position.y < this.tabletop.width - 1) ++this.#position.y
                this.#facing = 'NORTH'
                break
            case 'DOWN':
                if (this.#position.y > 0) --this.#position.y
                this.#facing = 'SOUTH'
                break
            case 'LEFT':
                if (this.#position.x > 0) --this.#position.x
                this.#facing = 'WEST'
                break
            case 'RIGHT':
                if (this.#position.x < this.tabletop.height - 1) ++this.#position.x
                this.#facing = 'EAST'
                break
            case 'FORWARD':
                switch (this.#facing) {
                    case 'EAST':
                        return this.move('RIGHT')
                    case 'SOUTH':
                        return this.move('DOWN')
                    case 'WEST':
                        return this.move('LEFT')
                    case 'NORTH':
                        return this.move('UP')
                }
                break
            case 'BACKWARD':
                switch (this.#facing) {
                    case 'EAST':
                        if (this.#position.x > 0) --this.#position.x
                        break
                    case 'SOUTH':
                        if (this.#position.y < this.tabletop.width - 1) ++this.#position.y
                        break
                    case 'WEST':
                        if (this.#position.x < this.tabletop.height - 1) ++this.#position.x
                        break
                    case 'NORTH':
                        if (this.#position.y > 0) --this.#position.y
                        break
                }
                break
        }
    }

    rotate(rotation: Rotation): void {
        switch (rotation) {
            case 'CLOCKWISE':
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
                break
            case 'COUNTERCLOCKWISE':
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
                break
        }
    }
}
