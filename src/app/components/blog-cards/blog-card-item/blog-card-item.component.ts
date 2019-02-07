import { Component, OnInit, Input, HostListener } from '@angular/core';
import slugify from 'src/app/common/helpers/slugify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card-item',
  templateUrl: './blog-card-item.component.html',
  styleUrls: ['./blog-card-item.component.scss'],
})
export class BlogCardItemComponent implements OnInit {
  @Input() public src: string;

  @Input() public title: string;

  @Input() public snippet: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  @HostListener('click') public gotolink() {
    this.router.navigateByUrl(`/codelabs/${slugify(this.title)}`);
  }
}
