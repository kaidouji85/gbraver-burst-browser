import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { Resources } from "../../../resource";
import { ArmdozerCard } from "../armdozer-card";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerIconContainer as extractArmdozerCardContainer,
  extractPilotCardContainer,
} from "../dom/extract-elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PilotIcon } from "../pilot-icon";
import { SecretPlayerSelectProps } from "../props";
import { PilotCard } from "../pilot-card";

/** SecretPlayerSelectProps生成パラメータ */
export type CreateSecretPlayerSelectPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
  /** 選択可能なパイロットID */
  pilotIds: PilotId[];
};

/**
 * SecretPlayerSelectPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createSecretPlayerSelectProps(
  params: CreateSecretPlayerSelectPropsParams,
): SecretPlayerSelectProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();

  const { resources, armdozerIds, pilotIds } = params;
  const armdozerIconContainer = extractArmdozerCardContainer(root);
  const armdozerCards = armdozerIds.map(
    (armdozerId) => new ArmdozerCard(resources, armdozerId),
  );
  armdozerCards.forEach((icon) => {
    armdozerIconContainer.appendChild(icon.getRootHTMLElement());
  });

  const pilotCardContainer = extractPilotCardContainer(root);
  const pilotCards = pilotIds.map((id) => new PilotCard(resources, id));
  pilotCards.forEach((icon) => {
    pilotCardContainer.appendChild(icon.getRootHTMLElement());
  });

  return { root };
}
