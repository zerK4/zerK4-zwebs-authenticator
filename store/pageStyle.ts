/**
 * ? Page style function
 * ? Handle the dark/white mode and save everything on local storage.
 */
import create from "zustand";
import { persist } from "zustand/middleware";

const theme = (set: any) => ({
    selectedTheme: "black",

    setBlack: () => set({ selectedTheme: "black" }),
    setWhite: () => set({ selectedTheme: "white" }),
});

// ? Saves to local storage.
const getTheme = create(
    persist(theme, {
        name: "theme",
    })
);

export default getTheme;