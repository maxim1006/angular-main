interface BasePizza {
    size: number;
}

interface Pizza extends BasePizza {
    name: string;
    getNumber(): number;
    [key: string]: any;
}

function getPizza(): Pizza {
    return {
        name: 'New',
        size: 10,
        getNumber() {
            return this.size;
        }
    };
}
