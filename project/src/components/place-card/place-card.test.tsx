import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import { Route, Switch } from 'react-router-dom';
import PlaceCard from './place-card';
import {renderWithRedux, screen} from '../../utils/test-utils';
import {makeFakeOffer} from '../../utils/mocks';
import {AppRoute} from '../../const';

const CARD_TYPE = 'cities';

const fakeNotPremiumOffer = {...makeFakeOffer(), isPremium: false};
const fakePremiumOffer = {...makeFakeOffer(), isPremium: true};

const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  beforeEach(() => history.push(AppRoute.Root));

  it('should render premium offer correctly', () => {
    const {container} = renderWithRedux(
      <PlaceCard
        offer={fakePremiumOffer}
        cardType={CARD_TYPE}
        onMouseEnterCard={jest.fn()}
        onMouseLeaveCard={jest.fn()}
      />);

    expect(container.querySelector('.place-card')).toHaveClass('cities__place-card');
    expect(screen.getByTestId('premium-label')).toBeInTheDocument();
    expect(screen.getByAltText(fakePremiumOffer.title)).toBeInTheDocument();
    expect(container.querySelector('.place-card__info')).toHaveClass('cities__card-info');
    expect(screen.getByText(`€${fakePremiumOffer.price}`)).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(fakePremiumOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakePremiumOffer.type)).toBeInTheDocument();
  });

  it('should render not premium offer correctly', () => {
    renderWithRedux(
      <PlaceCard
        offer={fakeNotPremiumOffer}
        cardType={CARD_TYPE}
        onMouseEnterCard={jest.fn()}
        onMouseLeaveCard={jest.fn()}
      />);

    expect(screen.queryByTestId('premium-label')).not.toBeInTheDocument();
  });

  it('should redirect to offer page when user click to image', () => {
    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Root}>
          <PlaceCard
            offer={fakeNotPremiumOffer}
            cardType={CARD_TYPE}
            onMouseEnterCard={jest.fn()}
            onMouseLeaveCard={jest.fn()}
          />
        </Route>
        <Route exact path={`/offer/${fakeNotPremiumOffer.id}`}>Mock Room Page</Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.queryByText(/Mock Room Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('place-card-image-link'));
    expect(screen.getByText(/Mock Room Page/i)).toBeInTheDocument();
  });

  it('should redirect to offer page when user click to offer title', () => {
    renderWithRedux(
      <Switch>
        <Route exact path={AppRoute.Root}>
          <PlaceCard
            offer={fakeNotPremiumOffer}
            cardType={CARD_TYPE}
            onMouseEnterCard={jest.fn()}
            onMouseLeaveCard={jest.fn()}
          />
        </Route>
        <Route exact path={`/offer/${fakeNotPremiumOffer.id}`}>Mock Room Page</Route>
      </Switch>,
      {},
      {history},
    );

    expect(screen.queryByText(/Mock Room Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('place-card-title-link'));
    expect(screen.getByText(/Mock Room Page/i)).toBeInTheDocument();
  });
});
