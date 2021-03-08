import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Book } from '../book.schema';
import { BookService } from '../book.service';
import { PaginationDto } from '../dto';

const oneBook = {
	_id: 'some-id',
	title: 'some-title',
	author: 'some-author-id',
	genre: 'some-genre',
} as Book;
const manyBooksWithPagination = [oneBook];
const manyBooks = [oneBook, oneBook];
describe('BookService', () => {
	let bookService: BookService;
	let bookModel: any;

	const mockBookModel = () => ({
		findOne: jest.fn(),
		findById: jest.fn(),
		countDocuments: jest.fn(),
		find: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BookService,
				{ provide: getModelToken(Book.name), useFactory: mockBookModel },
			],
		}).compile();
		bookService = module.get<BookService>(BookService);
		bookModel = module.get<Model<Book>>(getModelToken(Book.name));
	});

	it('Should be defined', () => {
		expect(bookService).toBeDefined();
	});

	describe('findOne', () => {
		it('Should return an user', async () => {
			bookModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneBook),
			}));
			const result = await bookService.findOne({ author: 'some-author-id' });
			expect(result).toEqual(oneBook);
		});
	});
	describe('findById', () => {
		it('Should return an user', async () => {
			bookModel.findById.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneBook),
			}));
			const result = await bookService.findById('some-id');
			expect(result).toEqual(oneBook);
		});
	});

	describe('findManyByGenre', () => {
		it('Should return array books without pagination', async () => {
			bookModel.countDocuments.mockReturnValue(2);
			bookModel.find.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(manyBooks),
			}));
			const result = await bookService.findManyByGenre('some-genre');
			expect(result).toEqual({ count: 2, books: manyBooks });
		});

		it('Should return array books with pagination', async () => {
			bookModel.countDocuments.mockReturnValue(1);
			bookModel.find.mockImplementationOnce(() => ({
				skip: jest.fn().mockImplementationOnce(() => ({
					limit: jest.fn().mockImplementationOnce(() => ({
						lean: jest.fn().mockReturnValueOnce(manyBooksWithPagination),
					})),
				})),
			}));
			const pagination: PaginationDto = { limit: 2, page: 1 };
			const result = await bookService.findManyByGenre('some-genre', pagination);
			expect(result).toEqual({ count: 1, books: manyBooksWithPagination });
		});
	});

	describe('searchBooks', () => {
		it('Should return an array of books', async () => {
			bookModel.find.mockImplementationOnce(() => ({
				limit: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(manyBooks) })),
			}));
			const result = await bookService.searchBooks('some-text');
			expect(result).toEqual(manyBooks);
		});
	});

	describe('queryBooks', () => {
		it('Should return array books without pagination', async () => {
			bookModel.countDocuments.mockReturnValue(2);
			bookModel.find.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(manyBooks),
			}));
			const result = await bookService.queryBooks('some-text');
			expect(result).toEqual({ count: 2, books: manyBooks });
		});

		it('Should return array books with pagination', async () => {
			bookModel.countDocuments.mockReturnValue(1);
			bookModel.find.mockImplementationOnce(() => ({
				skip: jest.fn().mockImplementationOnce(() => ({
					limit: jest.fn().mockImplementationOnce(() => ({
						lean: jest.fn().mockReturnValueOnce(manyBooksWithPagination),
					})),
				})),
			}));
			const pagination: PaginationDto = { limit: 2, page: 1 };
			const result = await bookService.queryBooks('some-text', pagination);
			expect(result).toEqual({ count: 1, books: manyBooksWithPagination });
		});
	});
});
