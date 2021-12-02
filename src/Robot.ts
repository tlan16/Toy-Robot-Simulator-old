import { Tabletop } from './Tabletop'

export interface Position {
    x: number
    y: number
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export class Robot {
    #position: Position = { x: 0, y: 0 }
    public tabletop: Tabletop | undefined

    get position(): Readonly<Position> | undefined {
        return this.tabletop ? this.#position : undefined
    }

    placeOnTabletaop(tableTop: Readonly<Tabletop>, initialPosition?: Readonly<Position>): void {
        this.tabletop = tableTop
        if (initialPosition) this.#position = initialPosition
    }

    move(direction: Direction): void {
        if (!this.tabletop) return
        switch (direction) {
            case 'UP':
                if (this.#position.y < this.tabletop.width - 1) ++this.#position.y
                break
            case 'DOWN':
                if (this.#position.y > 0) --this.#position.y
                break
            case 'LEFT':
                if (this.#position.x > 0) --this.#position.x
                break
            case 'RIGHT':
                if (this.#position.x < this.tabletop.height - 1) ++this.#position.x
                break
        }
    }
}
