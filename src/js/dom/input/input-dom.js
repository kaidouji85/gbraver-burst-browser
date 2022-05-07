// @flow
import type {Stream} from "../../stream/stream";
import {createStream} from "../../stream/stream";
import {fromEvent} from "rxjs";
import {map} from '../../stream/operator';

/** DOMの入力状態が変更された */
export type ChangeDOM = {
  type: 'ChangeDOM',
  /** イベントオブジェクト */
  event: Event
};

/**
 * inputイベントからストリームを生成する
 *
 * @param dom ストリーム生成元のDOM
 * @returns 生成結果
 */
export function inputDOMStream(dom: HTMLInputElement): Stream<ChangeDOM> {
  return createStream(fromEvent(dom, 'input'))
    .chain(map(event => ({type: 'ChangeDOM', event})));
}