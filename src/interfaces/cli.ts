import { Command } from 'commander';
import { generateMosaicFromDiscogsList } from '../application/generate-mosaic';

const program = new Command()
    .version('0.0.1');

program
    .command('create')
    .option('-o, --output-path <outputPath>', 'Output file location', './output.png')
    .option('-l, --list-id <id>', 'Your List id', 495139)
    .action(command => {
        generateMosaicFromDiscogsList(command.listId, {
            outputUrl: command.outputPath,
            dimensions: {
                width: 3000,
                height: 1800,
            },
        }).then(() => {
            console.info('then');
        });
    });

export const cli: Command = program;
