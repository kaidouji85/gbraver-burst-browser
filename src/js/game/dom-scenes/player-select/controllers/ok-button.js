// @flow

import {Observable, Subject, Subscription} from "rxjs";
import {pushDOMStream} from "../../../../action/push/push-dom";

export class OkButton {
  _root: HTMLButtonElement;
  _pushed: Subject<void>;
  _subscription: Subscription;

  constructor(label: string) {
    this._root = document.createElement('button');
    this._root.className = 'player-select__ok-button';
    this._root.innerText = label;

    this._pushed = new Subject();
    this._subscription = pushDOMStream(this._root).subscribe(() => {
      this._pushed.next();
    });
  }

  destructor(): void {
    this._subscription.unsubscribe();
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  pushedNotifier(): Observable<void> {
    return this._pushed;
  }
}