// @flow

import type {Burst, BurstEffect, GameState, PlayerState} from "gbraver-burst-core";
import type {TDPlayer} from "../../../view/td/player";
import type {TDGameObjects} from "../../../view/td/game-objects";
import {TDCamera} from "../../../../../../game-object/camera/td";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {PlainHUDCamera} from "../../../../../../game-object/camera/plain-hud";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {HUDArmdozerObjects} from "../../../view/hud/armdozer";
import {HUDPlayer} from "../../../view/hud/player";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 *
 * @type SPRITE スプライト
 * @type HUD_ARMDOZER HUDアームドーザ
 * @type TD_ARMDOZER TDアームドーザ
 * @type CUTIN カットイン
 * @type BURST バースト
 */
export type BurstAnimationParamX<SPRITE: ArmDozerSprite, HUD_ARMDOZER: HUDArmdozerObjects, TD_ARMDOZER: TDArmdozerObjects, BURST: Burst> = {
  burstPlayerState: PlayerState,
  burstPlayerTD: TDPlayer,
  burstPlayerHUD: HUDPlayer,
  burstSprite: SPRITE,
  burstArmdozerHUD: HUD_ARMDOZER,
  burstArmdozerTD: TD_ARMDOZER,
  tdObjects: TDGameObjects,
  tdCamera: TDCamera,
  hudObjects: HUDGameObjects,
  hudCamera: PlainHUDCamera,
  burst: BURST
};

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<ArmDozerSprite, HUDArmdozerObjects, TDArmdozerObjects, Burst>;

/**
 * バーストアニメーションパラメータを生成する
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): ?BurstAnimationParam {
  if (gameState.effect.name !== 'BurstEffect') {
    return null;
  }

  const effect: BurstEffect = gameState.effect;
  const burstPlayerState = gameState.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerTD = view.td.players.find(v => v.playerId === effect.burstPlayer);
  const burstPlayerHUD = view.hud.players.find(v => v.playerId === effect.burstPlayer);
  const burstSprite = view.td.sprites.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerHUD = view.hud.armdozers.find(v => v.playerId === effect.burstPlayer);
  const burstArmdozerTD = view.td.armdozerObjects.find(v => v.playerId === effect.burstPlayer);
  if (!burstPlayerState || !burstPlayerTD || !burstPlayerHUD || !burstSprite || !burstArmdozerHUD || !burstArmdozerTD) {
    return null;
  }

  return {
    burstPlayerState: burstPlayerState,
    burstPlayerTD:burstPlayerTD,
    burstPlayerHUD: burstPlayerHUD,
    burstSprite: burstSprite.sprite,
    burstArmdozerHUD: burstArmdozerHUD,
    burstArmdozerTD: burstArmdozerTD,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    burst: effect.burst
  };
}
