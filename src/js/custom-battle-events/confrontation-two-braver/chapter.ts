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

/** 複数フェイズにまたがるチャプターの情報 */
export type Chapter = NoneChapter | ShinyaHasAdvantage | YuuyaHasAdvantage;
