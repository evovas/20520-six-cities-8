import cn from 'classnames';
import UserProLabel from '../user-pro-label/user-pro-label';
import {User} from '../../types/data';

type HostUserProps = {
  user: User;
}

function HostUser({user}: HostUserProps): JSX.Element {
  return (
    <div className='property__host-user user'>
      <div className={cn('property__avatar-wrapper', 'user__avatar-wrapper', {'property__avatar-wrapper--pro': user.isPro})}>
        <img
          className='property__avatar user__avatar'
          src={user.avatarUrl}
          width='74'
          height='74'
          alt='Host avatar'
        />
      </div>
      <span className='property__user-name'>
        {user.name}
      </span>
      {user.isPro && <UserProLabel />}
    </div>
  );
}

export default HostUser;
