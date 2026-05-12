"use client";

import { FormEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export type ListPageSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onClear: () => void;
  placeholder: string;
  submitLabel?: string;
};

/**
 * Single full-width search pattern for mobile and desktop (no icon-only mobile toggle).
 */
export default function ListPageSearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder,
  submitLabel = "Search",
}: ListPageSearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full touch-manipulation flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2.5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-stretch sm:gap-2 md:p-3"
    >
      <div className="flex min-h-11 min-w-0 flex-1 items-center gap-2">
        <FaSearch className="shrink-0 text-sm text-gray-400" aria-hidden />
        <input
          type="search"
          name="q"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-gray-400 sm:text-sm"
          enterKeyHint="search"
        />
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200"
            title="Clear search"
            aria-label="Clear search"
          >
            <FaTimes size={14} />
          </button>
        ) : null}
      </div>
      <button
        type="submit"
        className="min-h-11 shrink-0 rounded-md bg-brand-raiden-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-raiden-600 active:bg-brand-raiden-700 sm:w-auto sm:self-center sm:py-1.5"
      >
        {submitLabel}
      </button>
    </form>
  );
}
