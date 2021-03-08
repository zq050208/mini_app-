/*
 * 用户所有车牌全局状态管理
 */
import { Module } from 'vuex';
import plateService from '@/services/plate.services';
import { UserVehicleListResponse } from '@/types/models';

const platesState = {
  userPlates: [] as UserVehicleListResponse[],
};

const platesStore: Module<typeof platesState, {}> = {
  state: platesState,
  mutations: {
    /**
     * 更新用户车牌列表
     * @param state
     * @param plates
     */
    changeUserPlates(state, plates = []) {
      state.userPlates = plates;
    },
    removeUserPlatesById(state, id) {
      let delIndex = -1;
      state.userPlates.every((plate, index) => {
        if (plate.id === id) {
          delIndex = index;
          return false;
        }
        return true;
      });
      if (delIndex !== -1) state.userPlates.splice(delIndex, 1);
    },
    /**
     * 删除车牌，透过列表的Index
     * @param state
     * @param index
     */
    removeUserPlatesByIndex(state, index) {
      state.userPlates.splice(index, 1);
    },
  },
  actions: {
    async loadUserCarPlateList({ commit }) {
      const res = await plateService.getPlateList();
      commit('changeUserPlates', res);
    },
    async removeUserCarPlate({ commit }, id) {
      await plateService.deletePlate({
        id: id,
      });
      commit('removeUserPlatesById', id);
    },
  },
};

export default platesStore;
