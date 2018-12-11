import {RouterEffects} from "./router.effect";
import {FamilyEffects} from "./family.effect";

export * from "./family.effect";
export * from "./router.effect";

export const effects = [RouterEffects, FamilyEffects];

/*
Как обратиться к стору из эффекта
@Effect()
shipOrder = this.actions.pipe(
  ofType<ShipOrder>(ActionTypes.ShipOrder),
  map(action => action.payload),
  withLatestFrom(this.store.pipe(select(getUserName))),
  map([payload, username] => {
    ...
  })
)
*/

/*
* Множественные экшены в эффекте
* @Effect() save = this.update$.pipe(
   map(action => action.payload),
   switchMap(payload => this.myService.save(payload)),
   tap(res => this.store.dispatch(new Notification('save success'))),
   map(res => new SaveSuccess(res))
);
* */
