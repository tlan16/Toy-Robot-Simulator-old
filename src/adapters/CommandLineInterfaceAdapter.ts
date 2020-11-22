import * as readline from 'readline';
import { Player } from '../classes/Player';
import { Playground } from '../classes/Playground';
import { isPositiveInteger } from '../helpers/TypeGurads';
import { CommandAdapter } from './CommandAdapter';

export class CommandLineInterfaceAdapter {
    private player?: Player;
    private playgroundWidth?: BigInt;
    private playgroundHeight?: BigInt;
    private playground?: Playground;
    private commandAdapter?: CommandAdapter;

    private newPlayer(): void {
        console.info('Player Name:');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on('line', (line) => {
            try {
                this.player = new Player(line);
                rl.close();
                this.newPlayground();
            } catch (e) {
                console.error(e.message);
                console.error('');
                rl.close();
                this.newPlayer();
            }
        });
    }

    private newPlaygroundWidth(): void {
        console.info('Playground width:');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on('line', (line) => {
            try {
                if (!isPositiveInteger(line)) {
                    throw new TypeError('Playground width must be an positive integer');
                }
                this.playgroundWidth = BigInt(line);
                rl.close();
                this.newPlaygroundHeight();
            } catch (e) {
                console.error(e.message);
                console.error('');
                rl.close();
                this.newPlaygroundWidth();
            }
        });
    }

    private newPlaygroundHeight(): void {
        console.info('Playground height:');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on('line', (line) => {
            try {
                if (!isPositiveInteger(line)) {
                    throw new TypeError('Playground height must be an positive integer');
                }
                this.playgroundHeight = BigInt(line);
                rl.close();
                this.newPlayground();
            } catch (e) {
                console.error(e.message);
                console.error('');
                rl.close();
                this.newPlaygroundHeight();
            }
        });
    }

    private newPlayground(): void {
        if (!this.player) {
            this.newPlayer();
            return;
        }
        if (!this.playgroundWidth) {
            this.newPlaygroundWidth();
            return;
        }
        if (!this.playgroundHeight) {
            this.newPlaygroundHeight();
            return;
        }
        try {
            this.playground = new Playground({
                size: {
                    x: this.playgroundWidth,
                    y: this.playgroundHeight,
                },
            });
            this.commandAdapter = new CommandAdapter({
                player: this.player!,
                playground: this.playground!,
            });
            console.info(
                `Player ${this.player.name} is now on ` +
                    `a ${this.playground.size.x}x${this.playground.size.y} playground.`,
            );
            this.newCommand();
        } catch (e) {
            console.error(e.message);
            this.newPlaygroundWidth();
        }
    }

    private newCommand(): void {
        if (!this.commandAdapter) {
            this.newPlayground();
            return;
        }

        console.info('');
        console.info('Enter command(s) in one line:');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on('line', (line) => {
            rl.close();
            try {
                this.commandAdapter!.execute(line);
            } catch (e) {
                console.error(e.message);
            }
            this.newCommand();
        });
    }

    public run(): void {
        this.newCommand();
    }
}
