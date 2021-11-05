import Logo from '../../components/logo/logo';
import RandomLocation from '../../components/random-location/random-location';

function NotFound(): JSX.Element {
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
          <section className='login'>
            <h1 className='login__title'>404<br/> This page doesn&apos;t exist.</h1>
          </section>
          <RandomLocation />
        </div>
      </main>
    </div>
  );
}

export default NotFound;
