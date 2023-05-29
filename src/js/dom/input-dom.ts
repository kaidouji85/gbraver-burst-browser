import {fromEvent, map, Observable} from "rxjs";

/** inputイベントをラッピングしたもの */
export type InputDOM = {
  type: "ChangeDOM";
  /** イベントオブジェクト */
  event: InputEvent;
};

/**
 * inputイベントからストリームを生成する
 * @param dom ストリーム生成元のDOM
 * @returns 生成結果
 */
export function inputDOMStream(dom: HTMLInputElement): Observable<InputDOM> {
  return fromEvent<InputEvent>(dom, "input").pipe(
    map((event) => ({
      type: "ChangeDOM",
      event,
    }))
  );
}
