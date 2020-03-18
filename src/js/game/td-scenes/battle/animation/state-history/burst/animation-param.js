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
import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import type {HUDPlayer} from "../../../view/hud/player";
import type {HUDArmdozer} from "../../../view/hud/armdozer";

/**
 * バーストアニメーションのパラメータ
 *
 * @type SPRITE スプライト
 * @type HUD_ARMDOZER HUDアームドーザ
 * @type CUTIN カットイン
 * @type BURST バースト
 */
export type BurstAnimationParamX<SPRITE: ArmDozerSprite, HUD_ARMDOZER: HUDArmdozer, CUTIN: CutIn, BURST: Burst> = {
  burstPlayerState: PlayerState,
  burstPlayerTD: TDPlayer<SPRITE>,
  burstPlayerHUD: HUDPlayer<CUTIN>,
  burstArmdozerHUD: HUD_ARMDOZER,
  tdObjects: TDGameObjects,
  tdCamera: TDCamera,
  hudObjects: HUDGameObjects,
  hudCamera: PlainHUDCamera,
  burst: BURST
};

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<ArmDozerSprite, HUDArmdozer, CutIn, Burst>;

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
  const burstArmdozerHUD = view.hud.armdozers.find(v => v.playerId === effect.burstPlayer);
  if (!burstPlayerState || !burstPlayerTD || !burstPlayerHUD || !burstArmdozerHUD) {
    return null;
  }

  return {
    burstPlayerState: burstPlayerState,
    burstPlayerTD:burstPlayerTD,
    burstPlayerHUD: burstPlayerHUD,
    burstArmdozerHUD: burstArmdozerHUD,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    burst: effect.burst
  };
}
