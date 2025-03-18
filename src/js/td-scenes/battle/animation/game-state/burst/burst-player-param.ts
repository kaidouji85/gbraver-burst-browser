import { Burst, PlayerState } from "gbraver-burst-core";

import { HUDArmdozerObjects } from "../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDPlayer } from "../../../view/hud/player";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDPlayer } from "../../../view/td/player";

/** バースト側 バーストアニメーションパラメータ */
export type BurstPlayerParam<
  TD_ARMDOZER extends TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects,
  BURST extends Burst,
> = {
  /** バースト発動側ステート */
  readonly burstPlayerState: PlayerState;
  /** バースト情報 */
  readonly burst: BURST;
  /** バースト発動側3Dプレイヤーオブジェクト */
  readonly burstPlayerTD: TDPlayer;
  /** バースト発動側HUDプレイヤーオブジェクト */
  readonly burstPlayerHUD: HUDPlayer;
  /** バースト発動側HUDアームドーザ */
  readonly burstArmdozerHUD: HUD_ARMDOZER;
  /** バースト発動側3Dアームドーザ */
  readonly burstArmdozerTD: TD_ARMDOZER;
};
