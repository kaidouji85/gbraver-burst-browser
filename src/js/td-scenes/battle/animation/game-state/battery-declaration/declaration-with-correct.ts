import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay } from "../../../../../animation/delay";
import { onStart } from "../../../../../animation/on-start";
import { StateAnimationProps } from "../state-animation-props";
import { DeclarationParams } from "./declaration";

/** 補正ありバッテリー宣言のパラメータ */
export type DeclarationWithCorrectParams = DeclarationParams & {
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
export function declarationWithCorrect(
  params: DeclarationWithCorrectParams,
): Animate {
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
export function declarationSoundWithCorrect(
  props: StateAnimationProps,
): Animate {
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
