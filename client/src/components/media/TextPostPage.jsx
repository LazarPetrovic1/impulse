import React, { useState, useEffect } from "react";
import { getStatusById } from "../../utils/status";
import Spinner from "../layout/Spinner";
import StatusPost from "./StatusPost";

function TextPostPage({ match }) {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const status = await getStatusById(match.params.id);
        await setStatus(status);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return status ? <StatusPost status={status} /> : <Spinner />;
}

export default TextPostPage;
