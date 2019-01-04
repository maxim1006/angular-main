import {Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild, HostBinding} from '@angular/core';

type GridItemInArrayModel = string | GridItemModel;

export interface GridItemModel {
    id: string;
    level: string;
    children?: GridItemInArrayModel[];
    parent?: string;
    styleClass?: string;
    centralAxes?: number;
}

export interface GridParamsModel {
    canvasWidth: number;
    margin: number;
    itemWidth: number;
}




@Component({
    selector: 'm-grid',
    template: `

        <div #gridCanvas class="m-grid" [ngStyle]="{width: params.canvasWidth + 'px'}">
            <div #gridCanvasInner class="m-grid__inner">
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
        </div>
    
    `
})

export class MGridComponent implements OnInit, AfterViewInit {
    @HostBinding('class.m-grid')
    public hostClass = true;

    @ViewChildren('rowRef')
    private rowList: QueryList<ElementRef>;

    @ViewChildren('itemRef')
    private itemList: QueryList<ElementRef>;

    @ViewChild('gridCanvas')
    private gridCanvasRef: ElementRef;

    @ViewChild('gridCanvasInner')
    private gridCanvasInnerRef: ElementRef;

    private rowElementList: HTMLElement[];
    private gridCanvasElement: HTMLElement;
    private gridCanvasInnerElement: HTMLElement;
    private itemElementMap: {[id: string]: HTMLElement};
    private modelEntitiesByLevel: {[id: string]: any[]} = {};
    private mainAxesCoords: number = 600 / 2;
    private scaleRatio = 1;

    public params: GridParamsModel = {
        canvasWidth: 600,
        margin: 600 / 30,
        itemWidth: 600 / 6
    };

    viewModel: any = {
        rows: []
    };

    model: {entities: {[id: string]: GridItemModel}} = {
        entities: {
            '0': {id: '0', level: '0', children: ['1', '2'], parent: null},
            '1': {id: '1', level: '1', children: ['3', '4'], parent: '0'},
            '2': {id: '2', level: '1', children: ['5', '6'], parent: '0'},
            '3': {id: '3', level: '2', children: ['7', '8', '9', '10'], parent: '1'},
            '4': {id: '4', level: '2', children: ['17', '18'], parent: '1'},
            '5': {id: '5', level: '2', children: ['11', '12', '13', '14'], parent: '2'},
            '6': {id: '6', level: '2', children: ['15', '16'], parent: '2'},
            '7': {id: '7', level: '3', children: [], parent: '3'},
            '8': {id: '8', level: '3', children: ['21', '22', '23'], parent: '3'},
            '9': {id: '9', level: '3', children: [], parent: '3'},
            '10': {id: '10', level: '3', children: [], parent: '3'},
            '11': {id: '11', level: '3', children: [], parent: '5'},
            '12': {id: '12', level: '3', children: [], parent: '5'},
            '13': {id: '13', level: '3', children: [], parent: '5'},
            '14': {id: '14', level: '3', children: [], parent: '5'},
            '15': {id: '15', level: '3', children: [], parent: '6'},
            '16': {id: '16', level: '3', children: [], parent: '6'},
            '17': {id: '17', level: '3', children: ['19', '20'], parent: '4'},
            '18': {id: '18', level: '3', children: [], parent: '4'},
            '19': {id: '19', level: '4', children: [], parent: '17'},
            '20': {id: '20', level: '4', children: [], parent: '17'},
            '21': {id: '21', level: '4', children: [], parent: '8'},
            '22': {id: '22', level: '4', children: [], parent: '8'},
            '23': {id: '23', level: '4', children: [], parent: '8'},
            '24': {id: '24', level: '2', children: ['25', '26'], parent: '2'},
            '25': {id: '25', level: '4', children: [], parent: '24'},
            '26': {id: '26', level: '4', children: [], parent: '24'},
        }
    };

