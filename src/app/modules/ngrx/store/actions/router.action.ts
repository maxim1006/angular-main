import { Action } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

// все это - работа с роутингом с помощью ngrx, все эти экшены будут испльзованы в router.effect.ts

export enum RouterActionTypes {
    Go = "[Router] Go",
    Back = "[Router] Back",
    Forward = "[Router] Forward",
}

export class Go implements Action {
    readonly type = RouterActionTypes.Go;

    constructor(
        public payload: {
            path: any[];
            query?: object;
            extras?: NavigationExtras;
        }
    ) {}
}

export class Back implements Action {
    readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
    readonly type = RouterActionTypes.Forward;
}

export type RouterActionsUnion = Go | Back | Forward;
