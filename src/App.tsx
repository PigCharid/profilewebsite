import { useEffect } from "react";
import Hero from "./pages/Hero";
import Skills from "./pages/Skills";
import Profile from "./pages/Profile";
function App() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 200);
  // });
  return (
    <>
      <Hero />
      <Skills />
      <Profile />
    </>
  );
}

export default App;
