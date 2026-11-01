import ReducedMotionHandoff from "@modules/reel/ReducedMotionHandoff";

export default function ReelLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-ink text-fg">
      <ReducedMotionHandoff />
      {children}
    </div>
  );
}
