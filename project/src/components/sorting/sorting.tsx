import {memo, useState} from 'react';
import cn from 'classnames';
import {SortingOption} from '../../const';
import SortingItem from '../sorting-item/sorting-item';
import {useSelector} from 'react-redux';
import {getCurrentSorting} from '../../store/ui/selectors';

function Sorting(): JSX.Element {
  const currentSorting = useSelector(getCurrentSorting);

  const [isOpen, setOpen] = useState(false);

  const onChangeOpenSelectState = () => {
    setOpen(!isOpen);
  };

  return (
    <form className='places__sorting' action='#' method='get' data-testid='sorting'>
      <span className='places__sorting-caption'>Sort by </span>
      <span onClick={onChangeOpenSelectState} className='places__sorting-type' tabIndex={0}>
        {currentSorting}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'/>
        </svg>
      </span>
      <ul className={cn('places__options', 'places__options--custom', {'places__options--opened':isOpen})}>
        {[...Object.values(SortingOption)]
          .map((option) => (
            <SortingItem
              key={option}
              sortingOption={option}
              onChangeOpenSelectState={onChangeOpenSelectState}
            />))}
      </ul>
    </form>
  );
}

export default memo(Sorting);
