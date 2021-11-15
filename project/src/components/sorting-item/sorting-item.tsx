import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {SortingOption} from '../../const';
import {selectSortingOption} from '../../store/action';
import {memo} from 'react';
import {getCurrentSorting} from '../../store/booking-process/selectors';

type SortingItemProps = {
  sortingOption: SortingOption;
  onChangeOpenSelectState: () => void;
}

function SortingItem ({sortingOption, onChangeOpenSelectState}: SortingItemProps): JSX.Element {
  const dispatch = useDispatch();
  const currentSorting = useSelector(getCurrentSorting);

  const onClick = () => {
    dispatch(selectSortingOption(sortingOption));
    onChangeOpenSelectState();
  };

  return (
    <li
      className={cn('places__option', {'places__option--active': sortingOption === currentSorting} )}
      tabIndex={0}
      onClick={onClick}
    >
      {sortingOption}
    </li>
  );
}

export default memo(SortingItem);
