import './SearchInfo.css';
import Container from '../Container/Container';
import { useLocation } from "react-router-dom";

function SearchInfo(props) {
  const { pathname } = useLocation();


  return (
    <div className='search-info'>
      <Container>
        {props.error
          ? <p className='search-info__message_error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
          : pathname === '/movies'
            ? JSON.parse(localStorage.getItem('search')) === null
              ? <p className='search-info__message'>Начните поиск прямо сейчас</p>
              : props.movies.length === 0
                ? <p className='search-info__message'>По вашему запросу ничего не найдено</p>
                : <></>
            : JSON.parse(localStorage.getItem('savedMovies')) && !JSON.parse(localStorage.getItem('savedMovies')).length
              ? <p className='search-info__message'>У вас нет сохраненных фильмов</p>
              : props.movies.length === 0
                ? <p className='search-info__message'>По вашему запросу ничего не найдено</p>
                : <></>
          }
      </Container>
    </div>
  );
}

export default SearchInfo;