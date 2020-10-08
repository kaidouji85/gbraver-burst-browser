// @flow

import type {Resources} from "../../../resource";
import {ArmdozerSelector} from "./arndozer-selector";
import type {ArmDozerId} from "gbraver-burst-core";

export class PlayerSelectPresentation {
  _root: HTMLElement;
  _armdozerSelector: ArmdozerSelector;

  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this._root = document.createElement('div');
    this._root.className = 'player-select';

    this._armdozerSelector = new ArmdozerSelector(resources,armDozerIds);
    this._root.appendChild(this._armdozerSelector.getRootHTMLElement());
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}