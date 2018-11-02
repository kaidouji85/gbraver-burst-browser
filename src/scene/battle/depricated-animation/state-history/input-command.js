import {BattleSceneView} from "../../view/index";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {MultiTween} from "../../../../depricated-tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {createEmptyMultiTween} from "../../../../depricated-tween/multi-tween/empty-multi-tween";

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
  return createEmptyMultiTween();
/*  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
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

  return {start, end};*/
}

