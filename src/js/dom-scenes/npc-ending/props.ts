import { Subject } from "rxjs";

import { BGMManagerContainer } from "../../bgm/bgm-manager";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** NPCルート エンディング画面 プロパティ */
export type NPCEndingProps = BGMManagerContainer &
  SEPlayerContainer & {
    /** ルートHTML要素 */
    root: HTMLElement;
    /** エンドカードが読み込み完了したら発火するPromise */
    isEndCardLoaded: Promise<void>;
    /** 終了文言が読み込み完了したら発火するPromise */
    isEndLoaded: Promise<void>;
    /** ロゴが読み込み完了したら発火するPromise */
    isLogoLoader: Promise<void>;
    /** 効果音 ボタンプッシュ */
    pushButtonSound: SoundResource;
    /** エンディングBGM */
    endingBGM: SoundResource;
    /** 操作可能であるか否かのフラグ、trueで操作可能 */
    canOperation: boolean;
    /** エンディング終了通知ストリーム */
    endNPCEnding: Subject<void>;
  };
