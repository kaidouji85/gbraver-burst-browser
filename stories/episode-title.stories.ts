import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { EpisodeNumber } from "../src/js/game/episodes/episode";
import { domStub } from "./stub/dom-stub";

export default {
  title: "episode-title",
};

/**
 * エピソードタイトルストーリー
 * @param number エピソード番号
 * @param title タイトル
 * @param armdozerId アームドーザID
 * @returns ストーリー
 */
const episodeTitleStory = (
  number: EpisodeNumber,
  title: string,
  armdozerId: ArmdozerId,
) =>
  domStub((params) => {
    const scene = new EpisodeTitle({
      ...params,
      number,
      title,
      armdozerId,
    });
    return scene.getRootHTMLElement();
  });

/** エピソード1 */
export const episode1 = episodeTitleStory(
  "1",
  "バッテリーシステムの基礎",
  ArmdozerIds.SHIN_BRAVER,
);

/** エピソード2 */
export const episode2 = episodeTitleStory(
  "2",
  "ゼロ防御だと即死する",
  ArmdozerIds.SHIN_BRAVER,
);

/** エピソード3 */
export const episode3 = episodeTitleStory(
  "3",
  "バーストで一発逆転",
  ArmdozerIds.SHIN_BRAVER,
);

/** エピソード4 */
export const episode4 = episodeTitleStory(
  "4",
  "対決、二人のブレイバー！！（負けイベント）",
  ArmdozerIds.SHIN_BRAVER,
);

/** サイドエピソード3.1 */
export const sideEpisode31 = episodeTitleStory(
  "3.1",
  "パイロット次第では詰み（負けイベント）",
  ArmdozerIds.SHIN_BRAVER,
);

/** サイドエピソード3.2 */
export const sideEpisode32 = episodeTitleStory(
  "3.2",
  "パイロットスキルで意表を突け",
  ArmdozerIds.SHIN_BRAVER,
);

/** サイドエピソード4.1 */
export const sideEpisode41 = episodeTitleStory(
  "4.1",
  "リベンジ",
  ArmdozerIds.GENESIS_BRAVER,
);
