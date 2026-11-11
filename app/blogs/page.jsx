import Link from 'next/link';
import React from 'react';
const blogs = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    author: "Rahim Uddin",
    date: "2026-01-05",
    tags: ["javascript", "programming", "beginners"],
    content: "Learn the fundamentals of JavaScript, including variables, functions, and loops, to start building interactive websites."
  },
  {
    id: 2,
    title: "10 Tips for Better Time Management",
    author: "Nusrat Jahan",
    date: "2026-01-12",
    tags: ["productivity", "time-management", "lifestyle"],
    content: "Discover practical strategies to prioritize tasks, avoid distractions, and get more done every day."
  },
  {
    id: 3,
    title: "Healthy Eating on a Budget",
    author: "Karim Hossain",
    date: "2026-01-19",
    tags: ["health", "food", "budget"],
    content: "Eating well doesn't have to be expensive. Here are simple ways to plan nutritious meals without overspending."
  },
  {
    id: 4,
    title: "A Beginner's Guide to Investing",
    author: "Sadia Rahman",
    date: "2026-01-26",
    tags: ["finance", "investing", "money"],
    content: "Understand the basics of stocks, bonds, and savings so you can start growing your money confidently."
  },
  {
    id: 5,
    title: "The Future of Artificial Intelligence",
    author: "Tanvir Ahmed",
    date: "2026-02-02",
    tags: ["ai", "technology", "future"],
    content: "Explore how AI is changing industries and what we can expect from intelligent systems in the coming years."
  },
  {
    id: 6,
    title: "Top Travel Destinations for 2027",
    author: "Mitu Akter",
    date: "2026-02-09",
    tags: ["travel", "tourism", "adventure"],
    content: "From hidden gems to famous landmarks, here are the places worth adding to your travel list."
  },
  {
    id: 7,
    title: "How to Build a Morning Routine",
    author: "Rahim Uddin",
    date: "2026-02-16",
    tags: ["habits", "productivity", "wellness"],
    content: "A good morning routine sets the tone for your day. Learn how to create one that actually sticks."
  },
  {
    id: 8,
    title: "Understanding Mental Health Awareness",
    author: "Nusrat Jahan",
    date: "2026-02-23",
    tags: ["mental-health", "wellness", "awareness"],
    content: "Mental health matters. This post covers common challenges and ways to support yourself and others."
  },
  {
    id: 9,
    title: "Easy Home Workout Plans",
    author: "Karim Hossain",
    date: "2026-03-02",
    tags: ["fitness", "workout", "health"],
    content: "No gym needed. Try these simple bodyweight routines to stay fit from the comfort of your home."
  },
  {
    id: 10,
    title: "Web Development Trends to Watch",
    author: "Tanvir Ahmed",
    date: "2026-03-09",
    tags: ["web-development", "trends", "frontend"],
    content: "Stay ahead of the curve with the latest frameworks, tools, and techniques shaping the web."
  },
  {
    id: 11,
    title: "Minimalist Living: Less Is More",
    author: "Sadia Rahman",
    date: "2026-03-16",
    tags: ["minimalism", "lifestyle", "home"],
    content: "Declutter your space and your mind by focusing on what truly matters in everyday life."
  },
  {
    id: 12,
    title: "Best Books to Read This Year",
    author: "Mitu Akter",
    date: "2026-03-23",
    tags: ["books", "reading", "recommendations"],
    content: "A curated list of fiction and non-fiction titles that are worth your time this year."
  },
  {
    id: 13,
    title: "Remote Work Productivity Hacks",
    author: "Rahim Uddin",
    date: "2026-03-30",
    tags: ["remote-work", "productivity", "career"],
    content: "Set up your workspace, manage your schedule, and stay focused while working from home."
  },
  {
    id: 14,
    title: "Learning a New Language Fast",
    author: "Nusrat Jahan",
    date: "2026-04-06",
    tags: ["language", "learning", "education"],
    content: "Proven techniques to build vocabulary, improve pronunciation, and stay consistent in language learning."
  },
  {
    id: 15,
    title: "Sustainable Living Made Simple",
    author: "Karim Hossain",
    date: "2026-04-13",
    tags: ["sustainability", "environment", "lifestyle"],
    content: "Small daily changes can reduce your environmental footprint. Here's where to begin."
  },
  {
    id: 16,
    title: "Photography Tips for Beginners",
    author: "Mitu Akter",
    date: "2026-04-20",
    tags: ["photography", "creative", "tips"],
    content: "Learn about lighting, composition, and camera settings to take better photos with any device."
  },
  {
    id: 17,
    title: "Mastering React Hooks",
    author: "Tanvir Ahmed",
    date: "2026-04-27",
    tags: ["react", "javascript", "frontend"],
    content: "A practical look at useState, useEffect, and custom hooks with real-world examples."
  },
  {
    id: 18,
    title: "Simple Recipes for Busy Weeknights",
    author: "Sadia Rahman",
    date: "2026-05-04",
    tags: ["recipes", "cooking", "food"],
    content: "Quick, tasty dinners you can prepare in under 30 minutes with everyday ingredients."
  },
  {
    id: 19,
    title: "Personal Branding on Social Media",
    author: "Rahim Uddin",
    date: "2026-05-11",
    tags: ["branding", "social-media", "marketing"],
    content: "Build a consistent online presence that showcases your skills, values, and personality."
  },
  {
    id: 20,
    title: "Cybersecurity Basics Everyone Should Know",
    author: "Tanvir Ahmed",
    date: "2026-05-18",
    tags: ["cybersecurity", "privacy", "technology"],
    content: "Protect your accounts and data with strong passwords, two-factor authentication, and smart browsing habits."
  }
];

const page = () => {
    return (
        <div>
            <h1>this is my blog page</h1>
            {
                blogs.map((blog) => (
                    <div key={blog.id} className="border p-4 mb-4 grid grid-cols-3 gap-4">
                        <h2 className="text-xl font-bold">{blog.title}</h2>
                        <p className="text-gray-600">By {blog.author} on {blog.date}</p>
                        <p className="mt-2">{blog.content}</p>
                        <Link href={`/blogs/${blog.id}`} className="text-blue-500 hover:underline">
                            Read More
                        </Link>
 </div>
                ))
            }
        </div>
    );
};  

export default page;