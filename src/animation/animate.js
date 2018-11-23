// @flow

import {Tween} from '@tweenjs/tween.js';

/**
 * アニメーション
 * tween.jsではアニメーションのモジュール化の機能が十分でないので、それを補うべく本クラスを作成した
 *
 * 例) アニメーションを合成する
 *
 * // punch: () => Animate
 * // damageNumber: () => Animate
 * // knockBack: () => Animate
 * // dead: () => Animate
 * // refreshGauge: () => Animate
 * // visibleButtonA: () => Animate
 * // visibleButtonB: () => Animate
 *
 * const battleAnimation = punch()
 *   .chain(delay(100))
 *   .chain(
 *     // damageNumber、knockBackは同時に再生される
 *     damageNumber(),
 *     knockBack()
 *   ).chain(
 *     // deadはdamageNumberの後に再生される
 *     dead()
 *   );
 *
 * const visibleUI = refreshGauge()
 *   .chain(
 *     // visibleButtonA、visibleButtonBは同時に再生される
 *     visibleButtonA(),
 *     visibleButtonB(),
 *   )
 *
 * battleAnimation()
 *   .chain(visibleUI)
 *   .play()
 *
 *
 * 例) 直接TweenAnimatonを初期化する
 *
 * const t1 = new Tween(model)
 *   .to({x: 100, y: 200}, 500);
 * const t2 = new Tween(model)
 *   .to({x: 0, y: 0}, 500)
 *   .chain(t1);
 * const animation = new Animate(t1, t2);
 * animation.play();
 */
export class Animate {
  _start: Tween;
  _end: Tween;

  /**
   * 連続したTweenの最初、最後からTweenAnimatonを生成する
   *
   * @param start 連続したTweenの最初
   * @param end 連続したTweenの最後
   */
  constructor(start: Tween, end: Tween) {
    this._start = start;
    this._end = end;
  }

  /** アニメーションを再生する */
  play(): Promise<void> {
    return new Promise(resolve => {
      this._start.start();
      this._end.onComplete(() => {
        resolve();
      });
    });
  }

  /**
   * アニメーションを結合する
   * 本アニメーション終了後に再生されるアニメーションを指定する
   * 後続アニメーションは複数可能だが、nextが最終要素として扱われる
   *
   * @param next 結合後に最終用として扱われる後続アニメーション
   * @param pararells 後続アニメーション
   * @return 結合後アニメーション
   */
  chain(next: Animate, ...pararells: Animate[]): Animate {
    const pararellTweens = pararells.map(v => v._start);
    this._end.chain(next._start, ...pararellTweens);
    this._end = next._end;
    return this;
  }
}