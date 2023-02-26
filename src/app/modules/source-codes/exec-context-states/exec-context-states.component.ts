import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-exec-context-states',
    templateUrl: './exec-context-states.component.html',
    styleUrls: ['./exec-context-states.component.scss']
})
export class ExecContextStatesComponent  {

    sourceCodeId: string;
    execContextId: string;

    constructor(
        private route: ActivatedRoute,
    ) {
        this.sourceCodeId = this.route.snapshot.paramMap.get('sourceCodeId');
        this.execContextId = this.route.snapshot.paramMap.get('execContextId');
    }

    
}