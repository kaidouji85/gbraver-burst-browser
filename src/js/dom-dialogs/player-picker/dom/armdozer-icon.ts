import { ArmdozerId } from "gbraver-burst-core";
import { Subscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import {
  ARMDOZER_ICON,
  ARMDOZER_ICON_CHECKED,
  ARMDOZER_IMAGE,
  CHECK_MARK,
} from "./class-name";

/** アームドーザアイコン */
export type ArmdozerIcon = {
  /** アームドーザID */
  readonly armdozerId: ArmdozerId;

  /**
   * ルート要素を取得する
   * @returns ルート要素
   */
  getRootElement: () => HTMLElement;

  /**
   * チェック状態を設定する
   * @param isChecked チェックされているか否か、trueで選択されている
   */
  checked(isChecked: boolean): void;

  /**
   * ポップされるアニメーションを実行する
   * @returns アニメーションが完了したら発火するPromise
   */
  pop(): Promise<void>;

  /**
   * アームドーザアイコンが押されたことを通知する
   * @returns 通知ストリーム
   */
  notifyPush(): Subscribable<PushDOM>;
};

/** アームドーザアイコン生成時のオプション */
type ArmdozerIconOptions = ResourcesContainer & {
  /** アームドーザID */
  armdozerId: ArmdozerId;
};

/** アームドーザアイコンの実装 */
class ArmdozerIconImpl implements ArmdozerIcon {
  /** @override */
  readonly armdozerId: ArmdozerId;
  /** ルート要素 */
  readonly root: HTMLElement;
  /** プッシュ通知ストリーム */
  readonly pushNotifier: Subscribable<PushDOM>;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: ArmdozerIconOptions) {
    const { resources, armdozerId } = options;

    this.armdozerId = armdozerId;

    this.root = document.createElement("div");
    this.root.className = ARMDOZER_ICON;

    const armdozerImagePath =
      resources.paths.find((p) => p.id === getArmdozerIconPathId(armdozerId))
        ?.path ?? "";
    const armdozerImage = document.createElement("img");
    armdozerImage.className = ARMDOZER_IMAGE;
    armdozerImage.src = armdozerImagePath;
    this.root.appendChild(armdozerImage);

    const checkMarkPath =
      resources.paths.find((p) => p.id === PathIds.CHECK)?.path ?? "";
    const checkMark = document.createElement("img");
    checkMark.className = CHECK_MARK;
    checkMark.src = checkMarkPath;
    this.root.appendChild(checkMark);

    this.pushNotifier = domPushStream(this.root);
  }

  /** @override */
  getRootElement(): HTMLElement {
    return this.root;
  }

  /** @override */
  checked(isChecked: boolean): void {
    this.root.className = isChecked ? ARMDOZER_ICON_CHECKED : ARMDOZER_ICON;
  }

  /** @override */
  pop(): Promise<void> {
    return pop(this.root);
  }

  /** @override */
  notifyPush(): Subscribable<PushDOM> {
    return this.pushNotifier;
  }
}

/**
 * アームドーザアイコンを生成する
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.armdozerId アームドーザID
 * @returns アームドーザアイコン
 */
export const createArmdozerIcon = (
  options: ArmdozerIconOptions,
): ArmdozerIcon => new ArmdozerIconImpl(options);
