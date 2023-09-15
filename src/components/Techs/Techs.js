import Container from '../Container/Container';
import './Techs.css';

function Techs(props) {
  return (
    <section className='techs'>
      <div>
        <Container>
          <div className='techs__content'>
            <h2 className='techs__title'>Технологии</h2>
            <p className='techs__paragraph techs__paragraph_large'>7 технологий</p>
            <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__list'>
              <li className='techs__list-item'>HTML</li>
              <li className='techs__list-item'>CSS</li>
              <li className='techs__list-item'>JS</li>
              <li className='techs__list-item'>React</li>
              <li className='techs__list-item'>Git</li>
              <li className='techs__list-item'>Express.js</li>
              <li className='techs__list-item'>mongoDB</li>
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Techs;