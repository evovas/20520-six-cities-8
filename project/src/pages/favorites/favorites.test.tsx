import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-actions';
import Favorites from './favorites';
import {renderWithRedux, screen, cleanup} from '../../utils/test-utils';
import {makeFakeOffer} from '../../utils/mocks';
import {ActionType} from '../../types/action';
import {NameSpace} from '../../store/root-reducer';
import {FetchStatus} from '../../const';

const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

const storeLoadStatusLoading = {
  [NameSpace.Favorites]: {
    favoriteOffersStatus: FetchStatus.Loading,
    favoriteOffers: [],
  },
};

const storeLoadStatusSuccess = {
  [NameSpace.Favorites]: {
    favoriteOffersStatus: FetchStatus.Success,
    favoriteOffers: fakeOffers,
  },
};

const storeLoadStatusSuccessEmpty = {
  [NameSpace.Favorites]: {
    favoriteOffersStatus: FetchStatus.Success,
    favoriteOffers: [],
  },
};

const storeLoadStatusFailed = {
  [NameSpace.Favorites]: {favoriteOffersStatus: FetchStatus.Failed},
};

describe('Component: Favorites Page', () => {
  it('should render correctly with loaded offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Favorites />, {preloadedState: storeLoadStatusSuccess});

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('load-error-page')).not.toBeInTheDocument();
  });

  it('should render correctly with 0 loaded offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const {container} = renderWithRedux(<Favorites />, {preloadedState: storeLoadStatusSuccessEmpty});

    expect(container.querySelector('.page')).toHaveClass('page--favorites-empty');
    expect(container.querySelector('.page__main')).toHaveClass('page__main--favorites-empty');
  });

  it('should render loader when data is loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Favorites />, {preloadedState: storeLoadStatusLoading});

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('load-error-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorites-list')).not.toBeInTheDocument();
  });

  it('should render Load Error page when load error', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Favorites />, {preloadedState: storeLoadStatusFailed});

    expect(screen.getByTestId('load-error-page')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-list')).not.toBeInTheDocument();
  });

  it('should dispatch correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const fetchFavoriteOffersAction = jest.spyOn(ApiActions, 'fetchFavoriteOffersAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Favorites />);

    expect(dispatch).toBeCalledTimes(1);
    expect(fetchFavoriteOffersAction).toBeCalledTimes(1);

    cleanup();

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith({
      type: ActionType.DropFavoriteOffers,
    });
  });
});
