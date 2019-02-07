import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-keybind-service',
  templateUrl: './create-keybind-service.component.html',
  styleUrls: ['./create-keybind-service.component.scss'],
})
export class CreateKeybindServiceComponent implements OnInit {
  public snippets = {
    test: `function doThing()
{
  alert('thing done');
}`,
    html: `<div class="parent">
  <span>Title</span>
</div>

<div class="parent">
  <span>Title</span>
</div>`,
    css: `.selector {
  width: 300px;
  height: 300px;
}`,
  };

  constructor() {}

  ngOnInit() {}
}
