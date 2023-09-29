import { EpisodeTitle } from "../../dom-scenes/episode-title";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<EpisodeTitle>;

/** チュートリアルタイトル画面とゲームアクションを関連付ける */
export const tutorialTitleConnector: Connector = () => [];
