import PropagateLoader from 'react-spinners/PropagateLoader';
import cn from 'classnames';
import styles from './loader.module.scss';

type LoaderProps = {
  size: number;
  isFullScreen?: boolean;
  isLoginScreen?: boolean;
  isReviewForm?: boolean;
};

function Loader({size, isFullScreen, isLoginScreen, isReviewForm}: LoaderProps): JSX.Element {
  return (
    <div className={cn(
      {[styles.loaderWrapperFullScreen]: isFullScreen},
      {[styles.loaderWrapperLogin]: isLoginScreen},
      {[styles.loaderWrapperReview]: isReviewForm},
    )}
    >
      <PropagateLoader color={'#66a5e8'} size={size} />
    </div>
  );
}

export default Loader;
