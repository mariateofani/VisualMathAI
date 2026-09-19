"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallback?: string;
};

export default function BackButton({
  fallback = "/dashboard",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
      aria-label="Kembali ke halaman sebelumnya"
    >
      <span aria-hidden="true">←</span>
      Kembali
    </button>
  );
}