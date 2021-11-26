import * as Redux from 'react-redux';
import * as ApiActions from '../../store/api-actions';
import Room from './room';
import {renderWithRedux, screen, cleanup} from '../../utils/test-utils';
import {makeFakeOffer} from '../../utils/mocks';
import {NameSpace} from '../../store/root-reducer';
import {FetchStatus} from '../../const';
import {ActionType} from '../../types/action';

const MAX_PHOTOS_COUNT = 6;

const fakePremiumOffer = {...makeFakeOffer(), isPremium: true};
const fakeNearbyOffers = [{...makeFakeOffer(), isPremium: false}, {...makeFakeOffer(), isPremium: false}, {...makeFakeOffer(), isPremium: false}];

const storeLoadStatusLoading = {
  [NameSpace.Offers]: {
    offerStatus: FetchStatus.Loading,
    offer: null,
    nearbyOffers: [],
  },
};

const storeLoadStatusFailed = {
  [NameSpace.Offers]: {
    offerStatus: FetchStatus.Failed,
    offer: null,
    nearbyOffers: [],
  },
};

const storeLoadStatusSuccessWithoutOffer = {
  [NameSpace.Offers]: {
    offerStatus: FetchStatus.Success,
    offer: null,
    nearbyOffers: [],
  },
};

const storeLoadStatusSuccessWithPremiumOffer = {
  [NameSpace.Offers]: {
    offerStatus: FetchStatus.Success,
    offer: fakePremiumOffer,
    nearbyOffers: fakeNearbyOffers,
  },
};

describe('Component: Favorites Page', () => {
  it('should render loader when offer is loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Room />, {preloadedState: storeLoadStatusLoading});

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('load-error-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('not-found-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('room-page')).not.toBeInTheDocument();
  });

  it('should render Load Error when load with error', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Room />, {preloadedState: storeLoadStatusFailed});

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('load-error-page')).toBeInTheDocument();
    expect(screen.queryByTestId('not-found-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('room-page')).not.toBeInTheDocument();
  });

  it('should render Not Found Page when loaded without offer', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Room />, {preloadedState: storeLoadStatusSuccessWithoutOffer});

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('load-error-page')).not.toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.queryByTestId('room-page')).not.toBeInTheDocument();
  });

  it('should correctly when loaded with offer', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Room />, {preloadedState: storeLoadStatusSuccessWithPremiumOffer});

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('load-error-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('not-found-page')).not.toBeInTheDocument();
    expect(screen.getByTestId('room-page')).toBeInTheDocument();

    expect(screen.queryAllByAltText(fakePremiumOffer.title).length).toBe(MAX_PHOTOS_COUNT);
    expect(screen.getByTestId('premium-label')).toBeInTheDocument();
    expect(screen.queryAllByTestId('bookmark-button').length).toBe(4);
    expect(screen.getByText(`${fakePremiumOffer.bedrooms} ${fakePremiumOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakePremiumOffer.maxAdults} ${fakePremiumOffer.maxAdults > 1 ? 'adults' : 'adult'}`)).toBeInTheDocument();
    expect(screen.getByTestId('property-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryAllByTestId('place-card').length).toBe(3);
  });

  it('should dispatch correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const fetchOfferAction = jest.spyOn(ApiActions, 'fetchOfferAction');
    const fetchNearbyOffersAction = jest.spyOn(ApiActions, 'fetchNearbyOffersAction');
    const fetchReviewsAction = jest.spyOn(ApiActions, 'fetchReviewsAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<Room />);

    expect(dispatch).toBeCalledTimes(3);
    expect(fetchOfferAction).toBeCalledTimes(1);
    expect(fetchNearbyOffersAction).toBeCalledTimes(1);
    expect(fetchReviewsAction).toBeCalledTimes(1);

    cleanup();

    expect(dispatch).toBeCalledTimes(5);
    expect(dispatch).nthCalledWith(4, {
      type: ActionType.DropRoomOffersData,
    });
    expect(dispatch).nthCalledWith(5, {
      type: ActionType.DropRoomReviewsData,
    });
  });
});
