import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef} from '@angular/core';


const CANVAS_WIDTH = 600;
const MARGIN = CANVAS_WIDTH / 30;
const ITEM_WIDTH = CANVAS_WIDTH / 6;

@Component({
    selector: 'm-grid',
    template: `

        <div id="jsGrid" class="m-grid">
            <ng-container *ngFor="let row of viewModel.rows;">
                <div #rowRef class="m-grid__row">
                    <ng-container *ngFor="let child of row.children;">
                        <div  #itemRef class="m-grid__item {{child.styleClass}}" 
                            [attr.data-parent]="child.parent"
                            [attr.data-id]="child.id"
                            [attr.data-sibling]="!!child.styleClass"
                            [attr.data-level]="child.level"
                        >
                            {{child.id}}
                        </div>
                     </ng-container>
                </div>
            </ng-container>
        </div>
    
    `
})

export class MGridComponent implements OnInit, AfterViewInit {
    @ViewChildren('rowRef')
    private rowList: QueryList<ElementRef>;

    @ViewChildren('itemRef')
    private itemList: QueryList<ElementRef>;

    private rowElementList: HTMLElement[];
    private itemElementMap: {[id: string]: HTMLElement};
    private modelEntitiesByLevel: {[id: string]: any[]} = {};

    viewModel: any = {
        rows: []
    };

    model = {
        entities: {
            0: {id: 0, level: 0, children: [1, 2], parent: null},
            1: {id: 1, level: 1, children: [3, 4], parent: 0},
            2: {id: 2, level: 1, children: [5, 6], parent: 0},
            3: {id: 3, level: 2, children: [7, 8, 9, 10], parent: 1},
            4: {id: 4, level: 2, children: [], parent: 1},
            5: {id: 5, level: 2, children: [], parent: 2},
            6: {id: 6, level: 2, children: [11, 12], parent: 2},
            7: {id: 7, level: 3, children: [], parent: 3},
            8: {id: 8, level: 3, children: [], parent: 3},
            9: {id: 9, level: 3, children: [], parent: 3},
            10: {id: 10, level: 3, children: [], parent: 3},
            11: {id: 11, level: 3, children: [], parent: 6},
            12: {id: 12, level: 3, children: [], parent: 6},
        }
    };

    ngOnInit() {
        this.setViewModel();
        this.groupModelEntitiesByLevel();
    }

    setViewModel() {

        let previousLevel,
            previousParent,
            currentRow;

        Object.keys(this.model.entities).forEach((key) => {
            const currentItem = this.model.entities[key],
                currentLevel = currentItem.level,
                currentParent = currentItem.parent;

            if (currentLevel !== previousLevel) {
                const row = {
                    level: currentLevel,
                    children: []
                };

                previousLevel = currentLevel;
                this.viewModel.rows.push(row);

                currentRow = row;
            }

            if (previousParent !== currentParent) {
                previousParent = currentParent;
                currentItem.styleClass = '_sibling';
            }

            currentItem.level = currentLevel;

            if (Array.isArray(currentItem.children)) {
                currentItem.children = currentItem.children.map(id => this.model.entities[id]);
            }

            currentRow.children.push(currentItem);
        });
    }

    public ngAfterViewInit() {
        this.rowElementList = this.convertQueryListToElementList(this.rowList);
        this.itemElementMap = this.convertQueryListToElementMap(this.itemList);

        console.log(this.itemElementMap);

        this.setItemsStyle(this.itemList);

        // this.modelEntitiesByLevel

        for (let i = 0; i < this.rowElementList.length; i++) {
            this.modelEntitiesByLevel[i].forEach((row) => {
                this.shiftElementsInRow(row);
            });
        }
    }

    private shiftElementsInRow(row): void {
        if (row.level === 0) {
            console.log(this.itemElementMap[this.modelEntitiesByLevel[0][0].id]);
            // this.itemElementMap[this.modelEntitiesByLevel[0][0].id].style.left = CANVAS_WIDTH / 2 - ITEM_WIDTH / 2 + 'px';
            console.log();
        }

    }

    private setItemsStyle(arr: QueryList<ElementRef>): void {
        arr.forEach((item: ElementRef) => {
            item.nativeElement.style.width = ITEM_WIDTH + 'px';
        });
    }

    private groupModelEntitiesByLevel(): void {
         let previousLevel;

        const entities = this.model.entities;

        Object.keys(entities).forEach((key) => {
            const currentLevel = entities[key].level;

            if (previousLevel !== currentLevel) {
                previousLevel = currentLevel;
                this.modelEntitiesByLevel[currentLevel] = [];
            }

            this.modelEntitiesByLevel[currentLevel].push(entities[key]);
        });

        console.log(this.modelEntitiesByLevel);
    }

    private convertQueryListToElementMap(arr: QueryList<ElementRef>): {[id: string]: HTMLElement} {
        const map = {};

        arr.forEach((item: ElementRef) => {
            const element = item.nativeElement;
            map[element['dataset'].id] = item;
        });

        return map;
    }

    private convertQueryListToElementList(arr: QueryList<ElementRef>): HTMLElement[] {
        return arr.map((item: ElementRef) => {
            return item.nativeElement;
        });
    }

    private createSegment() {
        const div = document.createElement('div');
        div.classList.add('grid__segment');
    }
}
