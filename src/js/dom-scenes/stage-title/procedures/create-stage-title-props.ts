import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { ROOT_CLASS } from "../dom/class-name";
import { createDataIDs } from "../dom/data-ids";
import { extractArmdozerIcon, extractCaption } from "../dom/extract-element";
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
  const ids = createDataIDs();
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, params.level);

  const armdozerIconPathID = getArmdozerIconPathId(params.armdozerId);
  const armdozerIcon = extractArmdozerIcon(root, ids);
  armdozerIcon.src =
    params.resources.paths.find((v) => v.id === armdozerIconPathID)?.path ?? "";

  const caption = extractCaption(root, ids);
  caption.innerHTML = params.caption
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
      isArmdozerIconLoaded: waitElementLoaded(armdozerIcon),
    };
}
