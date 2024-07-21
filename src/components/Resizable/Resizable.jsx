import React, { useState, useCallback, useEffect } from "react";

const Resizable = ({ children }) => {
  const [node, setNode] = useState(null);

  const ref = useCallback((nodeEle) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (!node) {
        return;
      }

      const parent = node.parentElement;
      const startPos = {
        x: e.clientX,
      };
      const startWidth = parent.offsetWidth;

      const handleMouseMove = (e) => {
        const dx = e.clientX - startPos.x;
        parent.style.width = `${startWidth + dx}px`;
        updateCursor();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        resetCursor();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node]
  );

  const handleTouchStart = useCallback(
    (e) => {
      if (!node) {
        return;
      }

      const parent = node.parentElement;
      const touch = e.touches[0];
      const startPos = {
        x: touch.clientX,
      };
      const startWidth = parent.offsetWidth;

      const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        parent.style.width = `${startWidth + dx}px`;
        updateCursor();
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        resetCursor();
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [node]
  );

  const updateCursor = () => {
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const resetCursor = () => {
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("touchstart", handleTouchStart);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("touchstart", handleTouchStart);
    };
  }, [node, handleMouseDown, handleTouchStart]);

  return children({ ref });
};

export default Resizable;
