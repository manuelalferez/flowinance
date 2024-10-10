"use client"
import React, { use, useEffect, useState } from 'react'
import { LocalStorage, decryptTransactions, getTransactionsFromSupabase, getUserId } from '@/lib/utils';
import { useSupabase } from '@/app/supabase-provider';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/app/components/ui/use-toast';

function objectArrayToCsvString(array:any[],delimiter:string=',',headers:any[]){
  const rows = array.map(obj => [
    obj.date,
    obj.concept,
    obj.amount,
    obj.category
  ]);
  return [headers, ...rows].map(row => row.join(delimiter)).join('\n');
};

function downlaodCSV(data:any[]){
  const delimeter = localStorage.getItem(LocalStorage.delimiter);
  const csvString = objectArrayToCsvString(data,delimeter??",",['date', 'concept', 'amount', 'category'])

  const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}


export function ExportTransactions() {
  
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  async function getAllTransactions(){
    setIsLoading(true);
    const data= await getTransactionsFromSupabase(supabase);
    const userId = await getUserId(supabase);
    if (!data) {
      toast({
        description:
          "❎ Error fetching transactions. Please, try again later.",
      });
    } else {
      const decryptData = decryptTransactions(data,userId?userId:"");
      downlaodCSV(decryptData);
    }
    setIsLoading(false);
  }
  
  return (
    <div className='p-2 mt-2 pl-0'>
      <span className='text-xl'> Would you like to export transactions in .csv</span>
      <br/>
      <br/>
      {!isLoading ? <button onClick={async()=>{await getAllTransactions();}} className='bg-emerald-700 p-2 rounded-md text-white'> Export all Transations</button> :<div className="h-full w-full fixed top-0 left-0 bg-black/50 z-[99999]">
          <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary" />
            <span className="text-red-500 text-8xl">Downloading...</span>
          </div>
        </div>
      }
    </div>
  )
}

 