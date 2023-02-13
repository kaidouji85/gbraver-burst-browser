import { GameEnd } from "gbraver-burst-core";

/** 戦闘終了 */
export type EndBattle = {
  type: "EndBattle";
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
  /** アニメーションタイムスケール */
  animationTimeScale: number;
};
