import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Modal = ({
  visible,
  children
}) => {
  const [root, setRoot] = useState();
  useEffect(() => {
    const elm = document.createElement('div');
    document.body.appendChild(elm);
    setRoot(elm);
  }, []);

  const elm = visible ? (
    <Wrapper>{children}</Wrapper>
  ) : null;

  if (!root) {
    return null;
  }

  return createPortal(
    elm,
    root,
  );
};

export default Modal;