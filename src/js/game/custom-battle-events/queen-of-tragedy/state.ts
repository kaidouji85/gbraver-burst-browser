import { QueenOfTragedyChapter } from "./chapter";

/** 悲劇の女王用のステート */
export type QueenOfTragedyState = {
  /** チャプター */
  readonly chapter: QueenOfTragedyChapter;
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;
  /** 3ターン開始時に再生されるいずれかのストーリーが完了したか否か、trueで完了 */
  readonly isStoryOfTurn3Complete: boolean;
};
