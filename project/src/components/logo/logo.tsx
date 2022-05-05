import {Link} from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Link className='header__logo-link header__logo-link--active' to='/' data-testid='logo'>
      <img className='header__logo' src='/20520-six-cities-8/img/logo.svg' alt='6 cities logo' width='81' height='41'/>
    </Link>
  );
}

export default Logo;
