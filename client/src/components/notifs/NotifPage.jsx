import React, { useState, useEffect } from "react";
import { getUsersNotifs } from "../../utils/notifs";
import Spinner from "../layout/Spinner";
import DashCenter from "../../styled/DashCenter";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function NotifPage() {
  const [notifs, setNotifs] = useState([]);
  const [i, setI] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const notifs = await getUsersNotifs();
        await setNotifs(notifs);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return notifs.length > 0 ? (
    <DashCenter
      flexDir="column"
      justification="center"
      maxw="1300px"
      style={{ pointerEvents: "all" }}
    >
      {notifs.map((notif, ind) => (
        <div
          key={notif._id}
          onMouseEnter={() => setI(ind)}
          onMouseLeave={() => setI(null)}
          className={`alert border ${
            parseInt(i) === parseInt(ind) ? "bg-dark" : ""
          } d-block w-100 text-center`}
        >
          <Link
            to={notif.url ? notif.url : "/"}
            className="text-decoration-none text-light pr-2"
          >
            {notif.text}
          </Link>
          (<Moment format="DD.MM.YYYY">{notif.date}</Moment>)
        </div>
      ))}
      <div className="mt-4 w-100">
        <Link to="/" className="btn btn-dark btn-block">
          Go home
        </Link>
      </div>
    </DashCenter>
  ) : (
    <Spinner />
  );
}

export default NotifPage;
