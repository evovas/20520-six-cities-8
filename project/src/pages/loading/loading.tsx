import styles from './loading.module.scss';

function Loading(): JSX.Element {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}/>
    </div>
);
}

export default Loading;
