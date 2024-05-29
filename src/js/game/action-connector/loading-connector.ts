import { Loading } from "../../dom-scenes/loading";
import type { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<Loading>;

/** ローディング画面とゲームアクションを関連付ける */
export const loadingConnector: Connector = () => [];
