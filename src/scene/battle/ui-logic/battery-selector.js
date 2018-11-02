// @flow

import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * バッテリーセレクタの初期値を計算する
 *
 * @param enableMaxBattery 設定可能バッテリーの上限値
 * @return バッテリーセレクタの初期値
 */
export function getInitialBattery(enableMaxBattery: number): number {
  if (0 < enableMaxBattery) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * 設定可能バッテリーの上限値を計算する
 *
 * @param effect コマンド入力フェイズの結果
 * @param playerId 画面を開いているプレイヤーのID
 * @return 設定可能バッテリーの上限値
 */
export function getEnableMax(effect: InputCommand, playerId: PlayerId): number {
  const playerCommand = effect.players.find(v => v.playerId === playerId);
  if (!playerCommand) {
    return 0;
  }

  return playerCommand.command
    .map(v => {
      switch (v.type) {
        case 'BATTERY_COMMAND':
          return v.battery;
        default:
          return null;
      }
    })
    .filter(Boolean)
    .reduce((a, b) => Math.max(a, b), 0);
}