import scrapy
from scrapy import Spider
from scrapy.selector import Selector
from crawler.items import BookItem
import json


class BooksSpider(Spider):
    name = "books"
    allowed_domains = ["fahasa.com"]

    def start_requests(self):
        self.logger.info("Start crawling ............")
        urls = [
            "https://www.fahasa.com/foreigncategory/fiction/fantasy.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/fiction/science-fiction.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/health/advice-on-parenting.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/mind-body-spirit/mind-body-spirit-thought-practice.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/personal-development/advice-on-careers-achieving-success.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/business-finance-law/business-management.html?order=num_orders&limit=24&p=1",
            "https://www.fahasa.com/foreigncategory/travel-holiday-guides/guidebooks.html?order=num_orders&limit=48&p=1",
            "https://www.fahasa.com/foreigncategory/computing.html?order=num_orders&limit=48&p=1",
        ]
        headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, headers=headers)

    def parse(self, response):
        # books = Selector(response).xpath('//ul[@id="products_grid"]/li')
        books = Selector(response).xpath('//div[@class="mb-category-products"]/div')

        genre = response.url.split("/")[4].split(".")[0]

        self.logger.info("--------------------html: %s", books)

        for book in books:

            item = BookItem()

            item["genre"] = genre
            item["title"] = book.xpath('h2[has-class("p-name-list")]/a/@title').extract_first()

            item["author"] = ""
            item["price"] = book.xpath('p[@class="special-price"]/span/text()').extract_first().split(" ")[0]
            item["old_price"] = (
                book.xpath('p[@class="old-price"]/span[@class="price"]/text()').extract_first().split(" ")[0]
            )
            item["imageURL"] = book.xpath('span[@class="product-image"]/img/@src').extract_first()

            self.logger.info("Item crawled %s", item)

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
                        "imageURL": item["imageURL"],
                    }
                )
                file.seek(0)
                json.dump(data, file, ensure_ascii=False)

            yield item
