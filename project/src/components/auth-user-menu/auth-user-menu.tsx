import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOffersAction, logoutAction} from '../../store/api-actions';
import {getCurrentUser} from '../../store/user/selectors';
import {AppRoute} from '../../const';

function AuthUserMenu(): JSX.Element {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const handleClick = () => {
    dispatch(logoutAction());
    dispatch(fetchOffersAction());
  };

  return (
    <ul className='header__nav-list'>
      <li className='header__nav-item user'>
        <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
          <div className='header__avatar-wrapper user__avatar-wrapper'/>
          <span className='header__user-name user__name'>{currentUser && currentUser.email}</span>
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
