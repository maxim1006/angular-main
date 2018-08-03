import { ElementRef, OnInit, EventEmitter } from "@angular/core";
export declare abstract class Tree {
    children: (TreeLeaf | TreeBrunch)[];
}
export declare abstract class TreeBrunch {
    text: string;
    type: "brunch";
    opened?: boolean;
    children?: (TreeLeaf | TreeBrunch)[];
}
export declare abstract class TreeLeaf {
    text: string;
    type: "leaf";
    selected?: boolean;
}
export declare class MTreeComponent implements OnInit {
    multipleChoice: boolean;
    model: {
        children: (TreeLeaf | TreeBrunch)[];
    };
    level: number;
    rootInputEl: any;
    rootModel: any;
    clickOutput: EventEmitter<string>;
    rootEl: ElementRef;
    el: any;
    currentModel: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    brunchClick(e: Event, item: TreeBrunch): void;
    leafClick(e: Event, item: TreeLeaf): void;
    trackByFn(index: any, item: any): any;
    removeSelectedLeafs(model: any): void;
}
