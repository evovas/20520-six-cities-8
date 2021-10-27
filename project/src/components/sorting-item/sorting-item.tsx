import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import cn from 'classnames';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {SortingOption} from '../../const';
import {selectSortingOption} from '../../store/action';

type SortingItemProps = {
  sortingOption: SortingOption;
  onChangeOpenSelectState: () => void;
}

const mapStateToProps = ({currentSorting}: State) => ({
  currentSorting,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeSortingOption(sortingOption: SortingOption) {
    dispatch(selectSortingOption(sortingOption));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SortingItemProps;

function SortingItem ({currentSorting, sortingOption, onChangeSortingOption, onChangeOpenSelectState}: ConnectedComponentProps): JSX.Element {
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

export {SortingItem};
export default connector(SortingItem);
