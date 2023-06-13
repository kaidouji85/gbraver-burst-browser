import {TutorialStageID} from "../../../game/tutorial-stages/tutorial-stage";
import {createEmptySoundResource, SOUND_IDS, SoundResource} from "../../../resource/sound";
import {map, Observable} from "rxjs";
import {Resources} from "../../../resource";
import {TutorialStage} from "./tutorial-stage";
import {ROOT_CLASS} from "./dom/class-name";
import {rootInnerHTML} from "./dom/root-inner-html";
import {domClickStream} from "../../../dom/push-dom";

/** チュートリアルステージ HTML要素 プロパティ */
export type TutorialStageElementProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
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
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(level, stage.title);
  const select = domClickStream(root).pipe(
    map((action) => {
      action.event.preventDefault();
      action.event.stopPropagation();
    })
  );

  return {
    root,
    pushButton,
    select,
  };
}