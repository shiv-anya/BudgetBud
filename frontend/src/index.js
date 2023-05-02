import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/UI/Layout";
import { AuthProvider } from "./components/Context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
