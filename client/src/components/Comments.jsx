import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/axiosInstance";
import useAuthStore from "../store/authStore";
import axios from "axios";

const Comments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useAuthStore((state) => state.user);

  // Fetch comments
  const fetchComments = async () => {
    if (!productId) {
      toast.error("Product ID is missing. Please try again.");
      return;
    }

    try {
      const response = await axios.get(`${api}/comments/${productId}/comments`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to fetch comments. Please try again later.");
    }
  };

  // Handle comment submission
  const handleAddComment = async () => {
    if (!user) {
      toast.error("Please log in to add a comment.");
      return;
    }
    if (!newComment) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      await axios.post(`${api}/comments/${productId}/comments`, { content: newComment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setNewComment("");
      fetchComments();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    if (!user) {
      toast.error("Please log in to delete a comment.");
      return;
    }

    try {
      await axios.delete(`${api}/comments/${productId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchComments();
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  // Fetch comments on initial render
  useEffect(() => {
    fetchComments();
  }, [productId]);

  return (
    <div className="comments-section mt-5 px-4 py-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Comments</h3>
      <div className="comments-list mb-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment p-4 mb-3 border-b border-gray-300 rounded-lg flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{comment.user.name}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
              {user && user._id === comment.user._id && (
                <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:text-red-700 ml-4">
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {user ? (
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button onClick={handleAddComment} className="w-full md:w-[200px] bg-blue2 text-white px-4 py-2 rounded-md hover:bg-blue3 focus:outline-none">
            Submit Comment
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">You need to <span className="font-semibold text-blue-500 cursor-pointer" onClick={() => window.location.href = "/login"}>log in</span> to add a comment.</p>
        </div>
      )}
    </div>
  );
};

export default Comments;