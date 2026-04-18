"use client";

import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl border-2 border-indigo-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 rounded-t-xl">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <Button onClick={onClose}>✕</Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
