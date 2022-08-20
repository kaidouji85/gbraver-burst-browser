// @flow
import type {Burst, BurstEffect, GameStateX, PlayerState} from "gbraver-burst-core";
import {PlainHUDCamera} from "../../../../../../game-object/camera/plain-hud/plain-hud-camera";
import {TDCamera} from "../../../../../../game-object/camera/td";
import type {HUDArmdozerObjects} from "../../../view/hud/armdozer-objects/hud-armdozer-ibjects";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {HUDPlayer} from "../../../view/hud/player";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";
import type {TDGameObjects} from "../../../view/td/game-objects";
import type {TDPlayer} from "../../../view/td/player";
import type {ReferableBattleSceneProps} from "../referable-battle-scene-props";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 *
 * @type TD_ARMDOZER TDアームドーザ
 * @type HUD_ARMDOZER HUDアームドーザ
 * @type BURST バースト
 */
export type BurstAnimationParamX<TD_ARMDOZER: TDArmdozerObjects, HUD_ARMDOZER: HUDArmdozerObjects, BURST: Burst> = {
  burstPlayerState: PlayerState,
  burstPlayerTD: TDPlayer,
  burstPlayerHUD: HUDPlayer,
  burstArmdozerHUD: HUD_ARMDOZER,
  burstArmdozerTD: TD_ARMDOZER,
  tdObjects: TDGameObjects,
  tdCamera: TDCamera,
  hudObjects: HUDGameObjects,
  hudCamera: PlainHUDCamera,
  burst: BURST
};

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<TDArmdozerObjects, HUDArmdozerObjects, Burst>;

/**
 * バーストアニメーションパラメータを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @return バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(props: ReferableBattleSceneProps, gameState: GameStateX<BurstEffect>): ?BurstAnimationParam {
  const effect: BurstEffect = gameState.effect;
  const burstPlayerState = gameState.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerTD = props.view.td.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerHUD = props.view.hud.players.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerHUD = props.view.hud.armdozers.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerTD = props.view.td.armdozerObjects.find(v => v.playerId === effect.burstPlayer);
  if (!burstPlayerState || !burstPlayerTD || !burstPlayerHUD || !burstArmdozerHUD || !burstArmdozerTD) {
    return null;
  }

  return {
    burstPlayerState: burstPlayerState,
    burstPlayerTD:burstPlayerTD,
    burstPlayerHUD: burstPlayerHUD,
    burstArmdozerHUD: burstArmdozerHUD,
    burstArmdozerTD: burstArmdozerTD,
    tdObjects: props.view.td.gameObjects,
    tdCamera: props.view.td.camera,
    hudObjects: props.view.hud.gameObjects,
    hudCamera: props.view.hud.camera,
    burst: effect.burst
  };
}
