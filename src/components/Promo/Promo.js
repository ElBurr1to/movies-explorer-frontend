import Container from '../Container/Container';
import './Promo.css';

function Promo(props) {
  return (
    <section className='promo'>
      <Container>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='promo__background-img'></div>
      </Container>
    </section>
  );
}

export default Promo;