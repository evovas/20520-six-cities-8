import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {State} from '../../types/state';
import {selectCity} from '../../store/action';

type LocationTabProps = {
  cityName: string;
}

function LocationTab({cityName}: LocationTabProps): JSX.Element {
  const currentCityName = useSelector((state: State) => state.currentCityName);
  const onChangeCity = useDispatch();

  const onLocationTabClick = () => {
    onChangeCity(selectCity(cityName));
  };

  return (
    <li className='locations__item'>
      <a className={cn('locations__item-link', 'tabs__item', {'tabs__item--active':cityName === currentCityName})} onClick={onLocationTabClick} href='/#'>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default LocationTab;
