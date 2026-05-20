import { PlayerCommand, PlayerId, PlayerState } from "gbraver-burst-core";

import { HUDPlayer } from "../../../view/hud/player";
import { calcPredicatedDamage } from "../calc-predicated-damage";

/**
 * ダメージ予想を表示する
 * @param options オプション
 * @param options.commands プレイヤーのコマンド
 * @param options.players プレイヤーステートをあつめたもの
 * @param options.activePlayerId 現在アクティブなプレイヤーID
 * @param options.playerId プレイヤーID
 * @param options.nowPlayerBattery 現在のプレイヤーが選択しているバッテリー値
 * @param options.defenderHUD 防御側のHUDプレイヤー
 * @returns アニメーション
 */
export const showPredicatedDamage = (options: {
  commands: PlayerCommand[];
  players: PlayerState[];
  activePlayerId: PlayerId;
  playerId: PlayerId;
  nowPlayerBattery?: number;
  defenderHUD: HUDPlayer;
}) => {
  const predicatedDamage = calcPredicatedDamage(options);
  return options.defenderHUD.predicatedDamage.show(predicatedDamage);
};