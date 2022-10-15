// @flow
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import type {DOMScenesProps} from "../props";
import {MailVerifiedIncomplete} from "../scene/mail-verified-incomplete/mail-verified-incomplete";

/**
 * メール認証未完了画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param mailAddress 認証メール送信先
 * @return 開始されたメール認証未完了画面
 */
export function startMailVerifiedIncomplete(props: DOMScenesProps, mailAddress: string): MailVerifiedIncomplete {
  discardCurrentScene(props);
  const scene = new MailVerifiedIncomplete(mailAddress);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.gotoTitleNotifier().subscribe(() => {
      props.gameAction.next({type: 'ExitMailVerifiedIncomplete'});
    }),
    scene.reloadNotifier().subscribe(() => {
      props.gameAction.next({type: 'ReloadRequest'});
    })
  ];
  return scene;
}