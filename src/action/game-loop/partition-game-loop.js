// @flow
import {Observable, Subject} from "rxjs";
import type {GameLoop} from "./game-loop";

export function partitionGameLoop(origin: Observable<GameLoop>): { update: Observable<GameLoop>, render: Observable<GameLoop> } {
  const update: Subject<GameLoop> = new Subject();
  const render: Subject<GameLoop> = new Subject();

  origin.subscribe(action => {
    update.next(action);
    render.next(action);
  });

  return {update, render};
}