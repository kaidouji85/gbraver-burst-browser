import { Observable } from "rxjs";

import { PostBattle } from "../../post-battle";
import { createPostBattleFloaterProps } from "./procedures/create-post-battle-floater-props";
import { destructor } from "./procedures/destructor";
import { hide } from "./procedures/hide";
import { show } from "./procedures/show";
import { PostBattleFloaterProps } from "./props";
import { ShowParams } from "./show-params";

/** バトル終了後行動選択フローター */
export class PostBattleFloater {
  /** プロパティ */
  #props: PostBattleFloaterProps;

  /**
   * コンストラクタ
   * 本クラスの初期表示は(display: none)である
   */
  constructor() {
    this.#props = createPostBattleFloaterProps();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    destructor(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * アニメーション付きでフローターを表示する
   * @param params 表示パラメータ
   * @returns アニメーションが完了したら発火するPromise
   */
  async show(params: ShowParams): Promise<void> {
    await show(this.#props, params);
  }

  /**
   * フローターを非表示にする
   */
  hidden(): void {
    hide(this.#props);
    destructor(this.#props);
  }

  /**
   * 選択完了通知
   * ストリームには選択した戦闘終了後の挙動が渡される
   * @returns 通知ストリーム
   */
  selectionCompleteNotifier(): Observable<PostBattle> {
    return this.#props.selectionComplete;
  }
}
