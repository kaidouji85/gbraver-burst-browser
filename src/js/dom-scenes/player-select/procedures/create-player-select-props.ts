import { ArmDozerId, ArmDozerIds, PilotIds } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Resources } from "../../../resource";
import { domUuid } from "../../../uuid/dom-uuid";
import { ArmdozerBustShotContainer } from "../armdozer-bust-shot";
import { ArmdozerSelector } from "../armdozer-selector";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-innrt-html";
import { PilotBustShotContainer } from "../pilot-bust-shot";
import { PilotSelector } from "../pilot-selector";
import { PlayerDecide } from "../player-decide";
import { PlayerSelectProps } from "../props";

/**
 * プレイヤーセレクト画面プロパティを生成する
 * @param resources リソース管理オブジェクト
 * @param armDozerIds プレイアブルなアームドーザのID
 * @return 生成結果
 */
export function createPlayerSelectProps(
  resources: Resources,
  armDozerIds: ArmDozerId[]
): PlayerSelectProps {
  const pilotIds = [
    PilotIds.SHINYA,
    PilotIds.TSUBASA,
    PilotIds.GAI,
    PilotIds.RAITO,
  ];
  const armdozerId = ArmDozerIds.SHIN_BRAVER;
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
    armDozerIds,
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

  const armdozerSelector = new ArmdozerSelector(
    resources,
    armDozerIds,
    armdozerId,
  );
  elements.selector.appendChild(armdozerSelector.getRootHTMLElement());

  const pilotSelector = new PilotSelector(resources, pilotIds, pilotId);
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
  };
}