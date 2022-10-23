// @flow

import { Loading } from "../scene/loading";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<Loading>;

/** ローディング画面とゲームアクションを関連付ける */
export const loadingConnector: Connector = () => [];
