import {
  Burst,
  BurstEffect,
  GameStateX,
  PlayerState,
} from "gbraver-burst-core";

import { HUDArmdozerObjects } from "../../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDPlayer } from "../../../../view/hud/player";
import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { TDPlayer } from "../../../../view/td/player";
import { StateAnimationProps } from "../../state-animation-props";

/** バースト側 バーストアニメーションパラメータ */
export type BurstPlayerParam<
  TD_ARMDOZER extends TDArmdozerObjects = TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects = HUDArmdozerObjects,
  BURST extends Burst = Burst,
> = {
  /** バースト発動側ステート */
  readonly burstPlayerState: PlayerState;
  /** バースト情報 */
  readonly burst: BURST;
  /** バースト発動側 3Dレイヤーーオブジェクト */
  readonly burstPlayerTD: TDPlayer;
  /** バースト発動側 HUDレイヤーーオブジェクト */
  readonly burstPlayerHUD: HUDPlayer;
  /** バースト発動側 HUDアームドーザ */
  readonly burstArmdozerHUD: HUD_ARMDOZER;
  /** バースト発動側 3Dアームドーザ */
  readonly burstArmdozerTD: TD_ARMDOZER;
};

/**
 * バースト側バーストアニメーションパラメータを生成する
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 生成結果、生成できない場合はnull
 */
export function toBurstPlayerParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): BurstPlayerParam | null {
  const { burst, burstPlayer } = gameState.effect;
  const burstPlayerState = gameState.players.find(
    (v) => v.playerId === burstPlayer,
  );
  const burstPlayerTD = props.view.td.players.find(
    (v) => v.playerId === burstPlayer,
  );
  const burstPlayerHUD = props.view.hud.players.find(
    (v) => v.playerId === burstPlayer,
  );
  const burstArmdozerHUD = props.view.hud.armdozers.find(
    (v) => v.playerId === burstPlayer,
  );
  const burstArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === burstPlayer,
  );

  if (
    !burstPlayerState ||
    !burstPlayerTD ||
    !burstPlayerHUD ||
    !burstArmdozerHUD ||
    !burstArmdozerTD
  ) {
    return null;
  }

  return {
    burstPlayerState,
    burst,
    burstPlayerTD,
    burstPlayerHUD,
    burstArmdozerHUD,
    burstArmdozerTD,
  };
}
