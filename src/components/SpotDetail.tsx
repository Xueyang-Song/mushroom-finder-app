"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Comment {
  id: number;
  body: string;
  created_at: string;
  profiles: { username: string };
}

interface Spot {
  id: number;
  name: string;
  description: string;
  season: string;
  forest_type: string;
  area_type: string;
  data_source?: string;
  data_updated_at?: string;
}

interface SpotDetailProps {
  spot: Spot;
  onClose: () => void;
}

export default function SpotDetail({ spot, onClose }: SpotDetailProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadComments();
    checkUser();
  }, [spot.id]);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  async function loadComments() {
    const res = await fetch(`/api/comments?spot_id=${spot.id}`);
    const data = await res.json();
    setComments(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spot_id: spot.id, body: newComment }),
    });
    setNewComment("");
    setLoading(false);
    loadComments();
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-green-800">{spot.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{spot.description}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          {spot.season}
        </span>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          {spot.forest_type}
        </span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {spot.area_type}
        </span>
      </div>

      {spot.data_source && (
        <p className="text-xs text-gray-400 mb-4">
          Source: {spot.data_source}
          {spot.data_updated_at &&
            ` · Updated: ${new Date(spot.data_updated_at).toLocaleDateString()}`}
        </p>
      )}

      <hr className="my-4" />

      <h3 className="font-semibold text-gray-800 mb-3">
        Comments ({comments.length})
      </h3>

      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="font-medium text-gray-700">
                {c.profiles?.username ?? "Anonymous"}
              </span>
              <span>{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-700">{c.body}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-gray-400">
            No comments yet. Be the first!
          </p>
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">
          <a href="/login" className="text-green-600 underline">
            Log in
          </a>{" "}
          to leave a comment.
        </p>
      )}
    </div>
  );
}
