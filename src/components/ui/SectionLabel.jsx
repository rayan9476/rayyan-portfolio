export default function SectionLabel({
  number,
  title,
  color = "text-zinc-500",
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className={`text-[11px] lg:text-lg xl:text-xl 2xl:text-2xl 3sxl:text-3xl 3xl:text-4xl font-mono tracking-[0.2em] ${color}`}
      >
        {number}
      </span>
      <div className="w-8 lg:w-10 2xl:w-12 3sxl:w-14 3xl:w-16 h-px bg-zinc-800" />
      <span className="text-[11px] lg:text-lg xl:text-xl 2xl:text-2xl 3sxl:text-3xl 3xl:text-4xl font-mono tracking-[0.2em] text-zinc-600 uppercase">
        {title}
      </span>
    </div>
  );
}
