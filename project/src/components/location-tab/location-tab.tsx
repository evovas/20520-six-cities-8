import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import cn from 'classnames';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {selectCity} from '../../store/action';

type LocationTabProps = {
  cityName: string;
}

const mapStateToProps = ({currentCityName}: State) => ({
  currentCityName,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLocationTabClick(cityName: string) {
    dispatch(selectCity(cityName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & LocationTabProps;

function LocationTab({cityName, currentCityName, onLocationTabClick}: ConnectedComponentProps): JSX.Element {
  return (
    <li className='locations__item'>
      <a className={cn('locations__item-link', 'tabs__item', {'tabs__item--active':cityName === currentCityName})} onClick={() => onLocationTabClick(cityName)} href='/#'>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export {LocationTab};
export default connector(LocationTab);
