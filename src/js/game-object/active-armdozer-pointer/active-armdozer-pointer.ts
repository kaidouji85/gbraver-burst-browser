import * as THREE from "three";

import { ActiveArmdozerPointerModel } from "./model/active-armdozer-pointer-model";
import { createInitialValue } from "./model/create-initial-value";
import { ActiveArmdozerPointerView } from "./view/active-armdozer-pointer-view";

/** アクティブアームドーザポインター */
export class ActiveArmdozerPointer {
  #model: ActiveArmdozerPointerModel;
  #view: ActiveArmdozerPointerView;

  /**
   * コンストラクタ
   * @param view ビュー
   */
  constructor(view: ActiveArmdozerPointerView) {
    this.#model = createInitialValue();
    this.#view = view;
  }

  /**
   * シーンに追加するオブジェクトを返す
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }
}
