import { Observable } from "rxjs";

import type { TutorialStageID } from "../../../game/tutorial-stages/tutorial-stage";
import type { Resources } from "../../../resource";
import { selected } from "./procedure/selected";
import {
  createTutorialStageElementProps,
  TutorialStageElementProps,
} from "./props";
import { TutorialStage } from "./tutorial-stage";

/** チュートリアルステージ HTML要素 */
export class TutorialStageElement {
  /** ステージID */
  readonly id: TutorialStageID;
  /** ステージレベル */
  readonly level: number;
  /** プロパティ */
  #props: TutorialStageElementProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param stage ステージ情報
   * @param level ステージレベル
   */
  constructor(resources: Resources, stage: TutorialStage, level: number) {
    this.id = stage.id;
    this.level = level;
    this.#props = createTutorialStageElementProps(resources, stage, level);
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ステージ選択通知
   * @return 通知ストリーム
   */
  notifyStageSelection(): Observable<void> {
    return this.#props.select;
  }

  /**
   * ステージ選択アニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  async selected(): Promise<void> {
    await selected(this.#props);
  }
}
