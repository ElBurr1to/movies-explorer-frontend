import { SHORT_FILM_DURATION } from './constants';

class MovieApi {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  filterMovies(movies, filter) {
    return movies.filter(movie => {

      const isValid = (movie.nameEN.toLowerCase().includes(filter.film.toLowerCase()) ||
                      movie.nameRU.toLowerCase().includes(filter.film.toLowerCase())) &&
                      (filter.isShortFilms ? movie.duration < 40 : true);
      return isValid;
    })
  }
}

const movieApi = new MovieApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default movieApi;