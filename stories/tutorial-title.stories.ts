import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { EpisodeNumber, EpisodeType } from "../src/js/game/episodes/episode";
import { domStub } from "./stub/dom-stub";

export default {
  title: "episode-title",
};

/**
 * チュートリアルタイトルストーリー
 * @param title タイトル
 * @param type エピソードタイプ
 * @param number エピソード番号
 * @return ストーリー
 */
const tutorialTitleStory = (
  title: string,
  type: EpisodeType,
  number: EpisodeNumber,
) =>
  domStub((resources) => {
    const scene = new EpisodeTitle({
      resources,
      type,
      number,
      title,
    });
    return scene.getRootHTMLElement();
  });

/** チュートリアル1 */
export const tutorial1 = tutorialTitleStory(
  "バッテリーシステムの基礎",
  "Episode",
  1,
);

/** チュートリアル2 */
export const tutorial2 = tutorialTitleStory(
  "ゼロ防御だと即死する",
  "Episode",
  2,
);

/** チュートリアル3 */
export const tutorial3 = tutorialTitleStory("バーストで一発逆転", "Episode", 3);
