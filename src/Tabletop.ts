class InvalidTableDimensionError extends Error {}

export class Tabletop {
    public height: number
    public width: number
    constructor(height = 5, width = 5) {
        if (height < 0 || width < 0) {
            throw new InvalidTableDimensionError()
        }
        this.height = height
        this.width = width
    }
}
