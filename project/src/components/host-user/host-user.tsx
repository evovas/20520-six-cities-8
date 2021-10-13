import {User} from '../../types/users';

type HostUserProps = {
  user: User;
}

const PRO_LABEL = (
  <span className='property__user-status'>
    Pro
  </span>
);

function HostUser({user}: HostUserProps): JSX.Element {
  return (
    <div className='property__host-user user'>
      <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
        <img className='property__avatar user__avatar' src={user.avatarUrl} width='74'
          height='74'
          alt='Host avatar'
        />
      </div>
      <span className='property__user-name'>
        {user.name}
      </span>
      {user.isPro && PRO_LABEL}
    </div>
  );
}

export default HostUser;
