export function ResponsiveBreakpoints() {
  return (
    <div className="w-full p-6 rounded-xl text-center text-white font-bold text-2xl transition-colors duration-500
      bg-red-500
      sm:bg-orange-500
      md:bg-yellow-500
      lg:bg-green-500
      xl:bg-blue-500
      2xl:bg-purple-500
    ">
      <span className="block sm:hidden">Mobile (Default)</span>
      <span className="hidden sm:block md:hidden">Small (sm: ≥ 640px)</span>
      <span className="hidden md:block lg:hidden">Medium (md: ≥ 768px)</span>
      <span className="hidden lg:block xl:hidden">Large (lg: ≥ 1024px)</span>
      <span className="hidden xl:block 2xl:hidden">Extra Large (xl: ≥ 1280px)</span>
      <span className="hidden 2xl:block">2X Large (2xl: ≥ 1536px)</span>
    </div>
  )
}
