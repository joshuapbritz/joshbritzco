import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  public posts: any[];

  constructor(protected route: ActivatedRoute, protected api: ApiService) {}

  async ngOnInit() {
    this.api.get(`blog`).subscribe(v => console.log(v));
  }

  public getClass(index: number): 'right' | 'left' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}
