import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { EpisodeNumber, EpisodeType } from "../src/js/game/episodes/episode";
import { domStub } from "./stub/dom-stub";

export default {
  title: "episode-title",
};

/**
 * エピソードタイトルストーリー
 * @param title タイトル
 * @param type エピソードタイプ
 * @param number エピソード番号
 * @return ストーリー
 */
const episodeTitleStory = (
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

/** エピソード1 */
export const episode1 = episodeTitleStory(
  "バッテリーシステムの基礎",
  "Episode",
  "1",
);

/** エピソード2 */
export const episode2 = episodeTitleStory(
  "ゼロ防御だと即死する",
  "Episode",
  "2",
);

/** エピソード3 */
export const episode3 = episodeTitleStory("バーストで一発逆転", "Episode", "3");

/** サイドエピソード1 */
export const sideEpisode1 = episodeTitleStory(
  "パイロット次第では詰み（負けイベント）",
  "Side Episode",
  "1",
);
