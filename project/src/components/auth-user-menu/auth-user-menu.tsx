import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../../store/api-actions';

function AuthUserMenu(): JSX.Element {
  const onLogoutClick = useDispatch();

  const handleClick = () => {
    onLogoutClick(logoutAction());
  };

  return (
    <ul className='header__nav-list'>
      <li className='header__nav-item user'>
        <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
          <div className='header__avatar-wrapper user__avatar-wrapper'>
          </div>
          <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
        </Link>
      </li>
      <li className='header__nav-item'>
        <Link className='header__nav-link' to={AppRoute.Root} onClick={handleClick}>
          <span className='header__signout'>
            Sign out
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default AuthUserMenu;
