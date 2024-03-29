import Comment from "./Comment";

import { ICommentsFeedProps } from "@/types";

const CommentsFeed: React.FC<ICommentsFeedProps> = ({ comments }) => {
  if (comments.length === 0) return null;

  return (
    <div className="">
      {comments.map((comment, index: number) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsFeed;
