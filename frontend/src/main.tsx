import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout.tsx";
import Feed from "./components/feed.tsx";
import { FeedProvider } from "./hooks/use-feed.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FeedProvider>
      <Layout>
        <Feed />
      </Layout>
    </FeedProvider>
  </StrictMode>
);
