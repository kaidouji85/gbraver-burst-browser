import {
  BurstEffect,
  GameStateX,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

import { HUDArmdozerObjects } from "../../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { HUDPlayer } from "../../../../view/hud/player";
import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { TDPlayer } from "../../../../view/td/player";
import { StateAnimationProps } from "../../state-animation-props";

/** その他プレイヤーのパラメータ */
export type OtherPlayerParam = {
  /** その他プレイヤー ステート */
  readonly otherPlayerState: PlayerState;
  /** その他プレイヤー 3Dレイヤーオブジェクト */
  readonly otherPlayerTD: TDPlayer;
  /** その他プレイヤー HUDプレイヤーオブジェクト */
  readonly otherPlayerHUD: HUDPlayer;
  /** その他プレイヤー HUDアームドーザ */
  readonly otherArmdozerHUD: HUDArmdozerObjects;
  /** その他プレイヤー 3Dアームドーザ */
  readonly otherArmdozerTD: TDArmdozerObjects;
};

/**
 * その他プレイヤーのパラメータを生成する
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 生成結果、生成できない場合はnull
 */
export function toOtherPlayerParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): OtherPlayerParam | null {
  const { burstPlayer } = gameState.effect;
  const findOtherPlayer = (options: { playerId: PlayerId }) =>
    options.playerId !== burstPlayer;
  const otherPlayerState = gameState.players.find(findOtherPlayer);
  const otherPlayerTD = props.view.td.players.find(findOtherPlayer);
  const otherPlayerHUD = props.view.hud.players.find(findOtherPlayer);
  const otherArmdozerHUD = props.view.hud.armdozers.find(findOtherPlayer);
  const otherArmdozerTD = props.view.td.armdozers.find(findOtherPlayer);

  if (
    !otherPlayerState ||
    !otherPlayerTD ||
    !otherPlayerHUD ||
    !otherArmdozerHUD ||
    !otherArmdozerTD
  ) {
    return null;
  }

  return {
    otherPlayerState,
    otherPlayerTD,
    otherPlayerHUD,
    otherArmdozerHUD,
    otherArmdozerTD,
  };
}
