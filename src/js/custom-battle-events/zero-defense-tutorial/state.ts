import type { GameState } from "gbraver-burst-core";

/** 0防御チュートリアルステート */
export type ZeroDefenseTutorialState = {
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** ダメージレースストーリーを再生したか、trueで再生した */
  isDamageRaceComplete: boolean;
  /** 0バッテリーチャンスを再生したか、trueで再生した */
  isZeroBatteryChangeComplete: boolean;
};
