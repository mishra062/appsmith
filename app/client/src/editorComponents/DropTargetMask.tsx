import React, { useLayoutEffect, MutableRefObject } from "react";
import styled from "styled-components";

type DropTargetMaskProps = {
  rowHeight: number;
  columnWidth: number;
  setBounds: Function;
};

export const DropTargetMaskWrapper = styled.div<DropTargetMaskProps>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  background-image: radial-gradient(
    circle,
    ${props => props.theme.colors.grid} 2px,
    transparent 0
  );
  background-size: ${props => props.columnWidth}px ${props => props.rowHeight}px;
  background-position: -50% -50%;
`;
/* eslint-disable react/display-name */
export const DropTargetMask = (props: DropTargetMaskProps) => {
  // An underlay div for Grid markers and calculating the width, height, x and y positions
  const dropTargetMask: MutableRefObject<HTMLDivElement | null> = React.useRef(
    null,
  );
  // Fetch new height, width, x and y positions
  useLayoutEffect(() => {
    const el = dropTargetMask.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      props.setBounds(rect);
    }
  });

  return <DropTargetMaskWrapper {...props} ref={dropTargetMask} />;
};

export default DropTargetMask;
