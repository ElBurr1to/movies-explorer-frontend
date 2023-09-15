import './Logo.css';
import logo from '../../images/logo.png';

function Logo() {
  return (
    <img src={logo} alt='Логотип' className='logo'></img>
  );
}

export default Logo;