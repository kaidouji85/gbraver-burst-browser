// @flow
import type {PostBattleButtonConfig} from "./post-battle-button-config";

/** NPCバトル勝利後のアクションボタン */
export const PostNPCBattleWinButtons: PostBattleButtonConfig[] = [
  {style: 'MainButton', action: {type: 'NextStage'}, label: '次のステージ'},
];

/** NPCバトル敗北後のアクションボタン */
export const PostNPCBattleLoseButtons: PostBattleButtonConfig[] = [
  {style: 'SubButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
  {style: 'MainButton', action: {type: 'Retry'}, label: 'リトライ'},
];

/** NPCバトル完全クリア後のアクションボタン */
export const PostNPCBattleComplete: PostBattleButtonConfig[] = [
  {style: 'MainButton', action: {type: 'GotoEnding'}, label: 'エンディングへ'},
];

/** ネット対戦終了後のアクションボタン */
export const PostNetworkBattleButtons: PostBattleButtonConfig[] = [
  {style: 'MainButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
];

/** チュートリアル勝利後のアクションボタン */
export const PostTutorialWinButtons: PostBattleButtonConfig[] = [
  {style: 'MainButton', action: {type: 'NextTutorial'}, label: '次へ'},
];

/** チュートリアル敗北後のアクションボタン */
export const PostTutorialLoseButtons: PostBattleButtonConfig[] = [
  {style: 'SubButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
  {style: 'MainButton', action: {type: 'Retry'}, label: 'リトライ'},
];

/** チュートリアル完全クリア後のアクションボタン */
export const PostTutorialCompleteButtons: PostBattleButtonConfig[] = [
  {style: 'MainButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
];