import scrapy
from crawler.items import WebsosanhItem
from scrapy_splash import SplashRequest


class WebsosanhSpider(scrapy.Spider):
    name = "websosanh"
    allowed_domains = ["websosanh.vn"]
    start_urls = ["https://websosanh.vn/dan-organ/cat-2022.htm"]

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url, endpoint="render.html", callback=self.parse)

    script = """
        function main(splash)
            local url = splash.args.url
            assert(splash:go(url))
            assert(splash:wait(0.5))
            assert(splash:runjs("$('.next')[0].click();"))
            return {
                html = splash:html(),
                url = splash:url(),
            }
        end
        """

    def parse(self, response):
        item = WebsosanhItem()
        list_organs = response.xpath("//ul[@class='product-wrap']/li")
        for data in list_organs:
            item["name"] = data.xpath("./a/h3/text()").get()
            item["price"] = data.xpath("//span[@class='product-price']/text()").get()
            item["image"] = data.xpath("//span[@class='product-img']/img/@data-src").get()
            yield item

        yield SplashRequest(
            url=response.url,
            callback=self.parse,
            meta={"splash": {"endpoint": "execute", "args": {"lua_source": self.script}}},
        )