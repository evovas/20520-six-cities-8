import cn from 'classnames';
import {SortingOption} from '../../const';

type SortingItemProps = {
  currentSorting: SortingOption;
  sortingOption: SortingOption;
  onChangeSortingOption: (sortingOption: SortingOption) => void;
  onChangeOpenSelectState: () => void;
}

function SortingItem ({currentSorting, sortingOption, onChangeSortingOption, onChangeOpenSelectState}: SortingItemProps): JSX.Element {
  const onClick = () => {
    onChangeSortingOption(sortingOption);
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
