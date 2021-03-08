/**
 * 校验手机号码
 * @param phone 手机号码
 */
export function validPhoneNumber(phone: string) {
  return /^1[\d]{10}$/.test(phone);
}
