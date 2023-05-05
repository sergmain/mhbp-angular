import { DefaultResponse } from '@app/models/DefaultResponse';
import { PageableDefault } from '@app/models/PageableDefault';
import {SimpleScenarioStep} from "@services/scenario/SimpleScenarioStep";

export interface SimpleScenarioSteps extends DefaultResponse {
    steps: {
        content: SimpleScenarioStep[];
    } & PageableDefault;
}
