/** チャプターなし */
export type None = {
  readonly type: "None";
};

/** 1年前のトラウマ */
export type TraumaOfLastYear = {
  readonly type: "TraumaOfLastYear";
};

/** チャプター情報 */
export type QueenOfTragedyChapter = None | TraumaOfLastYear;
