import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from 'src/store/reducers';

export const Aside = () => {
  const { sideBar } = useSelector((state: AppState) => state.ui);
  const toggleList = (e: any) => {
    const target = e.currentTarget.childNodes[2];
    const icon = e.currentTarget.childNodes[1];
    const subMenu: any[] = [].slice.call(document.querySelectorAll('.sub-menu'));
    subMenu.map(menu => {
      if (target !== menu) {
        return menu.classList.remove('active');
      }
      return null;
    });
    target.classList.toggle('active');
    icon.classList.toggle('active');
  };

  return (
    <aside className={`side-nav${sideBar ? ' active' : ''}`}>
      <ul className="side-nav__list">
        <li className="side-nav__form">
          <form>
            <input className="side-nav__form--input" placeholder="Search For Product" />
            <button className="side-nav__form--search" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </li>
        <Link to="/" className="side-nav__list--link">
          <li className="side-nav__list--item home">
            <div>
              <i className="fas fa-home"></i>Home
            </div>
          </li>
        </Link>
        <li className="side-nav__list--item business-item" onClick={e => toggleList(e)}>
          <div>
            <i className="fas fa-business-time"></i>Business
          </div>
          <div>
            <i className="fas fa-angle-right"></i>
          </div>
          <div className="sub-menu menu-business">
            <ul>
              <li>
                <Link to="/books/genre/business" className="sub-menu__link">
                  Business Experience
                </Link>
              </li>
              <li>
                <Link to="/books/genre/management" className="sub-menu__link">
                  Management
                </Link>
              </li>
              <li>
                <Link to="/books/genre/marketing" className="sub-menu__link">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/books/genre/business-analysis" className="sub-menu__link">
                  Business Analysis
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="side-nav__list--item education-item" onClick={toggleList}>
          <div>
            <i className="fas fa-user-graduate"></i>Education
          </div>
          <div>
            <i className="fas fa-angle-right"></i>
          </div>
          <div className="sub-menu menu-education">
            <ul>
              <li>
                <Link to="#" className="sub-menu__link">
                  Textbook
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Reference Books
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  English
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Japanese
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Chinese
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Korean
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="side-nav__list--item literary-item" onClick={toggleList}>
          <div>
            <i className="fas fa-book"></i>Literary
          </div>
          <div>
            <i className="fas fa-angle-right"></i>
          </div>
          <div className="sub-menu menu-literary">
            <ul>
              <li>
                <Link to="/books/genre/novel" className="sub-menu__link">
                  Novel
                </Link>
              </li>
              <li>
                <Link to="/books/genre/short-story" className="sub-menu__link">
                  Short Story, Dissipation
                </Link>
              </li>
              <li>
                <Link to="/books/genre/light-novel" className="sub-menu__link">
                  Light Novel
                </Link>
              </li>
              <li>
                <Link to="/books/genre/romance" className="sub-menu__link">
                  Romance
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="side-nav__list--item young-item" onClick={toggleList}>
          <div>
            <i className="fab fa-avianex"></i>Young
          </div>
          <div>
            <i className="fas fa-angle-right"></i>
          </div>
          <div className="sub-menu menu-young">
            <ul>
              <li>
                <Link to="/books/genre/comic" className="sub-menu__link">
                  Manga - Comic
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Life Skills
                </Link>
              </li>
              <li>
                <Link to="books/genre/mentality" className="sub-menu__link">
                  Mentality
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Personality
                </Link>
              </li>
              <li>
                <Link to="#" className="sub-menu__link">
                  Books for Teenagers
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  );
};
