const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
// const SpotifyWebApi = require('spotify-web-api-node');

module.exports = async (amount) => {
    const names = ['Anna', 'Daniel', 'Becky', 'Simon', 'Maya', 'James', 'David', 'Rebecca', 'Liam'];
    const schools = [
        "University of Waterloo",
        "Wilfrid Laurier University",
        "Conestoga College"
    ];

    const randItem = (e) => e[~~(Math.random() * e.length)];
    const randNames = names;
    const us = ["Basi", "Amber", "Wesgolf", "Michelle"];

    const users = [...us, ...randNames].map((name, i) => {
        const rand = (min, max) => ~~(Math.random() * (max - min)) + min;
        const passionList = passions.map((s) => randItem(s));
        const gender = Math.random() < 0.5 ? "Male" : "Female";
        const dms = randNames
            .filter((s) => s != name)
            .slice(0, 15);

        const bio = randItem(quotes);
        const about = abouts.map(s => randItem(s));
        const data = {
            name,
            email: name,
            password: "1234",
            age: rand(18, 25),
            gender,
            bio,
            degree: randItem(degrees),
            passions: passionList,
            about,
            dms,
            matches: [],
            likes: [],
            song: songs[i],
            verified: Math.random() < 0.5,
            match: rand(50, 95),
            school: randItem(schools)
        };

        return data;
    });

    const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
    };

    fetch(
        "http://localhost:8000/api/auth/quickregister",
        reqOptions
    ).then((s) => s.json());
};

const nums = [4, 5, 6];
const heights = nums.map(s => new Array(11).fill().map((_, e) => s + "'" + (e + 1))).flat();
const zodiacSigns = ['Aries', 'Gemini', 'Leo', 'Virgo'];
const pets = ['Cat', 'Dog', 'Bird'];
const sexys = ['Straight'];
const searching = ['Looking for friends', 'Looking for relationship', 'Looking for anything'];
const abouts = [
    heights,
    zodiacSigns,
    pets,
    sexys,
    searching
];

const passions = [
    //Creatives
    ["Baking", "Painting", "Sculpting", "Drawing", "Cooking", "Fashion"],

    //Adventure
    ["Travelling", "Hiking", "Rock Climbing", "Camping"],

    //Sports
    [
        "Weight Lifting",
        "Soccer",
        "Swimming",
        "Volleyball",
        "Running"
    ],

    // Media
    [
        "TV Shows",
        "Horror Movies",
        "Marvel",
        "K-Pop",
        "Disney",
        "Netflix",
        "Anime",
        "Manga",
        "K-Drama",
    ],

    //Instruments
    [
        "Drums",
        "Piano",
        "Guitar",
        "Violin",
        "Cello",
        "Trumpet",
        "Saxophone",
        "Clarenet",
        "Flute",
    ],

    //Going Out
    [
        "Drinking",
        "Karaoke",
        "Smoking",
        "Museum",
        "Art Gallery",
        "Clubbing",
        "Festivals",
        "Concerts",
    ],
];

