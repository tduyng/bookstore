# -*- coding: utf-8 -*-
import scrapy
from scrapy import Spider


class VietnamnetSpider(Spider):
    name = "vietnamnet"

    def start_requests(self):
        urlRelative = "https://vietnamnet.vn/vn/oto-xe-may/kham-pha/showroom-ty-do-o-campuchia-khien-nha-giau-viet-nam-phat-them-"
        count = 0
        for page in range(501000, 513001):
            count = count + 1
            url = urlRelative + str(page) + ".html"
            print(url)
            print("page - ", count)
            yield scrapy.Request(url, self.parse)

    def parse(self, response):
        title = response.xpath("//title/text()").get()
        content = "".join(response.xpath("//div[@class='ArticleContent']/p/text()").getall())
        record = {"title": title, "content": content}
        yield record
