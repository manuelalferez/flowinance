"use client";

import LabledInput from "@/app/components/ui/labled-input";
import { useToast } from "@/app/components/ui/use-toast";
import { useSupabase } from "@/app/supabase-provider";
import { getAllIntegrationsFromSupabase, saveTelegramIntegration } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Integration() {
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    async function fetchData() {
      const integration = await getAllIntegrationsFromSupabase(supabase) as [];
      let filteredData = [];
      for (const [key, value] of Object.entries(integration[0])) {
        filteredData.push({name:key,value:value})
      }
      console.log(filteredData)
      setData(filteredData);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h3 className="text-lg font-medium">Integrations</h3>
      <p className="text-sm text-muted-foreground mb-2">
      Easily Integrate Apps to get easier access to your finances.
      </p>
      {
        data.map((x)=>{
          return (<LabledInput key={x.name} value={x.value} label={x.name}/>)
        })
      }
    </div>
  );
}
