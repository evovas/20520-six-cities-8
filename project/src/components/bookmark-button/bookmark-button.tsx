import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FetchStatus} from '../../const';
import {postFavoriteOption} from '../../store/api-actions';
import {ServerFavoriteStatus} from '../../types/data';
import {getFavoriteOptionOffer, getFavoriteOptionStatus} from '../../store/favorites/selectors';
import {useEffect, useState} from 'react';
import {resetFavoriteOption} from '../../store/action';

const FAVORITE_STATUS_FALSE: ServerFavoriteStatus = 0;
const FAVORITE_STATUS_TRUE: ServerFavoriteStatus = 1;

type BookmarkButtonProps = {
  buttonType: string;
  isFavoriteInitial: boolean;
  id: number;
}

type ButtonProperties = {
  [buttonType: string]: {
    width: string;
    height: string;
  }
}

const ButtonProperty: ButtonProperties = {
  'place-card': {
    width: '18',
    height: '19',
  },
  property: {
    width: '31',
    height: '33',
  },
};

function BookmarkButton ({buttonType, isFavoriteInitial, id}: BookmarkButtonProps): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const favoriteOptionStatus = useSelector(getFavoriteOptionStatus);
  const favoriteOptionOffer = useSelector(getFavoriteOptionOffer);

  const [isFavorite, setFavorite] = useState(isFavoriteInitial);

  const history = useHistory();

  useEffect(() => {
    if (favoriteOptionStatus === FetchStatus.Success && favoriteOptionOffer?.id === id) {
      setFavorite((prevState) => !prevState);
      dispatch(resetFavoriteOption());
    }
  }, [favoriteOptionStatus, favoriteOptionOffer]);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postFavoriteOption(id, isFavorite ? FAVORITE_STATUS_FALSE : FAVORITE_STATUS_TRUE));
    } else {
      history.push(AppRoute.Login);
    }
  };

  return (
    <button className={cn(`${buttonType}__bookmark-button`, 'button', {[`${buttonType}__bookmark-button--active`]: isFavorite})} onClick={handleClick} type='button'>
      <svg className='place-card__bookmark-icon' width={ButtonProperty[buttonType].width} height={ButtonProperty[buttonType].height}>
        <use xlinkHref='#icon-bookmark'/>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
