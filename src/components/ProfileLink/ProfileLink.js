import { NavLink } from 'react-router-dom';

import './ProfileLink.css';

function ProfileLink(props) {
  return (
    <NavLink to='/profile' className={`profile-link ${props.color ? 'profile-link_' + props.color : ''}
        ${props.type === 'burger' ? 'profile-link_type_burger' : ''}`}>Аккаунт</NavLink>
  );
}

export default ProfileLink;
