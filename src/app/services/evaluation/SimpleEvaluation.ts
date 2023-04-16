export interface SimpleEvaluation {
    evaluationId: number;
    startedOn: number;
    finishedOn?: number;
    sessionStatus: string;
    safe?: string;
    normal: number;
    fail: number;
    error: number;
    providerCode: string;
    modelInfo: string;
}