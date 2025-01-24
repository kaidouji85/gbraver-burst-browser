import { Animate, AnimationPlayOptions } from "../../animation/animate";

/** AnimatePlayerのプロパティ */
interface AnimatePlayerProps {
  /** アニメーションのタイムスケール */
  timeScale: number;
}

/**
 * Animateを再生するプレイヤー
 * タイムスケールなどシーン全体での設定を保持、適用するために利用される
 */
export interface AnimatePlayer extends AnimatePlayerProps {
  /**
   * アニメーションを再生する
   * @param animate アニメーション
   * @param options 再生オプション
   * @returns アニメーションが完了したら発火するPromise
   */
  play(animate: Animate, options?: AnimationPlayOptions): Promise<void>;
}

/** AnimatePlayerのシンプルな実装 */
class SimpleAnimatePlayer implements AnimatePlayer {
  /** @override */
  timeScale: number;

  /**
   * コンストラクタ
   * @param initialProps プロパティ初期値
   */
  constructor(initialProps: AnimatePlayerProps) {
    this.timeScale = initialProps.timeScale;
  }

  /** @override */
  play(animate: Animate, options?: AnimationPlayOptions) {
    return animate.timeScale(this.timeScale).play(options);
  }
}

/**
 * AnimatePlayerを生成する
 * @param initialProps プロパティ初期値
 * @returns 生成したAnimatePlayer
 */
export function createAnimatePlayer(
  initialProps: AnimatePlayerProps,
): AnimatePlayer {
  return new SimpleAnimatePlayer(initialProps);
}
