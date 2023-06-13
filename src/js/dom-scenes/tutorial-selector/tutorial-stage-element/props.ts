import { map, Observable } from "rxjs";

import { domClickStream } from "../../../dom/push-dom";
import { Resources } from "../../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../../resource/sound";
import { domUuid } from "../../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import { TutorialStage } from "./tutorial-stage";

/** チュートリアルステージ HTML要素 プロパティ */
export type TutorialStageElementProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** オーバーレイ */
  overlay: HTMLElement;
  /** プッシュボタン効果音 */
  pushButton: SoundResource;
  /** 選択通知ストリーム */
  select: Observable<void>;
};

/**
 * TutorialStageElementPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param stage ステージ情報
 * @param level レベル
 * @return 生成結果
 */
export function createTutorialStageElementProps(
  resources: Readonly<Resources>,
  stage: Readonly<TutorialStage>,
  level: Readonly<number>
) {
  const ids: DataIDs = {
    overlay: domUuid(),
  };
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, level, stage.title);
  const elements = extractElements(root, ids);
  const select = domClickStream(root).pipe(
    map((action) => {
      action.event.preventDefault();
      action.event.stopPropagation();
    })
  );
  return {
    root,
    overlay: elements.overlay,
    pushButton,
    select,
  };
}
