import puppeteer from 'puppeteer';
import fs from 'fs';

const bookScrape = async (page, url) => {
	await page.goto(url, { waitUntil: 'networkidle2' });
	const links = await page.$$eval('h2.product-name-no-ellipsis.p-name-list > a', (link) =>
		link.map((a) => a.href),
	);
	return links;
};

const getBook = async (page, link, genre) => {
	const book = {};
	console.log('Load page to get a book');
	await page.goto(link, { waitUntil: 'networkidle2', timeout: 0 });
	book['title'] = await page.$eval('div.product-essential-detail > h1', (h1) =>
		h1.innerText.trim(),
	);
	book['author'] = (await page.$('.product-view-sa-author > span:last-child'))
		? await page.$eval('.product-view-sa-author > span:last-child', (span) =>
				span.innerText.trim(),
		  )
		: '';
	book['price'] = await page.$eval('p.special-price > span.price', (span) =>
		parseFloat(span.innerText.trim().split(' ')[0]),
	);
	book['old_price'] = (await page.$('p.old-price > span.price'))
		? await page.$eval('p.old-price > span.price', (span) =>
				parseFloat(span.innerText.trim().split(' ')[0]),
		  )
		: '';
	book['imgURL'] = await page.$eval(
		'div.product-view-image-product > img',
		(img) => img.src,
	);
	book['genre'] = genre;

	console.log('Retrieve successfully a book with title: ', book['title']);

	return book;
};

export const crawlBooks = async (genre: string) => {
	console.log('Start crawler books.........');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const books = [];
	let links = [];
	for (let p = 1; p <= 3; p++) {
		const link = await bookScrape(
			page,
			`https://www.fahasa.com/foreigncategory/fiction/fantasy.html?order=num_orders&limit=24&p=${p}`,
		);
		links = links.concat(link);
	}

	for (const link in links) {
		const book = await getBook(page, links[link], genre);
		books.push(book);
	}
	console.log(books.length);
	await browser.close();
	return books;
	// await Book.deleteMany({ genre });
	// await Book.insertMany(books);
};

async function main() {
	const genre = 'Fiction';
	const books = await crawlBooks(genre);
	const pathName = 'src/providers/database/data.js';
	const db = JSON.parse(fs.readFileSync(pathName, 'utf8'));
	db.books.push(books);
	const json = JSON.stringify(db);

	fs.writeFileSync(pathName, json);
}

main().catch((err) => console.error(err));
