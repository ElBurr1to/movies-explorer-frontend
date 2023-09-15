import { Link } from 'react-router-dom';

import './Page404.css';

function Page404(props) {
  return (
    <section className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__message'>Страница не найдена</p>
      <Link className='page404__link' to='/'>Назад</Link>
    </section>
  );
}

export default Page404;