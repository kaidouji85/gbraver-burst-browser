/**
 * ユーザーエージェントからiPhoneかどうかを判定する
 * @returns 判定結果、trueでiPhoneである
 */
export const isIPhone = () => /iPhone/i.test(navigator.userAgent);
