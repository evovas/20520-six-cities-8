import Logo from '../../components/logo/logo';
import LoginForm from '../../components/login-form/login-form';
import RandomLocation from '../../components/random-location/random-location';

function Login(): JSX.Element {
  return (
    <div className='page page--gray page--login'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <LoginForm />
          <RandomLocation />
        </div>
      </main>
    </div>
  );
}

export default Login;
