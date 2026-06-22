/* =========================================================
   Emon's Games Gallery - Shared data layer
   (game datasets extracted verbatim from the original site)
   ========================================================= */

const globalKeyData = [
    { id: 1, title: 'Resident Evil Requiem', price: '7500 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 2, title: 'Battlefield 6', price: '7500 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/library_600x900.jpg', genre: 'FPS' },
    { id: 3, title: 'GTA V', price: '1550 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 4, title: 'Red Dead Redemption 2', price: '1850 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 5, title: 'Mortal Kombat 11', price: '500 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/976310/library_600x900.jpg', genre: 'Fighting' },
    { id: 6, title: 'Mortal Kombat 1', price: '2000 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg', genre: 'Fighting' },
    { id: 7, title: 'A Plague Tale Requiem', price: '1400 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1182900/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 8, title: 'Uncharted Legacy Of Thieves', price: '2100 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 9, title: 'Banisher Ghost of new Eden', price: '800 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1493640/library_600x900.jpg', genre: 'Action RPG' },
    { id: 10, title: 'Back 4 Blood', price: '200 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/924970/library_600x900.jpg', genre: 'Co-op Shooter' },
    { id: 11, title: 'GTA IV Liberty City', price: '1200 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/12220/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 12, title: 'Shadow of War Gold Edition', price: '550 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/356190/library_600x900.jpg', genre: 'Action RPG' },
    { id: 13, title: 'DEVOUR', price: '1000 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1274570/library_600x900.jpg', genre: 'Co-op Horror' },
    { id: 14, title: 'OUTLAST', price: '580 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238320/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 15, title: 'OUTLAST 2', price: '430 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/414700/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 16, title: 'The Last Of Us Part 1', price: '3400 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 17, title: "Tom Clancy's The Division", price: '650 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/365590/library_600x900.jpg', genre: 'Looter Shooter' },
    { id: 18, title: 'Far cry', price: '400 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/13520/library_600x900.jpg', genre: 'FPS' },
    { id: 19, title: 'Far cry 2', price: '450 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/19900/library_600x900.jpg', genre: 'FPS' },
    { id: 20, title: 'Far cry 3', price: '550 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220240/library_600x900.jpg', genre: 'FPS' },
    { id: 21, title: 'The Evil Within', price: '600 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268050/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 22, title: 'The Evil Within 2', price: '650 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/601430/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 23, title: 'Ori And The Blind Forest', price: '400 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387290/library_600x900.jpg', genre: 'Metroidvania' },
    { id: 24, title: 'Ori And The Will Of The Wisps', price: '800 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/library_600x900.jpg', genre: 'Metroidvania' },
    { id: 25, title: 'Little Nightmares', price: '450 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/424840/library_600x900.jpg', genre: 'Puzzle Platformer' },
    { id: 26, title: 'Little Nightmares II', price: '750 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/860510/library_600x900.jpg', genre: 'Puzzle Platformer' },
    { id: 27, title: 'Ghostrunner', price: '750 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1139900/library_600x900.jpg', genre: 'Action Platformer' },
    { id: 28, title: 'Ghostrunner II', price: '600 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2144740/library_600x900.jpg', genre: 'Action Platformer' },
    { id: 29, title: 'Yakuza 0', price: '2650 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/638970/library_600x900.jpg', genre: 'Action RPG' },
    { id: 30, title: 'Yakuza Kiwami 2', price: '1950 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/927380/library_600x900.jpg', genre: 'Action RPG' },
    { id: 31, title: 'Yakuza 3 Remastered', price: '2500 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1088710/library_600x900.jpg', genre: 'Action RPG' },
    { id: 32, title: 'Tomb Raider', price: '300 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/203160/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 33, title: 'Rise Of The Tomb Raider', price: '400 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391220/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 34, title: 'Shadow Of The Tomb Raider', price: '550 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/750920/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 35, title: 'Windward', price: '150 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/326410/library_600x900.jpg', genre: 'Sandbox RPG' },
    { id: 36, title: 'Fallout Classic Collection', price: '600 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/38400/library_600x900.jpg', genre: 'RPG' },
    { id: 37, title: 'Fallout 3', price: '100 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/22370/library_600x900.jpg', genre: 'RPG' },
    { id: 38, title: 'Fallout 76', price: '100 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151340/library_600x900.jpg', genre: 'Multiplayer RPG' },
    { id: 39, title: 'Fallout 4', price: '850 TK', desc: 'Global Key • Lifetime', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/377160/library_600x900.jpg', genre: 'RPG' }
];

const onlineActivationData = [
    { id: 1, title: 'Pragmata', price: 'Coming Soon', desc: 'Online Activation', img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSug3uVku5YutCYdHASgSr_G2aWm7p9UqMvzq1FLIUW64ERh6fE', genre: 'Action-Adventure' },
    { id: 2, title: 'Project 007 First Light', price: '300 TK', desc: 'Online Activation', img: 'https://en.wikipedia.org/wiki/Special:FilePath/007_First_Light_(2026)_cover.jpg', genre: 'Stealth Action' },
    { id: 3, title: "John Carpenter's Toxic Commando", price: '1450 TK', desc: 'Online Activation', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHC2KfWzyYUoHVi-v5e-M5lJ7NMZH03AjxPKCvybjJdwh5wf6o', genre: 'Co-op Shooter' },
    { id: 4, title: 'Crimson Desert', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2my0.jpg', genre: 'Action RPG' },
    { id: 5, title: 'Death Stranding 2 On The Beach', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5v8w.jpg', genre: 'Action' },
    { id: 6, title: 'Monster Hunter Stories 3', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1277400/library_600x900.jpg', genre: 'RPG' },
    { id: 7, title: 'Resident Evil Requiem', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/library_600x900.jpg', genre: 'Survival Horror', popular: true },
    { id: 8, title: 'MARATHON', price: '1450 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6kmy.jpg', genre: 'Extraction Shooter' },
    { id: 9, title: 'WWE 2K26', price: '750 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2315690/library_600x900.jpg', genre: 'Sports' },
    { id: 10, title: 'Styx Blades of Greed', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/355790/library_600x900.jpg', genre: 'Stealth' },
    { id: 11, title: 'Life Is Strange: Reunion', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2871440/library_600x900.jpg', genre: 'Narrative Adventure' },
    { id: 12, title: 'Reanimal', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k1v.jpg', genre: 'Co-op Horror' },
    { id: 13, title: 'Yakuza 3 Dark Ties', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1088710/library_600x900.jpg', genre: 'Action RPG' },
    { id: 14, title: 'Codevein 2', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/678960/library_600x900.jpg', genre: 'Action RPG' },
    { id: 15, title: 'Nioh 3', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1325200/library_600x900.jpg', genre: 'Action RPG' },
    { id: 16, title: 'RIDE 6', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2315120/library_600x900.jpg', genre: 'Racing' },
    { id: 17, title: 'Mafia The Old Country', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k1l.jpg', genre: 'Action-Adventure' },
    { id: 18, title: 'Stellar Blade', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co84mt.jpg', genre: 'Action RPG', popular: true },
    { id: 19, title: 'F1 25', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900.jpg', genre: 'Racing' },
    { id: 20, title: 'Doom The Dark Ages', price: '300 TK', desc: 'Online Activation', img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJZ47D5Fwa7mgSdubjUClWwNiO1epDQDNmcvpxfAH3Fu4F-pin', genre: 'FPS', popular: true },
    { id: 21, title: 'No Rest for the Wicked', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1371980/library_600x900.jpg', genre: 'Action RPG' },
    { id: 22, title: 'High on Life 2', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1583230/library_600x900.jpg', genre: 'FPS' },
    { id: 23, title: 'Borderlands 4', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k2m.jpg', genre: 'Looter Shooter' },
    { id: 24, title: 'The First Berserker: Khazan', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2820650/library_600x900.jpg', genre: 'Action RPG' },
    { id: 25, title: 'Carmageddon: Rogue Shift', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/505170/library_600x900.jpg', genre: 'Vehicular Combat' },
    { id: 26, title: 'Dragon Quest VII Reimagined', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2021210/library_600x900.jpg', genre: 'JRPG' },
    { id: 27, title: 'Sniper Elite Resistance', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k2q.jpg', genre: 'Stealth Shooter' },
    { id: 28, title: 'Street Fighter 6', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg', genre: 'Fighting', popular: true },
    { id: 29, title: 'Tekken 7', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/389730/library_600x900.jpg', genre: 'Fighting' },
    { id: 30, title: 'Tekken 8', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900.jpg', genre: 'Fighting', popular: true },
    { id: 31, title: 'Like a Dragon Gaiden', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/library_600x900.jpg', genre: 'Action RPG' },
    { id: 32, title: 'Like a Dragon: Pirate Yakuza in Hawaii', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3061880/library_600x900.jpg', genre: 'Action Brawler' },
    { id: 33, title: 'Like A Dragon: Infinite Wealth', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2071430/library_600x900.jpg', genre: 'RPG' },
    { id: 34, title: 'Yakuza 0 Director Cut', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/638970/library_600x900.jpg', genre: 'Action RPG' },
    { id: 35, title: 'Persona 3 Reload', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2161700/library_600x900.jpg', genre: 'JRPG' },
    { id: 36, title: 'Persona 3 Portable', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1809700/library_600x900.jpg', genre: 'JRPG' },
    { id: 37, title: 'Persona 4 Golden', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1113000/library_600x900.jpg', genre: 'JRPG' },
    { id: 38, title: 'Persona 5 Royal', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/library_600x900.jpg', genre: 'JRPG' },
    { id: 39, title: 'Arc Raiders', price: '1450 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1808500/library_600x900.jpg', genre: 'Extraction Shooter' },
    { id: 40, title: 'Helldivers 2', price: '1450 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2530650/library_600x900.jpg', genre: 'Co-op Shooter' },
    { id: 41, title: 'No Man\'s Sky', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/275850/library_600x900.jpg', genre: 'Sandbox Survival' },
    { id: 42, title: 'Grounded 2', price: '750 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/962130/library_600x900.jpg', genre: 'Survival' },
    { id: 43, title: 'Moto GP 25', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2581210/library_600x900.jpg', genre: 'Racing' },
    { id: 44, title: 'Demon Slayer 2', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1492380/library_600x900.jpg', genre: 'Fighting' },
    { id: 45, title: 'Shinobi: Art of Vengeance', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7emw.jpg', genre: 'Action Platformer' },
    { id: 46, title: 'Jurassic World Evolution 3', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/library_600x900.jpg', genre: 'Simulation' },
    { id: 47, title: 'Little Nightmares 3', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1392860/library_600x900.jpg', genre: 'Puzzle Platformer' },
    { id: 48, title: 'Ninja Gaiden 4', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1580780/library_600x900.jpg', genre: 'Action' },
    { id: 49, title: 'Mortal Kombat 1', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg', genre: 'Fighting' },
    { id: 50, title: 'Hogwarts Legacy', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg', genre: 'Action RPG', popular: true },
    { id: 51, title: 'Ys X: Proud Nordics', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2570810/library_600x900.jpg', genre: 'Action RPG' },
    { id: 52, title: 'Nested Lands', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co88h1.jpg', genre: 'Survival' },
    { id: 53, title: 'Fatal Frame II Remake', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2130460/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 54, title: 'REPLACED', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1663850/library_600x900.jpg', genre: 'Action Platformer' },
    { id: 55, title: 'NBA 2K23', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/library_600x900.jpg', genre: 'Sports' },
    { id: 56, title: 'NBA 2K24', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/library_600x900.jpg', genre: 'Sports' },
    { id: 57, title: 'NBA 2K25', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2878980/library_600x900.jpg', genre: 'Sports' },
    { id: 58, title: 'NBA 2K26', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2878980/library_600x900.jpg', genre: 'Sports' },
    { id: 59, title: 'Metal Gear Solid Delta', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2417610/library_600x900.jpg', genre: 'Stealth Action' },
    { id: 60, title: 'Silent Hill f', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5ih4.jpg', genre: 'Survival Horror' },
    { id: 61, title: 'Dying Light: The Beast', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3105780/library_600x900.jpg', genre: 'Survival Horror', popular: true },
    { id: 62, title: 'Dead Space Remake', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 63, title: 'Lost Soul Aside', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2k0i.jpg', genre: 'Action RPG' },
    { id: 64, title: 'The Alters', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1601570/library_600x900.jpg', genre: 'Survival' },
    { id: 65, title: 'Cronos The New Dawn', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3108210/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 66, title: 'Outer Worlds 2', price: '250 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3d2l.jpg', genre: 'RPG' },
    { id: 67, title: 'Monster Hunter World', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/library_600x900.jpg', genre: 'Action RPG' },
    { id: 68, title: 'Monster Hunter Rise', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1446780/library_600x900.jpg', genre: 'Action RPG' },
    { id: 69, title: 'Monster Hunter Stories', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2363600/library_600x900.jpg', genre: 'RPG' },
    { id: 70, title: 'Monster Hunter Wilds', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2246340/library_600x900.jpg', genre: 'Action RPG' },
    { id: 71, title: 'Hollow Knight: Silksong', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/library_600x900.jpg', genre: 'Metroidvania' },
    { id: 72, title: 'Dragon\'s Dogma 2', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2054970/library_600x900.jpg', genre: 'Action RPG' },
    { id: 73, title: 'Red Dead Redemption', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 74, title: 'Red Dead Redemption 2', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 75, title: 'Forza Horizon 5', price: '280 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg', genre: 'Racing', popular: true },
    { id: 76, title: 'Forza Horizon 4', price: '240 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/library_600x900.jpg', genre: 'Racing' },
    { id: 77, title: 'Expedition 33', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2808040/library_600x900.jpg', genre: 'RPG' },
    { id: 78, title: 'Killing Floor 3', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2510240/library_600x900.jpg', genre: 'Co-op Shooter' },
    { id: 79, title: 'The Last of Us Part 1', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 80, title: 'The Last of Us Part 2', price: '300 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7m.jpg', genre: 'Action-Adventure' },
    { id: 81, title: 'God of War', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 82, title: 'God of War Ragnarök', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 83, title: 'Ghost of Tsushima', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 84, title: 'Uncharted: Legacy of Thieves', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 85, title: 'Horizon Zero Dawn', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2863230/library_600x900.jpg', genre: 'Action RPG' },
    { id: 86, title: 'Horizon Forbidden West', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/library_600x900.jpg', genre: 'Action RPG' },
    { id: 87, title: 'Civilization VII', price: '300 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1281560/library_600x900.jpg', genre: 'Strategy' },
    { id: 88, title: 'Gears of War: E-Day', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2360540/library_600x900.jpg', genre: 'Shooter' },
    { id: 89, title: 'Football Manager 26', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2252570/library_600x900.jpg', genre: 'Simulation' },
    { id: 90, title: 'Overkill\'s The Walking Dead', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/717690/library_600x900.jpg', genre: 'Co-op Shooter' },
    { id: 91, title: 'Spider-Man Remastered', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
    { id: 92, title: 'Spider-Man: Miles Morales', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817190/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 93, title: 'Spider-Man 2', price: '200 TK', desc: 'Online Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5z8n.jpg', genre: 'Action-Adventure' },
    { id: 94, title: 'Detroit: Become Human', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/library_600x900.jpg', genre: 'Narrative Adventure' },
    { id: 95, title: 'S.T.A.L.K.E.R. 2', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1643320/library_600x900.jpg', genre: 'Survival Shooter' },
    { id: 96, title: 'Indiana Jones Great Circle', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2928800/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 97, title: 'Oblivion Remastered', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/22330/library_600x900.jpg', genre: 'RPG' },
    { id: 98, title: 'Kingdom Come: Deliverance 2', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1771300/library_600x900.jpg', genre: 'RPG' },
    { id: 99, title: 'South of Midnight', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3016590/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 100, title: 'Mount & Blade II', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/261550/library_600x900.jpg', genre: 'RPG Sandbox' },
    { id: 101, title: 'Cities: Skylines II', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/949230/library_600x900.jpg', genre: 'City Builder' },
    { id: 102, title: 'Assetto Corsa Evo', price: '250 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3058630/library_600x900.jpg', genre: 'Racing' },
    { id: 103, title: 'RIDE 5', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2315120/library_600x900.jpg', genre: 'Racing' },
    { id: 104, title: 'Ratchet & Clank', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1895880/library_600x900.jpg', genre: 'Action Platformer' },
    { id: 105, title: 'Forspoken', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1680880/library_600x900.jpg', genre: 'Action RPG' },
    { id: 106, title: 'A Plague Tale Requiem', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1182900/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 107, title: 'Hellblade 2', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2461850/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 108, title: 'Silent Hill 2', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 109, title: 'Sekiro: Shadows Die Twice', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg', genre: 'Action RPG' },
    { id: 110, title: 'The Witcher 3', price: '200 TK', desc: 'Online Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg', genre: 'Action RPG', popular: true }
];

const offlineData = [
    { id: 1, title: 'Resident Evil Requiem', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 2, title: 'Pragmata', price: '150 TK', desc: 'Offline Activation', img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSug3uVku5YutCYdHASgSr_G2aWm7p9UqMvzq1FLIUW64ERh6fE', genre: 'Action-Adventure' },
    { id: 3, title: 'Mafia: The Old Country', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k1l.jpg', genre: 'Action-Adventure' },
    { id: 4, title: 'DOOM: The Dark Ages', price: '150 TK', desc: 'Offline Activation', img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJZ47D5Fwa7mgSdubjUClWwNiO1epDQDNmcvpxfAH3Fu4F-pin', genre: 'FPS' },
    { id: 5, title: 'Stellar Blade', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co84mt.jpg', genre: 'Action RPG' },
    { id: 6, title: 'The First Berserker: Khazan', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2820650/library_600x900.jpg', genre: 'Action RPG' },
    { id: 7, title: 'Prince of Persia: The Lost Crown', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2751000/library_600x900.jpg', genre: 'Metroidvania' },
    { id: 8, title: 'Star Wars Outlaws', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8a15.jpg', genre: 'Action-Adventure', popular: true },
    { id: 9, title: 'F1 25', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900.jpg', genre: 'Racing' },
    { id: 10, title: 'Sniper Elite Resistance', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8k2q.jpg', genre: 'Stealth Shooter' },
    { id: 11, title: 'Assassin\'s Creed Shadows', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co86v2.jpg', genre: 'Action RPG' },
    { id: 12, title: 'Black Myth: Wukong', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg', genre: 'Action RPG', popular: true },
    { id: 13, title: 'Mortal Kombat 1', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg', genre: 'Fighting' },
    { id: 14, title: 'Avatar: Frontiers of Pandora', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2840770/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 15, title: 'Dead Space Remake', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/library_600x900.jpg', genre: 'Survival Horror' },
    { id: 16, title: 'Need for Speed Unbound', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1846380/library_600x900.jpg', genre: 'Racing' },
    { id: 17, title: 'Hogwarts Legacy', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg', genre: 'Action RPG' },
    { id: 18, title: 'Assassin\'s Creed Mirage', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2896580/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 19, title: 'The Crew Motorfest', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2698940/library_600x900.jpg', genre: 'Racing' },
    { id: 20, title: 'Resident Evil 4', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900.jpg', genre: 'Survival Horror', popular: true },
    { id: 21, title: 'Assassin\'s Creed Valhalla', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/library_600x900.jpg', genre: 'Action RPG' },
    { id: 22, title: 'Assassin\'s Creed Odyssey', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/812140/library_600x900.jpg', genre: 'Action RPG' },
    { id: 23, title: 'Far Cry 6', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/library_600x900.jpg', genre: 'FPS' },
    { id: 24, title: 'Skull and Bones', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2253080/library_600x900.jpg', genre: 'Naval Action' },
    { id: 25, title: 'Star Wars Jedi: Survivor', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1774580/library_600x900.jpg', genre: 'Action-Adventure' },
    { id: 26, title: 'Cyberpunk 2077', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg', genre: 'RPG', popular: true },
    { id: 27, title: 'Street Fighter 6', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg', genre: 'Fighting' },
    { id: 28, title: 'Monster Hunter Wilds', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2246340/library_600x900.jpg', genre: 'Action RPG' },
    { id: 29, title: 'Like a Dragon: Infinite Wealth', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2071430/library_600x900.jpg', genre: 'RPG' },
    { id: 30, title: 'Like a Dragon: Pirate Yakuza in Hawaii', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3061880/library_600x900.jpg', genre: 'Action Brawler' },
    { id: 31, title: 'Persona 3 Reload', price: '150 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2161700/library_600x900.jpg', genre: 'JRPG' },
    { id: 32, title: 'Persona 3 Portable', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1809700/library_600x900.jpg', genre: 'JRPG' },
    { id: 33, title: 'Persona 4 Golden', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1113000/library_600x900.jpg', genre: 'JRPG' },
    { id: 34, title: 'Persona 5 Royal', price: '100 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/library_600x900.jpg', genre: 'JRPG' },
    { id: 35, title: 'EA Sports FC 26', price: '150 TK', desc: 'Offline Activation', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8l5a.jpg', genre: 'Sports', popular: true },
    { id: 36, title: 'Elden Ring', price: '350 TK', desc: 'Offline Activation', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg', genre: 'Action RPG', popular: true }
];

const psData = [
    { id: 1, title: 'EA Sports FC 24', price: '1200 TK', desc: 'PS4/PS5 Primary', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900.jpg', genre: 'Sports' },
    { id: 2, title: "Marvel's Spider-Man 2", price: '2500 TK', desc: 'PS5 Primary', img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTj0Fz1X64flpoUaSzW6s78zrISiQEPkjZc-Lzx7TyD3l1MTXFx', genre: 'Action-Adventure', popular: true },
    { id: 3, title: 'God of War Ragnarok', price: '1500 TK', desc: 'PS4/PS5 Secondary', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg', genre: 'Action-Adventure', popular: true },
];

const topUpData = [
    { id: 1, title: 'Free Fire - 100 Diamonds', price: '80 TK', desc: 'Player ID Top-up', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVGndD-8g0Tq41fR8B3lS5eK-2T0s0z0h_oA', genre: 'In-Game Currency', popular: true },
    { id: 2, title: 'PUBG Mobile - 60 UC', price: '95 TK', desc: 'Player ID Top-up', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1w4E8wD0gM8S3X7S0M_t_y7V3A2X2S2PmA', genre: 'In-Game Currency' },
    { id: 3, title: 'Valorant - 475 VP', price: '450 TK', desc: 'Riot ID Top-up', img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg', genre: 'In-Game Currency' },
];

const allGames = [
    ...globalKeyData.map(d => ({ ...d, category: 'Global Key' })),
    ...onlineActivationData.map(d => ({ ...d, category: 'Online Activation' })),
    ...offlineData.map(d => ({ ...d, category: 'Offline' })),
    ...psData.map(d => ({ ...d, category: 'PlayStation' })),
    ...topUpData.map(d => ({ ...d, category: 'Top Up' }))
];

const datasets = { 'global': globalKeyData, 'online': onlineActivationData, 'offline': offlineData, 'ps': psData, 'topup': topUpData, 'search': [] };

const navItems = [
    { id: 'home', label: 'Home', icon: 'gamepad-2' },
    { id: 'online', label: 'Online Activation', icon: 'monitor' },
    { id: 'offline', label: 'Offline Activation', icon: 'wifi-off' },
    { id: 'ps', label: 'PS Accounts', icon: 'gamepad' },
    { id: 'topup', label: 'Top Up', icon: 'zap' }
];

const reviewsData = [
    { name: "Rakib H.", review: "Unbelievable! Got my GTA V global key in just 5 minutes via Messenger. 100% legit and working perfectly.", rating: 5 },
    { name: "Siyam Ahmed", review: "The offline activation service is a lifesaver. Playing Black Myth: Wukong smoothly without breaking the bank. Great support!", rating: 5 },
    { name: "Tahmid R.", review: "Instant delivery for my PS5 Spider-Man 2 account. The seller is very polite and guides you step by step. Highly recommended.", rating: 5 },
    { name: "Faisal K.", review: "I was skeptical about the lifetime guarantee, but my Red Dead Redemption 2 works flawlessly. Best game shop in BD!", rating: 5 },
    { name: "Ashiqur R.", review: "Purchased Valorant VP, got it delivered in exactly 2 minutes. Lightning fast service. Will definitely buy again.", rating: 5 }
];

const FB_LINK = "https://www.facebook.com/messages/t/222258134976104";
const ITEMS_PER_PAGE = 12;

// ===== Category map: page key -> dataset + labels =====
const CATEGORIES = {
    global:  { label: "Global Product Keys", short: "Global Keys", data: globalKeyData,         page: "index.html" },
    online:  { label: "Online Activation",   short: "Online",      data: onlineActivationData,  page: "online.html" },
    offline: { label: "Offline Activation",  short: "Offline",     data: offlineData,           page: "offline.html" },
    ps:      { label: "PlayStation Accounts",short: "PS Accounts", data: psData,                page: "ps.html" },
    topup:   { label: "Game Top-Ups",        short: "Top Up",      data: topUpData,             page: "topup.html" }
};

// Resolve a single game by its category key + numeric id (ids are NOT unique across datasets).
function getGame(catKey, id) {
    const cat = CATEGORIES[catKey];
    if (!cat) return null;
    const nid = parseInt(id, 10);
    const game = cat.data.find(function (g) { return g.id === nid; });
    return game ? Object.assign({}, game, { catKey: catKey, category: cat.label }) : null;
}

// Build a detail-page URL for a game within a category.
function gameUrl(catKey, id) {
    return "game.html?cat=" + encodeURIComponent(catKey) + "&id=" + encodeURIComponent(id);
}
