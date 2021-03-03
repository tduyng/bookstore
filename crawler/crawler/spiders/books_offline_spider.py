import scrapy
from scrapy import Spider
from crawler.items import BookItem
import json
import glob, os


class BooksOfflineSpider(Spider):
    name = "books_offline"

    def start_requests(self):
        self.logger.info("Start crawling ............")
        absoluteDir = os.getcwd()

        # Change current dir to html/
        os.chdir("./crawler/html")
        urls = []
        for file in glob.glob("*.html"):
            urls.append("file://" + absoluteDir + "/crawler/html/" + file)
        # Delete old contents of json files
        open("data.json", "w").close()
        open("data.csv", "w").close()

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):

        books = response.xpath('//ul[@id="products_grid"]/li')
        genre = response.xpath('//link[@rel="canonical"]/@href').get()

        if genre:
            genre.split("/")[-1].replace(".html", "")

        if len(books) < 1:
            self.logger.info("--------------------html empty ")

        for book in books:

            item = BookItem()

            item["genre"] = genre
            item["title"] = book.xpath('//h2[has-class("p-name-list")]/a/@title').get()

            item["author"] = ""
            current_price = book.xpath('//p[@class="special-price"]/span/text()').extract_first()
            old_price = book.xpath('//p[has-class("old-price")]/span[@class="price"]/text()').extract_first()
            item["imgURL"] = book.xpath('//span[@class="product-image"]/img/@data-src').get()

            if current_price:
                item["price"] = current_price.split("\xa0")[0]
            else:
                item["price"] = 0

            if old_price:
                item["old_price"] = old_price.split("\xa0")[0]
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
