import { BattleSimulatorProps } from "../props";

/**
 * バッテリーボタンを入力状況に応じて更新する
 * @param props プロパティ
 */
export const updateBatteryButtons = (props: BattleSimulatorProps) => {
  const {
    player,
    playerBattery,
    playerElements,
    enemy,
    enemyBattery,
    enemyElements,
  } = props;
  playerElements.batteryMinus.disabled = playerBattery <= 0;
  playerElements.batteryPlus.disabled =
    player.armdozer.battery <= playerBattery;
  enemyElements.batteryMinus.disabled = enemyBattery <= 0;
  enemyElements.batteryPlus.disabled = enemy.armdozer.battery <= enemyBattery;
};
