import {renderWithRedux} from '../../utils/test-utils';
import Loader from './loader';

const LOADER_SIZE = 15;

describe('Component: HostUser', () => {
  it('should render correctly', () => {
    const {container} = renderWithRedux(<Loader size={LOADER_SIZE} isFullScreen />);

    expect(container.querySelector('.loader-wrapper')).toHaveClass('loaderWrapperFullScreen');
  });
});
