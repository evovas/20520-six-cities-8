import {useState} from 'react';
import cn from 'classnames';
import {SortingOption} from '../../const';
import SortingItem from '../sorting-item/sorting-item';

type SortingProps = {
  currentSorting: SortingOption;
  onChangeSortingOption: (sortingOption: SortingOption) => void;
}


function Sorting({currentSorting, onChangeSortingOption}: SortingProps): JSX.Element {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const onChangeOpenSelectState = () => {
    setIsOpenSelect(!isOpenSelect);
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
      <ul className={cn('places__options', 'places__options--custom', {'places__options--opened':isOpenSelect})}>
        {[...Object.values(SortingOption)]
          .map((option) => (
            <SortingItem
              key={option}
              sortingOption={option}
              currentSorting={currentSorting}
              onChangeSortingOption={onChangeSortingOption}
              onChangeOpenSelectState={onChangeOpenSelectState}
            />))}
      </ul>
    </form>
  );
}

export default Sorting;
