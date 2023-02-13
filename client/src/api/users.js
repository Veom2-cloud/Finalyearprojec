import { BASE_URL } from "../config";


const signup = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const login = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/random?" + new URLSearchParams(query)
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/alluser" 
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  
  
  try {
    const res = await fetch(BASE_URL + "api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },

      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletes = async (id) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + id, {
      method: "DELETE",
    
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (user, data) => {
  
  
  try {
    const res = await fetch(BASE_URL + "api/users/update/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },

      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const follows = async (userId, followingId) => {
 
  try {
    let response = await fetch(BASE_URL + 'api/users/follow/' + followingId , {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({userId: userId , followingId: followingId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const finduserbyid = async (userId) => {
  
  
  try {
    const res = await fetch(BASE_URL + "api/users/getuserbyid/" + userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (userId, followingId) => {
  try {
    let response = await fetch(BASE_URL + 'api/users/unfollow/' + followingId, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId: userId, followingId: followingId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const getAllfollowers = async (userId) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/followers" + userId
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
const getfollowing = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/following?" + new URLSearchParams(query)
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};


export { signup, login, getUser, getRandomUsers, updateUser, deletes , getAllUsers, unfollow , getfollowing, update, finduserbyid};
