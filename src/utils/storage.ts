async function getStorageAsync(key: string) {
  try {
    const storageRes = await mpx.getStorage({
      key,
    });
    if (storageRes && storageRes.data) {
      return storageRes.data;
    }
    return void 0;
  } catch (error) {
    return void 0;
  }
}

export function getStorage(key: string, sync = false) {
  if (!key) return void 0;
  if (sync) {
    return mpx.getStorageSync(key);
  }
  return getStorageAsync(key);
}

export async function removeStorage(key: string) {
  if (!key) return;
  return mpx.removeStorage({
    key,
  });
}

export async function setStorage(key: string, data: any) {
  if (!key) return void 0;
  if (data !== undefined) {
    return mpx.setStorage({
      key,
      data,
    });
  } else {
    return removeStorage(key);
  }
}
