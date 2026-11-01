import Credits from "@components/Credits";
import {
  SimpleSidebar,
  SimpleTabBar,
  SimpleTopBar,
} from "@modules/simple/SimpleNav";

export default function SimpleLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen bg-ground text-fg-soft">
      <SimpleSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <SimpleTopBar />
        <main className="flex-1 px-4 pb-32 pt-2 md:px-[clamp(16px,3vw,40px)] md:pb-12 md:pt-6">
          {children}
        </main>
        <footer className="border-t border-line px-4 py-6 pb-28 text-muted md:px-[clamp(16px,3vw,40px)] md:pb-6">
          <Credits />
        </footer>
      </div>
      <SimpleTabBar />
    </div>
  );
}
