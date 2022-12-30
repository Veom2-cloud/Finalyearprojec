const User = require("../models/User");
const Post = require("../models/Post");
const PostLike = require("../models/PostLike");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Follow = require("../models/Follow");
const { default: mongoose } = require("mongoose");

const getUserDict = (token, user) => {
  return {
    token,
    username: user.username,
    userId: user._id,
    isAdmin: user.isAdmin,
    email: user.email,
    currentuser: user
  };
};

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      throw new Error("All input required");
    }

    const normalizedEmail = email.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      throw new Error("Email and username must be unique");
    }

    const user = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.json(getUserDict(token, user));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error("All input required");
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
  

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email or password incorrect");
    }

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.json(getUserDict(token, user));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const follow = async (req, res) => {
  
    const { userId } = req.body;
    const followingId = req.params.id;
  if (userId == followingId) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await User.findById(followingId);
      const followingUser = await User.findById(userId);

      if (!followUser.followers.includes(userId)) {
        await followUser.updateOne({ $push: { followers: userId } });
        await followingUser.updateOne({ $push: { following: followingId } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
  }

const updateUser = async (req, res) => {
  try {
    const { userId, biography } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    if (typeof biography == "string") {
      user.biography = biography;
    }

    await user.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const unfollow = async (req, res) => {

    const { userId } = req.body;
    const followingId = req.params.id;
    if(userId === followingId)
    {
      res.status(403).json("Action Forbidden")
    }
    else{
      try {
        const unFollowUser = await User.findById(followingId)
        const unFollowingUser = await User.findById(userId)
  
  
        if (unFollowUser.followers.includes(userId))
        {
          await unFollowUser.updateOne({$pull : {followers: userId}})
          await unFollowingUser.updateOne({$pull : {following: followingId}})
          res.status(200).json("Unfollowed Successfully!")
        }
        else{
          res.status(403).json("You are not following this User")
        }
      } catch (error) {
        res.status(500).json(error)
      }
    }
};

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const followers = await User.find({ followingId: userId });

    return res.status(200).json({ data: followers });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    // const userId = req.params.id;

    const user = await User.find({})
    console.log(user)

    if (!user) {
      throw new Error("go User does not exist");
    }
    
    return res.status(200).send(user );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};




const getUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      throw new Error("User does not exist");
    }

    const posts = await Post.find({ poster: user._id })
      .populate("poster")
      .sort("-createdAt");

    let likeCount = 0;

    posts.forEach((post) => {
      likeCount += post.likeCount;
    });

    const data = {
      user,
      posts: {
        count: posts.length,
        likeCount,
        data: posts,
      },
    };

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getRandomUsers = async (req, res) => {
  try {
    let { size } = req.query;

    const users = await User.find().select("-password");

    const randomUsers = [];

    if (size > users.length) {
      size = users.length;
    }

    const randomIndices = getRandomIndices(size, users.length);

    for (let i = 0; i < randomIndices.length; i++) {
      const randomUser = users[randomIndices[i]];
      randomUsers.push(randomUser);
    }

    return res.status(200).json(randomUsers);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const getRandomIndices = (size, sourceSize) => {
  const randomIndices = [];
  while (randomIndices.length < size) {
    const randomNumber = Math.floor(Math.random() * sourceSize);
    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber);
    }
  }
  return randomIndices;
};

const deletes = async (req, res) => {
  const { userId, isAdmin } = req.body;

  try {
    const user = await Post.findById(userId);

    await user.remove();
      res.send('User Deleted Successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
}

const getAllUsers = async (req, res) => {
  try {
    // let { userfollowing } = req.query;
    
    var users = await User.find({})
    // users = users.filter((user) => userfollowing.includes(user._id))
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};


module.exports = {
  register,
  login,
  deletes,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getUser,
  getRandomUsers,
  updateUser,
  getAllUsers
};
