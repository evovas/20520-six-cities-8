function LoadError(): JSX.Element {
  return (
    <div className='page page--gray page--login' data-testid='load-error-page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link header__logo-link--active' href='/'>
                <img className='header__logo' src='/20520-six-cities-8/img/logo.svg' alt='6 cities logo' width='81' height='41'/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>An unexpected error occurred while loading data.<br/> Please try again later.</h1>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoadError;
