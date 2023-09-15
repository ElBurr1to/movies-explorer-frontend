import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  return (
    <>
    <Header />
    <section className='profile'>
      <form name='profile' className='profile__form'>
          <h1 className='profile__title'>Привет, Виталий!</h1>
          <fieldset className='profile__fieldset'>
            <label for='name' className='profile__label'>
              Имя
              <input type='text' id='name' name='name' className='profile__input' aria-label='Имя' defaultValue={'Виталий'}/>
            </label>
            <label for='email' className='profile__label'>
              E-mail
              <input type='email' id='email' name='email' className='profile__input' aria-label='E-mail' defaultValue={'pochta@yandex.ru'} />
            </label>
          </fieldset>
          <button type='submit' className='profile__submit-btn' aria-label='Редактировать'>Редактировать</button>
          <button type='button' className='profile__submit-btn profile__submit-btn_type_exit' aria-label='Выйти'>Выйти из аккаунта</button>
        </form>
    </section>
    </>
  );
}

export default Profile;