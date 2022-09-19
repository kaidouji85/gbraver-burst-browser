// @flow
import {Howl} from 'howler';
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {DOMDialog} from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS = 'matching';

/** data-idを集めたもの */
type DataIDs = {closer: string};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <span class="${ROOT_CLASS}__caption">マッチング中......</span>    
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {closer: HTMLImageElement,};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const closerElement = root.querySelector(`[data-id="${ids.closer}"]`);
  const closer = (closerElement instanceof HTMLImageElement) ? closerElement : document.createElement('img');
  return {closer};
}

/** マッチング ダイアログ */
export class MatchingDialog implements DOMDialog {
  #root: HTMLElement;
  #closer: HTMLImageElement;
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #exclusive: Exclusive;
  #matchingCanceled: StreamSource<void>;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {closer: domUuid(), cancel: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, resources);
    const elements = extractElements(this.#root, ids);
    this.#closer = elements.closer;
    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this.#exclusive = new Exclusive();
    this.#matchingCanceled = createStreamSource();
    this.#unsubscribers = [
      pushDOMStream(this.#closer).subscribe(action => {
        this.#onCloserPush(action);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * マッチングキャンセル通知
   *
   * @return 通知ストリーム
   */
  matchingCanceledNotifier(): Stream<void> {
    return this.#matchingCanceled;
  }

  /**
   * クローザが押された際の処理
   *
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#changeValue.play();
      await pop(this.#closer, 1.3);
      this.#matchingCanceled.next();
    });
  }
}