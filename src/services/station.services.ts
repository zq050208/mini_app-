import gasAPIs from '@/apis/gas.apis';
import { GasStationGetDistanceRequest } from '@/types';

export default {
  getStationList(data: IAnyObject) {
    return gasAPIs.getStationList(data);
  },
  getStationDetail(stationId: string) {
    return gasAPIs.getStationInfo({ stationId });
  },
  getStationDistance(param: GasStationGetDistanceRequest) {
    return gasAPIs.getStationDistance(param);
  },
};
