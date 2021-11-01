import { css } from '@emotion/react';
import PropagateLoader from 'react-spinners/PropagateLoader';

type LoaderProps = {
  size: number;
};

function Loader({size}: LoaderProps): JSX.Element {
  const override = css`
    display: block;
  `;

  return (
    <div>
      <PropagateLoader color={'#4481c3'} size={size} css={override}/>
    </div>
  );
}

export default Loader;
