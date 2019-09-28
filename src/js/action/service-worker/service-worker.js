// @flow

/** サービスワーカー関連のアクション */
export type ServiceWorkerAction = ServiceWorkerWillUpdate;

/** 現在のサービスワーカーが更新される */
export type ServiceWorkerWillUpdate = {
  type: 'ServiceWorkerWillUpdate'
};