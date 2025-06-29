import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { EpisodeNumber } from "../src/js/game/story/episode";
import { PathIds } from "../src/js/resource/path/ids";
import { PathId } from "../src/js/resource/path/resource";
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
  imageCutPathId: PathId,
) =>
  domStub((params) => {
    const scene = new EpisodeTitle({
      ...params,
      number,
      title,
      armdozerId,
      imageCutPathId,
    });
    return scene.getRootHTMLElement();
  });

/** エピソード1 */
export const episode1 = episodeTitleStory(
  "1",
  "バッテリーシステムの基礎",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_BATTERY_SYSTEM,
);

/** エピソード2 */
export const episode2 = episodeTitleStory(
  "2",
  "ゼロ防御だと即死する",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_ZERO_DEFENSE,
);

/** エピソード3 */
export const episode3 = episodeTitleStory(
  "3",
  "バーストで一発逆転",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_BURST,
);

/** エピソード4 */
export const sideEpisode4 = episodeTitleStory(
  "4",
  "パイロット次第では詰み（負けイベント）",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_PILOT_SKILL_01,
);

/** サイドエピソード5 */
export const sideEpisode5 = episodeTitleStory(
  "5",
  "パイロットスキルで意表を突け",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_PILOT_SKILL_02,
);

/** エピソード6 */
export const episode6 = episodeTitleStory(
  "6",
  "対決、二人のブレイバー！！（負けイベント）",
  ArmdozerIds.SHIN_BRAVER,
  PathIds.IMAGE_CUT_CONFRONTATION_TWO_BRAVER,
);

/** エピソード7 */
export const episode7 = episodeTitleStory(
  "7",
  "超火力はガードで凌げ",
  ArmdozerIds.WING_DOZER,
  PathIds.IMAGE_CUT_SURVIVE_SUPER_POWER_WITH_GUARD,
);

/** サイドエピソード6.1 */
export const sideEpisode61 = episodeTitleStory(
  "6.1",
  "悲劇の女王",
  ArmdozerIds.GENESIS_BRAVER,
  PathIds.IMAGE_CUT_QUEEN_OF_TRAGEDY,
);

/** サイドエピソード6.2 */
export const sideEpisode62 = episodeTitleStory(
  "6.2",
  "創業家の御曹司",
  ArmdozerIds.GENESIS_BRAVER,
  PathIds.IMAGE_CUT_PRINCE_OF_FALLEN_SUN,
);
