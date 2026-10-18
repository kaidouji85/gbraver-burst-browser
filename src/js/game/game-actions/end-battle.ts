import { ArmdozerId, GameEnd, PilotId } from "gbraver-burst-core";

/** 戦闘終了 */
export type EndBattle = {
  type: "EndBattle";
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
  /** アニメーションタイムスケール */
  animationTimeScale: number;
  /** プレイヤー情報 */
  player: {
    /** アームドーザ */
    armdozerId: ArmdozerId;
    /** プレイヤー */
    pilotId: PilotId;
  };
};
