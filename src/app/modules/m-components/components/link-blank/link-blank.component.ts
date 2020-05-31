import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-link-blank",
    template: `<a
        href="http://grinz.ru"
        rel="noopener noreferrer"
        target="_blank"
        >Proper link</a
    >`,
    styleUrls: ["./link-blank.component.less"],
})
export class LinkBlankComponent {}
