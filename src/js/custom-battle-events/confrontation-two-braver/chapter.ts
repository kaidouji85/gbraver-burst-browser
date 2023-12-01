/** チャプターなし */
export type NoneChapter = {
  type: "None";
};

/** シンヤが有利 */
export type ShinyaHasAdvantage = {
  type: "ShinyaHasAdvantage";
};

/** ユウヤが有利 */
export type YuuyaHasAdvantage = {
  type: "YuuyaHasAdvantage";
};

/** イーブンマッチ */
export type EvenMatch = {
  type: "EvenMatch";
};

/** 複数フェイズにまたがるチャプターの情報 */
export type Chapter =
  | NoneChapter
  | ShinyaHasAdvantage
  | YuuyaHasAdvantage
  | EvenMatch;
