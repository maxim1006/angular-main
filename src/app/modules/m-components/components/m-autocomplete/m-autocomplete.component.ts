import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "m-autocomplete",
    templateUrl: "./m-autocomplete.component.html",
})
export class MAutocompleteComponent implements OnInit {
    @Input()
    styleClass: string;

    @Input()
    items: any;

    @Input()
    currentItem: any;

    @Output()
    currentItemChange = new EventEmitter();

    public opened: boolean;
    public currentValue: string;
    public filteredItems: any = [];

    ngOnInit() {
        this.filteredItems = this.items && this.items.slice();
    }

    filterResults() {
        if (this.currentValue) {
            this.filteredItems = this.items.filter((item: any) => {
                return (
                    (item.name
                        ? item.name.toLowerCase()
                        : item.toLowerCase()
                    ).indexOf(this.currentValue.toLowerCase()) !== -1
                );
            });
        } else {
            this.filteredItems = this.items;
        }
    }

    onButtonClick() {
        this.filterResults();
        this.opened = !this.opened;
    }

    onInputChange(value: string) {
        this.currentValue = value;
        this.filterResults();

        if (this.filteredItems.length && !this.opened) {
            this.opened = true;
        }
    }

    setCurrentItem(item: any) {
        this.currentItem = item;
        this.currentValue = item.name || item;
        this.opened = false;

        if (typeof item !== "string") {
            this.items.forEach(
                (currentItem: any) =>
                    (currentItem.selected = currentItem === item)
            );
        }

        this.currentItemChange.emit(this.currentItem);
    }

    trackByFn(index: number, item: any) {
        return index;
    }

    blur(e: any) {
        this.opened = false;
    }
}
