import { Component } from "@angular/core";

@Component({
    selector: "style-example",
    templateUrl: "./styleExampleComponent.html",
    styleUrls: ["./style-example.component.less"],
})
export class StyleExampleComponent {
    public imageUrl = "http://grinz.ru/jquery/imagePreloading/images/1.jpg";

    public img: {
        name: string;
        url: string;
    } = {
        name: "name",
        url: "http://grinz.ru/jquery/imagePreloading/images/6.jpg",
    };

    getStyles() {
        return {
            width: "10%",
            color: "red",
            fontSize: "20px",
            transform: "translate(10px, 0)",
        };
    }
}
