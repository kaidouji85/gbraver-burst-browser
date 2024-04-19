import { ArmdozerId, ArmdozerIds, PilotId, PilotIds } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { domUuid } from "../../../uuid/dom-uuid";
import { ArmdozerBustShotContainer } from "../armdozer-bust-shot";
import { ArmdozerSelector } from "../armdozer-selector";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-innrt-html";
import { PilotBustShotContainer } from "../pilot-bust-shot";
import { PilotSelector } from "../pilot-selector";
import { PlayerDecide } from "../player-decide";
import { PlayerSelectProps } from "../props";

/** 生成パラメータ */
export type CreatePlayerSelectPropsParams = ResourcesContainer &
  SEPlayerContainer & {
    /** プレイアブルなアームドーザのID */
    armdozerIds: ArmdozerId[];
    /** プレイアブルなパイロットのID */
    pilotIds: PilotId[];
  };

/**
 * プレイヤーセレクト画面プロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createPlayerSelectProps(
  params: CreatePlayerSelectPropsParams,
): PlayerSelectProps {
  const { resources, armdozerIds, pilotIds } = params;
  const armdozerId = ArmdozerIds.SHIN_BRAVER;
  const pilotId = PilotIds.SHINYA;
  const playerDecide = new Subject<PlayerDecide>();
  const prev = new Subject<void>();
  const dataIDs = {
    selector: domUuid(),
    working: domUuid(),
  };

  const root = document.createElement("div");
  root.className = "player-select";
  root.innerHTML = rootInnerHTML(dataIDs);

  const elements = extractElements(root, dataIDs);

  const armdozerBustShot = new ArmdozerBustShotContainer(
    resources,
    armdozerIds,
    armdozerId,
  );
  elements.working.appendChild(armdozerBustShot.getRootHTMLElement());
  const pilotBustShot = new PilotBustShotContainer(
    resources,
    pilotIds,
    pilotId,
  );
  pilotBustShot.hidden();
  elements.working.appendChild(pilotBustShot.getRootHTMLElement());

  const armdozerSelector = new ArmdozerSelector({
    ...params,
    initialArmdozerId: armdozerId,
  });
  elements.selector.appendChild(armdozerSelector.getRootHTMLElement());

  const pilotSelector = new PilotSelector({
    ...params,
    pilotIds,
    initialPilotId: pilotId,
  });
  pilotSelector.hidden();
  elements.selector.appendChild(pilotSelector.getRootHTMLElement());

  return {
    root,
    armdozerBustShot,
    pilotBustShot,
    armdozerSelector,
    pilotSelector,
    armdozerId,
    pilotId,
    playerDecide,
    prev,
    armdozerIds: armdozerIds,
    pilotIds,
  };
}
