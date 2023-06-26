import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ children }: { children: ReactNode }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');

    if (!modalRoot || !elRef.current) {
      return;
    }

    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(children, elRef.current);
};
