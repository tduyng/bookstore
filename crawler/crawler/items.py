# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class BookItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    genre = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()
    price = scrapy.Field()
    old_price = scrapy.Field()
    imgURL = scrapy.Field()

    pass


class PhoneItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    User = scrapy.Field()
    Comment = scrapy.Field()
    Time = scrapy.Field()

    pass


class WebsosanhItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    pass