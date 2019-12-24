// @flow

import React from 'react';
import type {ServiceWorkerUpdateState} from "../state/service-worker-update-state";

/** プロパティ */
type Props = {
  state: ServiceWorkerUpdateState
};

/**
 * サービスワーカーアップデートビュー
 *
 * @param props プロパティ
 * @return ビュー
 */
export function serviceWorkerUpdateView(props: Props) {
  return (
    <div className="service-worker-update" style={{
      display: props.state.isVisible
        ? 'flex'
        : 'none'
    }}>
      <div className="service-worker-update__title">新バージョンがリリースされました</div>
      <div className='service-worker-update__body'>お手数ですが、ゲームを開いているタブを全て閉じた後に、再度ゲームを開いてください。</div>
    </div>
  );
}