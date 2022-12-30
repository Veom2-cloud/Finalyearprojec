import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import CreatePost from "../CreatePost";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import SortBySelect from "../SortBySelect";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";
import HorizontalStack from "../util/HorizontalStack";
import PostBrowser from "../PostBrowser";
import { useDispatch, useSelector } from "react-redux";
import {getfollowing} from "../../api/users"

const ExploreView = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
const { user} = userstate;
// console.log(user)
var userfollowing = JSON.parse(localStorage.getItem("following"))
userfollowing.push(user.userId)


// console.log(following)
// const [CurrentUser, setCurrentUser] = useState();

// const getCurrentUser = async () => {
//     const data = await getfollowing(user.userId );
//     // console.log(data.following)
//     setCurrentUser(data)
// }

// useEffect(() => {
//     getCurrentUser();
//   }, []);

  // getCurrentUser();
  // console.log(CurrentUser.following)
// currentUser={user.userId}

  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<PostBrowser createPost contentType="posts"  following = {userfollowing} />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default ExploreView;
