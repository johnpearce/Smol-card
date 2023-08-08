```python
import scrapy
from scrapy.http import JsonRequest
from appspace_scraper.items import AppspaceItem

class AppspaceSpider(scrapy.Spider):
    name = 'appspace'
    allowed_domains = ['docs.appspace.com']
    start_urls = ['https://docs.appspace.com/wp-json/wp/v2/posts']

    def parse(self, response):
        data = response.json()
        for post in data:
            item = AppspaceItem()
            item['title'] = post['title']['rendered']
            item['content'] = post['content']['rendered']
            item['date'] = post['date']
            yield item

        # Pagination
        if 'next' in response.links.keys():
            yield scrapy.Request(url=response.links['next']['url'], callback=self.parse)
```