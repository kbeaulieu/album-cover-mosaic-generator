import { MosaicOptions } from '../../core/mosaic-options';
import { SourceOptions } from '../../core/source-options';

export type ProcessorOptions = MosaicOptions & { sourceOptions: SourceOptions; };
