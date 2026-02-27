// components/ProductList.tsx
export default function ProductList({ data }: { data: { id: number; name: string; price: number }[] }) {
  if (data.length === 0) return <div className="p-4 text-gray-500">暂无数据</div>
  
  return (
    <ul className="space-y-2 mt-4">
      {data.map((item) => (
        <li key={item.id} className="p-3 border rounded shadow-sm flex justify-between">
          <span>{item.name}</span>
          <span className="font-bold">${item.price}</span>
        </li>
      ))}
    </ul>
  )
}