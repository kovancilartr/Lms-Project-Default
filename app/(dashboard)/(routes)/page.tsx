"use client";
import { VideoPlayerX } from "@/components/video-player-x";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    };
    fetchData().then((data) => console.log(data));
  }, []);
  return (
    <div className="w-[80%] mx-auto">
      <VideoPlayerX provider="youtube" videoUrl="Uj-HySDFfLk" />
    </div>
  );
};

export default Home;
