import {makeFakeUser} from '../../utils/mocks';
import {renderWithRedux, screen} from '../../utils/test-utils';
import HostUser from './host-user';

const proUser = {...makeFakeUser(), isPro: true};
const notProUser = {...makeFakeUser(), isPro: false};

describe('Component: HostUser', () => {
  it('should render correctly when user is pro', () => {
    const {container} = renderWithRedux(<HostUser user={proUser} />);

    expect(container.querySelector('.property__avatar-wrapper')).toHaveClass('property__avatar-wrapper--pro');
    expect(screen.getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(screen.getByText(proUser.name)).toBeInTheDocument();
    expect(screen.getByTestId('user-pro-label')).toBeInTheDocument();
  });

  it('should render correctly when user is not pro', () => {
    const {container} = renderWithRedux(<HostUser user={notProUser} />);

    expect(container.querySelector('.property__avatar-wrapper')).not.toHaveClass('property__avatar-wrapper--pro');
    expect(screen.getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(screen.getByText(notProUser.name)).toBeInTheDocument();
    expect(screen.queryByTestId('user-pro-label')).not.toBeInTheDocument();
  });
});
