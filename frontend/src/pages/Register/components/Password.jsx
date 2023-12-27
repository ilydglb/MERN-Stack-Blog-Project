import React, { useState } from "react";
import { Password } from 'primereact/password';

export default function ToggleMaskDemo() {
    const [value, setValue] = useState('');

    return (
        <div className="flex justify-content-center formInput">
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
        </div>
    )
}