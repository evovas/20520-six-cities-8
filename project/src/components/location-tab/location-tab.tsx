import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {selectCity} from '../../store/action';
import {getCurrentCityName} from '../../store/booking-process/selectors';

type LocationTabProps = {
  cityName: string;
}

function LocationTab({cityName}: LocationTabProps): JSX.Element {
  const dispatch = useDispatch();
  const currentCityName = useSelector(getCurrentCityName);

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
