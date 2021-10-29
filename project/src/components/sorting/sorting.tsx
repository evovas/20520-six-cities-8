import {useState} from 'react';
import cn from 'classnames';
import {SortingOption} from '../../const';
import SortingItem from '../sorting-item/sorting-item';

type SortingProps = {
  currentSorting: SortingOption;
}


function Sorting({currentSorting}: SortingProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  const onChangeOpenSelectState = () => {
    setOpen(!isOpen);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
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

export default Sorting;
