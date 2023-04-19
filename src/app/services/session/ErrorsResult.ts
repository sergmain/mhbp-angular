import { DefaultResponse } from '@app/models/DefaultResponse';
import { SimpleError } from './SimpleError';
import { PageableDefault } from '@app/models/PageableDefault';
import { DispatcherAssetMode } from '@app/enums/DispatcherAssetMode';

export interface ErrorsResult extends DefaultResponse {
    errors: {
        content: SimpleError[];
    } & PageableDefault;
    assetMode: DispatcherAssetMode;
}