import { Unsubscribable } from "rxjs";

import { createAbortError } from "../../../abort-controller/abort-error";
import { AbortManagerContainer } from "../../../abort-controller/abort-manager-container";
import { PostBattleFloater } from "../../../dom-floaters/post-battle";
import { DOMScene } from "../../../dom-scenes/dom-scene";
import { DOMSceneBinderContainer } from "../../../dom-scenes/dom-scene-binder/dom-scene-binder-container";
import { TDSceneBinder } from "../../../td-scenes/td-scene-binder";

/** シーン切り替えオプション */
type Options = Readonly<AbortManagerContainer> &
  Readonly<DOMSceneBinderContainer> & {
    /** 3Dシーンバインダ */
    readonly tdSceneBinder: TDSceneBinder;
    /** 切り替え先のDOMシーン */
    readonly scene: DOMScene;
    /** ポストバトルフローター */
    readonly postBattle: PostBattleFloater;
    /** バインドするシーンに関連するアンサブスクライバ */
    readonly unsubscribers: Unsubscribable[];
  };

/**
 * DOMシーンに切り替える
 * 切り替え前に3Dシーンを表示していた場合、そのシーンを破棄する
 * 本関数はこのフォルダ以外では呼び出してはならない
 * @param options シーン切り替えオプション
 */
export const switchDOMScene = (options: Options): void => {
  const {
    abort,
    postBattle,
    domSceneBinder,
    tdSceneBinder,
    scene,
    unsubscribers,
  } = options;
  abort.getAbortController().abort(createAbortError("switch scene"));
  postBattle.hide();
  if (tdSceneBinder.isSceneBound()) {
    tdSceneBinder.dispose();
  }
  domSceneBinder.bind(scene, unsubscribers);
};
