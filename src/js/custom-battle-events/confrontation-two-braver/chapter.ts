/** チャプターなし */
export type NoneChapter = {
  type: "None";
};

/** シンヤが有利 */
export type ShinyaHasAdvantage = {
  type: "ShinyaHasAdvantage";
};

/** 複数フェイズにまたがるチャプターの情報 */
export type Chapter = NoneChapter | ShinyaHasAdvantage;
