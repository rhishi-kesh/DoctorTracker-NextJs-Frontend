import { Brand } from "@/components/ui/management-ui";

export default function Sidebar({ navigation, navigationLink }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-slate-100 bg-white px-5 py-6 lg:flex">
      <Brand />
      <div className="mt-12">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Pages
        </p>
        <nav className="space-y-1" aria-label="Main navigation">
          {navigation.map((item) => navigationLink(item))}
        </nav>
      </div>
    </aside>
  );
}
