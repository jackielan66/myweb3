export function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-6 shadow rounded-lg">Card 1</div>
      <div className="bg-white p-6 shadow rounded-lg">Card 2</div>
      <div className="bg-white p-6 shadow rounded-lg">Card 3</div>
    </div>
  )
}
