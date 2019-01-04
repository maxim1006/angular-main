import {Component, HostBinding} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/internal/operators';
import {Subject} from 'rxjs/index';



@Component({
    selector: 'm-router',
    templateUrl: 'router.component.html'
})
export class MRouterComponent {
    private _id = 0;

    public get id(): number {
        return this._id;
    }

    public set id(value) {
        this._id = value;
        console.log('id is changed to: ', value);
    }

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.pipe(
            takeUntil(this.destroy$),
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event) => {
            console.log('NavigationEnd ', event);
        });
    }

    public ngOnDestroy(): void {
        this.destroySubscribers();
    }

    private destroy$: Subject<any> = new Subject();

    private destroySubscribers(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    submit(id: number) {
        // this.router.navigate(['/router', id, {param: 1}], { queryParams: { page: 1 }});
        // чтобы тут относительный рут, нужно relativeTo: и в нем сущность _route: ActivatedRoute


        //skipLocationChange - меняем роутер стейт без замены урлы
        // '/router/' - если первый слеш - путь от корня (для navigateByUrl)
        // 'router/' - от текущего урл (для navigateByUrl)
        this.router.navigateByUrl('/router/' + id, { queryParams: { page: 1 }, skipLocationChange: true}).then(() => {
            console.log(`navigateByUrl & navigate returns Promise`);
        }); //тоже, только строка первым аргументом
    }

    onActivate(event) {
        console.log('Mrouter router-outlet activate ', event);
    }

    onDeactivate(event) {
        console.log('Mrouter router-outlet deactivate ', event);
    }

}

