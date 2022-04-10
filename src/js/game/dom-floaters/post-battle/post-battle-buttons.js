// @flow
import type {PostBattleButtonConfig} from "./post-battle-button-config";

/** NPCバトル勝利後のアクションボタン */
export const PostNPCBattleWinButtons: PostBattleButtonConfig[] = [
  {style: 'SubButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
  {style: 'MainButton', action: {type: 'NextStage'}, label: '次のステージ'},
];

/** NPCバトル敗北後のアクションボタン */
export const PostNPCBattleLoseButtons: PostBattleButtonConfig[] = [
  {style: 'SubButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
  {style: 'MainButton', action: {type: 'Retry'}, label: 'リトライ'},
];

/** ネット対戦終了後のアクションボタン */
export const PostNetworkBattleButtons: PostBattleButtonConfig[] = [
  {style: 'SubButton', action: {type: 'GotoTitle'}, label: 'タイトルへ'},
];