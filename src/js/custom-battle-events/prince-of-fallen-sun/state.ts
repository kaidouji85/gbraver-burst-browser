import {PrinceOfFallenSunChapter} from "./chapter";

/** 落日の王子 ステート */
export type PrinceOfFallenSunState = {
  /** イントロダクションが完了したか否か、trueで完了 */
  readonly isIntroductionComplete: boolean;

  /** チャプター */
  readonly chapter: PrinceOfFallenSunChapter;
};
