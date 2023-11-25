import { Chapter } from "./chapter";

/** 「対決、二人のブレイバー！！」のステート */
export type ConfrontationTwoBraverState = Readonly<{
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** チャプター情報 */
  chapter: Chapter;
}>;
