import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import type { ResourcesContainer } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import {
  extractBackGround,
  extractCloser,
  extractEasy,
  extractEasyButton,
  extractHard,
  extractHardButton,
  extractNormal,
  extractNormalButton,
  extractVeryHard,
  extractVeryHardButton,
} from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import {NPCBattleCourseDifficulty} from "../../game/npc-battle/npc-battle-course";

/** 難易度選択ダイアログ プロパティ */
export type DifficultyDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャHTML要素 */
  closer: HTMLElement;
  /** 背景HTML要素 */
  backGround: HTMLElement;
  /** Easyロゴ */
  easy: HTMLElement;
  /** Easyボタン */
  easyButton: HTMLElement;
  /** Normalロゴ */
  normal: HTMLElement;
  /** Normalボタン */
  normalButton: HTMLElement;
  /** Hardロゴ */
  hard: HTMLElement;
  /** Hardボタン */
  hardButton: HTMLElement;
  /** VeryHardロゴ */
  veryHard: HTMLElement;
  /** VertHardボタン */
  veryHardButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 選択完了通知ストリーム */
  selectionComplete: Subject<NPCBattleCourseDifficulty>;
  /** ダイアログ閉じ通知ストリーム */
  closeDialog: Subject<void>;
  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 効果音 ボタン押下 */
  pushButton: SoundResource;
};

/** 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

/**
 * 難易度選択ダイアログプロパティを生成する
 * @param params 生成パラメータ
 * @returns 生成したプロパティ
 */
export function createDifficultyDialogProps(
  params: PropsCreatorParams,
): DifficultyDialogProps {
  const { resources } = params;
  const ids = {
    backGround: domUuid(),
    closer: domUuid(),
    easy: domUuid(),
    easyButton: domUuid(),
    normal: domUuid(),
    normalButton: domUuid(),
    hard: domUuid(),
    hardButton: domUuid(),
    veryHard: domUuid(),
    veryHardButton: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, ids);
  const closer = extractCloser(root, ids);
  const backGround = extractBackGround(root, ids);
  const easy = extractEasy(root, ids);
  const easyButton = extractEasyButton(root, ids);
  const normal = extractNormal(root, ids);
  const normalButton = extractNormalButton(root, ids);
  const hard = extractHard(root, ids);
  const hardButton = extractHardButton(root, ids);
  const veryHard = extractVeryHard(root, ids);
  const veryHardButton = extractVeryHardButton(root, ids);
  const selectionComplete = new Subject<NPCBattleCourseDifficulty>();
  const closeDialog = new Subject<void>();
  const exclusive = new Exclusive();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  return {
    ...params,
    root,
    closer,
    backGround,
    easy,
    easyButton,
    normal,
    normalButton,
    hard,
    hardButton,
    veryHard,
    veryHardButton,
    selectionComplete,
    closeDialog,
    exclusive,
    changeValue,
    pushButton,
  };
}
