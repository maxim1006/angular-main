import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-run-lazy-runtime',
  templateUrl: './run-lazy-runtime.component.html',
  styleUrls: ['./run-lazy-runtime.component.less']
})
export class RunLazyRuntimeComponent implements OnInit {
    public load: boolean;

  constructor() { }

  ngOnInit() {
  }

}
