import { Animate } from "../../../../../animation/animate";
import { delay } from "../../../../../animation/delay";
import { onStart } from "../../../../../animation/on-start";
import { TDPlayer } from "../../../view/td/player";
import { StateAnimationProps } from "../state-animation-props";

/** バッテリー宣言アニメーションのパラメータ */
export type DeclarationParams = {
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
export function declaration(params: DeclarationParams): Animate {
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
export function declarationSound(props: StateAnimationProps): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryDeclaration);
  });
}
