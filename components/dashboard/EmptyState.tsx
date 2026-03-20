import { PackageSearch, PlusCircle } from "lucide-react";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-8 sm:p-10 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-50 ring-1 ring-slate-200 grid place-items-center text-slate-700">
        <PackageSearch className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-6">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl h-11 px-4 font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition"
        >
          <PlusCircle className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

