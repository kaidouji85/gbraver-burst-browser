// @flow
import {Howl} from 'howler';
import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {PushDOM} from "../../../dom/push/push-dom";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import type {DOMDialog} from "../dialog";
import {SOUND_IDS} from "../../../resource/sound";
import {Exclusive} from "../../../exclusive/exclusive";
import {pop} from "../../../dom/animation/pop";
import {createStreamSource} from "../../../stream/stream";

/**
 * 遊び方ダイアログ プレゼンテーション
 */
export class HowToPlay implements DOMDialog {
  _root: HTMLElement;
  _closer: HTMLElement;
  _close: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;
  _exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param movieURL 動画URL
   */
  constructor(resources: Resources, movieURL: string) {
    const closerId = domUuid();
    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();

    this._root = document.createElement('div');
    this._root.className = 'how-to-play';
    this._root.innerHTML = `
      <div class="how-to-play__background"></div>
      <img class="how-to-play__closer" alt="閉じる" src="${closerPath}" data-id="${closerId}"></img>
      <div class="how-to-play__dialog">
        <iframe class="how-to-play__dialog__movie" src="${movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
      </div>
    `;

    this._closer = this._root.querySelector(`[data-id="${closerId}"]`) || document.createElement('div');
    this._close = createStreamSource();

    this._unsubscribers = [
      pushDOMStream(this._closer).subscribe(action => {
        this._onCloserPush(action);
      }),

      pushDOMStream(this._root).subscribe(action => {
        this._onPushOutsideOfDialog(action);
      })
    ];
    this._exclusive = new Exclusive();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    })
  }

  /**
   * ダイアログ閉じの通知
   *
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this._close;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 閉じるアイコンを押した時の処理
   * 
   * @param action アクション
   */
  _onCloserPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void>=> {
      action.event.preventDefault();
      await Promise.all([
        this._changeValue.play(),
        pop(this._closer, 1.3)
      ]);
      this._close.next();
    });
  }

  /**
   * ダイアログ外を押した時の処理
   * 
   * @param action アクション
   */
  _onPushOutsideOfDialog(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void>=> {
      action.event.preventDefault();
      await this._changeValue.play();
      this._close.next();
    });
  }
}