import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import StoryOptions from "./components/StoryOptions";
import StoryList from "./components/StoryList";
import Storylines from "./components/StoryLine";
import StorylinePageLoader from "./components/StorylinePageLoader";
import StartingStory from "./components/StartingStory";
import AddStoryForm from "./components/AddStoryForm";
import NestedDropdown from "./components/NestedDropdown";

function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/storyOption" element={<StoryOptions />}></Route>
          <Route path="/createStory" element={<AddStoryForm />}></Route>
          <Route path="/createStory/:storyId" element={<NestedDropdown />}></Route>
          <Route path="/allStories" element={<StoryList />}></Route>
          <Route path="/allStories/:storyId" element={<StartingStory />} ></Route>
          <Route
            path="/allStories/:storyId/:storylineId"
            element={
              <StorylinePageLoader />
            }
          ></Route>
        </Routes></BrowserRouter>
    </>
  )
}
export default App;