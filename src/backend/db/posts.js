import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**

Posts and comments can be added here.
You can add default posts and comments of your wish with different attributes
*/
export const posts = [
  {
    _id: uuid(),
    content:
      "Why did the developer go broke? Because they kept spending all their money on coffee!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "balika@gmail.com",
    bookmark: [],
    createdAt: "2022-06-13T11:13:10+15:10",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "madhusudan@gmail.com",
        text: "Haha, coffee is the fuel for developers!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Why did the React developer start a band? Because they wanted to write some JSX-rocking music!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "madhusudan@gmail.com",
    bookmark: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "balika@gmail.com",
        text: "Haha, that's a catchy idea! JSX and rock music, what a combination!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "johndoe@gmail.com",
        text: "I'd love to attend their JSX-rock concert!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "janesmith@gmail.com",
        text: "Their band will definitely make a big hit in the developer community!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Why did the JavaScript developer always carry an umbrella? Because they were used to callbacks raining on their parade!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe@gmail.com",
    bookmark: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "bob@gmail.com",
        text: "Haha, callbacks can be unpredictable like the weather!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "alice@gmail.com",
        text: "Carrying an umbrella is a wise choice in the JavaScript world!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "charliebrown@gmail.com",
        text: "Callbacks may rain, but JavaScript developers are always prepared!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  // Add more posts for other users here
];
