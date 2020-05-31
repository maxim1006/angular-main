import { naiveObjectComparison } from "./common.helper";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators";

type MappingFunction<T, R> = (mappable: T) => R;
type MemoizationFunction<R> = (previousResult: R, currentResult: R) => boolean;

function defaultMemoization(previousValue, currentValue): boolean {
    if (typeof previousValue === "object" && typeof currentValue === "object") {
        return naiveObjectComparison(previousValue, currentValue);
    }
    return previousValue === currentValue;
}

export function select$<T, R>(
    source$: Observable<T>,
    mappingFunction: MappingFunction<T, R>,
    memoizationFunction?: MemoizationFunction<R>
): Observable<R> {
    return source$.pipe(
        map(mappingFunction),
        distinctUntilChanged(memoizationFunction || defaultMemoization),
        shareReplay(1)
    );
}
