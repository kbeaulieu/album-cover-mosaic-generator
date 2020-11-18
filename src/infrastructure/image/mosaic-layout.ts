import { ProcessorOptions } from './processor-options';

export interface MosaicLayout {
    nbOfCoverByRow: number;
    nbOfCoverByColumn: number;
    nbOfCover: number;
    totalTopPaddingSize: number;
    totalLeftPaddingSize: number;
    topMargin: number;
    leftMargin: number;
}

export function calculateMosaicLayout({ dimensions, paddingSize, sourceOptions }: ProcessorOptions): MosaicLayout {
    const nbOfCoverByRow = Math.floor(dimensions.width / sourceOptions.coverSize);
    const nbOfCoverByColumn = Math.floor(dimensions.height / sourceOptions.coverSize);
    const nbOfCover = nbOfCoverByRow * nbOfCoverByColumn;
    // const nbOfRow = Math.floor(images.length % nbOfCoverByRow);
    const totalTopPaddingSize = paddingSize * (nbOfCoverByColumn - 1);
    const totalLeftPaddingSize = paddingSize * (nbOfCoverByRow - 1);
    const topMargin = Math.round(((dimensions.height % sourceOptions.coverSize) - totalTopPaddingSize) / 2);
    const leftMargin = Math.round(((dimensions.width % sourceOptions.coverSize) - totalLeftPaddingSize) / 2);

    return {
        nbOfCoverByRow,
        nbOfCoverByColumn,
        nbOfCover,
        totalTopPaddingSize,
        totalLeftPaddingSize,
        topMargin,
        leftMargin,
    };
}
