// @flow

import type {DamageIndicatorView} from "./view/damage-indicator-view";
import {createInitialValue} from "./model/initial-value";
import type {DamageIndicatorModel} from "./model/damage-indicator-model";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

type Param = {
  listener: Observable<GameObjectAction>,
  view: DamageIndicatorView
};

/** ダメージインジケータ */
export class DamageIndicator {
  _model: DamageIndicatorModel;
  _view: DamageIndicatorView;

  constructor(param: Param) {
    this._view = param.view;
    this._model = createInitialValue();
  }
}