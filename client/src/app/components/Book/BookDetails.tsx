import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Slider from 'react-slick';
import { fetchBookById, fetchBooks } from 'src/app/features/book/book.actions';
import { IBook } from 'src/app/features/book/book.types';
import { addToCart } from 'src/app/features/user/user.actions';
import { NotFoundPage } from 'src/app/pages/NotFoundPage/Loadable';
import { useAppDispatch } from 'src/store';
import { AppState } from 'src/store/reducers';
import SkeletonBook from '../skeleton/SkeletonBook';
import { Book } from './Book';
import noImage from '/no-image.png';
interface ArrowProps {
  onClick?: () => void;
}
const NextArrow: React.FC<ArrowProps> = props => {
  const { onClick } = props;
  return (
    <div className={'icon-related next'} onClick={onClick}>
      <i className="fas fa-arrow-circle-right"></i>
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = props => {
  const { onClick } = props;
  return (
    <div className={'icon-related prev'} onClick={onClick}>
      <i className="fas fa-arrow-circle-left"></i>
    </div>
  );
};

export const BookDetail = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { book, status, message, books } = useSelector((state: AppState) => state.book);
  const [amount, setAmount] = useState(1);
  const [btnText, setBtnText] = useState('Add to Cart');
  const [foundBook, setFoundBook] = useState(false);
  const history = useHistory();

  const handleAddToCart = (id: string, amount: number) => {
    setBtnText('Adding...');
    dispatch(addToCart({ _id: id, total: amount })).then(result => {
      setBtnText('Add to cart');
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Added product to cart');
      } else {
        toast.error(`Can't add product to cart, please try later`);
      }
    });
  };
  const add = () => {
    setAmount(amount + 1);
  };
  const minus = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchBookById(id)).then(result => {
      if (result.meta.requestStatus === 'fulfilled') {
        setFoundBook(true);
        const bookFound = result.payload as IBook;
        const genre = (bookFound ? bookFound.genre : '') as string;
        const limit = 25;
        const p = 1;
        dispatch(fetchBooks({ genre, limit, page: p }));
      } else {
        setFoundBook(false);
      }
    });
  }, [id, dispatch, foundBook, setFoundBook]);

  if (!foundBook) {
    return (
      <div className="book-detail__wrapper">
        <div className="book-detail">
          <div className="not-found">
            <h1>Sorry</h1>
            <p>That page can't be found</p>
            <a className="not-found__link" onClick={() => history.goBack()}>
              Go back
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail__wrapper">
      <div className="book-detail">
        {(status === 'idle' || status === 'loading') && <SkeletonBook />}
        {status === 'success' && (
          <>
            <div className="book-detail__media">
              <img
                src={book?.imgURL || noImage}
                alt="Book"
                className="book-detail__media--img"
              />
            </div>
            <div className="book-detail__content">
              <h1 className="book-detail__content--title">{book?.title}</h1>

              <p className="book-detail__content--author">
                Author: <span>{book?.author}</span>
              </p>

              <div className="book-detail__content--price">
                <p className="book-detail__content--price__special">
                  {(book?.price ? book.price * 1000 : 0).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
                {book?.old_price && (
                  <p className="book-detail__content--price__old">
                    {(book?.old_price * 1000).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                )}
              </div>

              <div className="book-detail__content--amount">
                <p>Amount:</p>
                <div className="book-detail__content--amount__btn">
                  <i className="fas fa-minus" onClick={minus}></i>
                  <span>{amount}</span>
                  <i className="fas fa-plus" onClick={add}></i>
                </div>
              </div>

              <button
                className="book-detail__content--add"
                onClick={() => handleAddToCart(id, amount)}
              >
                {btnText}
              </button>
            </div>
          </>
        )}
        {status === 'failed' && <h1 className="book-detail__error">{message}</h1>}
      </div>

      {status === 'success' && (
        <div className="related">
          <p className="related__title">Related</p>
          <div className="related__slider--wrapper">
            <Slider {...settings} className="related__slider">
              {books.length
                ? books.map(item => (
                    <Book
                      imgURL={item.imgURL}
                      title={item.title}
                      price={item.price}
                      old_price={item.old_price}
                      key={item._id}
                      _id={item._id}
                      hideButton={true}
                    />
                  ))
                : null}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};
