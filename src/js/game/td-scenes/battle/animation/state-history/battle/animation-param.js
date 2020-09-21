// @flow

import type {Battle, BattleResult, GameStateX, PlayerState} from "gbraver-burst-core";
import type {TDPlayer} from "../../../view/td/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import {TDCamera} from "../../../../../../game-object/camera/td";
import {PlainHUDCamera} from "../../../../../../game-object/camera/plain-hud";
import {HUDPlayer} from "../../../view/hud/player";

/**
 * 戦闘アニメーション共通で使うパラメータ
 * 各種オブジェクトを攻撃側、防御側に振り分けている
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type BattleAnimationParamX<SPRITE: ArmDozerSprite, RESULT: BattleResult> = {
  attackerState: PlayerState,
  attackerTD: TDPlayer,
  attackerHUD: HUDPlayer,
  attackerSprite: SPRITE,
  defenderState: PlayerState,
  defenderTD: TDPlayer,
  defenderHUD: HUDPlayer,
  defenderSprite: ArmDozerSprite,
  tdObjects: TDGameObjects,
  tdCamera: TDCamera,
  hudObjects: HUDGameObjects,
  hudCamera: PlainHUDCamera,
  isDeath: boolean,
  result: RESULT
};

/** 戦闘アニメーション共通で使うパラメータ */
export type BattleAnimationParam = BattleAnimationParamX<ArmDozerSprite, BattleResult>;

/**
 * 各種オブジェクトから戦闘アニメパラメータを生成する
 *
 * @param view ビュー
 * @param sceneState 戦闘画面のステート
 * @param gameState ゲームステート
 * @return 戦闘アニメパラメータ
 */
export function toBattleAnimationParam(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<Battle>): ?BattleAnimationParam {
  const battle: Battle = gameState.effect;
  const attackerState = gameState.players.find(v => v.playerId === battle.attacker);
  const attackerTD = view.td.players.find(v => v.playerId === battle.attacker);
  const attackerHUD = view.hud.players.find(v => v.playerId === battle.attacker);
  const attackerSprite = view.td.sprites.find(v => v.playerId === battle.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== battle.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== battle.attacker);
  const defenderHUD = view.hud.players.find(v => v.playerId !== battle.attacker);
  const defenderSprite = view.td.sprites.find(v => v.playerId !== battle.attacker);
  if (!attackerState || !attackerTD || !attackerHUD || !attackerSprite || !defenderState || !defenderTD || !defenderHUD || !defenderSprite) {
    return null;
  }

  return {
    attackerState: attackerState,
    attackerTD: attackerTD,
    attackerHUD: attackerHUD,
    attackerSprite: attackerSprite.sprite,
    defenderState: defenderState,
    defenderTD: defenderTD,
    defenderHUD: defenderHUD,
    defenderSprite: defenderSprite.sprite,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    isDeath: battle.isDeath,
    result: battle.result,
  };
}
