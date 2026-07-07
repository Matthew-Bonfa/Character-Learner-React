import { createContext, ReactNode, useContext, useEffect, useReducer, useState, useCallback } from "react"
import { darkTheme, lightTheme } from "../constants";
import { ThemeProvider } from "styled-components";
declare module 'react-transition-group';

export interface ContentType {
    name: string;
    content: any[];
    selected: boolean;
    liked: boolean;
}

interface ContentFunctions {
    addContent: (content: ContentType) => void;
    removeContent: (name: string) => void;
    sortContent: (compareFn: (a: ContentType, b: ContentType) => number) => void;
    updateContent: (content: ContentType) => void;
}

export interface SettingsType {
    settingsMode: boolean;
    darkMode: boolean;
    forceKanji: boolean;
    enableRomaji: boolean;
    displayMode: "Kanji" | "Kana" | "English";
    writeMode: "Kanji" | "Kana" | "English";
    orderMode: "Random" | "Shuffle";
}

interface SettingsFunctions {
    toggleSettings: () => void;
    setSettingsMode: (value: boolean) => void;
    toggleDarkMode: () => void;
    toggleForceKanji: () => void;
    toggleEnableRomaji: () => void;
    updateDisplayMode: (displayMode: "Kanji" | "Kana" | "English") => void;
    updateWriteMode: (writeMode: "Kanji" | "Kana" | "English") => void;
    updateOrderMode: (orderMode: "Random" | "Shuffle") => void;
}

interface FunctionsType extends ContentFunctions, SettingsFunctions {
}

interface GlobalContextType {
    userContent: ContentType[];
    userSettings: SettingsType;
    globalFunctions: FunctionsType;
}

type Action =
    | { type: "ADD_CONTENT"; payload: ContentType }
    | { type: "REMOVE_CONTENT"; payload: string }
    | { type: "SORT_CONTENT"; payload: (a: ContentType, b: ContentType) => number }
    | { type: "UPDATE_CONTENT"; payload: ContentType };

const userContentReducer = (state: ContentType[], action: Action): ContentType[] => {
    switch (action.type) {
        case "ADD_CONTENT":
            if (state.filter(content => content.name === action.payload.name).length > 0) {
                return state;
            }
            return [...state, action.payload];

        case "REMOVE_CONTENT":
            return state.filter(content => content.name !== action.payload);

        case "SORT_CONTENT":
            return [...state].sort(action.payload);

        case "UPDATE_CONTENT":
            return state.map(content =>
                content.name === action.payload.name ? { ...content, ...action.payload } : content
            );

        default:
            throw new Error("Unknown action type");
    }
};

// write into these from backend with first render

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

function GlobalProvider({ children }: { children: ReactNode }) {
    const [settingsMode, setSettingsMode] = useState(false);
    const toggleSettings = useCallback(() => setSettingsMode(prev => !prev), []);
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
    const [forceKanji, setForceKanji] = useState(false);
    const toggleForceKanji = useCallback(() => setForceKanji(prev => !prev), []);
    const [enableRomaji, setEnableRomaji] = useState(false);
    const toggleEnableRomaji = useCallback(() => setEnableRomaji(prev => !prev), []);
    const [displayMode, setDisplayMode] = useState<"Kanji" | "Kana" | "English">("Kanji");
    const [writeMode, setWriteMode] = useState<"Kanji" | "Kana" | "English">("English");
    const [orderMode, setOrderMode] = useState<"Random" | "Shuffle">("Shuffle");

    // Settings update functions
    const updateDisplayMode = useCallback((displayMode: "Kanji" | "Kana" | "English") => setDisplayMode(displayMode), []);
    const updateWriteMode = useCallback((writeMode: "Kanji" | "Kana" | "English") => setWriteMode(writeMode), []);
    const updateOrderMode = useCallback((orderMode: "Random" | "Shuffle") => setOrderMode(orderMode), []);

    const [userContent, contentDispatch] = useReducer(userContentReducer, []);

    const addContent = (content: ContentType) => {
        contentDispatch({ type: "ADD_CONTENT", payload: content });
    };

    const removeContent = (name: string) => {
        contentDispatch({ type: "REMOVE_CONTENT", payload: name });
    };

    const sortContent = (compareFn: (a: ContentType, b: ContentType) => number) => {
        contentDispatch({ type: "SORT_CONTENT", payload: compareFn });
    };

    const updateContent = async (content: ContentType) => {
        contentDispatch({ type: "UPDATE_CONTENT", payload: content });
    };

    useEffect(() => {

    }, []);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalContext.Provider
                value={{
                    userContent,
                    userSettings: {
                        settingsMode,
                        darkMode,
                        forceKanji,
                        enableRomaji,
                        displayMode,
                        writeMode,
                        orderMode
                    },
                    globalFunctions: {
                        addContent,
                        removeContent,
                        sortContent,
                        updateContent,
                        toggleSettings,
                        setSettingsMode,
                        toggleDarkMode,
                        toggleForceKanji,
                        toggleEnableRomaji,
                        updateDisplayMode,
                        updateWriteMode,
                        updateOrderMode
                    }
                }}
            >
                {children}
            </GlobalContext.Provider>
        </ThemeProvider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

export default GlobalProvider