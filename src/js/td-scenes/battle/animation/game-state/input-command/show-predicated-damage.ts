import { Command, PlayerId, PlayerState } from "gbraver-burst-core";

import { BattleControllerType } from "../../../controller-type";
import { getEnableMaxBattery } from "../../../get-enable-max-battery";
import { getInitialBattery } from "../../../get-initial-battery";
import { HUDPlayer } from "../../../view/hud/player";
import { calcPredicatedDamage } from "../calc-predicated-damage";

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
  const nowPlayerBattery =
    controllerType === "BigButton"
      ? getInitialBattery(enableMaxBattery)
      : player.armdozer.battery;
  const predicatedDamage = calcPredicatedDamage({
    attacker,
    defender,
    playerId,
    nowPlayerBattery,
  });
  return defenderHUD.predicatedDamage.show(predicatedDamage);
};
