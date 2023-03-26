export interface SimpleEvaluation {
    sessionId: number;
    createdOn: number;
    finishedOn: number;
    sessionStatus: string;
    safe: string;
    normal: number;
    fail: number;
    error: number;
    providerCode: string;
    modelInfo: string;
}