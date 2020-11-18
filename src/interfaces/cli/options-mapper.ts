import { MosaicOptions, OverlayBlend } from '../../core/mosaic-options';
import { Options } from './options';

export function mapCliOptionsToMosaicOptions(args: Options): MosaicOptions {
    const overlay = args.overlay ? ({
        color: args.overlay,
        blend: args.overlayBlend as OverlayBlend,
    }) : undefined;

    return {
        outputPath: args.outputPath,
        backgroundColor: args.backgroundColor,
        gradient: args.gradient,
        scaleToFit: args.scaleToFit,
        overlay: overlay,
        paddingSize: Number(args.paddingSize),
        dimensions: {
            width: Number(args.width),
            height: Number(args.height),
        },
    };
}
