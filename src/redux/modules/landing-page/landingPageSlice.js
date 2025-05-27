import { createSlice } from "@reduxjs/toolkit";
import project1Json from "@/dummy-projects/project-1.json";

const initialState = {
  deployData: undefined,
  canvasData: undefined,
  isEditComponent: false,
  isFocusContent: "",
  googleFonts: [],
  sidebarWidth: undefined,
  isCollapsedSideBar: false,
  projectsData: [
    {
      id: "project-01",
      name: "project 1",
      slug: "project-1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae consectetur repellendus officia mollitia possimus, veritatis earum voluptas modi sunt reiciendis quae laborum, corrupti quos dolor. Ipsa magnam quis porro repellat.",
      thumbnail:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/thumbnail.png?updatedAt=1747806713903",
      frameProject: project1Json,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "project-02",
      name: "Initial Project 2",
      slug: "project-2",
      description: "initial description",
      thumbnail:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/thumbnail.png?updatedAt=1747806713903",
      frameProject: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "project-03",
      name: "Initial Project 3",
      slug: "project-3",
      description: "initial description",
      thumbnail:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/thumbnail.png?updatedAt=1747806713903",
      frameProject: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "project-04",
      name: "Initial Project 4",
      slug: "project-4",
      description: "initial description",
      thumbnail:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/thumbnail.png?updatedAt=1747806713903",
      frameProject: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  projectDataFromAI: undefined,
  isSaving: false,
};

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setCanvasData: (state, action) => {
      state.canvasData = action.payload;
    },
    setIsEditComponent: (state, action) => {
      state.isEditComponent = action.payload;
    },
    setIsFocusContent: (state, action) => {
      state.isFocusContent = action.payload;
    },
    setGoogleFont: (state, action) => {
      state.googleFonts = action.payload;
    },
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload;
    },
    setIsCollapsedSideBar: (state, action) => {
      state.isCollapsedSideBar = action.payload;
    },
    removeProjectById: (state, action) => {
      state.projectsData = state.projectsData.filter(
        (project) => project.id !== action.payload
      );
    },
    setDeployData: (state, action) => {
      state.deployData = action.payload;
    },
    setProjectDataFromAI: (state, action) => {
      state.projectDataFromAI = action.payload;
    },
    setNewProject: (state, action) => {
      state.projectsData.push(action.payload);
    },
    saveProject: (state, action) => {
      state.projectsData = state.projectsData.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              ...action.payload,
            }
          : project
      );
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
  },
});

export const {
  setCanvasData,
  setIsEditComponent,
  setIsFocusContent,
  setGoogleFont,
  setSidebarWidth,
  setIsCollapsedSideBar,
  removeProjectById,
  setDeployData,
  setProjectDataFromAI,
  setNewProject,
  saveProject,
  setIsSaving,
} = landingPageSlice.actions;

export default landingPageSlice.reducer;
