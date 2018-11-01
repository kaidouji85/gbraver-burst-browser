import {BattleSceneView} from "../../view/index";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {createEmptyTween} from "../../../../tween/empty-tween";
import {createEmptyMultiTween} from "../../../../tween/multi-tween/empty-multi-tween";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {myTurn} from "../../../../game-object/armdozer/shin-breaver/animation/my-turn";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @param effect コマンド入力フェイズの効果
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: InputCommand): MultiTween {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !enemy) {
    return createEmptyMultiTween();
  }

  const enableMax = getEnableMax(effect, sceneState.playerId);
  const initialValue = getInitialBattery(enableMax);
  const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';
  const attacker = isPlayerTurn ? view.threeDimensionLayer.playerSprite : view.threeDimensionLayer.enemySprite;
  const defender = isPlayerTurn ? view.threeDimensionLayer.enemySprite : view.threeDimensionLayer.playerSprite;

  const start = createEmptyTween();
  const openBatterySelector = view.hudLayer.batterySelector.open(initialValue, enableMax, okButtonLabel);
  const visibleBurstButton = view.hudLayer.burstButton.visible();
  const refreshPlayer = view.threeDimensionLayer.playerGauge.refresh(player.armdozer.hp, player.armdozer.battery);
  const refreshEnemy = view.threeDimensionLayer.enemyGauge.refresh(enemy.armdozer.hp, enemy.armdozer.battery);
  const myTurn = attacker.myTurn();
  const stand = defender.stand();
  const end = createEmptyTween();

  start.chain(
    view.threeDimensionLayer.turnIndicator.turnChange(isPlayerTurn),
    openBatterySelector.start,
    visibleBurstButton.start,
    refreshPlayer,
    refreshEnemy
  );
  refreshEnemy.chain(
    myTurn.start,
    stand
  );
  myTurn.end.chain(end);

  return {start, end};
}

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