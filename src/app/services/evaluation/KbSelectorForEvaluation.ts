import {EvaluationData} from "./EvaluationData";

export class KbSelectorForEvaluation {
    constructor() { }

    protected list: number[] = [];

    protected getId(batchData: EvaluationData.EvaluationInfo): number {
        return batchData.evaluationId;
    }

    toggle(batchData: EvaluationData.EvaluationInfo): void {
        if (this.isSelected(batchData)) {
            this.list.splice(this.list.indexOf(this.getId(batchData)), 1);
        } else {
            this.list.push(this.getId(batchData));
        }
        this.list.sort((a, z) => a - z);
    }

    isSelected(batchData: EvaluationData.EvaluationInfo): boolean {
        return this.list.indexOf(this.getId(batchData)) !== -1;
    }

    clear(): void {
        this.list = [];
    }

    get size(): number {
        return this.list.length;
    }

    getList(): number[] {
        return [...this.list];
    }
}
