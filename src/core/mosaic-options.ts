import { SourceOptions } from './source-options';

export interface MosaicOptions {
    outputPath: string;
    backgroundColor: string;
    gradient: boolean;
    scaleToFit: boolean;
    paddingSize: number;
    overlay?: Overlay;
    dimensions: Dimensions;
    sourceOptions?: SourceOptions;
}

export interface Dimensions {
    width: number;
    height: number;
}

export function area(dimensions: Dimensions): number {
    return dimensions.height * dimensions.width;
}

export interface Overlay {
    color: string;
    blend: OverlayBlend;
}

export type OverlayBlend =
    'clear'
    | 'source'
    | 'over'
    | 'in'
    | 'out'
    | 'atop'
    | 'dest'
    | 'dest-over'
    | 'dest-in'
    | 'dest-out'
    | 'dest-atop'
    | 'xor'
    | 'add'
    | 'saturate'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'colour-dodge'
    | 'colour-dodge'
    | 'colour-burn'
    | 'colour-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion';
