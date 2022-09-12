// @flow
import {pop} from "../../../dom/animation";
import {pushDOMStream} from "../../../dom/event-stream";
import type {Resources} from "../../../resource";
import {createEmptySoundResource, SOUND_IDS} from "../../../resource/sound";
import {map, tap} from "../../../stream/operator";
import type {Stream} from "../../../stream/stream";
import type {TutorialStageID} from "../../tutorial";

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** チュートリアルステージタイトル */
  title: string
};
/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** ステージレベル */
  level: number,
};

/** チュートリアルステージ HTML要素 */
export interface TutorialStageElement {
  +id: TutorialStageID;
  +level: number;
  +root: HTMLElement;
  selectNotifier: Stream<void>;
  selected(): Promise<void>;
}

/**
 * チュートリアルステージ HTML要素
 *
 * @param resources リソース管理オブジェクト
 * @param rootClass ルートHTML要素class属性
 * @param stage チュートリアルステージ情報
 * @param level ステージレベル
 * @return チュートリアルステージ
 */
export const createTutorialStageElement = (resources: Resources, rootClass: string, stage: TutorialStage, level: number): TutorialStageElement => {
  const li = document.createElement('li');
  li.className = `${rootClass}__stage`;
  li.innerHTML = `
    <span class="${rootClass}__stage-title">${stage.title}</span>
    <button class="${rootClass}__stage-select">選択</button>
  `;
  const button = li.querySelector('button') ?? document.createElement('button');
  const pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON) ?? createEmptySoundResource();

  const selectNotifier = pushDOMStream(button).chain(tap(action => {
    action.event.stopPropagation();
    action.event.preventDefault();
  })).chain(map(() => {
  }));

  const selected = async () => {
    pushButton.sound.play();
    await pop(button);
  };

  return {root: li, id: stage.id, level, selectNotifier, selected};
};