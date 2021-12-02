import { Tabletop } from './Tabletop'

export interface Position {
    x: number
    y: number
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
export type Facing = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST'

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
        }
    }
}
