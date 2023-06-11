import {Exclusive} from "../../exclusive/exclusive";
import {Subject, Unsubscribable} from "rxjs";
import {TutorialStageSelect} from "./tutoria-stage-element";
import {SoundResource} from "../../resource/sound";

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
