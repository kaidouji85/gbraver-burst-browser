import { PreRender } from "../../../game-loop/pre-render";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ResultIndicatorModel } from "../model/result-indicator-model";
import { SimpleIndicatorView } from "./simple-result-indicator";

/** Lose インジケータービュー */
export class LoseIndicatorView extends SimpleIndicatorView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const { texture } = findTextureOrThrow(resources, TEXTURE_IDS.LOSE);
    super(texture, 150, 60);
  }

  /** @override */
  engage(model: ResultIndicatorModel, preRender: PreRender): void {
    const updatedModel = {
      ...model,
      localCoordinate: {
        ...model.localCoordinate,
        x: -model.localCoordinate.x,
      },
    };
    super.engage(updatedModel, preRender);
  }
}
