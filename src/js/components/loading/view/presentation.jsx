// @flow

import React from 'react';

/** プロパティ */
export type Props = {
  isVisible: boolean,
  completedRate: number
};

/**
 * ローディングのReact Component
 *
 * @param props プロパティ
 * @return 生成結果
 */
export function LoadingPresentation(props: Props) {
  return (
    <div className="loading" style={{
      display: props.isVisible
        ? 'flex'
        : 'none'
    }}>
      <div className="loading__completed-rate">
        <div className="loading__completed-rate__text">
          {`LOADING... ${Math.floor(props.completedRate * 100)}%`}
        </div>
        <div className="loading__completed-rate__bar">
          <div className="loading__completed-rate__bar__completed" style={{
            width: `${props.completedRate * 100}%`
          }}></div>
        </div>
      </div>
    </div>
  );
}