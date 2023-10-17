import { Link, useNavigate } from 'react-router-dom';

import './Page404.css';

function Page404(props) {
  const navigate = useNavigate();
  function handleLinkClick() {
    navigate(-1);
  }
  return (
    <section className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__message'>Страница не найдена</p>
      <button className='page404__link' onClick={handleLinkClick}>Назад</button>
    </section>
  );
}

export default Page404;