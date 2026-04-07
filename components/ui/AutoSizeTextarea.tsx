"use client";

import { useCallback, useEffect, useRef } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

const AutoSizeTextarea = ({ maxHeight = 400, ...props }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    if (el.scrollHeight > maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "scroll";
    } else {
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflowY = "hidden";
    }
  }, [maxHeight]);

  useEffect(() => {
    handleInput();
  }, [handleInput]);

  return (
    <textarea
      onInput={handleInput}
      ref={textareaRef}
      {...props}
      className={`w-full resize-none bg-transparent outline-none text-white placeholder:text-text-muted ${props.className}`}
    />
  );
};

export default AutoSizeTextarea;
