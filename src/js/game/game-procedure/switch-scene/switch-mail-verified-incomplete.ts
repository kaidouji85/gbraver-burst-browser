import { map } from "rxjs";

import { MailVerifiedIncomplete } from "../../../dom-scenes/mail-verified-incomplete";
import { GameProps } from "../../game-props";

/**
 * メール認証未完了画面に切り替える
 * @param props ゲームプロパティ
 * @param scene メール認証未完了画面
 */
export const switchMailVerifiedIncomplete = (
  props: GameProps,
  scene: MailVerifiedIncomplete,
) =>
  props.domSceneBinder.bind(scene, () =>
    props.gameAction.connect([
      scene
        .notifyTitleTransition()
        .pipe(map(() => ({ type: "ExitMailVerifiedIncomplete" }))),
      scene.notifyReload().pipe(map(() => ({ type: "ReloadRequest" }))),
    ]),
  );
