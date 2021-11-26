import {Action, AnyAction, createStore, Store} from '@reduxjs/toolkit';
import {ReactNode} from 'react';
import {render, RenderResult} from '@testing-library/react';
import {rootReducer} from '../store/root-reducer';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory, MemoryHistory} from 'history';

interface RenderWithRedux<
  S = any,
  A extends Action = AnyAction,
  I extends S = any
  > {
  (
    ui: ReactNode,
    reduxOption?: {
      preloadedState?: I
      store?: Store<S, A>
    },
    memoryHistory?: {
      history?: MemoryHistory,
    }
  ) : RenderResult
}

const renderWithRedux: RenderWithRedux = (
  ui: ReactNode,
  {
    preloadedState,
    store = createStore(rootReducer, preloadedState),
  } = {},
  {
    history,
  } = {},
) => ({
  ...render(
    <Provider store={store}>
      <Router history={history ?? createMemoryHistory()}>
        {ui}
      </Router>
    </Provider>,
  ),
});

export * from '@testing-library/react';
export { renderWithRedux };
