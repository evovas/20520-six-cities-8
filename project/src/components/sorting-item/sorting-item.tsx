import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {State} from '../../types/state';
import {SortingOption} from '../../const';
import {selectSortingOption} from '../../store/action';

type SortingItemProps = {
  sortingOption: SortingOption;
  onChangeOpenSelectState: () => void;
}

function SortingItem ({sortingOption, onChangeOpenSelectState}: SortingItemProps): JSX.Element {
  const onChangeSortingOption = useDispatch();
  const currentSorting = useSelector(((state: State) => state.currentSorting));

  const onClick = () => {
    onChangeSortingOption(selectSortingOption(sortingOption));
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

export default SortingItem;
