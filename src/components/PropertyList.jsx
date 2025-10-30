import React from 'react'
import PropertyRow from './PropertyRow'

export default function PropertyList({items, onEdit, onDelete}) {
  return (
    <div className='bg-indigo-100 rounded-xl shadow overflow-x-auto '>
      <table className='border-collapse text-left w-full'>
        <thead className='bg-gray-100 '>
            <tr>
                <th className='p-2 font-semibold '> Name </th>
                <th className='p-2 font-semibold '>Location </th>
                <th className='p-2 font-semibold'>Rent</th>
                <th className='p-2 font-semibold'>Status</th>
                <th className='p-2 font-semibold'>Tenant</th>
                <th className='p-2 font-semibold'>Actions</th>
            </tr>
        </thead>

        <tbody>
            {items.map((it) => (
                <PropertyRow key={it.id} item={it} onEdit={()=>onEdit(it)} onDelete={()=>onDelete(it)}/>
            ))}
            {items.length === 0 && (
                <tr> <td className='p-4 text-gray-600 italic' colSpan={6}>No Properties found.</td> </tr>
            )}
        </tbody>

      </table>
    </div>
  );
}
