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
                if line.rstrip():
                    links.append(line.strip())
        except:
            pass
    return links


script = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(5))
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
    open("books.json", "w").close()
    open("books.csv", "w").close()

    def start_requests(self):
        self.logger.info("Start crawling ............")

        # We can read link from a text  files
        text_file = os.getcwd() + "/crawler/spiders/links.txt"
        urls = get_links_from_text_file(text_file)
        headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}

        for url in urls:
            self.logger.info("Crawling url............ %s" % url)
            yield SplashRequest(url, self.parse, endpoint="execute", args={"lua_source": script}, headers=headers)

    def parse(self, response):
        books = response.xpath('//ul[@id="products_grid"]/li')

        if len(books) < 1:
            self.logger.info("--------------------html empty")

        genre = response.xpath('//link[@rel="canonical"]/@href').get()
        if genre:
            genre = genre.split("/")[4].replace(".html", "")

        for book in books:

            item = BookItem()

            item["genre"] = genre
            item["title"] = book.xpath('//h2[has-class("p-name-list")]/a/@title').get().strip()
            item["author"] = ""
            item["imgURL"] = book.xpath('//span[@class="product-image"]/img/@data-src').get()

            current_price = book.xpath('//span[@class="regular-price"]/span[@class="price"]/text()').get()
            if not current_price:
                current_price = book.xpath('//p[@class="special-price"]/span[@class="price"]/text()').get()
                old_price = book.xpath('//p[has-class("old-price")]/span[@class="price"]/text()').get()

            if current_price:
                item["price"] = current_price.strip().split("\xa0")[0]
            else:
                item["price"] = 0

            if old_price:
                item["old_price"] = old_price.strip().split("\xa0")[0]
            else:
                item["old_price"] = 0

            if current_price:
                item["price"] = current_price.strip().split("\xa0")[0]
            else:
                item["price"] = 0

            if old_price:
                item["old_price"] = old_price.strip().split("\xa0")[0]
            else:
                item["old_price"] = 0

            filename = f"books.json"
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
