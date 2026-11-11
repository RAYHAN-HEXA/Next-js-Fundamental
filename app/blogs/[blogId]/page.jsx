import React from 'react';
const blogs = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    author: "Rahim Uddin",
    date: "2026-01-05",
    tags: ["javascript", "programming", "beginners"],
    content: "JavaScript is the language that powers interactivity on the web. In this guide, you will learn how to declare variables with let and const, write reusable functions, and use loops and conditions to control program flow. We also cover arrays and objects, the two data structures you will use in almost every project. By the end, you will be able to build a small interactive page, such as a to-do list or a simple calculator."
  },
  {
    id: 2,
    title: "10 Tips for Better Time Management",
    author: "Nusrat Jahan",
    date: "2026-01-12",
    tags: ["productivity", "time-management", "lifestyle"],
    content: "Good time management starts with knowing what matters most. This post explains how to prioritize with the Eisenhower matrix, break big goals into small tasks, and use time blocking to protect your focus. You will also learn how to say no to distractions, batch similar tasks together, and review your week so you can keep improving your routine."
  },
  {
    id: 3,
    title: "Healthy Eating on a Budget",
    author: "Karim Hossain",
    date: "2026-01-19",
    tags: ["health", "food", "budget"],
    content: "Eating healthy does not have to drain your wallet. Learn how to plan weekly meals, make a smart grocery list, and choose seasonal fruits and vegetables that cost less. We also cover cheap protein sources like lentils, eggs, and beans, and how to cook in bulk so leftovers save you both time and money."
  },
  {
    id: 4,
    title: "A Beginner's Guide to Investing",
    author: "Sadia Rahman",
    date: "2026-01-26",
    tags: ["finance", "investing", "money"],
    content: "Investing is one of the best ways to grow your wealth over time. This article explains the difference between stocks, bonds, mutual funds, and savings accounts, and why diversification reduces risk. You will also learn about compound interest, setting long-term goals, and the importance of starting early, even with small amounts."
  },
  {
    id: 5,
    title: "The Future of Artificial Intelligence",
    author: "Tanvir Ahmed",
    date: "2026-02-02",
    tags: ["ai", "technology", "future"],
    content: "Artificial intelligence is already changing healthcare, education, finance, and creative work. This post looks at how machine learning models are being used today, what new capabilities are emerging, and the ethical questions around privacy, bias, and job automation. We also discuss how individuals and businesses can prepare for an AI-driven future."
  },
  {
    id: 6,
    title: "Top Travel Destinations for 2027",
    author: "Mitu Akter",
    date: "2026-02-09",
    tags: ["travel", "tourism", "adventure"],
    content: "Planning ahead for 2027? We highlight a mix of famous cities, quiet islands, and nature escapes that deserve a spot on your list. For each destination, you will find the best time to visit, a rough budget, must-see attractions, and local food worth trying. Whether you love adventure or relaxation, there is something here for you."
  },
  {
    id: 7,
    title: "How to Build a Morning Routine",
    author: "Rahim Uddin",
    date: "2026-02-16",
    tags: ["habits", "productivity", "wellness"],
    content: "A strong morning routine can improve your energy, focus, and mood for the entire day. Start by waking up at a consistent time, drinking water, and adding light movement or stretching. Then choose one or two habits, such as reading, journaling, or planning your day, and build on them slowly so the routine becomes natural instead of forced."
  },
  {
    id: 8,
    title: "Understanding Mental Health Awareness",
    author: "Nusrat Jahan",
    date: "2026-02-23",
    tags: ["mental-health", "wellness", "awareness"],
    content: "Mental health is just as important as physical health. This article explains common conditions like stress, anxiety, and depression, and how to recognize early warning signs. You will find simple self-care practices, tips for supporting a friend who is struggling, and guidance on when it is time to seek help from a professional."
  },
  {
    id: 9,
    title: "Easy Home Workout Plans",
    author: "Karim Hossain",
    date: "2026-03-02",
    tags: ["fitness", "workout", "health"],
    content: "You do not need a gym to stay in shape. Here are beginner, intermediate, and advanced bodyweight routines using exercises like squats, push-ups, planks, and lunges. Each plan includes a suggested weekly schedule, rest days, and warm-up and cool-down tips to help you build strength safely."
  },
  {
    id: 10,
    title: "Web Development Trends to Watch",
    author: "Tanvir Ahmed",
    date: "2026-03-09",
    tags: ["web-development", "trends", "frontend"],
    content: "The web development world moves fast. This post covers the trends shaping modern projects, including component-based frameworks, server-side rendering, edge computing, and AI-assisted coding tools. We also talk about performance, accessibility, and which skills are worth learning to stay competitive as a developer."
  },
  {
    id: 11,
    title: "Minimalist Living: Less Is More",
    author: "Sadia Rahman",
    date: "2026-03-16",
    tags: ["minimalism", "lifestyle", "home"],
    content: "Minimalism is about keeping only what adds value to your life. Learn how to declutter room by room, decide what to keep, donate, or discard, and avoid impulse purchases. Beyond your home, minimalism can also reduce digital clutter and mental stress, giving you more time and space for what truly matters."
  },
  {
    id: 12,
    title: "Best Books to Read This Year",
    author: "Mitu Akter",
    date: "2026-03-23",
    tags: ["books", "reading", "recommendations"],
    content: "Looking for your next great read? This list covers fiction, self-improvement, history, and science titles that readers are talking about. Each recommendation includes a short summary, who it is best suited for, and why it is worth your time. We also share tips for building a daily reading habit."
  },
  {
    id: 13,
    title: "Remote Work Productivity Hacks",
    author: "Rahim Uddin",
    date: "2026-03-30",
    tags: ["remote-work", "productivity", "career"],
    content: "Working from home brings freedom but also distractions. Discover how to set up a dedicated workspace, define clear working hours, and use tools for communication and task tracking. We also cover how to avoid burnout, take proper breaks, and stay connected with your team even when you are miles apart."
  },
  {
    id: 14,
    title: "Learning a New Language Fast",
    author: "Nusrat Jahan",
    date: "2026-04-06",
    tags: ["language", "learning", "education"],
    content: "Learning a language takes consistency more than talent. This guide shares proven methods like spaced repetition for vocabulary, shadowing native speakers for pronunciation, and practicing with short daily conversations. You will also learn how to set realistic goals, use language apps wisely, and stay motivated when progress feels slow."
  },
  {
    id: 15,
    title: "Sustainable Living Made Simple",
    author: "Karim Hossain",
    date: "2026-04-13",
    tags: ["sustainability", "environment", "lifestyle"],
    content: "Living sustainably starts with small, practical choices. Learn how to reduce plastic use, save energy at home, cut food waste, and choose products that last longer. We also explain why these habits matter for the environment and how they can save you money in the long run."
  },
  {
    id: 16,
    title: "Photography Tips for Beginners",
    author: "Mitu Akter",
    date: "2026-04-20",
    tags: ["photography", "creative", "tips"],
    content: "Great photos do not require expensive gear. This post explains the basics of natural lighting, the rule of thirds, framing, and understanding aperture, shutter speed, and ISO. You will also find tips for editing your photos and developing your own style, whether you shoot with a smartphone or a camera."
  },
  {
    id: 17,
    title: "Mastering React Hooks",
    author: "Tanvir Ahmed",
    date: "2026-04-27",
    tags: ["react", "javascript", "frontend"],
    content: "React Hooks let you use state and lifecycle features in function components. We walk through useState, useEffect, useRef, and useContext with clear examples, then show how to create your own custom hooks to reuse logic. Common mistakes, such as missing dependencies in useEffect, are explained along with how to fix them."
  },
  {
    id: 18,
    title: "Simple Recipes for Busy Weeknights",
    author: "Sadia Rahman",
    date: "2026-05-04",
    tags: ["recipes", "cooking", "food"],
    content: "After a long day, cooking should be easy. These recipes use everyday ingredients and take under 30 minutes, from one-pan chicken and vegetable stir-fries to quick pasta and egg-based dishes. Each recipe lists the ingredients, step-by-step instructions, and tips for making extra portions for the next day."
  },
  {
    id: 19,
    title: "Personal Branding on Social Media",
    author: "Rahim Uddin",
    date: "2026-05-11",
    tags: ["branding", "social-media", "marketing"],
    content: "Your personal brand is how people perceive you online. Learn how to define your niche, choose a consistent tone and visual style, and share content that shows your expertise. We also cover engaging with your audience, building credibility through consistency, and protecting your reputation online."
  },
  {
    id: 20,
    title: "Cybersecurity Basics Everyone Should Know",
    author: "Tanvir Ahmed",
    date: "2026-05-18",
    tags: ["cybersecurity", "privacy", "technology"],
    content: "Online threats affect everyone, not just big companies. This guide explains how to create strong, unique passwords, use a password manager, and enable two-factor authentication. You will also learn how to spot phishing emails, keep your software updated, and stay safe on public Wi-Fi."
  }
];

const blogDetails = async({params}) => {
    const {blogId}  = await params;
    const blogFinal = blogs.find(blog => blog.id === parseInt(blogId));
    console.log(blogFinal)
    return (
        <div>
            
            <h1>{blogFinal.title}</h1>
            <p>By {blogFinal.author} on {blogFinal.date}</p>
            <p>{blogFinal.content}</p>
        </div>
    );
}
  

export default blogDetails;