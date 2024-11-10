"use client";
import { useEffect, useState } from "react";

export default function Products() {
  

    interface Item {
      id: number;
      name: string;
  
  }
    const [data, setData] = useState<any>([]);
  
    useEffect(() => {
      fetch('products.json')
        .then(response => response.json())
        .then(json => setData(json));
    });
  
    if (!data) {
      return <p>Loading...</p>;
    }
  

    return (
        <div>
      <ul>
        {(data as Item[]).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={()=> {const newdata =  data.concat({id:"5", name: "Spaghetti"}); setData(newdata)}} value="Spaghetti">
      Add Spaghetti
    </button>
    </div>      
    );
  }

