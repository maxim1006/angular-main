import {Component, OnInit} from '@angular/core';
import {PageUtils} from '../../../shared/utils/page-utils';
import {PageUtilsService} from '../../../../common/services/page-utils.service';

@Component({
    selector: 'media-query',
    templateUrl: 'media-query.component.html'
})

export class MediaQueryComponent extends PageUtils implements OnInit {

    //конструктор надо прописывать из-за странностей а2
    constructor(protected pageUtilsService: PageUtilsService) {
        super(pageUtilsService);
    }

    //необязательно, так как сработает парентовый инит, но если будет доп. логика, то нужно вызывать
    // ngOnInit() {
    //     super.ngOnInit();
    // }

}
