import {PizzasGuard} from "./pizzas.guard";
import {PizzaExistsGuard} from "./pizza-exists.guard";
import {PizzaToppingsGuard} from "./pizza-toppings.guard";

export const guards: any[] = [PizzasGuard, PizzaExistsGuard, PizzaToppingsGuard];

export * from "./pizzas.guard";
export * from "./pizza-exists.guard";
export * from "./pizza-toppings.guard";
