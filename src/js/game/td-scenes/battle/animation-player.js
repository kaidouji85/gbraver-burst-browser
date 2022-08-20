// @flow
import {Animate} from "../../../animation/animate";
import type {BattleSceneProps} from "./battle-scene-props";

/**
 * 戦闘シーン専用アニメーションプレイヤー
 * 戦闘シーンステートに設定されたタイムスケールを常にセットするために、本オブジェクトを利用する
 */
type AnimationPlayer = {
  /**
   * アニメーションを再生する
   *
   * @param animate アニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  play(animate: Animate): Promise<void>;
}

/**
 * アニメーションプレイヤーを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @return 生成したアニメーションプレイヤー
 */
export const animationPlayer = (props: $ReadOnly<BattleSceneProps>): AnimationPlayer => ({
  play: (animate: Animate) => animate.timeScale(props.animationTimeScale).play()
});