import * as fromPizzasAction from '../actions/pizzas.action';

describe('Pizzas actions', () => {
    describe('LoadPizzas actions', () => {
        describe('LoadPizzas', () => {
            it('should create an action', () => {
                const action = new fromPizzasAction.LoadPizzasAction();

                expect({...action}).toEqual({
                    type: fromPizzasAction.PizzasActionTypes.Load
                })
            });
        });

        describe('LoadPizzas Fail', () => {
            it('should create an action', () => {
                const payload = 'string';
                const action = new fromPizzasAction.LoadPizzasFailAction(payload);

                expect({...action}).toEqual({
                    type: fromPizzasAction.PizzasActionTypes.LoadFail,
                    payload
                })
            });
        });

        describe('LoadPizzas Success', () => {
            it('should create an action', () => {
                const payload = [
                        {
                            "name": "Blazin' Inferno",
                            "toppings": [
                                {
                                    "id": 10,
                                    "name": "pepperoni"
                                },
                                {
                                    "id": 9,
                                    "name": "pepper"
                                },
                                {
                                    "id": 3,
                                    "name": "basil"
                                },
                                {
                                    "id": 4,
                                    "name": "chili"
                                },
                                {
                                    "id": 7,
                                    "name": "olive"
                                },
                                {
                                    "id": 2,
                                    "name": "bacon"
                                }
                            ],
                            "id": 1
                        },
                        {
                            "name": "Seaside Surfin'",
                            "toppings": [
                                {
                                    "id": 6,
                                    "name": "mushroom"
                                },
                                {
                                    "id": 7,
                                    "name": "olive"
                                },
                                {
                                    "id": 2,
                                    "name": "bacon"
                                },
                                {
                                    "id": 3,
                                    "name": "basil"
                                },
                                {
                                    "id": 1,
                                    "name": "anchovy"
                                },
                                {
                                    "id": 8,
                                    "name": "onion"
                                },
                                {
                                    "id": 11,
                                    "name": "sweetcorn"
                                },
                                {
                                    "id": 9,
                                    "name": "pepper"
                                },
                                {
                                    "id": 5,
                                    "name": "mozzarella"
                                }
                            ],
                            "id": 2
                        },
                        {
                            "name": "Plain Ol' Pepperoni",
                            "toppings": [
                                {
                                    "id": 10,
                                    "name": "pepperoni"
                                }
                            ],
                            "id": 3
                        }
                    ]

                ;
                const action = new fromPizzasAction.LoadPizzasSuccessAction(payload);

                expect({...action}).toEqual({
                    type: fromPizzasAction.PizzasActionTypes.LoadSuccess,
                    payload
                })
            });
        });
    });
});
