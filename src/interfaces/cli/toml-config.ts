import * as fs from 'fs';
import * as toml from 'toml';
import { Options } from './options';

// TODO ajouter de la validation sur les types
export function extractConfigFile(path: string): Options {
    const tomlContent: string = fs.readFileSync(path, 'utf8');
    console.debug(tomlContent);
    return toml.parse(tomlContent);
}
