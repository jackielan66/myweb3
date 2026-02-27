'use client';
import { useTheme } from "next-themes";

export default function CssVariableDemo() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 rounded-xl border border-border bg-background text-foreground shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Semantic Colors Demo</h3>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 text-sm rounded-md bg-foreground text-background font-medium"
        >
          Toggle Theme
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border bg-card text-card-foreground">
          <div className="font-medium">Card Surface</div>
          <div className="text-xs opacity-70">bg-card</div>
        </div>
        
        <div className="p-4 rounded-lg border bg-secondary text-secondary-foreground">
          <div className="font-medium">Secondary</div>
          <div className="text-xs opacity-70">bg-secondary</div>
        </div>
        
        <div className="p-4 rounded-lg border bg-muted text-muted-foreground">
          <div className="font-medium">Muted</div>
          <div className="text-xs opacity-70">bg-muted</div>
        </div>
        
        <div className="p-4 rounded-lg border bg-accent text-accent-foreground">
          <div className="font-medium">Accent</div>
          <div className="text-xs opacity-70">bg-accent</div>
        </div>
        
        <div className="p-4 rounded-lg border bg-destructive text-destructive-foreground">
          <div className="font-medium">Destructive</div>
          <div className="text-xs opacity-70">bg-destructive</div>
        </div>

        <div className="p-4 rounded-lg border bg-primary text-primary-foreground">
          <div className="font-medium">Primary</div>
          <div className="text-xs opacity-70">bg-primary</div>
        </div>
      </div>
    </div>
  );
}
