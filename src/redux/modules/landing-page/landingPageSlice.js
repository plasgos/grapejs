import { createSlice } from "@reduxjs/toolkit";
import project1Json from "@/dummy-projects/project-1.json";

const initialState = {
  isPreviewMode: false,
  currentDeviceView: "desktop",
  isEditTextEditor: false,
  deployData: undefined,
  canvasData: undefined,
  editComponent: "",
  isDraggingComponent: false,
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

  optionsFbPixelId: [
    { id: "fb-id-1", value: "randomId123", label: "Old Habassy" },
  ],
  optionsFbPixelEvent: [
    {
      label: "Utama",
      options: [
        { value: null, label: "Tidak Ada" },
        { value: "custom", label: "Custom" },
      ],
    },
    {
      label: "Belanja",
      options: [
        { value: "add-payment-info", label: "Add Payment Info" },
        { value: "add-to-cart", label: "Add to Cart" },
        { value: "add-to-wishlist", label: "Add to Wishlist" },
        { value: "initiate-checkout", label: "Initiate Checkout" },
        { value: "purchase", label: "Purchase" },
        { value: "search", label: "Search" },
        { value: "view-content", label: "View Content" },
      ],
    },
    {
      label: "Leads",
      options: [
        { value: "lead", label: "Lead" },
        { value: "page-view", label: "Page View" },
        { value: "complete-registration", label: "Complete Registration" },
        { value: "contact", label: "Contact" },
        { value: "find-location", label: "Find Location" },
      ],
    },
    {
      label: "Subscription",
      options: [
        { value: "start-trial", label: "Start Trial" },
        { value: "subscribe", label: "Subscribe" },
      ],
    },
    {
      label: "Lainnya",
      options: [
        { value: "customize-product", label: "Customize Product" },
        { value: "donate", label: "Donate" },
        { value: "schedule", label: "Schedule" },
        { value: "submit-application", label: "Submit Application" },
      ],
    },
  ],
};

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setIsPreviewMode: (state, action) => {
      state.isPreviewMode = action.payload;
    },
    setCurrentDeviceView: (state, action) => {
      state.currentDeviceView = action.payload;
    },
    setIsEditTextEditor: (state, action) => {
      state.isEditTextEditor = action.payload;
    },

    setCanvasData: (state, action) => {
      state.canvasData = action.payload;
    },
    setEditComponent: (state, action) => {
      state.editComponent = action.payload;
    },
    setIsDraggingComponent: (state, action) => {
      state.isDraggingComponent = action.payload;
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
  setIsPreviewMode,
  setCurrentDeviceView,
  setIsEditTextEditor,
  setCanvasData,
  setEditComponent,
  setIsDraggingComponent,
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
