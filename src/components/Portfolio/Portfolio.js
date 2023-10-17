import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li className='portfolio__project'><a href='https://github.com/ElBurr1to/how-to-learn' target='_blank' rel='noreferrer' className='portfolio__project-link'>Статичный сайт</a></li>
        <li className='portfolio__project'><a href='https://github.com/ElBurr1to/russian-travel' target='_blank' rel='noreferrer' className='portfolio__project-link'>Адаптивный сайт</a></li>
        <li className='portfolio__project'><a href='https://github.com/ElBurr1to/react-mesto-api-full-gha' target='_blank' rel='noreferrer' className='portfolio__project-link'>Одностраничное приложение</a></li>
      </ul>
    </section>
  );
}

export default Portfolio;