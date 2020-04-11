// @flow

import type {NeoLandozerCutInModel} from "./neo-landozer-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): NeoLandozerCutInModel {
  return {
    opacity: 1
  };
}