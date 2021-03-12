# Crawl books data from book website with scrapy & splash

## Installation

- Install local packages
  ```bash
  $ pip3 install -r requirements.txt
  ```
  There are two packages to install: **scrapy** and **scrapy-splash**
  And make sure you have **splash** installed and run on port: **8085**. Check out the guide installation **splash**: [Installation splash linux+docker](https://splash.readthedocs.io/en/stable/install.html#linux-docker)

  Run **scrapy-splash** with docker
  ```bash
  $ docker run -it -p 8050:8050 --rm scrapinghub/splash
  ```

- Bootstrap a scrapy project
  ```bash
  $ scrapy startproject crawler
  ```
- Update `settings.py` for **scrapy-splash**
  ```py
  SPLASH_URL = 'http://127.0.0.1:8050'
  DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'
  HTTPCACHE_STORAGE = 'scrapy_splash.SplashAwareFSCacheStorage'
  COOKIES_ENABLED = True 
  SPLASH_COOKIES_DEBUG = False
  SPIDER_MIDDLEWARES = {
      'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
  }
  DOWNLOADER_MIDDLEWARES = {
      'scrapy_splash.SplashCookiesMiddleware': 723,
      'scrapy_splash.SplashMiddleware': 725,
  'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
  'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': 400,
  }
  ```