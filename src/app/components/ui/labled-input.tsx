import React, { useState } from 'react'
import { useSupabase } from '@/app/supabase-provider';
import { useToast } from "@/app/components/ui/use-toast";

function LabledInput({value,label}) {
    const [inputValue,setInputValue] = useState<string>(value);
    const { supabase } = useSupabase();
    const { toast } = useToast();

  return (
    <div>
    <p className="border rounded-md"><div className='flex items-center'><span className="rounded-l-md bg-slate-400/25 p-2">{label}</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e)=>{setInputValue(e.target.value);}}
              placeholder={`${inputValue} Key`}
              className="rounded-r-md min-h-full w-full p-2"
               />
          </div></p>
          </div>
  )
}
export default LabledInput