import { Observable } from "rxjs";

import type { EpisodeID } from "../../../game/episodes/episode";
import type { Resources } from "../../../resource";
import { Episode } from "./episode";
import { selected } from "./procedure/selected";
import {
  createTutorialStageElementProps,
  TutorialStageElementProps,
} from "./props";

/** チュートリアルステージ HTML要素 */
export class TutorialStageElement {
  /** ステージID */
  readonly id: EpisodeID;
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
  constructor(resources: Resources, stage: Episode, level: number) {
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
