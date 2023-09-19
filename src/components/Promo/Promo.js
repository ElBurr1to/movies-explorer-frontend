import Container from '../Container/Container';
import './Promo.css';

function Promo(props) {
  return (
    <section className='promo'>
      <Container>
        <div className='promo__content'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <div className='promo__background-img'></div>
        </div>
      </Container>
    </section>
  );
}

export default Promo;