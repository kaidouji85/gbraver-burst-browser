// @flow

import React from 'react';
import {resourceBasePath} from "../../../../resource/resource-base-path";

/** プロパティ */
type Props = {
  /** タイトルタッチ時のイベント */
  onTouch: () => void,
  /** 表示、非表示フラグ */
  isVisible: boolean
};

/** タイトルシーンのプレゼンテーション */
export function TitlePresentation(props: Props) {
  return (
    <div className="title" onClick={props.onTouch} onTouchStart={props.onTouch} style={{
      display: props.isVisible ? 'flex' : 'none'
    }}>
      <img src={`${resourceBasePath()}/logo.png`} />
    </div>
  );
}