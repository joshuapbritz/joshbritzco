import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public posts: any[];

  constructor(protected route: ActivatedRoute, protected api: ApiService) {}

  async ngOnInit() {
    this.posts = await this.api.get(`/get`);

    console.log(this.posts);
  }

  public getClass(index: number): 'right' | 'left' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}
