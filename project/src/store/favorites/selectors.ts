import {State} from '../../types/state';
import {FetchStatus} from '../../const';
import {NameSpace} from '../root-reducer';
import {Offer} from '../../types/data';

export const getFavoriteOptionStatus = (state: State): FetchStatus => state[NameSpace.Favorites].favoriteOptionStatus;
export const getFavoriteOptionOffer = (state: State): Offer | null => state[NameSpace.Favorites].favoriteOptionOffer;
