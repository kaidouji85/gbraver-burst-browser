import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { domUuid } from "../../../uuid/dom-uuid";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { ROOT_CLASS } from "../dom/class-name";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { StageTitleProps } from "../props";

/** StageTitleProps生成パラメータ */
export type CreateStageTitleParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ステージレベル */
  level: number;
  /** ステージ名 */
  caption: string[];
  /** 対戦するアームドーザのID */
  armdozerId: ArmdozerId;
};

/**
 * StageTitlePropsを生成する
 * @param params 生成パラメータ
 */
export function createStageTitleProps(
  params: CreateStageTitleParams,
): StageTitleProps {
  const ids = {
    caption: domUuid(),
    armdozerIcon: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, params.level);
  const elements = extractElements(root, ids);
  const armdozerIconPathID = getArmdozerIconPathId(params.armdozerId);
  elements.armdozerIcon.src =
    params.resources.paths.find((v) => v.id === armdozerIconPathID)?.path ?? "";
  elements.caption.innerHTML = params.caption
    .map(
      (v) => `
        <span class="${ROOT_CLASS}__caption-clause">
          ${v}
        </span>
      `,
    )
    .reduce((a, b) => a + b);
  return {
    root,
    isArmdozerIconLoaded: waitElementLoaded(elements.armdozerIcon),
  };
}
