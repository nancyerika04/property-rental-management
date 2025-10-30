import { useEffect, useState } from "react";

export default function PropertyForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "", location: "", rent: "", status: "Available", tenant: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        location: initialData.location ?? "",
        rent: String(initialData.rent ?? ""),
        status: initialData.status ?? "Available",
        tenant: initialData.tenant ?? ""
      });
    } else {
      setForm({ name:"", location:"", rent:"", status:"Available", tenant:"" });
    }
  }, [initialData]);

  function handleChange(e){
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e){
    e.preventDefault();
    const payload = { ...form, rent: Number(form.rent) || 0 };
    onSubmit?.(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-400 rounded-xl shadow">
      <div className="grid gap-3 md:grid-cols-2">
        <input className="border p-2 rounded" name="name" placeholder="Property name" value={form.name} onChange={handleChange} required/>
        <input className="border p-2 rounded" name="location" placeholder="Location" value={form.location}onChange={handleChange} required/>
        <input className="border p-2 rounded" name="rent" placeholder="Monthly rent" value={form.rent} onChange={handleChange} inputMode="numeric"required/>
        <select
          className="border p-2 rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Available</option>
          <option>Rented</option>
        </select>
        <input
          className="border p-2 rounded md:col-span-2"
          name="tenant"
          placeholder="Tenant (optional)"
          value={form.tenant}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-800 text-white">
          {initialData ? "Update" : "Add"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border hover:bg-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