const songs = [
    {
        name: "Anime & Chardonnay",
        artists: "Charlie Curtis-Beard, Akintoye",
        url: "6Cd2pIwYONxEWBjmkOUIVM",
        img: "https://i.scdn.co/image/ab67616d0000b27388c77701d54d595ca557f2ba",
    },
    {
        name: "white tee",
        artists: "Lil Peep, Lil Tracy",
        url: "4TVsTKQVeC99tCjfRKLeob",
        img: "https://i.scdn.co/image/ab67616d0000b2731fdf8f713b0f86a99f5483b0",
    },
    {
        name: "Cash",
        artists: "love-sadKID, Dahm., Gould",
        url: "2ZKnIoRQtfAsjtsHVs7IFi",
        img: "https://i.scdn.co/image/ab67616d0000b273775639658c28b743d33fce28",
    },
    {
        name: "Anime Thighs",
        artists: "MC Virgins, wonder",
        url: "2lRcgRTbRDeup4ZV7asE7Y",
        img: "https://i.scdn.co/image/ab67616d0000b273365b1cf71794a9c027e84e0c",
    },
    {
        name: "Sunroof",
        artists: "Nicky Youre, dazy",
        url: "4h4QlmocP3IuwYEj2j14p8",
        img: "https://i.scdn.co/image/ab67616d0000b2730ed2184bf3fb4466d623a874",
    },
    {
        name: "Looking Out for You",
        artists: "Joy Again",
        url: "3jfZ9M23l0L7RxzYMTgBTv",
        img: "https://i.scdn.co/image/ab67616d0000b2735448a3dfe8528453a3686fd6",
    },
    {
        name: "Die Right Here",
        artists: "david hugo",
        url: "7fXYFuCTmNrYRGwEUUf5iz",
        img: "https://i.scdn.co/image/ab67616d0000b273f39c5c8d24961a69a56a53f8",
    },
    {
        name: "My Own Person",
        artists: "Ezra Williams",
        url: "7nMlhFSw9VphHNEgUec9uy",
        img: "https://i.scdn.co/image/ab67616d0000b273f5731d14e4189a239d76ebe0",
    },
    {
        name: "The Spins",
        artists: "Mac Miller",
        url: "51pshtuYkgUQnt5huMPbKL",
        img: "https://i.scdn.co/image/ab67616d0000b27350570144b4a9a459406f9a3d",
    },
    {
        name: "Hey, Kid!",
        artists: "Phoneboy",
        url: "5T3zeQPTvGI9BcFn1Wy0Cz",
        img: "https://i.scdn.co/image/ab67616d0000b2738e05741c1f98bab13a61ba36",
    },
    {
        name: "this is what falling in love feels like",
        artists: "JVKE",
        url: "2PWTZV5znjLtZC5T1EVJvL",
        img: "https://i.scdn.co/image/ab67616d0000b273c2504e80ba2f258697ab2954",
    },
    {
        name: "More Than Friends",
        artists: "Aidan Bissett",
        url: "1Ph96WpdjNlwD6iKRE2Xa3",
        img: "https://i.scdn.co/image/ab67616d0000b27362df4832757c638883ff823b",
    },
    {
        name: "Memories",
        artists: "Conan Gray",
        url: "5UXJzLFdBn6u9FJTCnoHrH",
        img: "https://i.scdn.co/image/ab67616d0000b27360a89b781c62ffe2136e4396",
    },
    {
        name: "Sunkissed",
        artists: "khai dreams",
        url: "1tD8J13a74q8fBqXwAP50j",
        img: "https://i.scdn.co/image/ab67616d0000b273589ec50a427b005cba7bb21c",
    },
    {
        name: "Dimes",
        artists: "Lyan Paris",
        url: "4zsU98MppMQwTHVXB9EiSf",
        img: "https://i.scdn.co/image/ab67616d0000b273ffc3dc22eb446a4d8290a690",
    },
    {
        name: "Sundress",
        artists: "MC Virgins, Yung Bae",
        url: "43wlQQ9NsBbv6pXKNXsNpO",
        img: "https://i.scdn.co/image/ab67616d0000b273a5c66bc702de28d1289e91c6",
    },
    {
        name: "7PM",
        artists: "Lilacs., Lizzy McAlpine",
        url: "76tztTt7xAC6E0RZggd9xg",
        img: "https://i.scdn.co/image/ab67616d0000b273ae8e7303b4b87c520a8c601c",
    },
    {
        name: "pouring outside",
        artists: "dyl dion",
        url: "7g1251d41qVR8kq6yz9XXa",
        img: "https://i.scdn.co/image/ab67616d0000b27311742de755b6866770c87ef1",
    },
    {
        name: "Acid Tears",
        artists: "Culi.",
        url: "5YCXiEpUqblYW5x9vWx8Qd",
        img: "https://i.scdn.co/image/ab67616d0000b273e9a536ac73d474808be2cfcf",
    },
    {
        name: "Television / So Far So Good",
        artists: "Rex Orange County",
        url: "27rZYxE4l21wTaovX4WTnI",
        img: "https://i.scdn.co/image/ab67616d0000b2731bd6d088d3d81972af4cb81d",
    },
    {
        name: "Mustard",
        artists: "Strawberry Milk Cult",
        url: "6w4AVPA4Ph2hdYxq64tMwt",
        img: "https://i.scdn.co/image/ab67616d0000b273604d2d3955de8f06ed0419ea",
    },
    {
        name: "Stargazing",
        artists: "The Neighbourhood",
        url: "0VF7YLIxSQKyNiFL3X6MmN",
        img: "https://i.scdn.co/image/ab67616d0000b2733552d3f419afe41cf9b0bd0a",
    },
    {
        name: "on the move",
        artists: "Zamir, marc indigo, Chevy",
        url: "2DBnavN8wezUzjkq86PdqA",
        img: "https://i.scdn.co/image/ab67616d0000b27342b669f253bbc8ae9c49041e",
    },
    {
        name: "Futon",
        artists: "Ūla",
        url: "0F57gwy0G6aqnaMAH1ELSV",
        img: "https://i.scdn.co/image/ab67616d0000b2738af3c4d40afb420d17f7b14a",
    },
    {
        name: "Wasting Time",
        artists: "Yun Head",
        url: "6qwwMUQBq2yy2bqBejBCIc",
        img: "https://i.scdn.co/image/ab67616d0000b273503a90f35f5eab66b81a1615",
    },
    {
        name: "Loverboy",
        artists: "A-Wall",
        url: "0qXP5fMhxGzxALOkXYUxfP",
        img: "https://i.scdn.co/image/ab67616d0000b273642f3d8e8208bd784d377b0d",
    },
    {
        name: "fantasize",
        artists: "ericdoa",
        url: "6U2sXLGhxJVmKskGUvJzI3",
        img: "https://i.scdn.co/image/ab67616d0000b273c63fcc35a0d7de6cdfbcce91",
    },
    {
        name: "I Don't Mind",
        artists: "Tobias Dray, Ben Chandler",
        url: "6OSRS4mNwTCE92ujmXgUhc",
        img: "https://i.scdn.co/image/ab67616d0000b273f9d4f4b1afc481bf72fe2602",
    },
    {
        name: "Nothing Has Changed",
        artists: "The Polar Boys",
        url: "0fDCPVKI1qbTakRBhIOOMW",
        img: "https://i.scdn.co/image/ab67616d0000b2731be97803b13fbb53629c26fc",
    },
    {
        name: "OhNo!",
        artists: "Kevin Walkman, Mickey Darling",
        url: "37JoRcYtA30gqhRc8wCOQj",
        img: "https://i.scdn.co/image/ab67616d0000b273254a39d853977bd342637904",
    },
    {
        name: "Daydreaming",
        artists: "Marc Wavy",
        url: "3gXS1kwhHCpIm6KjpoXWSr",
        img: "https://i.scdn.co/image/ab67616d0000b273b0bd6489515c8866b11af97c",
    },
    {
        name: "Nikes",
        artists: "Nimstarr, kid toni",
        url: "65ha6jDdEeQ05hbiDeSUjT",
        img: "https://i.scdn.co/image/ab67616d0000b2731287bfe8d67d1a27fbb9ab32",
    },
    {
        name: "All I Need",
        artists: "khai dreams, Atwood",
        url: "3oskfuB8woAgGFHSypaElq",
        img: "https://i.scdn.co/image/ab67616d0000b273d5dc2afe786f9cf938dad42c",
    },
    {
        name: "All I Need",
        artists: "khai dreams, Atwood",
        url: "3oskfuB8woAgGFHSypaElq",
        img: "https://i.scdn.co/image/ab67616d0000b273d5dc2afe786f9cf938dad42c",
    },
    {
        name: "don't miss me",
        artists: "Claire Rosinkranz",
        url: "5MG69A9XyXDbBbeOxdR3Tl",
        img: "https://i.scdn.co/image/ab67616d0000b2737a87a5c655d19748b4aef723",
    },
    {
        name: "Japanese Pancakes",
        artists: "Fran Vasilić",
        url: "7Lf1IgNsW8GniX5Lf7e4AP",
        img: "https://i.scdn.co/image/ab67616d0000b2732055154ac5c7937ca4fc939d",
    },
    {
        name: "Hot Rod",
        artists: "Dayglow",
        url: "5euumi7eqEgmxvCIJw2pSp",
        img: "https://i.scdn.co/image/ab67616d0000b2735160eaecb31b739ea1c2eaa5",
    },
    {
        name: "Notion",
        artists: "The Rare Occasions",
        url: "0sTlGEld0h8kIPZaKDYUf4",
        img: "https://i.scdn.co/image/ab67616d0000b273598721fc8c9dde3f65a73a08",
    },
    {
        name: "its alright :)",
        artists: "Kevin Walkman",
        url: "0ITjrJTxJWUVqthwUIOKPZ",
        img: "https://i.scdn.co/image/ab67616d0000b27398990dae0416f36c2f7bc50c",
    },
    {
        name: "Day 39/167",
        artists: "Fran Vasilić",
        url: "30n5TjPEPE73LYlwpMM8Aa",
        img: "https://i.scdn.co/image/ab67616d0000b2732055154ac5c7937ca4fc939d",
    },
    {
        name: "Hotel",
        artists: "Claire Rosinkranz",
        url: "3xyr2xfbSZiZWWGsjLyMFh",
        img: "https://i.scdn.co/image/ab67616d0000b273b825e9b45a2b332c160223a8",
    },
    {
        name: "i guess?",
        artists: "elias, Thiago, love-sadKID",
        url: "235m3adTb5WObAJWOonO4f",
        img: "https://i.scdn.co/image/ab67616d0000b273513ed2926f89fe4a3134162a",
    },
    {
        name: "Chandelier",
        artists: "Will Paquin",
        url: "1cwqP7Tyxu5z8XDYoPkNte",
        img: "https://i.scdn.co/image/ab67616d0000b27309cb96e3e43c6ac1c240888d",
    },
    {
        name: "Nevermind (feat. Justin Magnaye)",
        artists: "Phoneboy, Justin Magnaye",
        url: "5Qc6v5AqbVmZjXcdMadRRV",
        img: "https://i.scdn.co/image/ab67616d0000b2738e05741c1f98bab13a61ba36",
    },
    {
        name: "Not Into You",
        artists: "Brooksie",
        url: "1eFYbcVZBTKcE0iFIYU5qk",
        img: "https://i.scdn.co/image/ab67616d0000b273eb4e8461d936d7f29994d16a",
    },
    {
        name: "1987",
        artists: "Phoneboy",
        url: "5t67Tr3Sjup4xmIfY5RqxH",
        img: "https://i.scdn.co/image/ab67616d0000b2738e05741c1f98bab13a61ba36",
    },
    {
        name: "Big Sad",
        artists: "Mickey Darling",
        url: "7epRhGT3VF7HCWBhGeJQLV",
        img: "https://i.scdn.co/image/ab67616d0000b27396e554b2799b4452e026e20e",
    },
    {
        name: "blind",
        artists: "ROLE MODEL",
        url: "0NuWgxEp51CutD2pJoF4OM",
        img: "https://i.scdn.co/image/ab67616d0000b273fb1c194dc56c9ef5b809ffea",
    },
    {
        name: "Daydreamer",
        artists: "Kidsnot$aints.",
        url: "2hv4IKmCUHhzZzyMHT0ebu",
        img: "https://i.scdn.co/image/ab67616d0000b273665589537ad21c3bb4e94578",
    },
    {
        name: "OLIVIA",
        artists: "Softwilly, Yung Kage",
        url: "2s14ypvd880AiEfZssEjaY",
        img: "https://i.scdn.co/image/ab67616d0000b2736a4aebcfc198afe3e22cc8f0",
    },
];

