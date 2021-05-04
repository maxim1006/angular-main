import { Component, HostBinding, OnInit } from "@angular/core";

@Component({
    selector: "m-css",
    templateUrl: "./css.component.html",
    styleUrls: ["./css.component.less"],
})
export class CssComponent implements OnInit {
    @HostBinding("class.css") hostClass = true;

    scrollFindingSnippet = `
    [].forEach.call($$("*"), function(a) {
        a.style.outline =
        "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
        });
    `;

    ngOnInit() {}

    onSmoothScrollLinkClick(event: Event, divElement: Element) {
        event.preventDefault();
        divElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
