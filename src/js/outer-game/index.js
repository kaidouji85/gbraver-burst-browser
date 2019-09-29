// @flow

import {Loading} from "./loading/loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    loading: Observable<LoadingAction>
  }
};

/** Three.JSシーン以外をまとめたもの */
export class OuterGame {
  /** ローディング */
  _loading: Loading;

  constructor(param: Param) {
    this._loading = new Loading({
      listener: {
        loading: param.listener.loading
      }
    });
  }
}