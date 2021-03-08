import gasAPIs from '@/apis/gas.apis';

export default {
  getPlateList() {
    return gasAPIs.plateList();
  },
  addPlate(data: IAnyObject) {
    return gasAPIs.plateAdd(data);
  },
  deletePlate(data: IAnyObject) {
    return gasAPIs.plateDelete(data);
  },
  getETCPlateList() {
    return gasAPIs.etcPlateList();
  },
  /**
   * 设置车牌为etc认证
   * @param plateNos 车牌号集合
   */
  setPlatesETC(plateNos: string[]) {
    return gasAPIs.plateSetETC({
      plateNos,
    });
  },
  // 签约免密支付添加车牌
  // addPlateTo(data: IAnyObject) {
  //   return gasAPIs.toPlateAdd(data);
  // }
};
