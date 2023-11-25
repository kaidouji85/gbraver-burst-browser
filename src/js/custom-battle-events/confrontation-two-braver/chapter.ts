/** チャプターなし */
export type NoneChapter = {
  type: "None";
};

/** シンヤが有利 */
export type ShinyaHasAdvantage = {
  type: "ShinyaHasAdvantage";
  /** シンヤの独白を再生したか、trueで再生した */
  isShinyaMonologuePlayed: boolean;
  /** ユウヤの叫び1を再生したか、trueで再生した */
  isYuuyaCry1Played: boolean;
  /** ユウヤの叫び2を再生したか、trueで再生した */
  isYuuyaCry2Played: boolean;
};

/** 複数フェイズにまたがるチャプターの情報 */
export type Chapter = NoneChapter | ShinyaHasAdvantage;
