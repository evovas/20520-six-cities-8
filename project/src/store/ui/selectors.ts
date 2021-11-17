import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {SortingOption} from '../../const';

export const getCurrentCityName = (state: State): string => state[NameSpace.Ui].currentCityName;
export const getCurrentSorting = (state: State): SortingOption => state[NameSpace.Ui].currentSorting;