    ngOnInit() {
        this.setViewModel();

        // group model by level to go through them from top to bottom
        this.groupModelEntitiesByLevel();
    }

    setViewModel() {

        let previousLevel,
            previousParent,
            currentRow;

        // create view model rows to display them via ngFor
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
                currentItem.children = currentItem.children.map((id: string) => this.model.entities[id]);
            }

            currentRow.children.push(currentItem);
        });
    }

    public ngAfterViewInit() {
        this.gridCanvasElement = this.gridCanvasRef.nativeElement;
        this.gridCanvasInnerElement = this.gridCanvasInnerRef.nativeElement;
        this.rowElementList = this.convertQueryListToElementList(this.rowList);
        this.itemElementMap = this.convertQueryListToElementMap(this.itemList);

        this.setItemsStyle(this.itemList);

        this.gridCanvasElement.addEventListener('mousewheel', this.onMouseWheel);
        this.gridCanvasElement.addEventListener('DOMMouseScroll', this.onMouseWheel);
        this.gridCanvasElement.addEventListener('MozMousePixelScroll', this.onMouseWheel);

        // this.modelEntitiesByLevel // {0: Array(1), 1: Array(2), 2: Array(4), 3: Array(6)}
        console.log(this.modelEntitiesByLevel);

        for (let i = 0; i < Object.keys(this.modelEntitiesByLevel).length; i++) {
            this.shiftElementsInRow(i, this.modelEntitiesByLevel[i]);
        }
    }

    private onMouseWheel = (event) => {
        const STEP = 0.1;

        if (event.detail > 0 || event.wheelDelta < 0) {
            // direction = 'down';
            this.scaleRatio -= STEP;

            if (this.scaleRatio < 0.3) {
                this.scaleRatio = 0.3;
            }
        } else {
            // direction = 'up';
            this.scaleRatio += STEP;
        }

        this.gridCanvasInnerElement.style.transform = `scale(${this.scaleRatio})`;

        return false;
    }

    private shiftElementsInRow(rowIndex, row): void {

        if (rowIndex === 0) {
            const gridItem = this.modelEntitiesByLevel[0][0];
            gridItem.centralAxes = this.params.canvasWidth / 2;

            this.itemElementMap[gridItem.id].style.left = gridItem.centralAxes - this.params.itemWidth / 2 + 'px';
        } else {
            let previousParentInLevel,
                childrenOfPreviousParentInLevelNumber = 0;

            this.modelEntitiesByLevel[rowIndex].forEach((gridItem, index) => {
                // store this values to subtract them from indexes of next children in one level
                if (previousParentInLevel !== gridItem.parent) {
                    previousParentInLevel = gridItem.parent;

                    if (index) {
                        childrenOfPreviousParentInLevelNumber = index;
                    }
                }

                const gridItemsWithSameParentLength = this.getSameParentItemsLength(this.modelEntitiesByLevel[rowIndex], gridItem);

                // count central axes position for children to give them axes to align with
                const position =
                    // shift children after parent's central Axis
                    this.getParentCentralAxes(gridItem)
                    // shift them in the middle of axes
                    - gridItemsWithSameParentLength * this.params.itemWidth / 2
                    // shift according to index in children's array, for instance we have 3 elements and 1 parent, we have shift each
                    // element according to its siblings
                    + (index - childrenOfPreviousParentInLevelNumber) * this.params.itemWidth;

                gridItem.centralAxes = position + this.params.itemWidth / 2;

                const shiftByChildren = this.getShiftByChildren(gridItem);

                gridItem.centralAxes += shiftByChildren;

                this.itemElementMap[gridItem.id].style.left = position + shiftByChildren + 'px';

                // shift previous siblings according to current grid item children
                if (index) {
                    this.shiftPreviousSiblings(this.modelEntitiesByLevel[rowIndex], gridItem);
                }
            });
        }

        // if (rowIndex === 1) {
        //     let previousParentInLevel,
        //         childrenOfPreviousParentInLevelNumber = 0;
        //
        //     this.modelEntitiesByLevel[1].forEach((gridItem, index) => {
        //         // store this values to subtract them from indexes of next children in one level
        //         if (previousParentInLevel !== gridItem.parent) {
        //             previousParentInLevel = gridItem.parent;
        //
        //             if (index) {
        //                 childrenOfPreviousParentInLevelNumber = index;
        //             }
        //         }
        //
        //         const gridItemsWithSameParentLength = this.getSameParentItemsLength(this.modelEntitiesByLevel[1], gridItem);
        //
        //         // count central axes position for children to give them axes to align with
        //         const position =
        //             // shift children after parent's central Axis
        //             this.getParentCentralAxes(gridItem)
        //             // shift them in the middle of axes
        //             - gridItemsWithSameParentLength * this.params.itemWidth / 2
        //             // shift according to index in children's array
        //             + (index - childrenOfPreviousParentInLevelNumber) * this.params.itemWidth;
        //
        //         gridItem.centralAxes = position + this.params.itemWidth / 2;
        //
        //         const shiftByChildren = this.getShiftByChildren(gridItem);
        //
        //         gridItem.centralAxes += shiftByChildren;
        //
        //         this.itemElementMap[gridItem.id].style.left = position + shiftByChildren + "px";
        //     });
        //
        //     previousParentInLevel = undefined;
        //     childrenOfPreviousParentInLevelNumber = 0;
        // }
        //
        // if (rowIndex === 2) {
        //     let previousParentInLevel,
        //         childrenOfPreviousParentInLevelNumber = 0;
        //
        //     this.modelEntitiesByLevel[2].forEach((gridItem, index) => {
        //
        //         // store this values to subtract them from indexes of next children in one level
        //         if (previousParentInLevel !== gridItem.parent) {
        //             previousParentInLevel = gridItem.parent;
        //
        //             if (index) {
        //                 console.log(123);
        //                 // check if there were previous children with different parent,
        //                 // also set index and not index - 1, because index starts with 0.
        //                 childrenOfPreviousParentInLevelNumber = index;
        //             }
        //         }
        //
        //         const gridItemsWithSameParentLength = this.getSameParentItemsLength(this.modelEntitiesByLevel[2], gridItem);
        //
        //         const position =
        //             // shift children after parent's central Axis
        //             this.getParentCentralAxes(gridItem)
        //             // shift them in the middle of axes
        //             - gridItemsWithSameParentLength * this.params.itemWidth / 2
        //             // shift according to index in children's array
        //             + (index - childrenOfPreviousParentInLevelNumber) * this.params.itemWidth;
        //
        //         gridItem.centralAxes = position + this.params.itemWidth / 2;
        //
        //         const shiftByChildren = this.getShiftByChildren(gridItem);
        //
        //         gridItem.centralAxes += shiftByChildren;
        //
        //         this.itemElementMap[gridItem.id].style.left = position + shiftByChildren + "px";
        //     });
        // }
    }

    // get parent central Axes line, according to this line shift children
    private getParentCentralAxes(gridItem: GridItemModel): number {
        return this.model.entities[gridItem.parent].centralAxes;
    }

    // get shift by children to prevent collision
    private getShiftByChildren(gridItem: GridItemModel): number {
        return this.getCountedShiftByChildrenOneSide(gridItem) * this.getGridItemShiftSign(gridItem);
    }

    private getCountedShiftByChildrenOneSide(gridItem: GridItemModel) {
        if (gridItem.children && gridItem.children.length) {
            return (gridItem.children.length > 1 ? (gridItem.children.length - 1) / 2 : 1) * this.params.itemWidth;
        }

        return 0;
    }

    //  shift previous siblings according to current grid item children
    private shiftPreviousSiblings(level: GridItemModel[], gridItem: GridItemModel): void {
        const shiftSign = this.getGridItemShiftSign(gridItem);

        const gridItemChildrenLength = gridItem.children ? gridItem.children.length : 0;
        const previousSiblingsOnLevel = this.getPreviousSiblingsOnLevel(level, gridItem);

        if (gridItemChildrenLength) {
            if (shiftSign < 0) {
                previousSiblingsOnLevel.forEach((item: GridItemModel) => {
                    // this.getCountedShiftByChildrenOneSide(gridItem) * 2 because element that shifts left sibling
                    // will be also shift itself, so siblings have to be shifted too
                    item.centralAxes += shiftSign * this.getCountedShiftByChildrenOneSide(gridItem) * 2;
                    this.itemElementMap[item.id].style.left = item.centralAxes - this.params.itemWidth / 2 + 'px';
                });
            } else {
                // find all children of previous sibling elements to shift this grid item to the right,
                // according to previous sibling children
                let previousRightSiblingsChildrenLength = 0;

                this.getPreviousSiblingsOnLevelBeforeCenterAxes(level, gridItem).forEach((item) => {
                    previousRightSiblingsChildrenLength += this.getCountedShiftByChildrenOneSide(item);
                });

                console.log(previousRightSiblingsChildrenLength);
                console.log(this.getCountedShiftByChildrenOneSide(gridItem));
                if (previousRightSiblingsChildrenLength) {
                    // shift right element according to previous left element (but before main axes)
                    // count all
                    gridItem.centralAxes += previousRightSiblingsChildrenLength + this.getCountedShiftByChildrenOneSide(gridItem) + this.params.itemWidth;
                    this.itemElementMap[gridItem.id].style.left = gridItem.centralAxes - this.params.itemWidth / 2 + 'px';
                }
            }
        }

    }

    private getPreviousSiblingsOnLevel(level, gridItem: GridItemModel): GridItemModel[] {
        return level.filter((item) => {
            if (gridItem.id !== item.id) {
                return item.centralAxes <= gridItem.centralAxes;
            }
        });
    }

    private getPreviousSiblingsOnLevelBeforeCenterAxes(level, gridItem: GridItemModel): GridItemModel[] {
        return level.filter((item) => {
            if (gridItem.id !== item.id) {
                return item.centralAxes >= gridItem.centralAxes && item.centralAxes > this.mainAxesCoords;
            }
        });
    }

    private getGridItemShiftSign(gridItem: GridItemModel): number {
        let shiftSign;

        if (gridItem.centralAxes < this.mainAxesCoords) {
            shiftSign = -1;
        } else {
            shiftSign = 1;
        }

        return shiftSign;
    }

    // get number of gridItems with the same parent in one level
    private getSameParentItemsLength(level, gridItem: GridItemModel): number {
        return level.filter(item => item.parent === gridItem.parent).length;
    }

    private setItemsStyle(arr: QueryList<ElementRef>): void {
        arr.forEach((item: ElementRef) => {
            item.nativeElement.style.width = this.params.itemWidth + 'px';
        });
    }

    private groupModelEntitiesByLevel(): void {
         let previousLevel;

        const entities = this.model.entities;

        Object.keys(entities).forEach((key) => {
            const currentLevel = entities[key].level;

            if (previousLevel !== currentLevel
                && !this.modelEntitiesByLevel[currentLevel]) {
                previousLevel = currentLevel;
                this.modelEntitiesByLevel[currentLevel] = [];
            }

            this.modelEntitiesByLevel[currentLevel].push(entities[key]);
        });
    }

    private convertQueryListToElementMap(arr: QueryList<ElementRef>): {[id: string]: HTMLElement} {
        const map = {};

        arr.forEach((item: ElementRef) => {
            const element = item.nativeElement;
            map[element['dataset'].id] = element;
        });

        return map;
    }

    private convertQueryListToElementList(arr: QueryList<ElementRef>): HTMLElement[] {
        return arr.map((item: ElementRef) => {
            return item.nativeElement;
        });
    }
}
