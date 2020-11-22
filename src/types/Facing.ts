export enum Facing {
    NORTH = 'north',
    SOUTH = 'south',
    EAST = 'east',
    WEST = 'west',
}

export function isFacing(input: unknown): input is Facing {
    return typeof input === 'string' && Object.values(Facing).includes(input as Facing);
}
