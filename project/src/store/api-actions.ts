import {ThunkActionResult} from '../types/action';
import {Offer} from '../types/offers';
import {APIRoute} from '../const';
import {loadOffers} from './action';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  };
