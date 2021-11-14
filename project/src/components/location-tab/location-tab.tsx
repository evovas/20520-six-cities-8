import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {State} from '../../types/state';
import {selectCity} from '../../store/action';

type LocationTabProps = {
  cityName: string;
}

function LocationTab({cityName}: LocationTabProps): JSX.Element {
  const dispatch = useDispatch();
  const currentCityName = useSelector((state: State) => state.currentCityName);

  const onLocationTabClick = () => {
    dispatch(selectCity(cityName));
  };

  return (
    <li className='locations__item'>
      <Link className={cn('locations__item-link', 'tabs__item', {'tabs__item--active':cityName === currentCityName})} onClick={onLocationTabClick} to='/'>
        <span>{cityName}</span>
      </Link>
    </li>
  );
}

export default LocationTab;
