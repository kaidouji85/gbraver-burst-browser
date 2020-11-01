// @flow

import type {Burst, BurstEffect, GameStateX, PlayerState} from "gbraver-burst-core";
import type {TDPlayer} from "../../../view/td/player";
import type {TDGameObjects} from "../../../view/td/game-objects";
import {TDCamera} from "../../../../../../game-object/camera/td";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {PlainHUDCamera} from "../../../../../../game-object/camera/plain-hud";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import {HUDPlayer} from "../../../view/hud/player";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";
import type {HUDArmdozerObjects} from "../../../view/hud/armdozer-objects/hud-armdozer-ibjects";

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
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<BurstEffect>): ?BurstAnimationParam {
  const effect: BurstEffect = gameState.effect;
  const burstPlayerState = gameState.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerTD = view.td.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerHUD = view.hud.players.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerHUD = view.hud.armdozers.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerTD = view.td.armdozerObjects.find(v => v.playerId === effect.burstPlayer);
  if (!burstPlayerState || !burstPlayerTD || !burstPlayerHUD || !burstArmdozerHUD || !burstArmdozerTD) {
    return null;
  }

  return {
    burstPlayerState: burstPlayerState,
    burstPlayerTD:burstPlayerTD,
    burstPlayerHUD: burstPlayerHUD,
    burstArmdozerHUD: burstArmdozerHUD,
    burstArmdozerTD: burstArmdozerTD,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    burst: effect.burst
  };
}
