import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./HeaderUser";
import Footer from "./Footer";
import Sidebar from "./sidebarUser";
import Home from "./Home";
import Profile from "../../views/Profile";
import Payroll from "../user/EmployeePayroll";
import SalaryTable from "./SalaryTable";
import Blog from "./Blog";
import BlogDetail from "./BlogDetail";
import CreateBlog from "./CreateBlog";

const initialBlogPosts = [
  {
    id: 1,
    title: "Effective Recruitment Strategies",
    content:
      "Learn how to attract top talent with these proven recruitment strategies.",
    fullContent: "Full content of the blog post goes here...",
    image: "https://via.placeholder.com/150",
    category: "HR Best Practices",
    date: "July 1, 2024",
    likes: 0,
    comments: [],
  },
  // Add more initial blog posts as needed
];

const LayoutUser = () => {
  const [currentView, setCurrentView] = useState("Home");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const addBlogPost = (newPost) => {
    setBlogPosts([...blogPosts, newPost]);
  };

  const updateBlogPosts = (updatedPost) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setBlogPosts(updatedPosts);
  };

  const renderContent = () => {
    switch (currentView) {
      case "Home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "Payroll":
        return <Payroll />;
      case "SalaryTable":
        return <SalaryTable />;
      case "Blog":
        return (
          <Blog
            blogPosts={blogPosts}
            setCurrentView={setCurrentView}
            setCurrentPostId={setCurrentPostId}
          />
        );
      case "BlogDetail":
        return (
          <BlogDetail
            currentPostId={currentPostId}
            blogPosts={blogPosts}
            updateBlogPosts={updateBlogPosts}
          />
        );
      case "CreateBlog":
        return (
          <CreateBlog
            setCurrentView={setCurrentView}
            addBlogPost={addBlogPost}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <main>
      <Header />
      <div className="pageWrapper d-lg-flex">
        <aside className="shadow">
          <Sidebar setCurrentView={setCurrentView} />
        </aside>
        <div className="contentUser">
          <Container className="p-4" fluid>
            {renderContent()}
          </Container>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LayoutUser;
