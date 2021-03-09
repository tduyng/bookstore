import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AppState } from 'src/store/reducers';
import { debounce } from 'src/utils/debounce';
import { Auth } from '../Auth';

interface HeaderProps {
  toggle: () => void;
  isOpen: boolean;
}
export const Header: React.FC<HeaderProps> = ({ toggle, isOpen }) => {
  const [search, setSearch] = useState('');
  const { searchedBooks } = useSelector((state: AppState) => state.book);
  const [activeAccount, setActiveAccount] = useState(false);
  const dispatch = useDispatch();
  const onOpenModal = () => {
    toggle();
    setActiveAccount(false);
  };
  const onCloseModal = () => {
    toggle();
  };
  const clearInput = () => {
    setSearch('');
  };

  const [{ username, thumbnail, cart }] = useState({
    username: '',
    thumbnail: '',
    cart: [],
  });

  const history = useHistory();

  const debouncedSearch = useRef(
    debounce(
      q =>
        dispatch(() => {
          console.log(q);
        }),
      600,
    ),
  ).current;
  const handleChange = (e: any) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search) {
      history.push(`/books/search?q=${search}`);
      clearInput();
    }
  };

  const isLoggedIn = true;

  // When click outside, close the account dropdown
  const handleClickAccount = () => {
    setActiveAccount(!activeAccount);
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutSideAccount = (e: any) => {
    if (
      ref.current &&
      ref.current.classList.contains('active') &&
      !ref.current.contains(e.target)
    ) {
      setActiveAccount(false);
      console.log('dispatch');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutSideAccount);
    // dispatch(fetchUser());
    return () => {
      document.removeEventListener('click', handleClickOutSideAccount);
    };
  }, [dispatch]);

  return (
    <header id="header">
      <div className="header__wrapper">
        <div className="header__hamburger" onClick={toggle}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="header__user--img-left">
          {thumbnail ? <img src={`${thumbnail}`} alt="avatar" /> : null}
        </div>
        <div className="header__categories" onClick={toggle}>
          <div className="header__categories--hamburger">
            <div className="line line-1"></div>
            <div className="line line-1"></div>
            <div className="line line-1"></div>
          </div>
          <div className="header__categories--content">All Categories</div>
        </div>

        <div className="header__form">
          <form onSubmit={handleSubmit}>
            <input
              className="header__form--input"
              placeholder="Search For Product, Author"
              onChange={handleChange}
              value={search}
            />
            <button className="header__form--search" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          {searchedBooks.length
            ? search.length > 1 && (
                <ul className="header__form--queried">
                  {searchedBooks.map(item => (
                    <Link
                      className="header__form--queried__link"
                      to={`/book/${item._id}`}
                      key={item._id}
                      onClick={clearInput}
                    >
                      <li>
                        <img src={item.imgURL} alt="Book" />
                        <div>
                          <p>{item.title}</p>
                          <p>{item.author}</p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )
            : null}
        </div>
        <div className="header__logo">
          <Link to="/">
            <h1 className="header__logo--content">Bookie</h1>
          </Link>
        </div>
        <div className="header__user">
          <Link to="/checkout" className="header__user--cart">
            <div className="header__user--cart__icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            {cart && cart.length ? (
              <div className="header__user--cart__quantity">{cart.length}</div>
            ) : null}
          </Link>
          {thumbnail ? (
            <div className="header__user--img-right">
              <img src={`${thumbnail}`} alt="avatar" />
            </div>
          ) : null}

          <div
            className={`header__user--account${activeAccount ? ' active' : ''}`}
            onClick={handleClickAccount}
            ref={ref}
          >
            <div className="header__user--account__icon">
              {isLoggedIn ? (
                <i className="fas fa-user"></i>
              ) : (
                <i className="fas fa-sign-in-alt"></i>
              )}
            </div>
            <div className="header__user--account__dropdown-icon">
              <i className="fas fa-caret-down"></i>
            </div>
            <ul className={'header__user--account__dropdown'}>
              {username ? (
                <>
                  <Link
                    onClick={handleClickAccount}
                    className="header__user--account__dropdown__account"
                    to="/account"
                  >
                    <li>My Account ({username})</li>
                  </Link>
                  <li>
                    <a href="/auth/logout">Logout</a>
                  </li>
                </>
              ) : (
                <li onClick={onOpenModal}>Login / Signup</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Auth open={isOpen} onClose={onCloseModal} />
    </header>
  );
};
