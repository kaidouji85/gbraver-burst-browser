import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { domStub } from "./stub/dom-stub";

export default {
  title: "episode-title",
};

/**
 * チュートリアルタイトルストーリー
 * @param title タイトル
 * @param level レベル
 * @return ストーリー
 */
const tutorialTitleStory = (title: string[], level: number) =>
  domStub((resources) => {
    const scene = new EpisodeTitle({
      resources,
      title,
      level,
    });
    return scene.getRootHTMLElement();
  });

/** チュートリアル1 */
export const tutorial1 = tutorialTitleStory(["バッテリーシステムの基礎"], 1);

/** チュートリアル2 */
export const tutorial2 = tutorialTitleStory(["ゼロ防御だと即", "死する"], 2);

/** チュートリアル3 */
export const tutorial3 = tutorialTitleStory(["バーストで一発", "逆転"], 3);
