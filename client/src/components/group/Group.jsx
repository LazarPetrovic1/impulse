import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { getGroup, getGroupPosts } from "../../actions/group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DashCenter from "../../styled/DashCenter";
import Modal from "../utils/Modal";
import Moment from "react-moment";
import { getUserById } from "../../utils/users";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import GroupPostModal from "./GroupPostModal";
import GroupPost from "./GroupPost";
import DeleteGroupCheck from "../dashboard/utilcomps/DeleteGroupCheck";
import DeleteIcon from "../utils/icons/DeleteIcon";
import { ColourContext } from "../../contexts/ColourContext";
import {
  POST_DELIMITER,
  COMMENT_DELIMITER,
  REPLY_DELIMITER,
} from "../../utils/nonReduxConstants";

function Group({ group: { group }, getGroup, match, getGroupPosts }) {
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPostItems, setShowPostItems] = useState(false);
  const [groupPeople, setGroupPeople] = useState([]);
  const [searchMembers, setSearchMembers] = useState("");
  const { background } = useContext(ColourContext);
  const observer = useRef();
  const infiniteScrollPost = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
      // eslint-disable-next-line
    },
    [hasMore]
  );
  const getMoreGroups = async () => {
    if (!hasMore) return;
    if (page > 1 && group && group._id) {
      const res = await getGroupPosts(
        group._id,
        page,
        POST_DELIMITER,
        1,
        COMMENT_DELIMITER,
        1,
        REPLY_DELIMITER
      );
      await setHasMore(res.hasMore);
    }
  };
  useEffect(() => {
    (async function () {
      try {
        await getGroup(match.params.id);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getMoreGroups();
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    let people = [];
    (async function () {
      try {
        if (group && group._id) {
          for (const person of group.people) {
            const gotPerson = await getUserById(person);
            await people.push(gotPerson);
          }
          await setGroupPeople(people);
        }
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [group]);
  return group && group._id && groupPeople ? (
    <article style={{ pointerEvents: "all" }}>
      <div style={{ maxHeight: "600px", overflow: "hidden" }}>
        <img
          className="d-block rounded m-auto"
          src={group.groupImage}
          alt={group.name}
          width="100%"
          height="auto"
        />
      </div>
      <DashCenter
        background={background}
        justification="space-between"
        maxw="1300px"
      >
        <h1>{group.name}</h1>
        <div className="d-flex">
          <button
            className="btn btn-danger rounded-circle mr-2 p-0"
            onClick={() => setShowDelete(true)}
          >
            <DeleteIcon width={38} height={36} />
          </button>
          <button
            className="btn btn-primary rounded-circle mx-2"
            style={{ padding: "6px 10px" }}
          >
            <i className="fas fa-user-plus" />
          </button>
          <button
            className="btn btn-primary rounded-circle ml-2"
            onClick={() => setShowAbout(true)}
          >
            <i className="fas fa-question" />
          </button>
        </div>
      </DashCenter>
      <Modal
        title="About the group"
        onClose={() => setShowAbout(false)}
        show={showAbout}
      >
        <p className="lead">{group.about}</p>
        <p>
          Created on <Moment format="DD. MM. YYYY">{group.date}</Moment>
        </p>
      </Modal>
      <DeleteGroupCheck
        show={showDelete}
        ingroup
        onClose={() => setShowDelete(false)}
        groupId={group._id}
        groupname={group.name}
      />
      <DashCenter
        background={background}
        justification="space-between"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
      >
        <button className="btn text-light" onClick={() => setShowPeople(true)}>
          {group.people.length} people
        </button>
        <Modal
          title="Group members"
          onClose={() => setShowPeople(false)}
          show={showPeople}
        >
          <div className="mt-2 mb-4">
            <input
              type="search"
              name="searchMembers"
              value={searchMembers}
              className="form-control"
              placeholder="Search for a specific member"
              onChange={(e) => setSearchMembers(e.target.value)}
            />
          </div>
          {groupPeople
            .filter(
              (member) =>
                member.firstName.includes(searchMembers) ||
                member.lastName.includes(searchMembers)
            )
            .map((gp) => (
              <div key={gp._id}>
                <img
                  src={`https://robohash.org/${gp._id}?set=set4&size=22x22`}
                  alt={gp.firstName}
                />
                <Link
                  to={`/social/profile/${gp._id}`}
                  className="font-weight-bold px-3"
                >
                  {gp.firstName} {gp.lastName}
                </Link>
                {gp._id === group.admin ? (
                  <span className="badge badge-success">Admin</span>
                ) : (
                  <span className="badge badge-secondary">Member</span>
                )}
              </div>
            ))}
        </Modal>
        <button
          className="btn btn-secondary rounded-circle"
          onClick={() => setShowPostItems(true)}
        >
          <i className="fas fa-plus" />
        </button>
        <GroupPostModal
          id={match.params.id}
          showPostItems={showPostItems}
          setShowPostItems={setShowPostItems}
        />
      </DashCenter>
      {group.posts.length > 0 &&
        group.posts.map((post) => (
          <GroupPost groupid={group._id} key={post._id} post={post} />
        ))}
      <div ref={infiniteScrollPost} style={{ height: "30px" }} />
    </article>
  ) : (
    <Spinner />
  );
}

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getGroupPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { getGroup, getGroupPosts })(Group);
