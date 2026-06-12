import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function TestSupabase() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchResources() {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setResources(data);
    }

    fetchResources();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        Supabase Connection Test
      </h1>

      <div className="space-y-4">
        {resources.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sky-600 font-semibold">
              {item.category}
            </p>

            <h2 className="text-xl font-bold">
              {item.title}
            </h2>

            <p className="text-slate-600 mt-2">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestSupabase;