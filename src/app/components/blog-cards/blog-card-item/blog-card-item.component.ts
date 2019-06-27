import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card-item, a[app-blog-card-item]',
  templateUrl: './blog-card-item.component.html',
  styleUrls: ['./blog-card-item.component.scss'],
})
export class BlogCardItemComponent implements OnInit {
  @Input() public post: { slug: string; title: string; body: string };

  ngOnInit() {}
}
