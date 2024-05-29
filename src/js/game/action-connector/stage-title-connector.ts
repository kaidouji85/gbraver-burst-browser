import { StageTitle } from "../../dom-scenes/stage-title";
import type { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<StageTitle>;

/** ステージタイトル画面とゲームアクションを関連付ける */
export const stageTitleConnector: Connector = () => [];
