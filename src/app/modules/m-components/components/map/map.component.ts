import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.less"],
})
export class MapComponent implements OnInit {
    ngOnInit() {
        // set
        const map: any = new Map();

        const obj = { prop: 1 };

        map.set("1", "1");
        map.set(1, 1);

        map.set(true, true).set(obj, obj);

        console.log("map.get(1) ", map.get(1));
        console.log("map.size ", map.size);
        console.log("map ", map);

        console.log("map.keys() ", map.keys());

        // не работает в тайпскрипт
        for (const key of map.keys()) {
            console.log("map key ", key);
        }

        // не работает в тайпскрипт
        for (const value of map.values()) {
            console.log("map value ", value);
        }

        // не работает в тайпскрипт
        for (const entry of map.entries()) {
            console.log("map entry ", entry);
        }

        // не работает в тайпскрипт
        for (const item of map) {
            // тоже что и const entry of map.entries()
            console.log("map item ", item);
        }

        map.forEach((key, value, map) => {
            console.log(`map ${key} ${value} ${map}`);
        });

        // set full
        let map1 = new Map();

        const obj1 = { name: "Max", age: 31 };

        map1 = <any>[Object.entries(obj1)];

        console.log(map1);
    }
}
