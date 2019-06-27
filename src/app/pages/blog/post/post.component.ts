import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private slug: string;

  public post: any;

  constructor(protected route: ActivatedRoute, protected api: ApiService) {
    this.route.params.subscribe(async ({ slug }) => {
      this.slug = slug;

      this.post = void 0;

      this.post = await this.api.get(`/get/${this.slug}`);
    });
  }

  ngOnInit() {}
}
