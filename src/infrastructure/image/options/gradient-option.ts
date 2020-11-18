import { OverlayOptions } from 'sharp';
import { MosaicOptions } from '../../../core/mosaic-options';

export function addRadialGradient(options: MosaicOptions, composite: OverlayOptions[]): void {
    if (options.gradient) {
        composite.push({
            input: createGradient(options),
        });
    }
}

function createGradient({ dimensions }: MosaicOptions): Buffer {
    const svg = `
        <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="myGradient" r="70%">
                    <stop offset="70%" stop-color="black" stop-opacity="0"/>
                    <stop offset="100%" stop-color="black" stop-opacity="0.5"/>
                </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#myGradient)"/>
        </svg>
    `;
    return Buffer.from(svg);
}
