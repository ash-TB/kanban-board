"use client";

import React, {useState} from "react";

interface CounterProps {
    initial: number;
}

export function Counter({initial}: CounterProps){
    const [count, setCount] = useState(initial);

    return(
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md bg-white">
            <p className="text-xl font-semibold"> Count: {count}</p>
            <button onClick={()=> setCount(count + 1)}>Increment</button>
            <button onClick={()=> setCount(count - 1)}>Decrement</button>
        </div>
    );
}

