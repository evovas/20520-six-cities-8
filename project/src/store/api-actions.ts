import {ThunkActionResult} from '../types/action';
import {ServerOffer} from '../types/data';
import {APIRoute} from '../const';
import {loadOffersRequest, loadOffersSuccess, loadOffersFailed} from './action';
import {adaptOfferToClient} from '../services/adapter';

export const fetchOffersAction = (): ThunkActionResult => (
  async (dispatch, _, api): Promise<void> => {
    dispatch(loadOffersRequest());
    try {
      const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
      dispatch(loadOffersSuccess(data.map((offer) => adaptOfferToClient(offer))));
    } catch (e) {
      dispatch(loadOffersFailed());
    }
  }
);
