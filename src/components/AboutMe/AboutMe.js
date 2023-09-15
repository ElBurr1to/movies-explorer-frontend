import Container from '../Container/Container';
import './AboutMe.css';
import photo from '../../images/photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe(props) {
  return (
    <section className='about-me'>
      <div>
        <Container>
          <h2 className='about-me__title'>Студент</h2>
          <div className='about-me__description'>
            <div className='about-me__description-block'>
              <p className='about-me__name'>Виталий</p>
              <p className='about-me__role'>Фронтенд-разработчик, 30 лет</p>
              <p className='about-me__bio'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <a href='https://github.com/ElBurr1to' className='about-me__github'>Github</a>
            </div>
            <div className='about-me__description-block'>
              <img className='about-me__photo' src={photo} alt='Фото Виталия'/>
            </div>
          </div>
          <Portfolio></Portfolio>
        </Container>
      </div>
    </section>
  );
}

export default AboutMe;