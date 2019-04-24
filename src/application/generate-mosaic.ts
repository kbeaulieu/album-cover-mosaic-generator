import { MosaicOptions } from '../domain/mosaic';
import { getCoversImageByListId } from '../infrastructure/discogs-client';
import { createMosaic } from '../infrastructure/image-processor';

export function generateMosaicFromDiscogsList(listId: string, mosaicOptions: MosaicOptions): Promise<void> {
    return getCoversImageByListId(listId)
        .then((images: Buffer[]) => createMosaic(images, mosaicOptions));
}
