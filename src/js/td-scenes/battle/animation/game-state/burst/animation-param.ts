import { Burst, BurstEffect, GameStateX } from "gbraver-burst-core";

import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDArmdozerObjects } from "../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../view/td/game-objects";
import { StateAnimationProps } from "../state-animation-props";
import { BurstPlayerParam } from "./burst-player-param";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 * @type TD_ARMDOZER TDアームドーザ
 * @type HUD_ARMDOZER HUDアームドーザ
 * @type BURST バースト
 */
export type BurstAnimationParamX<
  TD_ARMDOZER extends TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects,
  BURST extends Burst,
> = BurstPlayerParam<TD_ARMDOZER, HUD_ARMDOZER, BURST> & {
  /** 攻撃側3Dアームドーザ */
  attackerArmdozerTD: TDArmdozerObjects;

  /** 3Dレイヤーオブジェクト */
  tdObjects: TDGameObjects;
  /** 3Dカメラ */
  tdCamera: TDCamera;
  /** HUDレイヤーオブジェクト */
  hudObjects: HUDGameObjects;
  /** HUDカメラ */
  hudCamera: PlainHUDCamera;
};

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<
  TDArmdozerObjects,
  HUDArmdozerObjects,
  Burst
>;

/**
 * バーストアニメーションパラメータを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): BurstAnimationParam | null | undefined {
  const effect: BurstEffect = gameState.effect;
  const burstPlayerState = gameState.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstPlayerTD = props.view.td.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstPlayerHUD = props.view.hud.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstArmdozerHUD = props.view.hud.armdozers.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const attackerArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  if (
    !burstPlayerState ||
    !burstPlayerTD ||
    !burstPlayerHUD ||
    !burstArmdozerHUD ||
    !burstArmdozerTD ||
    !attackerArmdozerTD
  ) {
    return null;
  }

  return {
    burstPlayerState,
    burst: effect.burst,
    burstPlayerTD,
    burstPlayerHUD,
    burstArmdozerHUD,
    burstArmdozerTD,
    attackerArmdozerTD,
    tdObjects: props.view.td.gameObjects,
    tdCamera: props.view.td.camera,
    hudObjects: props.view.hud.gameObjects,
    hudCamera: props.view.hud.camera,
  };
}
