import { Conditions } from "./conditions";

/**
 * 「去年のトラウマ」を開始するか否か
 * @param conditions 条件判断オブジェクト
 * @returns trueで開始する
 */
export const isTraumaOfLastYearStart = (conditions: Conditions) =>
  conditions.turn === 2 && conditions.willPlayerBurst;
