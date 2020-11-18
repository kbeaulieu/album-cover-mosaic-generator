import { Blend, OverlayOptions } from 'sharp';
import { MosaicOptions } from '../../../core/mosaic-options';

export function addOverlay(options: MosaicOptions, composite: OverlayOptions[]) {
    if (options.overlay) {
        composite.push({
            input: {
                create: {
                    width: options.dimensions.width,
                    height: options.dimensions.height,
                    channels: 3,
                    background: options.overlay.color,
                },
            },
            blend: options.overlay.blend as Blend,
        });
    }
}
