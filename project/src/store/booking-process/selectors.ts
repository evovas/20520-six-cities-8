import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {FetchStatus, SortingOption} from '../../const';
import {Offer} from '../../types/data';

export const getCurrentCityName = (state: State): string => state[NameSpace.booking].currentCityName;
export const getCurrentSorting = (state: State): SortingOption => state[NameSpace.booking].currentSorting;
export const getFavoriteOptionStatus = (state: State): FetchStatus => state[NameSpace.booking].favoriteOptionStatus;
export const getFavoriteOptionOffer = (state: State): Offer | null => state[NameSpace.booking].favoriteOptionOffer;
