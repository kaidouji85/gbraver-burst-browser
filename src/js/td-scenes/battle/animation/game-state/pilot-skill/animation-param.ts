import type {
  GameStateX,
  PilotSkill,
  PilotSkillEffect,
  PlayerState,
} from "gbraver-burst-core";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import type { HUDPilotObjects } from "../../../view/hud/pilot-objects/hud-pilot-objects";
import { HUDPlayer } from "../../../view/hud/player";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../view/td/game-objects";
import type { TDPlayer } from "../../../view/td/player";
import type { StateAnimationProps } from "../state-animation-props";

/**
 * パイロットスキル アニメーション パラメータ
 * @type SKILL パイロットスキル
 * @type PILOT HUDパイロット
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
  /** スキル発動側でないアームドーザスプライト */
  anotherSprite: ArmdozerSprite;
  /** このターン中アクティブなアームドーザのスプライト */
  activeTDArmdozer: TDArmdozerObjects;
  /** 3Dゲームオブジェクト */
  tdObjects: TDGameObjects;
  /** HUDオブジェクト */
  hudObjects: HUDGameObjects;
  /** 3Dカメラ */
  tdCamera: TDCamera;
};

/**
 * パイロットスキル アニメーション パラメータ
 */
export type PilotSkillAnimationParam = PilotSkillAnimationParamX<
  PilotSkill,
  HUDPilotObjects
>;

/**
 * パイロットスキル アニメーション パラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @return 変換結果
 */
export function toPilotSkillAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<PilotSkillEffect>,
): PilotSkillAnimationParam | null | undefined {
  const effect: PilotSkillEffect = gameState.effect;
  const invokerState = gameState.players.find(
    (v) => v.playerId === effect.invokerId,
  );
  const invokerArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === effect.invokerId,
  );
  const pilot = props.view.hud.pilots.find(
    (v) => v.playerId === effect.invokerId,
  );
  const invokerTD = props.view.td.players.find(
    (v) => v.playerId === effect.invokerId,
  );
  const invokerHUD = props.view.hud.players.find(
    (v) => v.playerId === effect.invokerId,
  );
  const anotherArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId !== effect.invokerId,
  );
  const activeTDArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === gameState.activePlayerId,
  );

  if (
    !invokerState ||
    !pilot ||
    !invokerArmdozer ||
    !invokerTD ||
    !invokerHUD ||
    !anotherArmdozer ||
    !activeTDArmdozer
  ) {
    return null;
  }

  return {
    skill: effect.skill,
    pilot: pilot,
    invokerState: invokerState,
    invokerSprite: invokerArmdozer.sprite(),
    invokerTD: invokerTD,
    invokerHUD: invokerHUD,
    anotherSprite: anotherArmdozer.sprite(),
    activeTDArmdozer,
    tdObjects: props.view.td.gameObjects,
    hudObjects: props.view.hud.gameObjects,
    tdCamera: props.view.td.camera,
  };
}
