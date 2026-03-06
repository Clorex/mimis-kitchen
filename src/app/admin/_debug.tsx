"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DebugPage({ collectionName }: { collectionName: string }) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, collectionName));
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err:any) {
        setError(err.message);
      }
    };
    load();
  }, [collectionName]);

  if (error) return <p style={{color:"red"}}>Error: {error}</p>;
  if (!data.length) return <p>No data found.</p>;

  return (
    <pre style={{background:"#fff", padding:20}}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
