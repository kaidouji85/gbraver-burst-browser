import { pop } from "../../dom/animation";
import { pushDOMStream } from "../../dom/event-stream";
import type { TutorialStageID } from "../../game/tutorial-stages";
import type { Resources } from "../../resource";
import type { SoundResource } from "../../resource/sound";
import { createEmptySoundResource, SOUND_IDS } from "../../resource/sound";
import { map } from "../../stream/operator";
import type { Stream } from "../../stream/stream";

/** ルートHTML class属性 */
const ROOT_CLASS = "tutorial-stage";

/**
 * ルート要素のinnerHTML
 * @param level ステージレベル
 * @param title ステージタイトル
 * @return innerHTML
 */
function rootInnerHTML(level: number, title: string): string {
  return `
    <div class="${ROOT_CLASS}__prefix">${level}.　</div>
    <div class="${ROOT_CLASS}__title">${title}</div>
  `;
}

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;

  /** チュートリアルステージタイトル */
  title: string;
};

/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID;

  /** ステージレベル */
  level: number;
};

/** チュートリアルステージ HTML要素 */
export class TutorialStageElement {
  /** ステージID */
  readonly id: TutorialStageID;

  /** ステージレベル */
  readonly level: number;

  /** ルートHTML要素 */
  #root: HTMLElement;

  /** プッシュボタン効果音 */
  #pushButton: SoundResource;

  /** 選択通知ストリーム */
  #select: Stream<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param stage ステージ情報
   * @param level ステージレベル
   */
  constructor(resources: Resources, stage: TutorialStage, level: number) {
    this.id = stage.id;
    this.level = level;
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource();
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(level, stage.title);
    this.#select = pushDOMStream(this.#root).chain(
      map((action) => {
        action.event.preventDefault();
        action.event.stopPropagation();
      })
    );
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ステージ選択通知
   *
   * @return 通知ストリーム
   */
  notifyStageSelection(): Stream<void> {
    return this.#select;
  }

  /**
   * ステージ選択アニメーション
   *
   * @return アニメーションが完了したら発火するPromise
   */
  async selected(): Promise<void> {
    this.#pushButton.sound.play();
    await pop(this.#root);
  }
}
