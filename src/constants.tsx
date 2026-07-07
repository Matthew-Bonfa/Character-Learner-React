// temp unused colors
export const darkColor4 = "#aeacb4"
export const lightText = "#484b6a"
export const lightColor1 = "#fafafa"
export const lightColor2 = "#e4e5f1"
export const lightColor3 = "#d2d3db"

export const darkTheme = {
    color: {
        text: "#ffffffde",
        first: "#3E3E3E",
        second: "#242424",
        third: "#121212",
        accent: "#966fd6",
    },
    shadow: {
        text: {
            10: "#ffffff1a",
            15: "#ffffff26",
            20: "#ffffff33",
            30: "#ffffff4d",
        },
        third: {
            80: "#121212cc",
        },
        accent: {
            70: "#966fd6b3",
        }
    }
}

export const lightTheme = {
    color: {
        text: "#1a1a1a", // Improved from "#000000de" for better readability
        first: "#8a8a8a", // Improved from "#c1c1c1" for better contrast
        second: "#cccccc", // Improved from "#dbdbdb" for better definition
        third: "#e0e0e0", // Improved from "#ededed" for better depth
        accent: "#8a63d9", // Slightly refined purple for better visual appeal
    },
    shadow: {
        text: {
            10: "#0000001a",
            15: "#00000026",
            20: "#00000033",
            30: "#0000004d"
        },
        third: {
            80: "#e0e0e0cc",
        },
        accent: {
            70: "#8a63d9b3",
        }
    }
}

const pages = [
    "main",
    "content",
    "popularContent",
] as const;

export type PageType = (typeof pages)[number];

export interface csvFormat {
    Kanji: string;
    Kana: string;
    Romaji: string;
    English: string;
}

export interface UserInformation {
    username: string;
    email: string;
    password: string;
}

export const animationVariants = {
    static: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0
        }
    },
    right: {
        x: ["0%", "-20%", "-40%", "-60%", "-80%", "-100%"],
        y: ["0%", "-5%", "-15%", "-20%", "-15%", "-5%"],
        scale: [1, 0.5],
        opacity: [1, 1, 1, 0.75, 0.5, 0],
        transition: {
            ease: [0.25, 1, 0.5, 1],
            default: {
                type: "tween"
            }
        }
    },
    left: {
        x: ["100%", "80%", "60%", "40%", "20%", "0%"],
        y: ["5%", "15%", "20%", "15%", "5%", "0%"],
        scale: [0.5, 1],
        opacity: [0, 0.5, 0.75, 1, 1, 1],
        transition: {
            ease: [0.25, 1, 0.5, 1],
            default: {
                type: "tween"
            }
        }
    },
    rise: {
        scale: [0.35, 1],
        opacity: [0.35, 1],
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 12,
            mass: 0.6,
        }
    },
    shrink: {
        scale: [1, 0.35],
        opacity: [1, 0.35],
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 12,
            mass: 0.6,
        }
    },
    bounce: {
        scale: [0.3, 1],
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 12,
            mass: 0.6,
        }
    }
}

//temp
/*
export const tempUserContent: ContentType[] = [
    {
        name: "Hiragana",
        content: [
            ["kana", "kanji", "english"],
            ["a", "b", "c"],
            ["e", "f", "g"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana1",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana2",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }];

export const tempPopularContent: ContentType[] = [
    {
        name: "Genki",
        content: [
            ["kana", "kanji", "english"],
            ["aj", "byy", "c;d"],
            ["ehhw", "fj", "gddh"]
        ],
        selected: false,
        liked: false
    },
    {
        name: "Kanji",
        content: [
            ["kana", "kanji", "english"],
            ["sdf", "wewx", "rgpw"],
            ["lhj", "emf", "qjf"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana1",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana2",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }, {
        name: "Katakana3",
        content: [
            ["kana", "kanji", "english"],
            ["x", "y", "z"],
            ["l", "m", "n"]
        ],
        selected: false,
        liked: false
    }];
*/