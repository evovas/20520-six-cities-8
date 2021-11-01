import {ThunkActionResult} from '../types/action';
import {ServerOffer} from '../types/data';
import {APIRoute} from '../const';
import {loadOffers} from './action';
import {adaptOfferToClient} from '../services/adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
    dispatch(loadOffers(data.map((offer) => adaptOfferToClient(offer))));
  };
