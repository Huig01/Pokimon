import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokimon = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const newTodos = axios("https://jsonplaceholder.typecode.com/todos").then(
      (json) => json.data
    );

    setTodos(newTodos);
  }, []);
};

export default Pokimon;
 