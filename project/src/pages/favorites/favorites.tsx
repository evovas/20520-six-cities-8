import {Link} from 'react-router-dom';
import cn from 'classnames';
import Header from '../../components/header/header';
import FavoritesList from '../../components/favorites-list/favorites-list';
import LoadError from '../load-error/load-error';
import Loader from '../../components/loader/loader';
import {useDispatch, useSelector} from 'react-redux';
import {getFavoriteOffersStatus, getFavoriteOffers} from '../../store/favorites/selectors';
import {useEffect} from 'react';
import {fetchFavoriteOffersAction} from '../../store/api-actions';
import {dropFavoriteOffers} from '../../store/action';
import {FetchStatus} from '../../const';

function Favorites(): JSX.Element {
  const dispatch = useDispatch();
  const favoriteOffersStatus = useSelector(getFavoriteOffersStatus);
  const favoritesOffers = useSelector(getFavoriteOffers);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
    return () => {
      dispatch(dropFavoriteOffers());
    };
  }, []);

  if (favoriteOffersStatus === FetchStatus.Failed) {
    return <LoadError />;
  }

  return (
    <div className={cn('page', {'page--favorites-empty': favoritesOffers.length === 0})}>
      <Header />
      <main className={cn('page__main', 'page__main--favorites', {'page__main--favorites-empty': favoritesOffers.length === 0})}>
        <div className='page__favorites-container container'>
          {
            (favoriteOffersStatus === FetchStatus.Idle || favoriteOffersStatus === FetchStatus.Loading)
              ? <Loader size={15} isFavoritesScreen />
              : <FavoritesList />
          }
        </div>
      </main>
      <footer className='footer container'>
        <Link className='footer__logo-link' to={'/'}>
          <img className='footer__logo' src={'/20520-six-cities-8/img/logo.svg'} alt='6 cities logo' width='64' height='33'/>
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
