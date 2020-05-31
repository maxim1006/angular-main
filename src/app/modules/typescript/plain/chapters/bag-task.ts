interface ResultMapModel {
    [key: number]: number;
}

const bag1 = ["gold", "gold"];
const bag2 = ["gold", "silver"];
const bag3 = ["silver", "silver"];
const bags = [bag1, bag2, bag3];

function testRandomInteger(iterations: number): any {
    let goldenCoins = 0;
    let silverCoins = 0;

    for (let i = 0; i < iterations; i++) {
        const randomBagIndex = getRandomInteger(0, 2);
        const coinFromRandomBag = getRandomInteger(0, 1);
        const coin = bags[randomBagIndex][coinFromRandomBag];

        if (coin !== "gold") {
            continue;
        } else {
            const currentBag = bags[randomBagIndex].slice();
            currentBag.splice(coinFromRandomBag, 1);
            const secondCoin = currentBag[0];

            if (secondCoin === "gold") {
                ++goldenCoins;
            } else {
                ++silverCoins;
            }
        }
    }

    return {
        goldenCoins,
        silverCoins,
        iterations,
    };
}

const result = testRandomInteger(10000);
console.log(result.goldenCoins / (result.goldenCoins + result.silverCoins));

/* Helpers */
function getRandomInteger(min: number, max: number): number {
    const random = Math.random();
    const randomNumber = min + random * (max + 1 - min);

    return Math.floor(randomNumber);
}
