/**
 * 常规化请求API
 * 如果发生错误，以modal方式弹出错误，并抛出错误
 * @param fn do
 * @param option 配置
 * @param option.loadingMsg // loading 信息
 * @param option.preventThrow // 阻止继续抛出错误
 */
export async function normalizeDoRequest(
  fn: () => Promise<any>,
  option: {
    loadingMsg?: string;
    preventThrow?: boolean;
  } = {},
) {
  try {
    if (option.loadingMsg) {
      mpx.loading(option.loadingMsg);
    }
    return await fn();
  } catch (err) {
    mpx.showModal({
      title: '网络错误',
      content: err.message,
      showCancel: false,
    });
    logger.error(err);
    if (!option.preventThrow) {
      throw err;
    }
  } finally {
    mpx.hideLoading();
  }
}

/**
 * 延迟执行
 * @param time 延迟时间
 */
export function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
