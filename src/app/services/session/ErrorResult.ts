import { DefaultResponse } from '@app/models/DefaultResponse';
import { SimpleError } from './SimpleError';

export interface ErrorResult extends DefaultResponse {
    erorr: SimpleError;
}