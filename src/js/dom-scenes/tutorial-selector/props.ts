import {Exclusive} from "../../exclusive/exclusive";
import {Subject, Unsubscribable} from "rxjs";
import {TutorialStage, TutorialStageElement, TutorialStageSelect} from "./tutoria-stage-element";
import {createEmptySoundResource, SOUND_IDS, SoundResource} from "../../resource/sound";
import {domUuid} from "../../uuid/dom-uuid";
import {ROOT_CLASS} from "./dom/class-name";
import {rootInnerHTML} from "./dom/root-inner-html";
import {extractElements} from "./dom/elements";
import {waitElementLoaded} from "../../wait/wait-element-loaded";
import {stageSeparator} from "./dom/stage-separator";
import {Resources} from "../../resource";

/** チュートリアルセレクタ画面プロパティ */
export type TutorialSelectorProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** ステージリストの親HTML要素 */
  stages: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 戻るストリーム */
  prev: Subject<void>;
  /** ステージ選択完了ストリーム */
  stageSelect: Subject<TutorialStageSelect>;
  /** 値変更効果音 */
  changeValue: SoundResource;
  /** イメージカットのロード完了したら発火するPromise */
  isImageCutsLoaded: Promise<unknown>;
};

/**
 * TutorialSelectorPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param stages チュートリアルステージ情報
 * @return 生成したTutorialSelectorProps
 */
export function createTutorialSelectorProps(
  resources: Resources,
  stages: TutorialStage[]
): TutorialSelectorProps {
  const ids = {
    stages: domUuid(),
    imageCuts: domUuid(),
    prevButton: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, resources);
  const elements = extractElements(root, ids);
  const stageElements = stages.map(
    (stage, index) => new TutorialStageElement(resources, stage, index + 1)
  );
  const stageElementsWithLastRemoved = stageElements.slice(0, -1);
  stageElementsWithLastRemoved.forEach((stage) => {
    elements.stages.appendChild(stage.getRootHTMLElement());
    elements.stages.appendChild(stageSeparator());
  });
  const lastStageElement = stageElements[stageElements.length - 1];
  if (lastStageElement) {
    elements.stages.appendChild(lastStageElement.getRootHTMLElement());
  }

  return {
    root,
    stages: elements.stages,
    prevButton: elements.prevButton,
    exclusive: new Exclusive(),
    prev: new Subject(),
    stageSelect: new Subject(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    isImageCutsLoaded: Promise.all(
      Array.from(elements.imageCuts.children).map((img) =>
        waitElementLoaded(img as HTMLElement)
      )
    ),
  };
}
