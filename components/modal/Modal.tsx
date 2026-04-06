"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
    >
      <div className="relative bg-background w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              aria-label="Đóng hộp thoại"
              className="text-white hover:bg-surface p-1.5 rounded-full transition-colors"
              onClick={onClose}
              type="button"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
