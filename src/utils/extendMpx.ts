mpx.toast = function(msg: string) {
  return mpx.showToast({
    icon: 'none',
    title: msg,
  });
};

mpx.loading = function(msg: string) {
  return mpx.showLoading({
    title: msg,
  });
};
