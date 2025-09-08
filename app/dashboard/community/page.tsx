"use client";
import { Plus, ThumbsUp, Reply, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CommunityPage() {
  const [search, setSearch] = React.useState("");
  const [likedPostId, setLikedPostId] = React.useState<number | null>(null);
  const [likeCounts, setLikeCounts] = React.useState<{ [key: number]: number }>(
    {
      1: 12,
      2: 12,
    }
  );
  const [openRepliesId, setOpenRepliesId] = React.useState<number | null>(null);

  const posts = [
    {
      id: 1,
      author: "Oluwafikunayomi Dina",
      position: "Intern",
      division: "Information Technology",
      title: "Best practices for React Native development?",
      content:
        "I'm working on a mobile app project and would love to hear about best practices for React Native development. What are some common pitfalls to avoid?",
    },
    {
      id: 2,
      author: "Adenuga Adedamola",
      position: "Intern",
      division: "Information Technology",
      title: "Infrastructure as a Code",
      content:
        "Terraform is an open-source Infrastructure as Code (IaC) tool developed by HashiCorp. It allows users to define, provision, and manage infrastructure resources across various cloud providers (like AWS, Azure, Google Cloud Platform) and on-premises environments using a high-level configuration language called HashiCorp Configuration Language (HCL), although it also supports JSON.",
    },
  ];

  const replies = {
    1: [
      {
        id: 1,
        author: "Adebayo Johnson",
        position: "Supervisor",
        content:
          "Great question! I'd recommend focusing on performance optimization early. Use FlatList for large datasets and avoid unnecessary re-renders.",
      },
      {
        id: 1,
        author: "Jane Doe",
        position: "Supervisor",
        content: "Great question! Avoid using too many libraries.",
      },
    ],
    2: [
      {
        id: 1,
        author: "David Smith",
        position: "Supervisor",
        content:
          "Great question! I'd recommend focusing on performance optimization early.",
      },
      {
        id: 1,
        author: "Mary Johnson",
        position: "Supervisor",
        content: "Great question! Avoid using too many libraries.",
      },
    ],
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.author.toLowerCase().includes(search.toLowerCase()) ||
      post.position.toLowerCase().includes(search.toLowerCase()) ||
      post.division.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  const show404 = search.trim().length > 0 && filteredPosts.length === 0;

  function handleLike(postId: number) {
    setLikedPostId(postId);
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  }

  return (
    <div className="p-8 md:px-16 md:py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-medium">Community</h1>
        <p>Connect with other Names and supervisors.</p>
        <div className="mt-4 md:flex justify-between items-end space-y-4 md:space-y-0">
          <div className="space-y-2 w-full md:w-3/4">
            <h5 className="text-sm font-medium">Community Form</h5>
            <input
              type="text"
              placeholder="Search for posts"
              className="border border-primary rounded-md px-4 py-2 w-full text-xs font-normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex bg-primary text-xs md:text-sm font-medium justify-between items-center py-2 px-4 rounded-3xl">
            <Plus className="mr-1" /> New Post
          </button>
        </div>
      </div>
      <div className="rounded-2xl flex flex-col">
        <figure>
          <div
            className={
              show404 || (!show404 && filteredPosts.length === 0)
                ? "relative max-w-[558px] min-h-[372px] flex justify-center items-center mx-auto"
                : "w-full"
            }
          >
            {show404 ? (
              <Image
                src="/assets/images/no-projects-illustration.png"
                alt="Not found"
                fill
                className="object-cover"
              />
            ) : filteredPosts.length > 0 ? (
              <div className="w-full bg-card p-2">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="p-4 w-full md:w-10/11 mb-8">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary"></div>
                      <div>
                        <h1>{post.author}</h1>
                        <p className="text-muted-foreground text-sm font-normal">
                          {post.position}, {post.division}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-medium text-xl">{post.title}</h2>
                      <p className="text-sm">{post.content}</p>
                      <div className="flex space-x-3 text-muted-foreground text-xs">
                        <ThumbsUp
                          className={`w-3 h-3 cursor-pointer ${
                            likedPostId === post.id ? "text-chart-1" : ""
                          }`}
                          onClick={() => handleLike(post.id)}
                          fill={likedPostId === post.id ? "pink" : "none"}
                        />
                        <span>{likeCounts[post.id] ?? 0} likes</span>
                        <Reply className="w-3 h-3" />
                        <span
                          className="cursor-pointer underline"
                          onClick={() =>
                            setOpenRepliesId(
                              openRepliesId === post.id ? null : post.id
                            )
                          }
                        >
                          2 replies
                        </span>
                      </div>
                      {openRepliesId === post.id && (
                        <div className="mt-8 border-l-2 border-primary mx-2 md:mx-8 p-4 space-y-4">
                          {replies[post.id]?.map((reply) => (
                            <div key={reply.id} className="mb-2">
                              <div className="border border-primary p-4 rounded-lg ">
                                <h1>{reply.author}</h1>
                                <p className="text-muted-foreground text-sm font-normalmb-2 md:mb-4">
                                  {reply.position}
                                </p>
                                <p className="text-xs">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center space-x-2 mt-4">
                            <input
                              type="text"
                              placeholder="Leave a comment"
                              className="border border-muted text-sm w-full px-2 py-4 rounded-lg"
                            />
                            <Send className="text-muted-foreground-50" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Image
                src="/assets/images/community.png"
                alt="community"
                fill
                className="object-contain"
              />
            )}
          </div>
          <figcaption className="text-center">
            {show404 ? (
              <h2 className="font-medium text-muted-foreground">
                No search found
              </h2>
            ) : filteredPosts.length === 0 ? (
              <h2 className="font-medium text-2xl mb-4">
                Interact with other supervisors and Names
              </h2>
            ) : null}
            {!show404 && filteredPosts.length === 0 && (
              <button className="bg-primary py-2 px-4 text-sm font-medium rounded-3xl cursor-pointer">
                Join the community
              </button>
            )}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
