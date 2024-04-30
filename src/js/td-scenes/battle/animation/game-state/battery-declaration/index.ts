import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { StateAnimationProps } from "../state-animation-props";
import { declaration, declarationSound } from "./declaration";
import {
  declarationSoundWithCorrect,
  declarationWithCorrect,
} from "./declaration-with-correct";

/**
 * バッテリー宣言アニメーション
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @returns アニメーション
 */
export function batteryDeclarationAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<BatteryDeclaration>,
): Animate {
  const { view, playerId } = props;
  const { players, effect } = gameState;

  const attacker = players.find((v) => v.playerId === effect.attacker);
  const defender = players.find((v) => v.playerId !== effect.attacker);
  if (!attacker || !defender) {
    return empty();
  }

  const attackerTD = view.td.players.find(
    (v) => v.playerId === attacker.playerId,
  );
  const attackerTDArmdozer = view.td.armdozers.find(
    (v) => v.playerId === attacker.playerId,
  );
  const attackerHUD = view.hud.players.find(
    (v) => v.playerId === attacker.playerId,
  );
  const defenderTD = view.td.players.find(
    (v) => v.playerId === defender.playerId,
  );
  const defenderHUD = view.hud.players.find(
    (v) => v.playerId === defender.playerId,
  );
  if (
    !attackerTD ||
    !attackerTDArmdozer ||
    !attackerHUD ||
    !defenderTD ||
    !defenderHUD
  ) {
    return empty();
  }

  const { attackerBattery, originalBatteryOfAttacker } = effect;
  const attackerCorrect = attackerBattery - originalBatteryOfAttacker;
  const shouldAttackerCorrect = attackerCorrect !== 0;
  const attackerDeclarationParams = {
    td: attackerTD,
    value: attackerBattery,
    origin: originalBatteryOfAttacker,
    correct: attackerCorrect,
  };

  const { defenderBattery, originalBatteryOfDefender } = effect;
  const defenderCorrect = defenderBattery - originalBatteryOfDefender;
  const shouldDefenderCorrect = defenderCorrect !== 0;
  const defenderDeclarationParams = {
    td: defenderTD,
    value: defenderBattery,
    origin: originalBatteryOfDefender,
    correct: defenderCorrect,
  };

  const shouldSoundCorrect =
    shouldAttackerCorrect || shouldDefenderCorrect;

  const isPlayerAttacker = effect.attacker === playerId;
  return all(
    view.td.gameObjects.turnIndicator.show(isPlayerAttacker),
    attackerHUD.gauge.battery(attacker.armdozer.battery),
    defenderHUD.gauge.battery(defender.armdozer.battery),
    attackerTDArmdozer.sprite().endActive(),

    shouldAttackerCorrect
      ? declarationWithCorrect(attackerDeclarationParams)
      : declaration(attackerDeclarationParams),

    shouldDefenderCorrect
      ? declarationWithCorrect(defenderDeclarationParams)
      : declaration(defenderDeclarationParams),

    shouldSoundCorrect
      ? declarationSoundWithCorrect(props)
      : declarationSound(props),
  ).chain(
    empty(),
    attackerTD.batteryNumber.hidden(),
    defenderTD.batteryNumber.hidden(),
    view.td.gameObjects.turnIndicator.invisible(),
  );
}
