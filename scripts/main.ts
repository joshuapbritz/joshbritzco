import { Article } from './models/article';
import { parseDate } from './lib/date';
import { html } from './lib/html';
import { Post } from './models/post';

(async (url: string, element: HTMLElement, dialog: HTMLDialogElement) => {
  const result: Array<Article> = await fetch(url).then(data => data.json());

  let articles: Array<Article> = [];
  if (result && result.length) {
    articles = result.slice(0, 6);
  }

  for (const article of articles) {
    const item: HTMLElement = document.createElement('a');
    item.classList.add(`article-item`);
    item.setAttribute('href', `/post/${article.id}`);

    item.addEventListener('click', (event: MouseEvent) => {
      if ('HTMLDialogElement' in window) {
        event.preventDefault();
        event.stopPropagation();

        const host = dialog.querySelector('#inner-content');
        host.innerHTML = '';

        dialog.classList.add('loading');
        dialog.showModal();

        fetch(`https://dev.to/api/articles/${article.id}`)
          .then(data => data.json())
          .then((data: Post) => {
            const content = document.createElement('div');

            content.className = `article-content-wrapper ${data.slug}`;

            content.innerHTML = html`
              <div class="title">
                <h1>${data.title}</h1>
                <div class="user">
                  <div class="avatar">
                    <img src="${data.user.profile_image_90}" alt="" />
                  </div>
                  <div class="info">
                    <h3>${data.user.name}</h3>
                    <a href="https://dev.to/${data.user.username}">
                      @${data.user.github_username}
                    </a>
                  </div>
                </div>
                <div class="article-details">
                  <h5>
                    <strong>Published:</strong>
                    ${parseDate(data.published_timestamp)}
                  </h5>
                  <ul class="tags">
                    ${data.tags.map(
                      tag => html`
                        <li class="tag">
                          <a href="https://dev.to/t/${tag}">#${tag}</a>
                        </li>
                      `
                    )}
                  </ul>
                </div>
              </div>

              <article class="content">
                ${data.body_html}
              </article>
            `;

            host.appendChild(content);
            dialog.classList.remove('loading');
          });
      }
    });

    const template = html`
      <div class="header">
        <h3>
          ${article.title}
        </h3>
        <h5>
          <strong>Published:</strong>
          ${parseDate(article.published_timestamp)}
        </h5>
        <ul class="tags">
          ${article.tag_list.map(
            tag => html`
              <li class="tag">
                <a href="https://dev.to/t/${tag}">#${tag}</a>
              </li>
            `
          )}
        </ul>
      </div>

      <div class="body-snippet">
        ${article.description}
      </div>
    `;

    item.innerHTML = template;

    element.appendChild(item);
  }
})(
  'https://dev.to/api/articles?username=joshuapbritz',
  document.getElementById('article'),
  document.getElementById('article-container') as any
);
