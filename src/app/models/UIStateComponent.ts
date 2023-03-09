import { Subscription } from 'rxjs';
import { AuthenticationService } from '@services/authentication';

export class UIStateComponent {
    isLoading: boolean = false;
    subs: Subscription[] = [];

    constructor(readonly authenticationService: AuthenticationService) { }

    get isRole(): {
        Admin: boolean;
        Manager: boolean;
        Operator: boolean;
        Data: boolean;
        MainAdmin: boolean;
        MainOperator: boolean;
        MainSupport: boolean;
        MainAssetManager: boolean;
    } {
        return {
            Admin: this.authenticationService.isRoleAdmin(),
            Manager: this.authenticationService.isRoleManager(),
            Operator: this.authenticationService.isRoleOperator(),
            Data: this.authenticationService.isRoleData(),
            MainAdmin: this.authenticationService.isRoleMainAdmin(),
            MainOperator: this.authenticationService.isRoleMainOperator(),
            MainSupport: this.authenticationService.isRoleMainSupport(),
            MainAssetManager: this.authenticationService.isRoleMainAssetManager()
        };
    }

    subscribeSubscription(s: Subscription): void {
        this.subs.push(s);
    }

    unsubscribeSubscriptions(): void {
        // console.log(this.subs.length);
        this.subs.forEach(s => s.unsubscribe());
    }

    setIsLoadingStart(): void {
        this.isLoading = true;
    }

    setIsLoadingEnd(): void {
        this.isLoading = false;
    }

}