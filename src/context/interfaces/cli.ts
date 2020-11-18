import { generateMosaicFromDiscogsList } from '../../core/generate-mosaic';
import { MosaicOptions } from '../../core/mosaic-options';

export type Gen = (listId: string, mosaicOptions: MosaicOptions) => Promise<void>;

export interface CliContext {
    generateMosaic: Gen;
}

export const cliContext: CliContext = {
    generateMosaic: generateMosaicFromDiscogsList,
};
