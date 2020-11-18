import * as sharp from 'sharp';
import { OverlayOptions } from 'sharp'; // tslint:disable-line:no-duplicate-imports
import { calculateCoverLayout, CoverLayout } from './cover-layout';
import { calculateMosaicLayout } from './mosaic-layout';
import { addRadialGradient } from './options/gradient-option';
import { addOverlay } from './options/overlay-option';
import { ProcessorOptions } from './processor-options';

export async function createMosaic(images: Buffer[], options: ProcessorOptions): Promise<void> {
    try {
        const mosaic = sharp({
            create: {
                width: options.dimensions.width,
                height: options.dimensions.height,
                channels: 3,
                background: options.backgroundColor,
            },
        });

        const composite: OverlayOptions[] = await createMosaicComposite(options, images);
        addOverlay(options, composite);
        addRadialGradient(options, composite);

        const sharp1 = mosaic
            .composite(composite)
            .png();

        return sharp1
            .toFile(options.outputPath)
            .catch(e => console.error('Error while creating mosaic', e))
            .then(() => console.info(`Mosaic crated at ${options.outputPath}`));
    } catch (error) {
        console.error('Error while create mosaic: ', error);
        throw error;
    }
}

function createMosaicComposite(options: ProcessorOptions, images: Buffer[]): Promise<OverlayOptions[]> {
    const mosaicLayout = calculateMosaicLayout(options);
    const filteredImages = filterCovers(options, images, mosaicLayout.nbOfCover);

    const imagesPromises = filteredImages.map(async (image: Buffer, i) => {
        const coverLayout = calculateCoverLayout(i, mosaicLayout, options);
        const coverAndFiller: OverlayOptions[] = [];

        const { topAdjustment, leftAdjustment } = await fillSmallerCover(image, options, coverAndFiller, coverLayout);

        coverAndFiller.push({
            input: image,
            top: coverLayout.totalTop + topAdjustment,
            left: coverLayout.totalLeft + leftAdjustment,
        });

        return coverAndFiller;
    });

    return Promise.all(imagesPromises).then(imageList => imageList.flat());
}

function filterCovers(options: ProcessorOptions, images: Buffer[], nbOfCover: number): Buffer[] {
    return (!options.scaleToFit && images.length > nbOfCover) ? images.slice(0, nbOfCover) : images;
}

async function fillSmallerCover(
    image: Buffer, options: ProcessorOptions, coverAndFiller: OverlayOptions[], coverLayout: CoverLayout,
): Promise<{ leftAdjustment: number; topAdjustment: number }> {
    const sharpImage = sharp(image);
    const metadata = await sharpImage.metadata();
    const { coverSize } = options.sourceOptions;

    let topAdjustment = 0;
    let leftAdjustment = 0;
    if (metadata.width && metadata.height && (metadata.width !== coverSize || metadata.height !== coverSize)) {
        const filler = await sharpImage.resize(coverSize, coverSize).blur(10).toBuffer();
        coverAndFiller.push({ input: filler, top: coverLayout.totalTop, left: coverLayout.totalLeft });
        topAdjustment = calculateAdjustment(coverSize, metadata.height);
        leftAdjustment = calculateAdjustment(coverSize, metadata.width);
    }

    return { topAdjustment, leftAdjustment };
}

function calculateAdjustment(coverSize: number, receivedCoverSize: number): number {
    return Math.ceil((coverSize - receivedCoverSize) / 2);
}

/*
// resize 300 to new, and smaller to ratio
const scaleToFitImage = await sharpImage.resize(coverSize, options.sourceOptions.coverSize).toBuffer();
...
if (scaleToFit) { // Check if scale is needed
    const topMargin2 = Math.round((dimensions.height % originalCoverSize));
    const leftMargin2 = Math.round((dimensions.width % originalCoverSize));
    // $x * x * n = h * w  =>  x^2 = h * w / n  =>  x = sqrt(h * w / n)$
    const dimensions1 = { width: dimensions.width - leftMargin2, height: dimensions.height - topMargin2 };
    coverSize = Math.floor(Math.sqrt(area(dimensions1) / images.length));
    console.debug('coverSize: ', coverSize);
}*/
