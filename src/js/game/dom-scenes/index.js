// @flow

import {Observable} from "rxjs";
import {Title} from "./title";
import type {PushGameStart, PushHowToPlay} from "../../action/game/title";
import type {ResourcePath} from "../../resource/path/resource-path";
import {PlayerSelect} from "./player-select";
import type {DOMScene} from "./dom-scene";
import type {SelectArmdozer} from "../../action/player-select/select-armdozer";

/** コンストラクタのパラメータ */
type Param = {
  resourcePath: ResourcePath
};

/** イベント通知 */
type Notifier = {
  pushGameStart: Observable<PushGameStart>,
  pushHowToPlay: Observable<PushHowToPlay>,
  selectArmdozer: Observable<SelectArmdozer>,
};

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  _title: Title;
  _playerSelect: PlayerSelect;
  _notifier: Notifier;

  constructor(param: Param) {
    this._title = new Title(param.resourcePath);
    this._playerSelect = new PlayerSelect(param.resourcePath);

    const titleNotifier = this._title.notifier();
    const playerSelectNotifier = this._playerSelect.notifier();
    this._notifier = {
      pushGameStart: titleNotifier.pushGameStart,
      pushHowToPlay: titleNotifier.pushHowToPlay,
      selectArmdozer: playerSelectNotifier.selectArmdozer,
    };
  }

  /** デストラクタ相当の処理 */
  destructor() {
    // NOP
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return this._notifier;
  }

  /** タイトルを表示する */
  showTitle(): void {
    this._showScene(this._title);
  }

  /**
   * プレイヤーセレクトを表示する
   */
  showPlayerSelect(): void {
    this._showScene(this._playerSelect);
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    this._getDOMScenes().forEach(scene => {
      scene.hidden();
    });
  }

  /**
   * 本クラスに含まれる全てのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElements(): HTMLElement[] {
    return this._getDOMScenes()
      .map(scene => scene.getRootHTMLElement());
  }

  /**
   * 本クラスに含まれる全てのシーンを取得する
   *
   * @return 取得結果
   */
  _getDOMScenes(): DOMScene[] {
    return [
      this._title,
      this._playerSelect
    ];
  }

  /**
   * 特定のシーンだけを表示するヘルパーメソッド
   * 指定したシーン以外は非表示にする
   *
   * @param target 表示するシーン
   */
  _showScene(target: DOMScene): void {
    target.show();
    this._getDOMScenes()
      .filter(scene => scene !== target)
      .forEach(scene => {
        scene.hidden();
      });
  }
}