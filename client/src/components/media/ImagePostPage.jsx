import React, { useState, useEffect } from "react";
import { getImageById } from "../../utils/images";
import Spinner from "../layout/Spinner";
import Post from "./Post";
import DashCenter from "../../styled/DashCenter";

function ImagePostPage({ match }) {
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  const [isSlider, setIsSlider] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const image = await getImageById(match.params.id);
        await setImage(image);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return image ? (
    <DashCenter
      display="block"
      maxw="1300px"
      style={{ pointerEvents: "all" }}
      className="border rounded my-3 px-3"
    >
      <Post image={image} setIsSlider={setIsSlider} i={0} />
    </DashCenter>
  ) : (
    <Spinner />
  );
}

export default ImagePostPage;
