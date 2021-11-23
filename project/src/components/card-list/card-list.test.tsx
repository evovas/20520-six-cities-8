import CardList from './card-list';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';

const CARD_TYPE = 'cities';

const fakeOffers = [makeFakeOffer(), makeFakeOffer()];

const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});
const history = createMemoryHistory();

describe('Component: CardList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CardList
            offers={fakeOffers}
            cardType={CARD_TYPE}
            onMouseEnterCard={jest.fn()}
            onMouseLeaveCard={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('placecard').length).toEqual(fakeOffers.length);
  });
});
