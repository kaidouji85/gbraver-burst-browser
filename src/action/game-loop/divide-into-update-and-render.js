// @flow
import {Observable, Subject} from "rxjs";
import type {GameLoop} from "./game-loop";

type Result = {
  update: Observable<GameLoop>,
  render: Observable<GameLoop>
};

/**
 * ゲームループを更新、描画に分割する
 * 分割したストリームは、
 *
 * 1)update
 * 2)renderListener
 *
 * の順番に呼び出される
 *
 * @param origin 分割前のゲームループ
 * @return 分割結果
 */
export function divideIntoUpdateAndRender(origin: Observable<GameLoop>): Result {
  const update: Subject<GameLoop> = new Subject();
  const render: Subject<GameLoop> = new Subject();

  origin.subscribe(action => {
    update.next(action);
    render.next(action);
  });

  return {update, render};
}