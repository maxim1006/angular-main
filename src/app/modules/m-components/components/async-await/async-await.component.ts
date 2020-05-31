import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-async-await",
    templateUrl: "./async-await.component.html",
    styleUrls: ["./async-await.component.less"],
})
export class AsyncAwaitComponent implements OnInit {
    ngAfterViewInit() {
        // console.log("start"); // 1
        //
        // setTimeout(_ => {
        //     console.log("timeout"); // 5
        // }, 0);
        //
        // Promise.resolve().then(_ => {
        //     console.log("promise resolve"); // 3
        // });
        //
        // requestAnimationFrame(() => {
        //     console.log("requestAnimationFrame"); //4
        //     window["asyncTest"].insertAdjacentHTML("afterbegin", "some html123");
        // });
        //
        // console.log("end"); // 2
        //
        // document.body.style.color = "red";
        //
        // window["asyncTest"].insertAdjacentHTML("afterbegin", "some html");

        //
        // fetch("http://localhost:4201/assets/mocks/family.json")
        //     .then((res) => res.json())
        //     .then((data) => console.log(data))
        //     .catch(err => console.log(err));
        //
        // const response = await fetch("http://localhost:4201/assets/mocks/family.json");
        // const json = await response.json();
        // console.log(json);
        //
        // Promise.resolve().then(_ => console.log("promise resolve"));

        // async - автоматом заставляет функцию возвращать промис
        const getAsync = async () => {
            return [1, 2, 3];
        };

        // тоже что и
        // const getAsync1 = () => {return Promise.resolve([1,2,3])};

        // getAsync().then((data) => {console.log(data);})
        // getAsync1().then((data) => {console.log(data);})

        const getArrays = async () => {
            const arr = await getAsync();
            const arr1 = await getAsync();

            // console.log([...arr, ...arr1]);
        };

        getArrays();

        const getAllArrays = async () => {
            try {
                const arr = getAsync();
                const arr1 = getAsync();

                return await Promise.all([arr, arr1]);
            } catch (e) {
                console.log(e);
                throw e; // эту ошибку можно поймать в кетч
                // return []; // если что-то верну то вместо кетч слушатель получит []
            }
        };

        // getAllArrays().then(data => console.log(data)).catch(e => console.log(e));

        const getFruit = async name => {
            const o = { apple: "apple", banana: "banana", orange: "orange" };
            console.log(o[name]);
            return o[name];
        };
        //
        // const fruitLoop = async() => {
        //     const arr = ["apple","orange","banana"];
        //
        //     for (const i of arr) {
        //         await getFruit(i);
        //     }
        // };
        //
        // fruitLoop();

        // const concurrentFruitLoop = async() => {
        //     const arr = [getFruit("apple"), getFruit("orange"), getFruit("banana")];
        //
        //     for await (const i of arr) {
        //         console.log(i);
        //     }
        // };
        //
        // concurrentFruitLoop();

        async function isApple() {
            if ((await getFruit("apple")) === "apple") {
                console.log("it is apple!");
            }
        }

        isApple();
    }

    ngOnInit() {}
}
