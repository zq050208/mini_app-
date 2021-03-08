/**
 * 倒计时工具
 */

class Reciprocal {
  private timeOffset: number;
  private onCallBack: Function;
  private endTime: number;
  private idle = true;
  timer: number;

  /**
   * 初始化倒数计时器
   * @param amountSeconds 倒计时秒数
   * @param serverTime 服务器当前时间，用于计算误差
   */
  constructor(private amountSeconds: number, serverTime?: number) {
    if (!serverTime) {
      this.timeOffset = 0;
    } else {
      this.timeOffset = serverTime - Date.now();
    }
  }

  private now() {
    const now = Date.now();
    return now + this.timeOffset;
  }

  private _getExcessTime() {
    return this.endTime - this.now();
  }

  on(fn: (seconds: number) => void) {
    this.onCallBack = fn;
  }

  private callCB() {
    const excessTime = Math.max(this._getExcessTime(), 0);
    this.onCallBack.call(void 0, Math.ceil(excessTime / 1000));
  }

  private execute(delay = 1000) {
    this.callCB();
    this.timer = setTimeout(() => {
      const excessTime = this._getExcessTime();
      if (excessTime > 0) {
        if (excessTime < delay) {
          this.execute(excessTime);
        } else {
          this.execute();
        }
      } else {
        this.idle = true;
        this.callCB();
      }
    }, delay);
  }

  run() {
    if (!this.idle) {
      throw new Error('到计时器正在工作');
    }
    this.idle = false;
    this.endTime = Date.now() + this.amountSeconds * 1000;
    this.execute();
  }

  // stop() {
  //   clearTimeout(this.timer);
  // }

  pause() {
    clearTimeout(this.timer);
  }

  remuse() {
    if (!this.idle) return;
    this.execute();
  }
}

export default Reciprocal;
