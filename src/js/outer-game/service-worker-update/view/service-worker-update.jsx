// @flow

import React from 'react';

/** プロパティ */
type ServiceWorkerUpdateProps = {
  isVisible: boolean
};

/**
 * サービスワーカー更新のReact Component
 *
 * @return サービスワーカー更新
 */
export function ServiceWorkerUpdate(props: ServiceWorkerUpdateProps) {
  return (
    <div className="service-worker-update" style={{
      display: props.isVisible
        ? 'flex'
        : 'none'
    }}>
      サービワーカーが更新されました。
    </div>
  );
}