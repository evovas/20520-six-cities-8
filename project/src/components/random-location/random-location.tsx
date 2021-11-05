import {Link} from 'react-router-dom';
import {getRandomPositiveInteger} from '../../utils';
import {CITIES_LIST} from '../../const';
import {useDispatch} from 'react-redux';
import {selectCity} from '../../store/action';

function RandomLocation(): JSX.Element {
  const onChangeCity = useDispatch();
  const randomCity = CITIES_LIST[getRandomPositiveInteger(0, CITIES_LIST.length-1)];

  const onClickCityTab = () => {
    onChangeCity(selectCity(randomCity));
  };

  return (
    <section className='locations locations--login locations--current'>
      <div className='locations__item'>
        <Link className='locations__item-link' to={'/'} onClick={onClickCityTab}>
          <span>{randomCity}</span>
        </Link>
      </div>
    </section>
  );
}

export default RandomLocation;
