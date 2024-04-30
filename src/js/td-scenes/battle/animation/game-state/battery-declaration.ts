import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay, empty } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { TDPlayer } from "../../view/td/player";
import { StateAnimationProps } from "./state-animation-props";

/**
 * バッテリー宣言アニメーション
 * @param td 3Dレイヤーのプレイヤーオブジェクト
 * @param value バッテリー値
 * @returns アニメーション
 */
function declaration(td: TDPlayer, value: number): Animate {
  return td.batteryNumber.show(value).chain(delay(800));
}

/**
 * バッテリー宣言の効果音
 * プレイヤー、敵側で同時再生したくないので、
 * declarationとは別関数に切り出している
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション
 */
function declarationSound(props: StateAnimationProps): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryDeclaration);
  });
}

/**
 * 補正ありのバッテリー宣言
 * @param td 3Dレイヤーのプレイヤーオブジェクト
 * @param origin 本来のバッテリー
 * @param correct バッテリー補正値
 * @param value 出したバッテリー
 * @returns アニメーション
 */
function declarationWithCorrect(
  td: TDPlayer,
  origin: number,
  correct: number,
  value: number,
): Animate {
  return td.batteryNumber
    .show(origin)
    .chain(delay(300))
    .chain(
      all(td.batteryNumber.change(value), td.batteryCorrect.popUp(correct)),
    )
    .chain(delay(200));
}

/**
 * バッテリー補正ありの場合の効果音
 * declarationWithCorrectとタイミングを合わせている
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション
 */
function declarationSoundWithCorrect(props: StateAnimationProps): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryDeclaration);
  })
    .chain(delay(600))
    .chain(
      onStart(() => {
        se.play(sounds.batteryDeclaration);
      }),
    );
}

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

  const {
    attackerBattery,
    originalBatteryOfAttacker,
    defenderBattery,
    originalBatteryOfDefender,
  } = effect;
  const attackerCorrect = attackerBattery - originalBatteryOfAttacker;
  const shouldAttackerCorrect = attackerCorrect !== 0;

  const defenderCorrect = defenderBattery - originalBatteryOfDefender;
  const shouldDefenderCorrect = defenderCorrect !== 0;

  const shouldCorrectSoundPlayer =
    shouldAttackerCorrect || shouldDefenderCorrect;

  const isPlayerAttacker = effect.attacker === playerId;
  return all(
    view.td.gameObjects.turnIndicator.show(isPlayerAttacker),
    attackerHUD.gauge.battery(attacker.armdozer.battery),
    defenderHUD.gauge.battery(defender.armdozer.battery),
    attackerTDArmdozer.sprite().endActive(),

    shouldAttackerCorrect
      ? declarationWithCorrect(
          attackerTD,
          originalBatteryOfAttacker,
          attackerCorrect,
          attackerBattery,
        )
      : declaration(attackerTD, attackerBattery),

    shouldDefenderCorrect
      ? declarationWithCorrect(
          defenderTD,
          originalBatteryOfDefender,
          defenderCorrect,
          defenderBattery,
        )
      : declaration(defenderTD, defenderBattery),

    shouldCorrectSoundPlayer
      ? declarationSoundWithCorrect(props)
      : declarationSound(props),
  ).chain(
    empty(),
    attackerTD.batteryNumber.hidden(),
    defenderTD.batteryNumber.hidden(),
    view.td.gameObjects.turnIndicator.invisible(),
  );
}
