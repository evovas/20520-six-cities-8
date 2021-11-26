import userEvent from '@testing-library/user-event';
import ReviewStar from './review-star';
import {renderWithRedux, screen} from '../../utils/test-utils';

const CURRENT_VALUE = '2';
const VALUE = '3';

describe('Component: ReviewStar (e2e)', () => {
  test('onReviewChange should be executed when input enabled and values is different', () => {
    const onReviewChange = jest.fn();
    renderWithRedux(
      <ReviewStar
        value={VALUE}
        currentValue={CURRENT_VALUE}
        id={'3-stars'}
        onReviewChange={onReviewChange}
        disabled={false}
      />,
    );

    expect(onReviewChange).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('radio'));
    expect(onReviewChange).toBeCalledTimes(1);
  });

  test('onReviewChange should not be executed when input disabled and values is different', () => {
    const onReviewChange = jest.fn();
    renderWithRedux(
      <ReviewStar
        value={VALUE}
        currentValue={CURRENT_VALUE}
        id={'3-stars'}
        onReviewChange={onReviewChange}
        disabled
      />,
    );

    expect(onReviewChange).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('radio'));
    expect(onReviewChange).toBeCalledTimes(0);
  });

  test('onReviewChange should not be executed when input enabled and values is the same', () => {
    const onReviewChange = jest.fn();
    renderWithRedux(
      <ReviewStar
        value={CURRENT_VALUE}
        currentValue={CURRENT_VALUE}
        id={'3-stars'}
        onReviewChange={onReviewChange}
        disabled={false}
      />,
    );

    expect(onReviewChange).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('radio'));
    expect(onReviewChange).toBeCalledTimes(0);
  });
});
