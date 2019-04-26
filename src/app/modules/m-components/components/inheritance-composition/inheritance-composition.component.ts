import {Component} from '@angular/core';

@Component({
    selector: 'm-inheritance-composition',
    templateUrl: './inheritance-composition.component.html',
    styleUrls: ['./inheritance-composition.component.less']
})
export class InheritanceCompositionComponent {

    constructor() {
        // this.implementInheritance();
        this.implementComposition();
    }

    implementInheritance() {
        // основной минус, что я стараюсь предугадать что делают/любят все животные
        class Animal {
            walk() {
                console.log('animal is walking');
            }

            hasName(kind) {
                console.log(`${kind} has name`);
            }

            likesSwimming(kind) {
                console.log(`${kind} likes swimming`);
            }
        }

        class Cat extends Animal {
            meow() {
                console.log('cat is meowing');
            }

            likesSwimming() {
                console.log('cat doesnt like swim');
            }
        }

        class Dog extends Animal {
            bark() {
                console.log('dog is barking');
            }
        }

        const dog = new Dog();
        dog.bark();
        dog.likesSwimming('dog');

        const cat = new Cat();
        cat.meow();
        cat.likesSwimming(); // logic error, cant change
    }

    implementComposition() {
        // inheritance describes what objects are, composition - what they do
        const barker = (state) => ({
            bark() {
                console.log('dog is barking');
            }
        });

        const meower = (state) => ({
            meow() {
                console.log('cat is meowing');
            }
        });

        const swimLiker = (state) => ({
            likesSwimming() {
                console.log(`${state.kind} likes swimming`);
            }
        });

        const nameOwner = (state) => ({
            hasName() {
                console.log(`${state.kind} has name`);
                console.log(this);
            }
        });

        const Dog = () => {
            const state = {
                kind: 'dog'
            };

            return Object.assign(
                {},
                barker(state),
                nameOwner(state),
                swimLiker(state)
            );
        };

        const dog = Dog();

        dog.bark();
        dog.likesSwimming();
        dog.hasName();

        const Cat = () => {
            const state = {
                kind: 'cat'
            };

            return Object.assign(
                {},
                meower(state),
                nameOwner(state)
            );
        };

        const cat = Cat();
        cat.meow();
        cat.hasName();
        // cat.swimLiker(); // error
    }

}
