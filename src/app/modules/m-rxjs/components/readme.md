### Use appropriate operators

switchMap: when you want to ignore the previous emissions when there is a new emission

mergeMap: when you want to concurrently handle all the emissions

concatMap: when you want to handle the emissions one after the other as they are emitted

exhaustMap: when you want to cancel all the new emissions while processing a previous emission


### Value from 2 observables
Before

firstObservable$.pipe(
   take(1)
)
.subscribe(firstValue => {
    secondObservable$.pipe(
        take(1)
    )
    .subscribe(secondValue => {
        console.log(`Combined values are: ${firstValue} & ${secondValue}`);
    });
});

After

firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
)
.subscribe(([firstValue, secondValue]) => {
    console.log(`Combined values are: ${firstValue} & ${secondValue}`);
});
