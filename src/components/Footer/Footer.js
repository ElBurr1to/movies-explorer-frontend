import Container from '../Container/Container';
import './Footer.css';

function Footer(props) {
  return (
    <footer className='footer'>
      <Container>
        <p className='footer__paragraph'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__info'>
          <p className='footer__year'>© 2023</p>
          <nav className='footer__links'>
            <ul className='footer__links-list'>
              <li className='footer__links-item'><a href='https://practicum.yandex.ru' target='_blank' rel='noreferrer' className='footer__link'>Яндекс.Практикум</a></li>
              <li className='footer__links-item'><a href='https://github.com/ElBurr1to/' target='_blank' rel='noreferrer' className='footer__link'>Github</a></li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;