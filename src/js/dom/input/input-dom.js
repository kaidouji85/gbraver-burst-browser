// @flow
import type {Stream} from "../../stream/stream";
import {createStream} from "../../stream/stream";
import {fromEvent} from "rxjs";
import {map} from '../../stream/operator';

/** inputイベントをラッピングしたもの */
export type InputDOM = {
  type: 'ChangeDOM',
  /** イベントオブジェクト */
  event: InputEvent
};

/**
 * inputイベントからストリームを生成する
 *
 * @param dom ストリーム生成元のDOM
 * @returns 生成結果
 */
export function inputDOMStream(dom: HTMLInputElement): Stream<InputDOM> {
  return createStream(fromEvent(dom, 'input'))
    .chain(map(event => ({type: 'ChangeDOM', event})));
}