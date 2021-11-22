import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {postFavoriteOptionAction} from '../../store/api-actions';

const FAVORITE_STATUS_FALSE = 0;
const FAVORITE_STATUS_TRUE = 1;

type BookmarkButtonProps = {
  buttonType: string;
  isFavorite: boolean;
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

function BookmarkButton ({buttonType, isFavorite, id}: BookmarkButtonProps): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const history = useHistory();

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postFavoriteOptionAction(id, isFavorite ? FAVORITE_STATUS_FALSE : FAVORITE_STATUS_TRUE));
    } else {
      history.push(AppRoute.Login);
    }
  };

  return (
    <button className={cn(`${buttonType}__bookmark-button`, 'button', {'place-card__bookmark-button--active': isFavorite})} onClick={handleClick} type='button'>
      <svg className='place-card__bookmark-icon' width={ButtonProperty[buttonType].width} height={ButtonProperty[buttonType].height}>
        <use xlinkHref='#icon-bookmark'/>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
