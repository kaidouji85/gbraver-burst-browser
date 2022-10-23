// @flow

import { TutorialTitle } from "../../../dom-scenes/tutorial-title";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<TutorialTitle>;

/** チュートリアルタイトル画面とゲームアクションを関連付ける */
export const tutorialTitleConnector: Connector = () => [];
