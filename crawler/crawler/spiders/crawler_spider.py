import scrapy
from scrapy import Spider
from scrapy.selector import Selector
from crawler.items import CrawlerItem


class CrawlerSpider(Spider):
    name = "crawler_books"
    allowed_domains = ["www.fahasa.com"]

    def start_requests(self):
        print("Start crawling")
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
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = Selector(response).xpath('//ul[@id="products_grid"]')
        genre = response.url.split("/")[4].split(".")[0]

        for book in books:
            self.logger.info("Parse item %s", book)

            item = CrawlerItem()

            item["genre"] = genre
            item["title"] = book.xpath('h2[has-class("p-name-list")]/a/@title').extract_first()

            item["author"] = ""
            item["price"] = book.xpath('p[@class="special-price"]/span/text()').extract_first().split(" ")[0]
            item["old_price"] = (
                book.xpath('p[@class="old-price"]/span[@class="price"]/text()').extract_first().split(" ")[0]
            )
            item["imageURL"] = book.xpath('span[@class="product-image"]/img/@src').extract_first()

            self.logger.info("Item crawled %s", item)

            filename = f"data/data.json"
            with open(filename, "r+") as file:
                data = json.load(file)
                data.update(item)
                file.seek(0)
                json.dump(data, file)
            self.log(f"Saved file {filename}")

            yield item
