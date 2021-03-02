from scrapy import Spider
import scrapy
from scrapy.http import headers
from scrapy.selector import Selector
from crawler.items import PhoneItem
import json


class TgddSpider(Spider):
    name = "phones"
    allowed_domains = ["thegioididong.com"]

    def start_requests(self):
        print("Start crawling")
        urls = [
            "https://www.thegioididong.com/dtdd/samsung-galaxy-a50",
        ]
        headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, headers=headers)

    def parse(self, response):

        questions = Selector(response).xpath('//ul[@class="listcomment"]/li')
        self.logger.info("--------------------html: %s", questions)

        for question in questions:
            item = PhoneItem()

            item["User"] = question.xpath('div[@class="rowuser"]/a/strong/text()').extract_first()
            item["Comment"] = question.xpath('div[@class="question"]/text()').extract_first()
            item["Time"] = question.xpath('div[@class="actionuser"]/a[@class="time"]/text()').extract_first()

            filename = f"data.json"
            with open(filename, "r+", encoding="utf-8") as file:
                try:
                    data = json.load(file)
                except:
                    data = {"phones": []}

                data["phones"].append({"User": item["User"], "Comment": item["Comment"], "Time": item["Time"]})
                file.seek(0)
                json.dump(data, file, ensure_ascii=False)
            self.logger.info(f"Saved file {filename}")
            yield item