import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Tests from "./pages/test";
import Arena from "./pages/arena";
import Result from "./pages/result";
import TermsAndCondition from "./components/terms&conditions";
import PrivacyPolicy from "./components/privacyPolicy";


export default function App() {
  return <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/:id" element={<Arena />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

      </Routes>
    </BrowserRouter>
  </>
}

