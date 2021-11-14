import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {State} from '../../types/state';
import {SortingOption} from '../../const';
import {selectSortingOption} from '../../store/action';
import {memo} from 'react';

type SortingItemProps = {
  sortingOption: SortingOption;
  onChangeOpenSelectState: () => void;
}

function SortingItem ({sortingOption, onChangeOpenSelectState}: SortingItemProps): JSX.Element {
  const dispatch = useDispatch();
  const currentSorting = useSelector(((state: State) => state.currentSorting));

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
