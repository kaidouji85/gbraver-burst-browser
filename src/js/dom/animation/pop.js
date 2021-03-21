// @flow

import {waitFinishAnimation} from "../../wait/wait-finish-animation";

/**
 * ポップアニメーション
 *
 * @param element アニメーション対象のHTML要素
 * @param scale ポップする大きさ
 * @return アニメーション
 */
export async function pop(element: HTMLElement, scale: number = 1.1): Promise<void> {
  const animation = element.animate([
    {transform: 'scale(1)'},
    {transform: `scale(${scale})`},
    {transform: 'scale(1)'},
  ], {
    duration: 200,
    fill: "forwards",
    easing: 'ease'
  });
  await waitFinishAnimation(animation);
}