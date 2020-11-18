import { MosaicLayout } from './mosaic-layout';
import { ProcessorOptions } from './processor-options';

export interface CoverLayout {
    rowNumber: number;
    colNumber: number;
    totalTop: number;
    totalLeft: number;
}

export function calculateCoverLayout(i: number, mosaicLayout: MosaicLayout, options: ProcessorOptions): CoverLayout {
    const rowNumber = Math.floor(i / mosaicLayout.nbOfCoverByRow);
    const colNumber = i % mosaicLayout.nbOfCoverByRow;
    const top = rowNumber * options.sourceOptions.coverSize;
    const left = colNumber * options.sourceOptions.coverSize;
    const topPadding = options.paddingSize * rowNumber;
    const leftPadding = options.paddingSize * colNumber;
    const totalTop = top + mosaicLayout.topMargin + topPadding;
    const totalLeft = left + mosaicLayout.leftMargin + leftPadding;

    return {
        rowNumber,
        colNumber,
        totalTop,
        totalLeft,
    };
}
