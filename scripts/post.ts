import { Post } from './models/post';
import { html } from './lib/html';
import { parseDate } from './lib/date';

const locationId = `https://dev.to/api/articles/${
  window.location.pathname.split('/').reverse()[0]
}`;

(async (url: string, home: HTMLElement) => {
  home.classList.add('loading');
  const results: Post = await fetch(url).then(i => i.json());

  if (!('error' in results)) {
    home.innerHTML = html`
      <header class="post-title">
        <h1>${results.title}</h1>
      </header>
      <nav class="info">
        <div class="avatar">
          <img
            src="${results.user.profile_image_90}"
            alt="${results.user.username}"
          />
        </div>
        <div class="info">
          <h5>${results.user.name}</h5>
          <a href="https://dev.to/${results.user.username}">
            @${results.user.github_username}
          </a>
        </div>
        <div class="published">
          <h5>
            <strong>Published:</strong>${parseDate(results.published_timestamp)}
          </h5>
        </div>
      </nav>

      <article class="post-html">
        ${results.body_html}
      </article>
    `;

    home.classList.remove('loading');
  } else {
    home.innerHTML = html`
      <header class="not-found">
        <h1>Sorry</h1>
        <h5>That article isn't here</h5>
      </header>
    `;
  }
})(locationId, document.getElementById('home'));
