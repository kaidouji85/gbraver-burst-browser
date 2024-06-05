import {
  GameStateX,
  PilotSkill,
  PilotSkillEffect,
  PlayerState,
} from "gbraver-burst-core";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import { HUDPilotObjects } from "../../../view/hud/pilot-objects/hud-pilot-objects";
import { HUDPlayer } from "../../../view/hud/player";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../view/td/game-objects";
import { TDPlayer } from "../../../view/td/player";
import { StateAnimationProps } from "../state-animation-props";

/**
 * パイロットスキル アニメーション パラメータ
 * @template SKILL パイロットスキル
 * @template PILOT HUDパイロット
 */
export type PilotSkillAnimationParamX<
  SKILL extends PilotSkill,
  PILOT extends HUDPilotObjects,
> = {
  /** スキル情報 */
  skill: SKILL;
  /** スキル発動側パイロットHUD */
  pilot: PILOT;
  /** スキル発動側プレイヤーステート */
  invokerState: PlayerState;
  /** スキル発動側3Dプレイヤー */
  invokerTD: TDPlayer;
  /** スキル発動側HUDプレイヤー */
  invokerHUD: HUDPlayer;
  /** スキル発動側アームドーザスプライト */
  invokerSprite: ArmdozerSprite;

  /** 攻撃側アームドーザスプライト */
  attackerTDArmdozer: TDArmdozerObjects;

  /** 3Dゲームオブジェクト */
  tdObjects: TDGameObjects;
  /** HUDオブジェクト */
  hudObjects: HUDGameObjects;
  /** 3Dカメラ */
  tdCamera: TDCamera;
};

/** パイロットスキル アニメーション パラメータ */
export type PilotSkillAnimationParam = PilotSkillAnimationParamX<
  PilotSkill,
  HUDPilotObjects
>;

/**
 * パイロットスキル アニメーション スキル発動者パラメータを抽出する
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 抽出結果、抽出できない場合はnullを返す
 */
function extractInvoker(
  props: StateAnimationProps,
  gameState: GameStateX<PilotSkillEffect>,
) {
  const { effect, players } = gameState;
  const pilot = props.view.hud.pilots.find(
    (v) => v.playerId === effect.invokerId,
  );
  const invokerState = players.find((p) => p.playerId === effect.invokerId);
  const invokerArmdozer = props.view.td.armdozers.find(
    (a) => a.playerId === effect.invokerId,
  );
  const invokerTD = props.view.td.players.find(
    (p) => p.playerId === effect.invokerId,
  );
  const invokerHUD = props.view.hud.players.find(
    (h) => h.playerId === effect.invokerId,
  );
  return pilot && invokerState && invokerArmdozer && invokerTD && invokerHUD
    ? {
        skill: effect.skill,
        pilot,
        invokerState,
        invokerTD,
        invokerHUD,
        invokerSprite: invokerArmdozer.sprite(),
      }
    : null;
}

/**
 * パイロットスキル アニメーション 攻撃側パラメータを抽出する
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 抽出結果、抽出できない場合はnullを返す
 */
function extractAttacker(
  props: StateAnimationProps,
  gameState: GameStateX<PilotSkillEffect>,
) {
  const { activePlayerId } = gameState;
  const attackerTDArmdozer = props.view.td.armdozers.find(
    (a) => a.playerId === activePlayerId,
  );
  return attackerTDArmdozer ? { attackerTDArmdozer } : null;
}

/**
 * パイロットスキル アニメーション その他パラメータを抽出する
 * @param props 戦闘シーンプロパティ
 * @returns 抽出結果
 */
function extractOthers(props: StateAnimationProps) {
  return {
    tdObjects: props.view.td.gameObjects,
    hudObjects: props.view.hud.gameObjects,
    tdCamera: props.view.td.camera,
  };
}

/**
 * パイロットスキル アニメーション パラメータに変換する
 * 変換できない場合はnullを返す
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 変換結果
 */
export function toPilotSkillAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<PilotSkillEffect>,
): PilotSkillAnimationParam | null {
  const invokerProps = extractInvoker(props, gameState);
  const attackerProps = extractAttacker(props, gameState);
  const otherProps = extractOthers(props);
  return invokerProps && attackerProps
    ? { ...invokerProps, ...attackerProps, ...otherProps }
    : null;
}
