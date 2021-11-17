import {FetchStatus} from '../../const';
import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Offer} from '../../types/data';

export const getFavoriteOptionStatus = (state: State): FetchStatus => state[NameSpace.Favorites].favoriteOptionStatus;
export const getFavoriteOffersStatus = (state: State): FetchStatus => state[NameSpace.Favorites].favoriteOffersStatus;
export const getFavoritesOffers = (state: State): Offer[] | [] => state[NameSpace.Favorites].favoriteOffers;

