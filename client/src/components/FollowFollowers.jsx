// import React from "react";
import "./FollowFollowers.css";

import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import "./css/FindUsers.css";
import { follows, unfollow } from "../api/users";
import { useDispatch, useSelector } from "react-redux";

const FollowFollowers = (props) => {
    // const following = JSON.parse(localStorage.getItem("following"))
    const [following, setfollowing] = useState(JSON.parse(localStorage.getItem("following")))
    const userstate = useSelector((state) => state.loginUserReducer);
const { user} = userstate;

    const handlefollow = async (id)=>{

        follows(user.userId , id) 
        var tempfollowing = following.map((x) => x)
        tempfollowing.push(id)
        setfollowing(tempfollowing)
    
      }
      const handleunfollow = async (id)=>{
        unfollow(user.userId , id) 
        var tempfollowing = following.filter((x) => x != id)
        // tempfollowing.push(id)
        setfollowing(tempfollowing)
    
      }

      useEffect(()=>{
        localStorage.setItem("following", JSON.stringify(following))
      },[following]);

  return (
    <div className="followFollowers">
      {props.users.map((user, i) => (
        <HorizontalStack className="follow-card" justifyContent="space-between" key={user._id}>
          <HorizontalStack>
            <UserAvatar width={30} height={30} username={user.username} />

            {/* <Typography>{user.username}</Typography> */}
            <Link
              style={{ textDecoration: "none" }}
              to={"/users/" + user.username}
            >
              {user.username}
            </Link>
          </HorizontalStack>
          {!following.includes(user._id) ? (
            <Button
              variant="contained"
              id="followButtonx"
              color="primary"
              onClick={() => {
                handlefollow(user._id);
              }}
            >
              Follow
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              id="followButtonx"
              onClick={() => {
                handleunfollow(user._id);
              }}
            >
              UnFollow
            </Button>
          )}
        </HorizontalStack>
      ))}
    </div>
  );
};

export default FollowFollowers;
