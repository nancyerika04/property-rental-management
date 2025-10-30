import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";
import PropertyList from "../components/PropertyList";
import { db } from "../firebase";
import {collection, addDoc, onSnapshot, query, orderBy,updateDoc, doc, deleteDoc, serverTimestamp} from "firebase/firestore";

export default function Home() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  // READ 
  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setItems(rows);
    });
    return () => unsub();
  }, []);

  //filter (name/location/tenant)
  const s = search.trim().toLowerCase();
  const filteredItems = !s
    ? items
    : items.filter(i => {
        const name = (i.name ?? "").toString().toLowerCase();
        const loc  = (i.location ?? "").toString().toLowerCase();
        const ten  = (i.tenant ?? "").toString().toLowerCase();
        return name.includes(s) || loc.includes(s) || ten.includes(s);
      });

  // CREATE
  async function handleCreate(data) {
    await addDoc(collection(db, "properties"), {
      ...data,
      rent: Number(data.rent) || 0,
      createdAt: serverTimestamp(),
    });
  }

  // UPDATE
  async function handleUpdate(data) {
    if (!editing?.id) return;
    await updateDoc(doc(db, "properties", editing.id), {
      ...data,
      rent: Number(data.rent) || 0,
    });
    setEditing(null);
  }

  // DELETE
  async function handleDelete(it) {
    if (confirm(`Delete "${it.name}" ?`)) {
      await deleteDoc(doc(db, "properties", it.id));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Property Rental Management</h1>

      <div className="flex gap-2">
        <input
          className="border rounded p-2 w-full bg-gray-200"
          placeholder="Search by name, location or tenant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")} className="px-3 rounded border bg-white hover:bg-gray-100"> Clear </button>
        )}
      </div>
  
      <PropertyForm
        initialData={editing}
        onSubmit={(payload) =>
          editing ? handleUpdate(payload) : handleCreate(payload)
        }
        onCancel={() => setEditing(null)}
      />
    
      <PropertyList
        items={filteredItems}
        onEdit={(it) => setEditing(it)}
        onDelete={handleDelete}
      />
    </div>
  );
}
