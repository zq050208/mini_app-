/* 用于判断 */
import { OrderStatus } from './status';

function const2Bin(...arr: number[]) {
  return arr.reduce((prev, cur) => {
    return prev | (1 << cur);
  }, 0);
}

// 对应前端的Flags
export enum OrderButtonsFlags {
  PAY = const2Bin(OrderStatus.WAIT_FOR_PAY),
  CANCEL = const2Bin(OrderStatus.WAIT_FOR_PAY),
  REMOVE = const2Bin(
    OrderStatus.CANCEL,
    OrderStatus.COMPLETE,
    OrderStatus.FAILURE,
  ),
  FEEDBACK = const2Bin(OrderStatus.FAILURE),
}
