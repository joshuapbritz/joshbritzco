import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-blog-card-row',
  templateUrl: './blog-card-row.component.html',
  styleUrls: ['./blog-card-row.component.scss'],
})
export class BlogCardRowComponent implements OnInit {
  @Input() @HostBinding('class') public rowalign: 'left' | 'center' | 'right' =
    'center';

  public title: string = 'hello2';

  constructor() {}

  ngOnInit() {}
}
