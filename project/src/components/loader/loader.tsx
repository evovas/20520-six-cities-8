import PropagateLoader from 'react-spinners/PropagateLoader';
import styles from './loader.module.scss';

type LoaderProps = {
  size: number;
  isFullScreen?: boolean;
};

function Loader({size, isFullScreen}: LoaderProps): JSX.Element {
  return (
    <div className={isFullScreen ? styles.loaderWrapperFullScreen : styles.loaderWrapper}>
      <PropagateLoader color={'#66a5e8'} size={size} />
    </div>
  );
}

export default Loader;
