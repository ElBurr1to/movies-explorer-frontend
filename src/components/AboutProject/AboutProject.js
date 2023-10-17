import Container from '../Container/Container';
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className='about-project'>
        <Container>
          <h2 className='about-project__title'>О проекте</h2>
          <div className='about-project__description'>
            <div className='about-project__description-block'>
              <h3 className='about-project__description-header'>Дипломный проект включал 5 этапов</h3>
              <p className='about-project__description-paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='about-project__description-block'>
              <h3 className='about-project__description-header'>На выполнение диплома ушло 5 недель</h3>
              <p className='about-project__description-paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className='about-project__bar'>
            <div className='about-project__bar-block about-project__bar-block_grow1'>
              <p className='about-project__bar-time about-project__bar-time_green'>1 неделя</p>
              <p className='about-project__bar-description'>Back-end</p>
            </div>
            <div className='about-project__bar-block about-project__bar-block_grow4'>
              <p className='about-project__bar-time'>4 недели</p>
              <p className='about-project__bar-description'>Front-end</p>
            </div>
          </div>
        </Container>
    </section>
  );
}

export default AboutProject;