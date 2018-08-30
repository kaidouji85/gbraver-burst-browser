import {Observable, Subject} from "rxjs";
import type {GameLoop} from "../../../action/game-loop/game-loop";

type Result = {
  hud: Observable<GameLoop>,
  threeDimension: Observable<GameLoop>
};

/**
 * ゲームループをHUDレイヤー、3Dレイヤーに分割する
 * 分割後のゲームループは、以下の順番で呼ばれる
 *
 * 1) hud
 * 2) threeDimension
 *
 * @param origin 変換元
 * @return 分割結果
 */
export function createLayerGameLoop(origin: Observable<GameLoop>): Result {
  const hud: Subject<GameLoop> = new Subject();
  const threeDimension: Subject<GameLoop> = new Subject();

  origin.subscribe(action => {
    threeDimension.next(action);
    hud.next(action);
  });

  return {hud, threeDimension};
}