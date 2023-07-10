import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SinglePost } from "../Home/SinglePost";

export function Bookmark() {
  const { allPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const [bookmark, setBookmark] = useState(allPosts);

  useEffect(() => {
    setBookmark(
      allPosts.filter(
        (post) =>
          post.bookmark.some(
            (bookmarkPost) => bookmarkPost.username === user.username
          ) === true
      )
    );
  }, [allPosts]);

  return (
    <div>
      <div className="flex flex-col gap-6 md:mb-14 sm:mb-8">
        {bookmark.length > 0 ? (
          bookmark.map((post) => <SinglePost key={post._id} post={post} />)
        ) : (
          <div className="m-auto my-4 text-xl font-bold text-gray-500 sm:mb-8">
            <p className="text-center">No Bookmarks Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
