import { EpisodeTitle } from "../../dom-scenes/episode-title";
import { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<EpisodeTitle>;

/** エピソードタイトル画面とゲームアクションを関連付ける */
export const episodeTitleConnector: Connector = () => [];
