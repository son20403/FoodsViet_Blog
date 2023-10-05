import { useState } from "react";

export default function useToggle(initialState = false) {
    const [toggle, setToggle] = useState(initialState);
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return { toggle, handleToggle }
}