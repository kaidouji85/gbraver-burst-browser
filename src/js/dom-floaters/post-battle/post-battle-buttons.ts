import type { PostBattleButtonConfig } from "./post-battle-button-config";

/** NPCバトル勝利後のアクションボタン */
export const PostNPCBattleWinButtons: PostBattleButtonConfig[] = [
  {
    style: "MainButton",
    action: {
      type: "NextStage",
    },
    label: "次のステージ",
  },
];

/** NPCバトル敗北後のアクションボタン */
export const PostNPCBattleLoseButtons: PostBattleButtonConfig[] = [
  {
    style: "SubButton",
    action: {
      type: "GotoTitle",
    },
    label: "タイトルへ",
  },
  {
    style: "MainButton",
    action: {
      type: "Retry",
    },
    label: "リトライ",
  },
];

/** NPCバトル完全クリア後のアクションボタン */
export const PostNPCBattleComplete: PostBattleButtonConfig[] = [
  {
    style: "MainButton",
    action: {
      type: "GotoEnding",
    },
    label: "エンディングへ",
  },
];

/** ネット対戦終了後のアクションボタン */
export const PostNetworkBattleButtons: PostBattleButtonConfig[] = [
  {
    style: "MainButton",
    action: {
      type: "GotoTitle",
    },
    label: "タイトルへ",
  },
];

/** エピソード後（プレイヤーの勝利）のアクションボタン */
export const PostEpisodeWinButtons: PostBattleButtonConfig[] = [
  {
    style: "SubButton",
    action: {
      type: "GotoEpisodeSelect",
    },
    label: "エピソード選択へ",
  },
  {
    style: "MainButton",
    action: {
      type: "NextStage",
    },
    label: "次のエピソード",
  },
];

/** エピソード後（プレイヤーの敗北）のアクションボタン */
export const PostEpisodeLoseButtons: PostBattleButtonConfig[] = [
  {
    style: "SubButton",
    action: {
      type: "GotoEpisodeSelect",
    },
    label: "エピソード選択へ",
  },
  {
    style: "MainButton",
    action: {
      type: "Retry",
    },
    label: "リトライ",
  },
];

/** エピソード後のアクションボタン */
export const PostEpisodeButtons: PostBattleButtonConfig[] = [
  {
    style: "MainButton",
    action: {
      type: "GotoEpisodeSelect",
    },
    label: "エピソード選択へ",
  },
];