const degrees = ["Applied Politics (MAP)", "Biological and Chemical Sciences (PhD)", "Business Administration (MBA)", "Business Economics (MABE)", "Chemistry (MSc)", "Communication Studies (MA)", "Community Music (MA)", "Criminology (MA)", "Cultural Analysis and Social Theory (MA)", "Divinity (MDiv)", "Education (MEd)", "English and Film (PhD)", "English and Film Studies (MA)", "Environmental Studies (MES)", "Finance (MFin)", "Geography (MA) (MSC) (PhD)", "Global Governance (PhD)", "History (MA)", "History (PhD)", "Human Relationships (PhD)", "Integrative Biology (MSc)", "Kinesiology (MKin) (PhD)", "Management (MSc) (PhD)", "Mathematical and Statistical Modelling (PhD)", "Mathematics (MSc)", "Music Therapy (MMT)", "Philosophy (MA)", "Psychology (MA) (MSc) (PhD)", "Public Safety (MPS)", "Religion, Culture and Global Justice (MA)", "Religious Studies (PhD)", "Social Justice and Community Engagement (MA)", "Social Work (MSW)", "Social Work (PhD)", "Sociology (MA)", "Theology (MA)"];

const quotes = [
    "👈 Swipe for less. ",
    "What should I put here?",
    " *Insert clever bio here*",
    " A day in the life of me: Eat avocado toast, post Instagram videos, read Instagram comments.",
    " First I drink the coffee. Then I do the things.",
    " Professional napper.",
    " Always give 100% — unless you’re donating blood.",
    " I don’t look like this in real life.",
    " A caffeine-dependent life form.",
    " Professional procrastinator.",
    " My life is about as organized as a $5 DVD bin at Walmart.",
    " I like long, romantic walks down every aisle of Target.",
    " Error 400: Bio unavailable.",
    " My dog is my best friend.",
    " I write bios, not tragedies.",
    " Do you ever feel like a plastic bag?",
    " Viewer discretion advised.",
    " I look exactly like my Bitmoji and that is my greatest accomplishment.",
    " Professional inquiries only.",
    " Former child.",
    " You miss 100% of the dogs you don’t pet.",
    " Competitive sleeper.",
    " Life's uncertain. Eat dessert first.",
    " A balanced diet is a cookie in each hand.",
    " The secret ingredient is always cheese.",
    " I followed my heart and it led me to the fridge.",
    " Don’t go bacon my heart.",
    " I apologize for anything I post while hungry.",
    " Will there be snacks?",
    " Pretty much just pictures of food and my dog.",
    " Hi, my hobbies include breakfast, lunch and dinner.",
    " Recovering donut addict.",
    " I eat cake for breakfast.",
    " Hey now, hey now!",
    " A human. Being.",
    " Anything but predictable.",
    " Meet (name).",
    " This is me.",
    " Welcome to my world.",
    " Thank you, come again.",
    " Keepin' it real since 2000.",
    " This is me.",
    " Making history.",
    " Daydream believer.",
    " Just a gal with a lot of spice.",
    " So far, so good.",
    " Thanks for checking in!",
    " Stay weird.",
    " Hot and dangerous.",
    " Welcome to my 👑dom.",
    " Traveller ✈️ Book Lover 📖 Obsessed with cheese 🧀.",
    " L💖VE is in the air.",
    " 👇 Check out my life👇",
    " L❤️ ver not a fighter spreading ✌️ all over the 🌎.",
    " 🐦: (twitter handle) 👻: (snapchat handle) 🎥: (youtube handle) Made in 🇬🇧.",
    " 99% ☕️.",
    " Equal parts 💄 and 💪.",
    " 📍 Depends on the week",
    " 🍩 worry 🐝 happy.",
    " Simple but significant.",
    " Stay humble. Be kind. Work hard.",
    " Take care of your body, it’s the only place you have to live.",
    " Your life does not get better by chance. It gets better by a change.",
    " She turned her cants into cans and her dreams into plans.",
    " In a world where you can be anyone, be yourself.",
    " Life is what happens to you while you scroll through Instagram.",
    "A very caffeine-dependent life form.",
    "   Recovering donut addict.",
    "   Recovering ice cream addict.",
    "   I’m not smart; I just wear glasses.",
    "   Will go into survival mode if tickled.",
    "   I’m actually not funny. I’m just really mean and people think I’m joking.",
    "   Humble, with just a hint of Kanye.",
    "   My hobbies are breakfast, lunch, and dinner topped with a chocolate dessert.",
    "   First I drink the coffee. Then I do the things.",
    "  Kanye attitude with Drake feelings.",
    "  Making PJs look hot since (year of birth).",
    "  Probably the best meat eater in the world.",
    "  Words cannot express my passion and love for Fridays!",
    "  Probably the best TV binge-watcher you’ll ever find.",
    "  Used to think I was a tad indecisive, but now I’m not quite sure.",
    "  I put the whine in wine.",
    "  Kind of a good Samaritan, terrible athlete, but extremely blessed in the napping skills department.",
    "  Gifted napper, talker, and ice cream eater.",
    "  Messy bun and having fun.",
    "  I’m so deep even the ocean gets jealous.",
    "   *insert pretentious stuff about myself here*",
    "   I’m real and I hope some of my followers are too.",
    "   Catch flights not feelings.",
    "   I regret nothing you see in this feed.",
    "   I’d rather steal your dessert than your boyfriend.",
    "   Sweet as sugar, tough as nails.",
    "   Born to express, not impress.",
    "   I can’t remember who I stole my bio from or why.",
    "   We are all part of the ultimate statistic – ten out of ten die.",
    "  I’m cool, but global warming made me HOT",
    "   Namast’ay in bed.",
    "   Simple but significant.",
    "   Livin’ a little.",
    "   99% caffeine.",
    "   Spreading smiles.",
    "   Slow down.",
    "   A human. Being.",
    "   Too rad to be sad.",
    "   Conquer from within.",
    "  Anything but predictable.",
    "  Born to shine.",
    "  Love without limits.",
    "  I got nothing.",
    "  Meet (name).",
    "  This is me.",
    "  Wake. Play. Slay.",
    "  C’est la vie.",
    "  This is my life.",
    "  Welcome to my world.",
    "  One of a kind.",
];
