// @flow

import { StageTitle } from "../../../dom-scenes/stage-title/stage-title";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<StageTitle>;

/** ステージタイトル画面とゲームアクションを関連付ける */
export const stageTitleConnector: Connector = () => [];
