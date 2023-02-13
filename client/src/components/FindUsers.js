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
import Footer from "./Footer";

const FindUsers = () => {
  
const userstate = useSelector((state) => state.loginUserReducer);
const { user} = userstate;

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    setLoading(true);
    const temp = await getRandomUsers({ size: 5 });
    const data = temp.filter((x)=> x._id !== user.userId)
    // console.log(data)
    setLoading(false);
    setUsers(data);
  };
  const [following, setfollowing] = useState(JSON.parse(localStorage.getItem("following")))


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };
 
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
    <Card>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>Find Others</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <HorizontalStack justifyContent="space-between" key={user._id}>
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
              {!following.includes(user._id) ?
              <Button
                variant="contained"
                id="followButton"
                color="primary"
                onClick={() => {
                  handlefollow(user._id);
                }}
              >
                Follow
              </Button> :
               <Button
              variant="contained"
              color="primary"
              id="followButton"

              onClick={() => {
                handleunfollow(user._id);
              }}
            >
              UnFollow
            </Button>
}
            </HorizontalStack>
          ))
        )}
      </Stack>
      <Footer />

    </Card>
  );
};

export default FindUsers;
