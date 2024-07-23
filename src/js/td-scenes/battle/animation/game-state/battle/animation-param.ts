import {
  Battle,
  BattleResult,
  GameStateX,
  PlayerState,
} from "gbraver-burst-core";

import { BGMManager } from "../../../../../bgm/bgm-manager";
import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import { HUDPlayer } from "../../../view/hud/player";
import { TDGameObjects } from "../../../view/td/game-objects";
import { TDPlayer } from "../../../view/td/player";
import { StateAnimationProps } from "../state-animation-props";

/**
 * 戦闘アニメーション共通で使うパラメータ
 * 各種オブジェクトを攻撃側、防御側に振り分けている
 * @template SPRITE 攻撃側スプライト
 * @template RESULT 戦闘結果
 */
export type BattleAnimationParamX<
  SPRITE extends ArmdozerSprite,
  RESULT extends BattleResult,
> = {
  /** 攻撃側プレイヤーステート */
  attackerState: PlayerState;
  /** 攻撃側TDプレイヤー */
  attackerTD: TDPlayer;
  /** 攻撃側HUDプレイヤー */
  attackerHUD: HUDPlayer;
  /** 攻撃側スプライト */
  attackerSprite: SPRITE;

  /** 防御側プレイヤーステート */
  defenderState: PlayerState;
  /** 防御側TDプレイヤー */
  defenderTD: TDPlayer;
  /** 防御側HUDプレイヤー */
  defenderHUD: HUDPlayer;
  /** 防御側スプライト */
  defenderSprite: ArmdozerSprite;

  /** TDオブジェクト */
  tdObjects: TDGameObjects;
  /** TDカメラ */
  tdCamera: TDCamera;
  /** HUDオブジェクト */
  hudObjects: HUDGameObjects;
  /** HUDカメラ */
  hudCamera: PlainHUDCamera;

  /** BGM管理オブジェクト */
  bgm: BGMManager;

  /** 死亡フラグ */
  isDeath: boolean;
  /** 戦闘結果 */
  result: RESULT;
};

/** 戦闘アニメーション共通で使うパラメータ */
export type BattleAnimationParam = BattleAnimationParamX<
  ArmdozerSprite,
  BattleResult
>;

/**
 * 攻撃側プレイヤーのプロパティを抽出する
 * @param props ステートアニメーションプロパティ
 * @param gameState ゲームステート
 * @returns 攻撃側プレイヤープロパティ、取得できない場合はnull
 */
function extractAttacker(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
) {
  const { players } = gameState;
  const { attacker } = gameState.effect;
  const { td, hud } = props.view;
  const attackerState = players.find((p) => p.playerId === attacker);
  const attackerTD = td.players.find((p) => p.playerId === attacker);
  const attackerHUD = hud.players.find((p) => p.playerId === attacker);
  const attackerSprite = td.armdozers
    .find((a) => a.playerId === attacker)
    ?.sprite();
  return attackerState && attackerTD && attackerHUD && attackerSprite
    ? { attackerState, attackerTD, attackerHUD, attackerSprite }
    : null;
}

/**
 * 防御側プレイヤーのプロパティを抽出する
 * @param props ステートアニメーションプロパティ
 * @param gameState ゲームステート
 * @returns 防御側プレイヤープロパティ、取得できない場合はnull
 */
function extractDefender(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
) {
  const { players } = gameState;
  const { attacker } = gameState.effect;
  const { td, hud } = props.view;
  const defenderState = players.find((p) => p.playerId !== attacker);
  const defenderTD = td.players.find((p) => p.playerId !== attacker);
  const defenderHUD = hud.players.find((p) => p.playerId !== attacker);
  const defenderSprite = td.armdozers
    .find((a) => a.playerId !== attacker)
    ?.sprite();
  return defenderState && defenderTD && defenderHUD && defenderSprite
    ? { defenderState, defenderTD, defenderHUD, defenderSprite }
    : null;
}

/**
 * その他のプロパティを抽出する
 * @param props ステートアニメーションプロパティ
 * @param gameState ゲームステート
 * @returns その他のプロパティ
 */
function extractOthers(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
) {
  const battle = gameState.effect;
  const { td, hud } = props.view;
  return {
    tdObjects: td.gameObjects,
    tdCamera: td.camera,
    hudObjects: hud.gameObjects,
    hudCamera: hud.camera,
    isDeath: battle.isDeath,
    result: battle.result,
    bgm: props.bgm,
  };
}

/**
 * 各種オブジェクトから戦闘アニメパラメータを生成する
 * @param props ステートアニメーションプロパティ
 * @param gameState ゲームステート
 * @returns 戦闘アニメパラメータ、生成できない場合はnull
 */
export function toBattleAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
): BattleAnimationParam | null | undefined {
  const attackerProps = extractAttacker(props, gameState);
  const defenderProps = extractDefender(props, gameState);
  if (!attackerProps || !defenderProps) {
    return null;
  }

  const otherProps = extractOthers(props, gameState);
  return { ...attackerProps, ...defenderProps, ...otherProps };
}
