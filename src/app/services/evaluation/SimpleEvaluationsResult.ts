import { DefaultResponse } from '@app/models/DefaultResponse';
import { PageableDefault } from '@app/models/PageableDefault';
import {SimpleEvaluation} from "@services/evaluation/SimpleEvaluation";

export interface SimpleEvaluationsResult extends DefaultResponse {
    evaluations: PageableDefault & {
        content: SimpleEvaluation[];
    };
}
