import {useSelector} from 'react-redux';
import Logo from '../logo/logo';
import AuthUserMenu from '../auth-user-menu/auth-user-menu';
import NoAuthUserMenu from '../no-auth-user-menu/no-auth-user-menu';
import {AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            {
              authorizationStatus === AuthorizationStatus.Auth
                ? <AuthUserMenu />
                : <NoAuthUserMenu />
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
