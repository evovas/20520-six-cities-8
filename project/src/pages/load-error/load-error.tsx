function LoadError(): JSX.Element {
  return (
    <div className='page page--gray page--login'>
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
