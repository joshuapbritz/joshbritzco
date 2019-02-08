import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post-header',
  templateUrl: './blog-post-header.component.html',
  styleUrls: ['./blog-post-header.component.scss'],
})
export class BlogPostHeaderComponent implements OnInit {
  @Input() public title: string;

  @Input() public subtitle: string;

  @Input() public image: string;

  constructor() {}

  ngOnInit() {}
}
