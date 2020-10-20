////////////////////////////
// Goods
const goods = [
    { model: "iPhone", color: "black", memory: 64 },
    { model: "iPhone", color: "white" },
    { model: "iPhone", color: "silver" },
    { model: "macBook", color: "silver" },
    { model: "iPod", abc: 0 },
];

// Filters
const filters = [
    { key: "color", value: "silver" },
    { key: "abc", value: 0 },
    { key: "model", value: "macBook" },
];

// Expected output
// [
//     { model: "iPhone", color: "black", memory: 64 },
//     { model: "iPhone", color: "white" },
// ];

function filterProducts(goods, filters) {
    return goods.filter(item => {
        let accepted = true;

        filters.forEach(({ key, value }) => {
            if (typeof item[key] !== "undefined" && item[key] === value) {
                accepted = false;
            }
        });

        return accepted;
    });
}
