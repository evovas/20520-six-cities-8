import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import SortingItem from './sorting-item';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {SortingOption} from '../../const';
import {ActionType} from '../../types/action';

const currentSorting = SortingOption.Popular;
const notCurrentSorting = SortingOption.TopRatedFirst;


const store = {
  [NameSpace.Ui]: {currentSorting},
};

describe('Component: SortingItem', () => {
  it('should render correctly when sorting option is the same', () => {
    const {container} = renderWithRedux(
      <SortingItem
        sortingOption={currentSorting}
        onChangeOpenSelectState={jest.fn()}
      />,
      {preloadedState: store},
    );

    expect(container.querySelector('.places__option')).toHaveClass('places__option--active');
    expect(screen.getByText(currentSorting)).toBeInTheDocument();
  });

  it('should render correctly when sorting option is different', () => {
    const {container} = renderWithRedux(
      <SortingItem
        sortingOption={notCurrentSorting}
        onChangeOpenSelectState={jest.fn()}
      />,
      {preloadedState: store},
    );

    expect(container.querySelector('.places__option')).not.toHaveClass('places__option--active');
    expect(screen.getByText(notCurrentSorting)).toBeInTheDocument();
  });

  it('should dispatch selectSortingOption and execute callback after click', () => {
    const onChangeOpenSelectState = jest.fn();

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(
      <SortingItem
        sortingOption={notCurrentSorting}
        onChangeOpenSelectState={onChangeOpenSelectState}
      />,
      {preloadedState: store},
    );

    expect(dispatch).toBeCalledTimes(0);
    expect(onChangeOpenSelectState).toBeCalledTimes(0);

    userEvent.click(screen.getByTestId('sorting-item'));


    expect(onChangeOpenSelectState).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({
      type: ActionType.SelectSortingOption,
      payload: notCurrentSorting,
    });
  });
});
