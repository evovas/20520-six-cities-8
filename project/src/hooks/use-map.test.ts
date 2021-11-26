import {renderHook} from '@testing-library/react-hooks';
import useMap from './use-map';
import {makeFakeCity} from '../utils/mocks';

const fakeCity = makeFakeCity();

describe('Hook: useMap', () => {
  it('should return map', () => {
    const mapRef = {current: document.createElement('div')};
    const {result} = renderHook(() =>
      useMap(mapRef, fakeCity),
    );
    const map = result.current;

    expect(map).not.toBe(null);
    expect(map?.getCenter().lat).toBe(fakeCity.location.latitude);
    expect(map?.getCenter().lng).toBe(fakeCity.location.longitude);
  });
});
