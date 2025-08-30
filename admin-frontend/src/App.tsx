import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/signin";
import CreateProblem from "./pages/createProblem";
import Submissions from "./pages/submissions";
import Arena from "./pages/arena";
import Layout from "./components/layout";
import { Toaster } from "sonner";

export default function App() {
  return <div>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createTest" element={<CreateProblem />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/submissions/:id" element={<Arena />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}

