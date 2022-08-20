// @flow
import {Animate} from "../../../animation/animate";
import type {BattleSceneProps} from "./battle-scene-props";

/**
 * @deprecated
 * 戦闘シーンでアニメーションを再生するヘルパー関数
 * 戦闘シーンステートに設定されたタイムスケールをセットするために、本関数を利用する想定である
 * 
 * @param animate 再生するアニメーション 
 * @param state 戦闘シーンプロパティ
 * @return アニメーション再生が完了したら発火するPromise
 */
export async function playAnimation(animate: Animate, props: $ReadOnly<BattleSceneProps>): Promise<void> {
  await animate.timeScale(props.state.animationTimeScale).play();
}

type AnimationPlayer = {
  play(animate: Animate): Promise<void>;
}

export const animationPlayer = (props: $ReadOnly<BattleSceneProps>): AnimationPlayer => ({
  play: (animate: Animate) => animate.timeScale(props.state.animationTimeScale).play()
});