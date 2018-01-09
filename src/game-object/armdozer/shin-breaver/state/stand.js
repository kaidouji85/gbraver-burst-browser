// @flow

import {ShinBraverState} from '../base';
import type {ShinBraverModel} from "../base";

/** 立ち状態 */
export class StandState implements ShinBraverState {
  // TODO アニメーション処理を追加する
  gameLoop(model: ShinBraverModel): ShinBraverModel {
    return model;
  }
}