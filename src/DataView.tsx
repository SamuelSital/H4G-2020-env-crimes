import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import { useParams } from "react-router-dom";
import { fetchDiscussionData } from "./discussion/api-adapter";
import { PostData } from "./discussion/mock-data";

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PostData>();

  useEffect(() => {
    fetchDiscussionData(id)
      .then(setData)
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
