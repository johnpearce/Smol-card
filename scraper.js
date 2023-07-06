```javascript
let scrapedData = [];

const RedditPostSchema = {
  title: '',
  url: '',
  author: '',
  subreddit: '',
  upvotes: 0,
  comments: 0,
};

async function scrapeReddit(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new DOMParser().parseFromString(text, 'text/html');

    const posts = dom.querySelectorAll('.Post');
    posts.forEach(post => {
      const data = { ...RedditPostSchema };

      data.title = post.querySelector('h3').innerText;
      data.url = post.querySelector('a').href;
      data.author = post.querySelector('.author').innerText;
      data.subreddit = post.querySelector('.subreddit').innerText;
      data.upvotes = parseInt(post.querySelector('.upvotes').innerText);
      data.comments = parseInt(post.querySelector('.comments').innerText);

      scrapedData.push(data);
    });

    handlePagination(dom);
  } catch (error) {
    window.postMessage({ type: 'errorScraping', error: error.message }, '*');
  }
}

async function handlePagination(dom) {
  const nextPageLink = dom.querySelector('.next-button a');
  if (nextPageLink) {
    await scrapeReddit(nextPageLink.href);
  } else {
    window.postMessage({ type: 'scrapeComplete', data: scrapedData }, '*');
  }
}
```