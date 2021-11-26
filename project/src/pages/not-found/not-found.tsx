import RandomLocation from '../../components/random-location/random-location';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
  return (
    <div className='page page--gray page--login' data-testid='not-found-page'>
      <Header />

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
