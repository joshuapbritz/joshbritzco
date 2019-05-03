import { Component, OnInit, Input, HostListener } from '@angular/core';
import slugify from 'src/app/common/helpers/slugify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card-item, a[app-blog-card-item]',
  templateUrl: './blog-card-item.component.html',
  styleUrls: ['./blog-card-item.component.scss'],
})
export class BlogCardItemComponent implements OnInit {
  @Input() public post: { slug: string; title: string; body: string };

  constructor(private router: Router) {}

  ngOnInit() {}

  // @HostListener('click') public gotolink() {
  //   this.router.navigateByUrl(`/codelabs/${this.post.slug}`);
  // }
}
