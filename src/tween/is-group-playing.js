// @flow
import {Group, Tween} from '@tweenjs/tween.js';

/**
 * 指定したTween.Groupに再生中のTweenがあるか否かを判定する
 * trueで再生中のTweenあり
 *
 * @param group 判定対象のTween.Group
 * @return 判定結果
 */
export function isGroupPlaying(group: Group): boolean {
  return group.getAll()
    .map(v => v.isPlaying)
    .filter(v => v === true)
    .length > 0;
}