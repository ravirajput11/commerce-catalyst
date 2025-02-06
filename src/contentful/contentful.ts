import axios from "axios";

// const SPACE_ID = '0eb7z2xtfgk9'; // Replace with your Contentful space ID
// const ACCESS_TOKEN = 'RArQuMVjyohK6VxIVeTC_3wCM2XdYWqqdEGsKrEau88'; // Replace with your Contentful access token

const SPACE_ID = "1k5ychtb1qol"; // Replace with your Contentful space ID
const ACCESS_TOKEN = "Xp1QuRMyUQokl2Z2nlV2zZAkKUyYmpkxM06NMIr-be4"; // Replace with your Contentful access token

export const contentfulAPI = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
