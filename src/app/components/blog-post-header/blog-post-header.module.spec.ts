import { BlogPostHeaderModule } from './blog-post-header.module';

describe('BlogPostHeaderModule', () => {
  let blogPostHeaderModule: BlogPostHeaderModule;

  beforeEach(() => {
    blogPostHeaderModule = new BlogPostHeaderModule();
  });

  it('should create an instance', () => {
    expect(blogPostHeaderModule).toBeTruthy();
  });
});
