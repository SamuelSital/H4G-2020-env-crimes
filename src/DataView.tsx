import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import { useParams } from "react-router-dom";

interface ISensorData {
  id: string;
}

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ISensorData>();

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((data) => data.json())
      .then((data: ISensorData) => setData(data))
      .catch(err => alert('Something went wrong :(\n' + err.toString()));
    // eslint-disable-next-line
  }, []);
  console.log(data);

  return (
    <div>
      Data
      <br />
      <pre>{JSON.stringify(data || { loading: true }, null, 2)}</pre>
    </div>
  )
}

export default DataView;
