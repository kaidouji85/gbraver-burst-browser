import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { onStart } from "../../../../../animation/on-start";
import { TDPlayer } from "../../../view/td/player";
import { StateAnimationProps } from "../state-animation-props";

/** バッテリー宣言アニメーションのパラメータ */
type DeclarationParams = {
  /** 3Dプレイヤーオブジェクト */
  td: TDPlayer;
  /** 宣言したバッテリー値 */
  value: number;
};

/**
 * バッテリー宣言アニメーション
 * @param params パラメータ
 * @returns アニメーション
 */
function declaration(params: DeclarationParams): Animate {
  const { td, value } = params;
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

/** 補正ありバッテリー宣言のパラメータ */
type DeclarationWithCorrectParams = DeclarationParams & {
  /** 本来出したバッテリー値 */
  origin: number;
  /** バッテリーの補正値 */
  correct: number;
};

/**
 * 補正ありのバッテリー宣言
 * @param params パラメータ
 * @returns アニメーション
 */
function declarationWithCorrect(params: DeclarationWithCorrectParams): Animate {
  const { td, value, origin, correct } = params;
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

  const shouldCorrectSoundPlayer =
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
