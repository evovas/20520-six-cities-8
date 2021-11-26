import {renderWithRedux, screen} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';
import {AuthorizationStatus, MAXIMUM_COMMENTS_COUNT} from '../../const';
import {makeFakeReview} from '../../utils/mocks';
import PropertyReviews from './property-reviews';

const FAKE_ID = '1';

const lessThanMaximumReviews = new Array(MAXIMUM_COMMENTS_COUNT - 1).fill(null).map(() => makeFakeReview());
const moreThanMaximumReviews = new Array(MAXIMUM_COMMENTS_COUNT + 1).fill(null).map(() => makeFakeReview());

const storeWithAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.Reviews]: {reviews: lessThanMaximumReviews},
};

const storeWithNoAuth = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
  [NameSpace.Reviews]: {reviews: lessThanMaximumReviews},
};

const storeWithMoreThanMaximumReviews = {
  [NameSpace.Reviews]: {reviews: moreThanMaximumReviews},
};

describe('Component: PropertyReviews', () => {
  it('should render correctly when user is auth', () => {
    const {container} = renderWithRedux(
      <PropertyReviews
        pageId={FAKE_ID}
      />,
      {preloadedState: storeWithAuth},
    );

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(container.querySelector('.reviews__amount')).toHaveTextContent(`${lessThanMaximumReviews.length}`);
    expect(screen.getByTestId('review-list')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('should render correctly when user is no auth', () => {
    renderWithRedux(
      <PropertyReviews
        pageId={FAKE_ID}
      />,
      {preloadedState: storeWithNoAuth},
    );

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });

  it('should render correctly when count of reviews more than the maximum possible', () => {
    const {container} = renderWithRedux(
      <PropertyReviews
        pageId={FAKE_ID}
      />,
      {preloadedState: storeWithMoreThanMaximumReviews},
    );

    expect(container.querySelector('.reviews__amount')).toHaveTextContent(`${MAXIMUM_COMMENTS_COUNT}`);
  });
});
