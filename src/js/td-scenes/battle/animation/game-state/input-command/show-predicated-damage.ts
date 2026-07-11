import { Command, PlayerId, PlayerState } from "gbraver-burst-core";

import { BattleControllerType } from "../../../controller-type";
import { getEnableMaxBattery } from "../../../get-enable-max-battery";
import { getInitialBattery } from "../../../get-initial-battery";
import { HUDPlayer } from "../../../view/hud/player";
import { deprecated_calcPredicatedDamage } from "../calc-predicated-damage";

/**
 * ダメージ予想を表示する
 * @param options オプション
 * @param options.attacker 攻撃側プレイヤー
 * @param options.defender 防御側プレイヤー
 * @param options.defenderHUD 防御側プレイヤーのHUD
 * @param options.playerId プレイヤーID
 * @param options.commands コマンド
 * @param options.controllerType コントローラー種別
 * @returns アニメーション
 */
export const showPredicatedDamage = (options: {
  attacker: PlayerState;
  defender: PlayerState;
  defenderHUD: HUDPlayer;
  playerId: PlayerId;
  commands: Command[];
  controllerType: BattleControllerType;
}) => {
  const {
    attacker,
    defender,
    playerId,
    commands,
    controllerType,
    defenderHUD,
  } = options;
  const player = attacker.playerId === playerId ? attacker : defender;
  const enableMaxBattery = getEnableMaxBattery(commands);
  const playerBattery =
    controllerType === "BigButton"
      ? getInitialBattery(enableMaxBattery)
      : player.armdozer.battery;
  const predicatedDamage = deprecated_calcPredicatedDamage({
    attacker,
    defender,
    playerId,
    playerBattery,
  });
  return defenderHUD.predicatedDamage.show(predicatedDamage);
};
