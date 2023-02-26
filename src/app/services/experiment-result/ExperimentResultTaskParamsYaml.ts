import { Fitting } from '@app/enums/Fitting';
import { MetricsStatus } from '@app/enums/MetricsStatus';

export interface ExperimentResultTaskParamsYaml {
    version: number;
    metrics: Metrics;
    fitting: Fitting;
    taskId: number;
    taskParams: string;
    execState: number;
    completedOn: number;
    completed: boolean;
    assignedOn: number;
    typeAsString: string;
    functionExecResults: string;
}

export interface Metrics {
    error: string;
    status: MetricsStatus;
    values: {
        [name: string]: number
    };
}
