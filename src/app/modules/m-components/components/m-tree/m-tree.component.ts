import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Input,
    EventEmitter,
    Output,
} from "@angular/core";

export abstract class Tree {
    children: (TreeLeaf | TreeBrunch)[];
}

export abstract class TreeBrunch {
    text: string;
    type: "brunch";
    opened?: boolean;
    children?: (TreeLeaf | TreeBrunch)[];
}

export abstract class TreeLeaf {
    text: string;
    type: "leaf";
    selected?: boolean;
}

@Component({
    selector: "m-tree",
    templateUrl: "m-tree.component.html",
})
export class MTreeComponent implements OnInit {
    @Input()
    multipleChoice = false;

    @Input() model: { children: (TreeLeaf | TreeBrunch)[] } = {
        children: [
            {
                text: "Configuration Params v 2",
                type: "brunch",
                opened: true,
                children: [
                    {
                        text: "Parameters Deploying Edit v 8.yaml",
                        type: "leaf",
                        selected: true,
                    },
                    {
                        text: "Debug Config 4.conf",
                        type: "leaf",
                    },
                    {
                        text: "Image.jpg",
                        type: "leaf",
                    },
                    {
                        text: "Configuration Params v 2",
                        type: "brunch",
                        opened: true,
                        children: [
                            {
                                text: "Parameters Deploying Edit v 8.yaml",
                                type: "leaf",
                            },
                            {
                                text: "Debug Config 4.conf",
                                type: "leaf",
                            },
                            {
                                text: "Image.jpg",
                                type: "leaf",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Configuration Params v 1",
                type: "brunch",
                children: [
                    {
                        text: "1",
                        type: "leaf",
                    },
                    {
                        text: "2",
                        type: "leaf",
                    },
                    {
                        text: "3",
                        type: "leaf",
                    },
                ],
            },
            {
                text: "Configuration Params v 0",
                type: "brunch",
            },
            {
                text: "Another One Folder",
                type: "leaf",
            },
        ],
    };

    @Input()
    level = 0;

    @Input()
    rootInputEl: any;

    @Input()
    rootModel: any;

    @Output()
    clickOutput: EventEmitter<string> = new EventEmitter();

    @ViewChild("rootEl") rootEl: ElementRef;

    el: any;
    currentModel: any;

    ngOnInit() {
        this.level += 1;
        this.currentModel = this.level === 1 ? this.model : this.rootModel;
    }

    ngAfterViewInit() {
        this.el =
            this.level === 1 ? this.rootEl.nativeElement : this.rootInputEl;
    }

    brunchClick(e: Event, item: TreeBrunch) {
        e.stopPropagation();
        item.opened = !item.opened;
    }

    leafClick(e: Event, item: TreeLeaf) {
        e.stopPropagation();

        if (item.selected) {
            return;
        }

        if (!this.multipleChoice) {
            this.removeSelectedLeafs(this.currentModel);
        }

        item.selected = true;

        this.leafClickEmit();
    }

    leafClickEmit() {
        this.clickOutput.emit(this.currentModel);
    }

    trackByFn(index, item) {
        return index;
    }

    removeSelectedLeafs(model: any) {
        model.children.forEach((item: any) => {
            if (item.type === "leaf") {
                item.selected = false;
            }

            if (
                item.type === "brunch" &&
                item.children &&
                item.children.length
            ) {
                this.removeSelectedLeafs(item);
            }
        });
    }
}
