import { Burst, BurstEffect, GameStateX } from "gbraver-burst-core";

import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDArmdozerObjects } from "../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../view/td/game-objects";
import { StateAnimationProps } from "../state-animation-props";
import { toAttackerParam } from "./attacker-param";
import { BurstPlayerParam, toBurstPlayerParam } from "./burst-player-param";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 * @template TD_ARMDOZER TDアームドーザ
 * @template HUD_ARMDOZER HUDアームドーザ
 * @template BURST バースト
 */
export type BurstAnimationParamX<
  TD_ARMDOZER extends TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects,
  BURST extends Burst,
> = BurstPlayerParam<TD_ARMDOZER, HUD_ARMDOZER, BURST> & {
  /** 攻撃側3Dアームドーザ */
  attackerArmdozerTD: TDArmdozerObjects;

  /** 3Dレイヤーオブジェクト */
  tdObjects: TDGameObjects;
  /** 3Dカメラ */
  tdCamera: TDCamera;
  /** HUDレイヤーオブジェクト */
  hudObjects: HUDGameObjects;
  /** HUDカメラ */
  hudCamera: PlainHUDCamera;
};

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<
  TDArmdozerObjects,
  HUDArmdozerObjects,
  Burst
>;

/**
 * バーストアニメーションパラメータを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): BurstAnimationParam | null {
  const burstPlayerParam = toBurstPlayerParam(props, gameState);
  const attackerParam = toAttackerParam(props, gameState);
  if (!burstPlayerParam || !attackerParam) {
    return null;
  }

  return {
    ...burstPlayerParam,
    ...attackerParam,
    tdObjects: props.view.td.gameObjects,
    tdCamera: props.view.td.camera,
    hudObjects: props.view.hud.gameObjects,
    hudCamera: props.view.hud.camera,
  };
}
