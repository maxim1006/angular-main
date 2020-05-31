// interface BasePizza {
//     size: number;
// }
//
// interface Pizza extends BasePizza {
//     name: string;
//     getNumber(): number;
//     [key: string]: any;
// }
//
// function getPizza(): Pizza {
//     return {
//         name: 'New',
//         size: 10,
//         getNumber() {
//             return this.size;
//         }
//     };
// }

// Union example
interface BaseTest {
    n: number;
}

interface BaseTestExtended extends BaseTest {
    str: "";
}

interface BaseTestExtended1 extends BaseTest {
    str1: "";
}

export type baseTestUnion = BaseTestExtended | BaseTestExtended1;

const baseTest: BaseTest = { n: 1 };
const baseTestExtended: BaseTestExtended = { str: "", n: 1 };
const baseTestUnion: baseTestUnion = { str1: "", n: 1 };
const baseTestUnion1: baseTestUnion = { str: "", n: 1 };
