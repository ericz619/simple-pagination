import React, { useState, useEffect } from "react";

import { Pagination } from "./components";

export default function App() {
  const [isMount, setMount] = useState(false);
  const [initialPage, setInitialPage] = useState(1);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isMount) {
      setData(createRandomPost());
      setMount(true);
    }
  }, [isMount]);

  const createRandomPost = () => {
    let obj = {};

    for (let i = 1; i <= 25; i++) {
      obj[i] = `This is page ${i}`;
    }

    return obj;
  };

  return (
    <div>
      <div>{data[initialPage] && <span>{data[initialPage]}</span>}</div>

      <Pagination
        pageCount={25}
        pageNeighbours={1}
        onPageChange={setInitialPage}
      />
    </div>
  );
}
