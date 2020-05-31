export interface State2MixinModel {
    state2: {
        prop: string;
    };
    getState2(): { [key: string]: any };
}

type Constructor<T> = new (...args: any[]) => T;

export function state2Mixin<T extends Constructor<{}>>(
    Base: T = <any>class {}
) {
    return class extends Base implements State2MixinModel {
        state2 = {
            prop: "prop2",
        };

        getState2() {
            return this.state2;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
}
