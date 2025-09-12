import React from "react";

interface NewPostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string }) => void;
}

export default function NewPostModal({ open, onClose, onSubmit }: NewPostModalProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Share something with the community</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="border w-full px-3 py-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="border w-full px-3 py-2 rounded"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-3xl bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-3xl bg-primary text-white"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}