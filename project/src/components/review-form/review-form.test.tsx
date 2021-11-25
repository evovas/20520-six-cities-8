import * as Redux from 'react-redux';
import {datatype} from 'faker';
import userEvent from '@testing-library/user-event';
import * as ApiActions from '../../store/api-actions';
import ReviewForm from './review-form';
import {FetchStatus} from '../../const';
import {renderWithRedux, screen, cleanup} from '../../utils/test-utils';
import {NameSpace} from '../../store/root-reducer';

const FAKE_PAGE_ID = '1';
const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const lessThanMinLengthReview = datatype.string(MIN_REVIEW_LENGTH - 1);
const moreThanMaxLengthReview = datatype.string(MAX_REVIEW_LENGTH + 1);
const correctLengthReview = datatype.string(MAX_REVIEW_LENGTH - 1);

const storePostStatusLoading = {
  [NameSpace.Reviews]: {reviewPostStatus: FetchStatus.Loading},
};

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/review-star-[1-5]-star/i).length).toBe(5);
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('submit button should be disabled when review in incorrect', () => {
    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID} />);

    userEvent.click(screen.getByTestId('review-star-3-stars'));
    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), lessThanMinLengthReview);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();

    cleanup();

    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID} />);

    userEvent.click(screen.getByTestId('review-star-3-stars'));
    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), moreThanMaxLengthReview);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('submit button should be disabled without chosen rating star', () => {
    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID}/>);

    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), correctLengthReview);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('submit button should be enabled with chosen rating star and correct review', () => {
    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID}/>);

    userEvent.click(screen.getByTestId('review-star-3-stars'));
    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), correctLengthReview);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeEnabled();
  });

  it('form should be disabled and render loader on the button when post status is loading', () => {
    renderWithRedux(
      <ReviewForm pageId={FAKE_PAGE_ID}/>,
      {preloadedState: storePostStatusLoading},
    );

    const stars = screen.queryAllByTestId(/review-star-[1-5]-star/i);
    stars.forEach((star) => expect(star).toBeDisabled());
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should dispatch postReviewAction with data from form after click to submit button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const postReviewAction = jest.spyOn(ApiActions, 'postReviewAction');
    useDispatch.mockReturnValue(dispatch);

    renderWithRedux(<ReviewForm pageId={FAKE_PAGE_ID} />);

    userEvent.click(screen.getByTestId('review-star-3-stars'));
    userEvent.type(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), correctLengthReview);

    expect(screen.getByRole('button', {name: 'Submit'})).toBeEnabled();

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(dispatch).toBeCalledTimes(1);
    expect(postReviewAction).toBeCalledWith(FAKE_PAGE_ID, {
      comment: correctLengthReview,
      rating: '3',
    });
  });
});
