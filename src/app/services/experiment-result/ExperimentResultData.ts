import { ExperimentResultApiData } from '@app/services/experiment-result/ExperimentResultApiData';
import { ExperimentResultSimple } from '@app/services/experiment-result/ExperimentResultSimple';
import { ExperimentApiData } from '@app/services/experiments/ExperimentApiData';
import { ExperimentResult } from '@app/services/experiment-result/ExperimentResult';
import { DefaultResponse } from '@app/models/DefaultResponse';
import { PageableDefault } from '@app/models/PageableDefault';
import { SimpleSelectOption } from '@app/models/SimpleSelectOption';
import { ExperimentResultTaskParamsYaml } from './ExperimentResultTaskParamsYaml';

export namespace ExperimentResultData {
    export interface ExperimentResultSimpleList extends DefaultResponse {
        items: {
            content: ExperimentResultSimple[];
        } & PageableDefault;
    }

    export interface ExperimentInfoExtended {
        experimentResult: ExperimentResult;
        experiment: ExperimentResultApiData.ExperimentResultData;
        experimentInfo: ExperimentInfo;
    }

    export interface ExperimentFeatureExtendedResult extends DefaultResponse {
        metricsResult: MetricsResult;
        hyperParamResult: HyperParamResult;
        tasks: {
            content: ExperimentResultTaskParamsYaml[]
        } & PageableDefault;
        experimentFeature: ExperimentApiData.ExperimentFeatureData;
        consoleResult: ConsoleResult;
    }
    export interface HyperParamResult {
        elements: HyperParamList[];
    }
    export interface HyperParamList {
        key: string;
        list: HyperParamElement[];
    }

    export interface HyperParamElement {
        param: string;
        isSelected: boolean;
    }

    export interface MetricsResult {
        metricNames: string[];
        metrics: MetricElement[];
    }
    export interface MetricElement {
        values: number[];
        params: string;
    }

    export interface PlotData {
        x: string;
        y: string;
        z: number[][];
    }

    export interface ConsoleResult extends DefaultResponse {
        console: string;
        exitCode: number;
        isOk: boolean;
    }

    export interface ExperimentFeatureExtendedResult { }
    export interface ExperimentInfo {
        allDatasetOptions: SimpleSelectOption[];
        features: ExperimentApiData.ExperimentFeatureData[];
    }

}