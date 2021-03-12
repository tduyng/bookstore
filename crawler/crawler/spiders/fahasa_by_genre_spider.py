# -*- coding: utf-8 -*-
import os
import scrapy
from crawler.items import BookItem
import json
from scrapy_splash import SplashRequest

# from crawler.spiders.books_online_spider import get_links_from_text_file

# Wait get cookies
script = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(10))
    return {
        cookies = splash:get_cookies(),
        html = splash:html(),
        url = splash:url()
    }
end
"""

# Run crawl
script2 = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(0.5))
    return {
        cookies = splash:get_cookies(),
        html = splash:html(),
        url = splash:url()
    }
end
"""

# Run next page
script3 = """
function main(splash)
    splash:init_cookies(splash.args.cookies)
    local url = splash.args.url
    assert(splash:go(url))
    assert(splash:wait(5))
    assert(splash:runjs("catalog_ajax.Page_change('next')"))
    return {
        cookies = splash:get_cookies(),
        html = splash:html(),
        url = splash:url()
    }
end
"""


class FahasaByGenreSpider(scrapy.Spider):
    name = "fahasa_by_genre"
    allowed_domains = ["fahasa.com"]
    # text_file = os.getcwd() + "/crawler/spiders/bygenre.txt"
    # start_urls = get_links_from_text_file(text_file)
    start_urls = [
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-12.html",
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-11.html",
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-10.html",
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-9.html",
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-8.html",
        "https://www.fahasa.com/sach-trong-nuoc/giao-khoa-tham-khao/sach-giao-khoa/giao-khoa-lop-7.html",
    ]

    next_url = ""
    item_genre = "text-book"
    headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}
    folder = f"data/{item_genre}"
    file_name = f"data/{item_genre}/{item_genre}.json"
    file_name_csv = f"data/{item_genre}/{item_genre}.csv"

    if not os.path.exists(folder):
        os.mkdir(folder)

    # Delete old contents of json files or make sure they exist
    open(file_name, "w+").close()
    open(file_name_csv, "w+").close()

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url, self.parse, endpoint="execute", args={"lua_source": script}, headers=self.headers)

    def parse(self, response):
        # Get URL in page and yield Request
        url_selector = response.xpath('//div[@class="ma-box-content"]/div/div/a/@href').getall()

        # Page details for each book
        for url in url_selector:
            yield SplashRequest(
                url, callback=self.parse_item, endpoint="execute", args={"lua_source": script2}, headers=self.headers
            )

        # Get the next page and yield Request
        next_url = response.url
        self.logger.info("---------- next url: %s" % next_url)
        yield SplashRequest(
            url=response.url,
            callback=self.parse,
            headers=self.headers,
            meta={"splash": {"endpoint": "execute", "args": {"lua_source": script3}}},
        )

    def parse_item(self, response):
        item = BookItem()
        book_detail = response.xpath('//div[@class="product-essential-detail"]')

        item["genre"] = self.item_genre
        title = book_detail.xpath("./h1/text()").getall()
        if len(title) > 1:
            item["title"] = title[1].strip()
        else:
            item["title"] = title[0].strip()

        item["author"] = book_detail.xpath('//div[@class="product-view-sa-author"]/span/text()').getall()[1]
        item["imgURL"] = response.xpath('//div[@class="product-view-image-product"]//img[@id="image"]/@src').get()

        current_price = book_detail.xpath('//span[@class="regular-price"]/span[@class="price"]/text()').get()
        old_price = "0.00\xa0d"
        if not current_price:
            current_price = book_detail.xpath('//p[@class="special-price"]/span[@class="price"]/text()').get()
            old_price = book_detail.xpath('//p[has-class("old-price")]/span[@class="price"]/text()').get()

        if current_price:
            item["price"] = current_price.strip().split("\xa0")[0]
        else:
            item["price"] = 0

        if old_price:
            item["old_price"] = old_price.strip().split("\xa0")[0]
        else:
            item["old_price"] = 0

        with open(self.file_name, "r+", encoding="utf-8") as file:
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
        pass