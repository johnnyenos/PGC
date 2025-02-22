import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureAmplify } from "./lib/amplify-config";

// Initialize Amplify
configureAmplify();

createRoot(document.getElementById("root")!).render(<App />);