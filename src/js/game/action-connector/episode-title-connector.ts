import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { EpisodeTitle } from "../../dom-scenes/episode-title";

/**
 * エピソードタイトル画面のアクションコネクタを生成する
 * @returns アクションコネクタ
 */
export const episodeTitleConnector: DOMSceneActionConnector<
  EpisodeTitle
> = () => [];
