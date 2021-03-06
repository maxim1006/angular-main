import {
    Component,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
    CounterDecrementAction,
    CounterIncrementAction,
    CounterMultiplyByAction,
} from "./store/actions/counter.action";
import * as fromStore from "./store";
import * as fromProductsStore from "./modules/products/store";
import { switchMap, takeUntil } from "rxjs/operators";
import { of, Subject } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

interface AppState {
    counter: number;
}

@Component({
    selector: "m-ngrx",
    templateUrl: "ngrx.component.html",
})
export class MNgrxComponent implements OnInit, OnDestroy {
    /** @internal */
    public _counter$: Observable<number>;
    public _counterSelector$: Observable<number>;
    public _counterRouteSelector$: Observable<any>;
    public destroy$: Subject<any> = new Subject();
    public pizzasHint: string;

    private pizzaTimeout: number;

    /** @internal */
    public _increase(): void {
        this.store.dispatch(new CounterIncrementAction(1));
    }

    /** @internal */
    public _multiplyBy(input): void {
        this.store.dispatch(new CounterMultiplyByAction(+input.value));
        input.value = "";
    }

    /** @internal */
    public _increaseOn(input): void {
        this.store
            .pipe(
                select(fromStore.getCurrentParametrizedCounter, {
                    increaseOn: +input.value,
                })
            )
            .subscribe(data => {
                console.log("data ", data);
            });
    }

    /** @internal */
    public _decrease(): void {
        this.store.dispatch(new CounterDecrementAction(-1));
    }

    constructor(
        private router: Router,
        private store: Store<AppState>,
        @Inject(PLATFORM_ID) private platformId: Record<string, any>
    ) {}

    ngOnInit() {
        this._counter$ = this.store.pipe(select("counter"));
        this._counterSelector$ = this.store.pipe(
            select(fromStore.getCurrentCounter)
        );
        this._counterRouteSelector$ = this.store.pipe(
            select(fromStore.getCurrentCounterRouteState)
        );

        this.store
            .pipe(
                select(fromProductsStore.getPizzasHint),
                takeUntil(this.destroy$)
            )
            .subscribe(hint => {
                this.pizzasHint = hint;

                if (isPlatformBrowser(this.platformId)) {
                    clearTimeout(this.pizzaTimeout);
                    this.pizzaTimeout = window.setTimeout(() => {
                        this.pizzasHint = null;
                    }, 500);
                }
            });
    }

    ngAfterViewInit() {
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe((url: any) => {
                if (url instanceof NavigationEnd) {
                    if (url.url === "/ngrx/products") {
                        this.store
                            .pipe(
                                select(fromProductsStore.getPizzasHint),
                                takeUntil(this.destroy$)
                            )
                            .subscribe(hint => {
                                this.pizzasHint = hint;
                                if (isPlatformBrowser(this.platformId)) {
                                    clearTimeout(this.pizzaTimeout);
                                    this.pizzaTimeout = window.setTimeout(
                                        () => {
                                            this.pizzasHint = null;
                                        },
                                        500
                                    );
                                }
                            });
                    }
                }
            });
    }

    ngOnDestroy() {
        clearTimeout(this.pizzaTimeout);
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = null;
    }
}
