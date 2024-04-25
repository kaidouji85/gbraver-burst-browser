import type {
  Battle,
  BattleResult,
  GameStateX,
  PlayerState,
} from "gbraver-burst-core";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../game-object/camera/td";
import type { HUDGameObjects } from "../../../view/hud/game-objects";
import { HUDPlayer } from "../../../view/hud/player";
import type { TDGameObjects } from "../../../view/td/game-objects";
import type { TDPlayer } from "../../../view/td/player";
import type { StateAnimationProps } from "../state-animation-props";

/**
 * 戦闘アニメーション共通で使うパラメータ
 * 各種オブジェクトを攻撃側、防御側に振り分けている
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type BattleAnimationParamX<
  SPRITE extends ArmdozerSprite,
  RESULT extends BattleResult,
> = {
  attackerState: PlayerState;
  attackerTD: TDPlayer;
  attackerHUD: HUDPlayer;
  attackerSprite: SPRITE;
  defenderState: PlayerState;
  defenderTD: TDPlayer;
  defenderHUD: HUDPlayer;
  defenderSprite: ArmdozerSprite;
  tdObjects: TDGameObjects;
  tdCamera: TDCamera;
  hudObjects: HUDGameObjects;
  hudCamera: PlainHUDCamera;
  isDeath: boolean;
  result: RESULT;
};

/** 戦闘アニメーション共通で使うパラメータ */
export type BattleAnimationParam = BattleAnimationParamX<
  ArmdozerSprite,
  BattleResult
>;

/**
 * 各種オブジェクトから戦闘アニメパラメータを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 戦闘アニメパラメータ
 */
export function toBattleAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
): BattleAnimationParam | null | undefined {
  const battle: Battle = gameState.effect;
  const attackerState = gameState.players.find(
    (v) => v.playerId === battle.attacker,
  );
  const attackerTD = props.view.td.players.find(
    (v) => v.playerId === battle.attacker,
  );
  const attackerHUD = props.view.hud.players.find(
    (v) => v.playerId === battle.attacker,
  );
  const attackerArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === battle.attacker,
  );
  const defenderState = gameState.players.find(
    (v) => v.playerId !== battle.attacker,
  );
  const defenderTD = props.view.td.players.find(
    (v) => v.playerId !== battle.attacker,
  );
  const defenderHUD = props.view.hud.players.find(
    (v) => v.playerId !== battle.attacker,
  );
  const defenderArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId !== battle.attacker,
  );

  if (
    !attackerState ||
    !attackerTD ||
    !attackerHUD ||
    !attackerArmdozer ||
    !defenderState ||
    !defenderTD ||
    !defenderHUD ||
    !defenderArmdozer
  ) {
    return null;
  }

  return {
    attackerState: attackerState,
    attackerTD: attackerTD,
    attackerHUD: attackerHUD,
    attackerSprite: attackerArmdozer.sprite(),
    defenderState: defenderState,
    defenderTD: defenderTD,
    defenderHUD: defenderHUD,
    defenderSprite: defenderArmdozer.sprite(),
    tdObjects: props.view.td.gameObjects,
    tdCamera: props.view.td.camera,
    hudObjects: props.view.hud.gameObjects,
    hudCamera: props.view.hud.camera,
    isDeath: battle.isDeath,
    result: battle.result,
  };
}
