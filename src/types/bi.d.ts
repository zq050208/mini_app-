export namespace GAS_BI {
  type BIStatParam = {
    event_id?: number;
    action_id?: number;
    event_type_id?: number;
    // 页面路径
    pages?: string;
    // 页面访问时间
    pages_timestamp?: string;
  };

  type BIStateSystemInfo = {
    brand: string;
    phone_model: string;
    weixin_version: string;
    system: string;
    platform: string;
    sdk_version: string;
    network_type: string;
  };

  type BIPostData = {
    open_id: string;
    session_id: string;
  } & BIStatParam;
}
