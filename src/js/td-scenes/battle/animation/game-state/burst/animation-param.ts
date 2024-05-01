import {
  Burst,
  BurstEffect,
  GameStateX,
  PlayerState,
} from "gbraver-burst-core";

import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../game-object/camera/td";
import { HUDArmdozerObjects } from "../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDGameObjects } from "../../../view/hud/game-objects";
import { HUDPlayer } from "../../../view/hud/player";
import { TDArmdozerObjects } from "../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../view/td/game-objects";
import { TDPlayer } from "../../../view/td/player";
import { StateAnimationProps } from "../state-animation-props";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 * @type TD_ARMDOZER TDアームドーザ
 * @type HUD_ARMDOZER HUDアームドーザ
 * @type BURST バースト
 */
export type BurstAnimationParamX<
  TD_ARMDOZER extends TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects,
  BURST extends Burst,
> = {
  /** バースト発動側ステート */
  burstPlayerState: PlayerState;
  /** バースト情報 */
  burst: BURST;
  /** バースト発動側3Dプレイヤーオブジェクト */
  burstPlayerTD: TDPlayer;
  /** バースト発動側HUDプレイヤーオブジェクト */
  burstPlayerHUD: HUDPlayer;
  /** バースト発動側HUDアームドーザ */
  burstArmdozerHUD: HUD_ARMDOZER;
  /** バースト発動側3Dアームドーザ */
  burstArmdozerTD: TD_ARMDOZER;

  /** 攻撃側3Dアームドーザ */
  attackerArmdozerTD: TDArmdozerObjects;

  /** 防御側HUDプレイヤーオブジェクト */
  defenderHUD: HUDPlayer;

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
): BurstAnimationParam | null | undefined {
  const effect: BurstEffect = gameState.effect;
  const burstPlayerState = gameState.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstPlayerTD = props.view.td.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstPlayerHUD = props.view.hud.players.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstArmdozerHUD = props.view.hud.armdozers.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const burstArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === effect.burstPlayer,
  );
  const attackerArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  const defenderHUD = props.view.hud.players.find(
    (v) => v.playerId !== gameState.activePlayerId,
  );

  if (
    !burstPlayerState ||
    !burstPlayerTD ||
    !burstPlayerHUD ||
    !burstArmdozerHUD ||
    !burstArmdozerTD ||
    !attackerArmdozerTD ||
    !defenderHUD
  ) {
    return null;
  }

  return {
    burstPlayerState,
    burst: effect.burst,
    burstPlayerTD,
    burstPlayerHUD,
    burstArmdozerHUD,
    burstArmdozerTD,
    attackerArmdozerTD,
    defenderHUD,
    tdObjects: props.view.td.gameObjects,
    tdCamera: props.view.td.camera,
    hudObjects: props.view.hud.gameObjects,
    hudCamera: props.view.hud.camera,
  };
}
