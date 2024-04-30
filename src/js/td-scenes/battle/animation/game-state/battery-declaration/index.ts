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
import { extract } from "./extract";

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
  const { effect } = gameState;

  const extracted = extract(props, gameState);
  if (!extracted) {
    return empty();
  }

  const {
    attacker,
    attackerTD,
    attackerHUD,
    attackerTDArmdozer,
    defender,
    defenderTD,
    defenderHUD,
  } = extracted;

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

  const shouldSoundCorrect = shouldAttackerCorrect || shouldDefenderCorrect;

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
