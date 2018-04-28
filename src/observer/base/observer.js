// @flow

import type {Notifier} from "./notifier";
import type {ActionHandler, Listener} from "./listener";

export class Observer<T> implements Notifier<T>, Listener<T> {
  _handlerList: ActionHandler<T>[];

  constructor() {
    this._handlerList = [];
  }

  notify(action: T): void {
    this._handlerList.forEach(v => v(action));
  }

  add(handler: ActionHandler<T>): void {
    this._handlerList.push(handler);
  }

  remove(handler: ActionHandler<T>): void {
    this._handlerList.filter(v => v!== handler);
  }
}