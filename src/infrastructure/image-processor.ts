import * as sharp from 'sharp';
import { MosaicOptions } from '../domain/mosaic';

export function createMosaic(images: Buffer[], options: MosaicOptions): Promise<void> {
    const mosaic = sharp({
        create: {
            width: options.dimensions.width,
            height: options.dimensions.height,
            channels: 3,
            background: { r: 0, g: 0, b: 0 },
        },
    });

    const composite = images.map((image, i) => {
        const top = Math.floor(i / 10) * 300;
        const left = (i % 10) * 300;
        return ({ input: image, top, left });
    });

    return mosaic
        .composite(composite)
        .png()
        .toFile('output.png')
        .then(() => console.info(''));
}
