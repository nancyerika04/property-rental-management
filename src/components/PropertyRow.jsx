// src/components/PropertyRow.jsx
export default function PropertyRow({ item, onEdit, onDelete }) {
  return (
    <tr className="border-b align-middle">
      <td className="p-2 font-medium">{item.name}</td>
      <td className="p-2">{item.location}</td>
      <td className="p-2">{item.rent}</td>
      <td className="p-2">
        <span className={item.status === "Available" ? "text-green-600" : "text-gray-600"}>
          {item.status}
        </span>
      </td>
      <td className="p-2">{item.tenant || "-"}</td>
      <td className="p-2">
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-2 py-1 border rounded hover:bg-gray-100">Edit</button>
          <button onClick={onDelete} className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
      </td>
    </tr>
  );
}
