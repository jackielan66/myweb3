import { NotificationCard } from "@/components/NotificationCard";
import { ResponsiveGrid } from "@/components/ResponsiveGrid";
import { ResponsiveBreakpoints } from "@/components/ResponsiveBreakpoints";
import ProductCard from "@/components/ProductCard";
import ThemeDemo from "@/components/ThemeDemo";
import { Button } from "@/components/Button";
import { DynamicClassDemo } from "@/components/DynamicClassDemo";
import CnDemo from "@/components/CnDemo";
import CssVariableDemo from "@/components/CssVariableDemo";
import ApplyDemo from "@/components/ApplyDemo";

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-12 max-w-6xl mx-auto text-foreground bg-background">
      <section>
        <h2 className="text-2xl font-bold mb-6">1. Notification Card (Part 1)</h2>
        <NotificationCard />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">2. Responsive Breakpoints (Section 1.3)</h2>
        <p className="mb-4 text-slate-500">Resize window to see background color change.</p>
        <ResponsiveBreakpoints />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">3. Responsive Grid (Section 2.1)</h2>
        <p className="mb-4 text-slate-500">Resize your window to see the grid change from 1 to 3 columns.</p>
        <ResponsiveGrid />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">4. Product Card (Section 1.7)</h2>
        <ProductCard />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">5. Dark Mode (Section 2.2)</h2>
        <ThemeDemo />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">6. CSS Variables & Semantic Colors (Section 3.3)</h2>
        <CssVariableDemo />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">7. Button Component (Section 4.1)</h2>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button className="bg-green-500 hover:bg-green-600">Green Button</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">8. Dynamic Class Names (Section 4.2)</h2>
        <DynamicClassDemo />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">9. Class Conflicts & cn() (Section 4.3)</h2>
        <CnDemo />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">10. @apply Directive (Section 4.1 Alternative)</h2>
        <ApplyDemo />
      </section>
    </main>
  );
}
