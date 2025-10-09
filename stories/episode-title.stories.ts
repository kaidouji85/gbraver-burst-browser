import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { EpisodeTitle } from "../src/js/dom-scenes/episode-title";
import { EpisodeNumber } from "../src/js/game/story/episode";
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

/** シンブレイバーのエピソードタイトル */
export const shinBraverTitle = episodeTitleStory(
  "X",
  "シンブレイバーのエピソードタイトル",
  ArmdozerIds.SHIN_BRAVER,
);

/** ウィングドーザのエピソードタイトル */
export const wingDozerTitle = episodeTitleStory(
  "X",
  "ウィングドーザのエピソードタイトル",
  ArmdozerIds.WING_DOZER,
);

/** ネオランドーザのエピソードタイトル */
export const neoLandozerTitle = episodeTitleStory(
  "X",
  "ネオランドーザのエピソードタイトル",
  ArmdozerIds.NEO_LANDOZER,
);

/** ジェネシスブレイバーのエピソードタイトル */
export const genesisBraverTitle = episodeTitleStory(
  "X",
  "ジェネシスブレイバーのエピソードタイトル",
  ArmdozerIds.GENESIS_BRAVER,
);
