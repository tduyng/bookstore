import os
from scrapy import Spider
from crawler.items import BookItem
import json
from scrapy_splash import SplashRequest


def get_links_from_text_file(file):
    links = []
    with open(file, "r") as f:
        try:
            lines = f.readlines()
            for line in lines:
                links.append(line.strip())
        except:
            pass
    return links


script = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(10))
    return {
        cookies = splash:get_cookies(),
        html = splash:html()
    }
end
"""

script2 = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(0.5))
    return {
        cookies = splash:get_cookies(),
        html = splash:html()
    }
end
"""


# Crawl website using javascript rendering --> using with scrapy-splash
# For using scrapy-splash, just install it, update in the settings.py files
# And usign SplashRequest instead of scrapy.Request
# Make sure splash running on port 8085
class BooksSpider(Spider):
    name = "books_online"
    allowed_domains = ["fahasa.com"]

    # Delete old contents of json files
    output_file = os.getcwd() + "/data.json"
    print(output_file)
    open(output_file, "w").close()

    def start_requests(self):
        self.logger.info("Start crawling ............")

        # We can read link from a text  files
        text_file = os.getcwd() + "/crawler/spiders/links.txt"
        urls = get_links_from_text_file(text_file)
        # headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}
        for url in urls:
            yield SplashRequest(url, self.parse, endpoint="execute", args={"lua_source": script})

    def parse(self, response):
        books = response.xpath('//ul[@id="products_grid"]/li')
        genre = response.xpath('//link[@rel="canonical"]/@href').get()
        if genre:
            genre.split("/")[-1].replace(".html", "")

        if len(books) < 1:
            self.logger.info("--------------------html empty")

        for book in books:

            item = BookItem()

            item["genre"] = genre
            item["title"] = book.xpath('//h2[has-class("p-name-list")]/a/@title').get()

            item["author"] = ""
            current_price = book.xpath('//p[@class="special-price"]/span/text()').extract_first()
            old_price = book.xpath('//p[has-class("old-price")]/span[@class="price"]/text()').extract_first()
            item["imgURL"] = book.xpath('//span[@class="product-image"]/img/@data-src').get()

            if current_price:
                item["price"] = current_price.strip().split("\xa0")[0]
            else:
                item["price"] = 0

            if old_price:
                item["old_price"] = old_price.strip().split("\xa0")[0]
            else:
                item["old_price"] = 0

            filename = f"data.json"
            with open(filename, "r+", encoding="utf-8") as file:
                try:
                    data = json.load(file)
                except:
                    data = {"books": []}

                data["books"].append(
                    {
                        "genre": item["genre"],
                        "title": item["title"],
                        "author": item["author"],
                        "price": item["price"],
                        "old_price": item["old_price"],
                        "imgURL": item["imgURL"],
                    }
                )
                file.seek(0)
                json.dump(data, file, ensure_ascii=False)

            yield item
