import PropagateLoader from 'react-spinners/PropagateLoader';
import styles from './loader.module.scss';

type LoaderProps = {
  size: number;
};

function Loader({size}: LoaderProps): JSX.Element {
  return (
    <div className={styles.loaderWrapper}>
      <PropagateLoader color={'#4481c3'} size={size} />
    </div>
  );
}

export default Loader;
