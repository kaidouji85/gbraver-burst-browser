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

/** 生き延びるためにユウヤがスキルを発動する */
export type YuuyaActivateSkillToSurvive = {
  type: "YuuyaActivateSkillToSurvive";
  /** 本チャプターが開始されたターン */
  startTurn: number;
};

/** とどめをさすためにユウヤがスキルを発動する */
export type YuuyaActivateSkillToFinish = {
  type: "YuuyaActivateSkillToFinish";
  /** 本チャプターが開始されたターン */
  startTurn: number;
};

/** 複数フェイズにまたがるチャプターの情報 */
export type Chapter =
  | NoneChapter
  | ShinyaHasAdvantage
  | YuuyaHasAdvantage
  | EvenMatch
  | YuuyaActivateSkillToSurvive
  | YuuyaActivateSkillToFinish;
