// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState, PilotSkillEffect, PilotSkill} from "gbraver-burst-core";
import {HUDGameObjects} from "../../../view/hud/game-objects";
import {TDGameObjects} from "../../../view/td/game-objects";
import type {TDPlayer} from "../../../view/td/player";
import {HUDPlayer} from "../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {TDCamera} from "../../../../../../game-object/camera/td";

/**
 * パイロットスキル アニメーション パラメータ
 */
export type PilotSkillAnimationParamX<SKILL: PilotSkill> = {
  pilotSkill: SKILL,
  invokerTD: TDPlayer,
  invokerHUD: HUDPlayer,
  invokerSprite: ArmDozerSprite,
  tdObjects: TDGameObjects,
  hudObjects: HUDGameObjects,
  tdCamera: TDCamera,
}

/**
 * パイロットスキル アニメーション パラメータ
 */
export type PilotSkillAnimationParam = PilotSkillAnimationParamX<PilotSkill>;

/**
 * パイロットスキル アニメーション パラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return キャスト結果
 */
export function castPilotSkillAnimationParam(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState):  ?PilotSkillAnimationParam {
  if (gameState.effect.name !== 'PilotSkillEffect') {
    return null;
  }

  const effect: PilotSkillEffect = gameState.effect;
  const invokerSprite = view.td.sprites.find(v => v.playerId === effect.invokerId);
  const invokerTD = view.td.players.find(v => v.playerId === effect.invokerId);
  const invokerHUD =view.hud.players.find(v => v.playerId === effect.invokerId);
  if (!invokerSprite || !invokerTD || !invokerHUD) {
    return null;
  }

  return {
    pilotSkill: effect.skill,
    invokerSprite: invokerSprite.sprite,
    invokerTD: invokerTD,
    invokerHUD: invokerHUD,
    tdObjects: view.td.gameObjects,
    hudObjects: view.hud.gameObjects,
    tdCamera: view.td.camera,
  };
}