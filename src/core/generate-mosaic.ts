import { getCoversImageByListId, getSourceOptions } from '../infrastructure/discogs/discogs-client';
import { createMosaic } from '../infrastructure/image/image-processor';
import { ProcessorOptions } from '../infrastructure/image/processor-options';
import { MosaicOptions } from './mosaic-options';

export function generateMosaicFromDiscogsList(listId: string, mosaicOptions: MosaicOptions): Promise<void> {
    mosaicOptions.sourceOptions = getSourceOptions();
    return getCoversImageByListId(listId)
        .then((images: Buffer[]) => createMosaic(images, mosaicOptions as ProcessorOptions));
}
