// @flow
import { Howl } from "howler";

import type { BGMManager } from "../../../../bgm/bgm-manager";
import { fadeIn, play } from "../../../../bgm/bgm-operators";
import type { PushDOM } from "../../../../dom/event-stream";
import { pushDOMStream } from "../../../../dom/event-stream";
import type { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path";
import type { SoundResource } from "../../../../resource/sound";
import {
  createEmptySoundResource,
  SOUND_IDS,
} from "../../../../resource/sound";
import type {
  Stream,
  StreamSource,
  Unsubscriber,
} from "../../../../stream/stream";
import { createStreamSource } from "../../../../stream/stream";
import { domUuid } from "../../../../uuid/dom-uuid";
import { waitElementLoaded } from "../../../../wait/wait-element-loaded";
import type { DOMScene } from "../dom-scene";

/** ルート要素のclass属性 */
const ROOT_CLASS = "npc-ending";

/** data-idを集めたもの */
type DataIDs = {
  end: string,
  logo: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs) {
  return `
    <img class="${ROOT_CLASS}__end" data-id="${ids.end}">
    <img class="${ROOT_CLASS}__logo" data-id="${ids.logo}">
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  end: HTMLImageElement,
  logo: HTMLImageElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const selectedEnd = root.querySelector(`[data-id="${ids.end}"]`);
  const end =
    selectedEnd instanceof HTMLImageElement
      ? selectedEnd
      : document.createElement("img");
  const selectedLogo = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo =
    selectedLogo instanceof HTMLImageElement
      ? selectedLogo
      : document.createElement("img");
  return { end, logo };
}

/** NPCルート エンディング */
export class NPCEnding implements DOMScene {
  #root: HTMLElement;
  #isEndCardLoaded: Promise<void>;
  #isEndLoaded: Promise<void>;
  #isLogoLoader: Promise<void>;
  #pushButtonSound: typeof Howl;
  #bgm: BGMManager;
  #endingBGM: SoundResource;
  #canOperation: boolean;
  #endNPCEnding: StreamSource<void>;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   */
  constructor(resources: Resources, bgm: BGMManager) {
    const ids = { end: domUuid(), logo: domUuid() };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids);

    const elements = extractElements(this.#root, ids);
    const titleBackImage = new Image();
    titleBackImage.src =
      resources.paths.find((v) => v.id === PathIds.END_CARD)?.path ?? "";
    this.#isEndCardLoaded = waitElementLoaded(titleBackImage).then(() => {
      this.#root.style.backgroundImage = `url(${titleBackImage.src})`;
    });
    this.#isEndLoaded = waitElementLoaded(elements.end);
    elements.end.src =
      resources.paths.find((v) => v.id === PathIds.END)?.path ?? "";
    this.#isLogoLoader = waitElementLoaded(elements.logo);
    elements.logo.src =
      resources.paths.find((v) => v.id === PathIds.LOGO)?.path ?? "";

    this.#pushButtonSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl();
    this.#bgm = bgm;
    this.#endingBGM =
      resources.sounds.find((v) => v.id === SOUND_IDS.NPC_ENDING) ??
      createEmptySoundResource();
    this.#canOperation = true;
    this.#endNPCEnding = createStreamSource();
    this.#unsubscriber = [
      pushDOMStream(this.#root).subscribe((action) => {
        this.#onScreenPush(action);
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * BGMの再生開始
   *
   * @return BGM再生が完了したら発火するPromise
   */
  async playBGM(): Promise<void> {
    await this.#bgm.do(play(this.#endingBGM));
    await this.#bgm.do(fadeIn);
  }

  /**
   * NPCエンディング終了を通知する
   *
   * @return 通知ストリーム
   */
  endNPCEndingNotifier(): Stream<void> {
    return this.#endNPCEnding;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#isEndLoaded,
      this.#isEndCardLoaded,
      this.#isLogoLoader,
    ]);
  }

  /**
   * 画面がクリックされた際の処理
   *
   * @param action アクション
   */
  #onScreenPush(action: PushDOM): void {
    if (!this.#canOperation) {
      return;
    }

    this.#canOperation = false;
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#pushButtonSound.play();
    this.#endNPCEnding.next();
  }
}
