import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const posts = [
  {
    _id: uuid(),
    content:
      "“The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.” – Ryan Holiday",
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
        text: "Indeed, adversities often lead to growth and improvement.",
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
      "“You have power over your mind - not outside events. Realize this, and you will find strength.” – Marcus Aurelius",
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
        text: "This is a great reminder, thank you. Controlling our mind is the ultimate power we have.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "johndoe@gmail.com",
        text: "We often forget that our perception is the one thing we can truly control.",
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
      "“It’s not what happens to you, but how you react to it that matters.” – Epictetus",
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
        text: "Our reactions definitely shape our realities.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "alice@gmail.com",
        text: "True! It's our responses that define us, not our circumstances.",
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
      "“He who fears death will never do anything worthy of a living man.” – Seneca",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "alice@gmail.com",
    bookmark: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "bob@gmail.com",
        text: "A meaningful life is lived beyond the fear of death.",
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
      "“Waste no more time arguing about what a good man should be. Be one.” – Marcus Aurelius",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "bob@gmail.com",
    bookmark: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "alice@gmail.com",
        text: "Action speaks louder than words. We should all strive to be the change we want to see.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  // Add more posts for other users here
];
