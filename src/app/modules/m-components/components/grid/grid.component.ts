import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-grid',
    template: `

        <div id="jsGrid" class="grid">
            
            <div class="grid-row" *ngFor="let row of viewModel.rows">
                
                
                
            </div>
            
        </div>
    
    `
})

export class MGridComponent implements OnInit {
    viewModel: any = {
        rows: []
    };

    model = {
        entities: {
            0: {level: 0, children: [1,2], parent: null},
            1: {level: 1, children: [3,4], parent: 0},
            2: {level: 1, children: [5,6], parent: 0},
            3: {level: 2, children: [7,8,9,10], parent: 1},
            4: {level: 2, children: [], parent: 1},
            5: {level: 2, children: [], parent: 2},
            6: {level: 2, children: [11,12], parent: 2},
            7: {level: 3, children: [], parent: 3},
            8: {level: 3, children: [], parent: 3},
            9: {level: 3, children: [], parent: 3},
            10: {level: 3, children: [], parent: 3},
            11: {level: 3, children: [], parent: 6},
            12: {level: 3, children: [], parent: 6},
        }
    };

    ngOnInit() {
        this.prepareViewModel();
    }

    prepareViewModel() {
        let previousLevel,
            currentRow;

        Object.keys(this.model.entities).forEach((key) => {
            let currentItem = this.model.entities[key],
                currentLevel = currentItem.level;

            if (currentLevel !== previousLevel) {
                let row = {
                    level: currentLevel,
                    children: []
                };

                previousLevel = currentLevel;
                this.viewModel.rows.push(row);

                currentRow = row;
            }

            if (Array.isArray(currentItem.children)) {
                currentItem.children = currentItem.children.map(id => this.model.entities[id]);
            }

            currentRow.children.push(currentItem);
        });

        console.log(this.viewModel);
    }
}
