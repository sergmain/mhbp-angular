import {DefaultResponse} from '@app/models/DefaultResponse';
import {ApiUid} from "./ApiUid";
import {KbUid} from "./KbUid";

export interface EvaluationUidsForCompany extends DefaultResponse {
    apis: ApiUid[];
    kbs: KbUid[];
}