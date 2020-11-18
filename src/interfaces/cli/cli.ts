import commander, { Command } from 'commander';
import { filter, forEach, pipe } from 'ramda';
import { cliContext, CliContext } from '../../context/interfaces/cli';
import { MosaicOptions } from '../../core/mosaic-options';
import { Arguments } from './arguments';
import { Options } from './options';
import { mapCliOptionsToMosaicOptions } from './options-mapper';
import { extractConfigFile } from './toml-config';

const defaults: Partial<Options> = {
    outputPath: './output.png',
    backgroundColor: '#000',
    overlayBlend: 'overlay',
    paddingSize: '0',
};

export function run(argv: string[], ctx: CliContext = cliContext): Promise<void> {
    console.debug(argv);
    const command: commander.Command = createArgumentParser().parse(argv);
    const options: Options = parseOptions(command);
    const mosaicOptions: MosaicOptions = mapCliOptionsToMosaicOptions(options);

    return ctx.generateMosaic(options.listId, mosaicOptions)
        .then(() => console.info('done'));
}

function createArgumentParser(): commander.Command {
    return new Command()
        .name('mos')
        .version('0.0.1')
        .description('Alum cover mosaic generator. Because I can.', {
            configFile: 'Path to mosaic config. Cli options wil override file options.',
        })
        .arguments('[configFile]')
        .option('-o, --output-path <outputPath>', 'Output file location', defaults.outputPath)
        .option('-l, --list-id <id>', 'Your List id')
        .option('-b, --background-color <backgroundColor>',
            'Background color. Supports https://github.com/Qix-/color-string formats', defaults.backgroundColor)
        .option('-w, --width <width>', 'Image width in pixels')
        .option('-H, --height <height>', 'Image height in pixels')
        .option('-O, --overlay <overlay>', 'Overlay color')
        .option('-B, --overlay-blend <overlayBlend>', 'Blend mod of the overlay', defaults.overlayBlend)
        .option('-g, --gradient', 'Draw a black to transparent radial gradient (spotlight effect)')
        .option('-s, --scale-to-fit', 'Scale down covers if not enough space available')
        .option('-p, --padding-size <paddingSize>', 'Padding size between covers', defaults.paddingSize);
}

function parseOptions(command: commander.Command): Options {
    const [configFilePath] = command.args as Arguments;
    const cliOptions = command.opts() as Options;
    if (configFilePath) {
        return {
            ...(extractConfigFile(configFilePath)),
            ...filterUndefinedAndDefaults(cliOptions),
        };
    } else {
        return { ...cliOptions };
    }
}

function filterUndefinedAndDefaults(options: Options): Partial<Options> {
    return pipe(
        Object.entries,
        filter(([_, v]) => v !== undefined),
        entries => new Set(entries),
        set => forEach(d => set.delete(d), Object.entries(defaults)),
        Object.fromEntries,
    )(options);
}
