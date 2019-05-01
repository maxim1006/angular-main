import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-interview-tasks',
  templateUrl: './interview-tasks.component.html',
  styleUrls: ['./interview-tasks.component.less']
})
export class InterviewTasksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // task
      function sum(num) {
          let currentSum = num;

          function f(arg) {
              currentSum += arg;
              return f;
          }

          f.toString = () => {
              return currentSum;
          };

          return f;
      }

      console.log(sum(0)(1)(2)(3)(4)(5));


      // task
      const initString = 'ar2ya Jo3hn Deyne1ris';

      const arr = initString.split(' ').sort((a, b) => {
          const aNumber = +a.match(/\d/)[0];
          const bNumber = +b.match(/\d/)[0];

          console.log(aNumber, bNumber);

          return aNumber - bNumber;
      });

      console.log(arr.join(' '));

      // task
      const obj = {
          a: {
              num: 1,
              a: {
                  num: 2,
                  a: {
                      num: 3,
                      a: {
                          num: 4
                      }
                  }
              }
          }
      };

      function sumObj(o) {
          let sum = 0;

          if (o.a) {
              sum += o.a.num;
              return sum += sumObj(o.a);
          }

          return sum;
      }

      console.log(sumObj(obj));
  }

}
