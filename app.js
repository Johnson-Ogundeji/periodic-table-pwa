// Periodic Kids — interactive periodic table for children
// All element data, examples, quiz logic in one file.

const CATS = {
  'alkali':       { name: 'Alkali metal',      emoji:'🔥', light: '#FFD9E6', dark: '#9B1B47', text: '#7A1338', dtext: '#FFE3EE' },
  'alkaline':     { name: 'Alkaline earth',    emoji:'🧱', light: '#FFE0CC', dark: '#A8410F', text: '#7A2E08', dtext: '#FFE8D6' },
  'transition':   { name: 'Transition metal',  emoji:'⚙️', light: '#CFE6FF', dark: '#0B5AA8', text: '#063A6E', dtext: '#DCEEFF' },
  'post':         { name: 'Post-transition',   emoji:'🔩', light: '#E3DCFF', dark: '#4B33B5', text: '#2E2080', dtext: '#EDE7FF' },
  'metalloid':    { name: 'Metalloid',         emoji:'💎', light: '#C8F4E5', dark: '#0A6E55', text: '#06453A', dtext: '#D6F7EC' },
  'nonmetal':     { name: 'Reactive nonmetal', emoji:'🌿', light: '#DCF5C2', dark: '#3A7A0E', text: '#234A06', dtext: '#E8F8D6' },
  'halogen':      { name: 'Halogen',           emoji:'🧴', light: '#FFEFC2', dark: '#8A5A06', text: '#5C3A02', dtext: '#FFF3D6' },
  'noble':        { name: 'Noble gas',         emoji:'🎈', light: '#FFD6D6', dark: '#9B2424', text: '#6E1515', dtext: '#FFE0E0' },
  'lanthanide':   { name: 'Lanthanide',        emoji:'✨', light: '#E6E3F5', dark: '#4A4570', text: '#2E2A4D', dtext: '#ECEAF7' },
  'actinide':     { name: 'Actinide',          emoji:'☢️', light: '#DAD6EC', dark: '#3F3A5E', text: '#2A2745', dtext: '#E6E3F2' },
  'unknown':      { name: 'Unknown',           emoji:'❓', light: '#E8E6F0', dark: '#36324A', text: '#4A4566', dtext: '#C7C3DC' }
};

// [num, sym, name, mass, period, group, cat, config, year, discoverer, melt(°C), fact, examples_array]
const ELS = [
  [1,'H','Hydrogen',1.008,1,1,'nonmetal','1s¹',1766,'Henry Cavendish',-259,'Lightest element. Stars are mostly made of it!',['Water (H₂O) — every drop you drink','Rocket fuel for SpaceX rockets','Inside the Sun, fusing into helium']],
  [2,'He','Helium',4.003,1,18,'noble','1s²',1868,'Janssen & Lockyer',-272,'Makes your voice squeaky! Lighter than air.',['Birthday party balloons that float','MRI machines at the hospital','Squeaky-voice pranks']],
  [3,'Li','Lithium',6.94,2,1,'alkali','[He] 2s¹',1817,'Johan Arfwedson',180,'The metal inside almost every modern battery.',['Phone and laptop batteries','Tesla and EV car batteries','Some medicines for mood']],
  [4,'Be','Beryllium',9.012,2,2,'alkaline','[He] 2s²',1798,'Louis Vauquelin',1287,'Super light and stiff — used in spacecraft.',['James Webb Space Telescope mirrors','Lightweight bicycle frames','X-ray machine windows']],
  [5,'B','Boron',10.81,2,13,'metalloid','[He] 2s² 2p¹',1808,'Davy, Gay-Lussac, Thénard',2076,'Makes glass tough enough for hot oven dishes.',['Pyrex baking dishes that don\'t crack','Borax laundry powder','Slime recipes (with glue!)']],
  [6,'C','Carbon',12.01,2,14,'nonmetal','[He] 2s² 2p²',-3750,'Known since ancient times',3550,'In every living thing — including you!',['The "lead" in your pencil (graphite)','Diamonds in jewelry','Charcoal for BBQ','You — 18% of your body!']],
  [7,'N','Nitrogen',14.01,2,15,'nonmetal','[He] 2s² 2p³',1772,'Daniel Rutherford',-210,'78% of every breath you take is nitrogen.',['Air in car tires','Frozen ice cream (liquid nitrogen!)','Plant fertilizer in gardens']],
  [8,'O','Oxygen',16.00,2,16,'nonmetal','[He] 2s² 2p⁴',1774,'Joseph Priestley',-218,'Every breath. Every fire. Every drop of water.',['The air you breathe (21% of it)','Fire — needs oxygen to burn','Astronaut tanks in space']],
  [9,'F','Fluorine',19.00,2,17,'halogen','[He] 2s² 2p⁵',1886,'Henri Moissan',-220,'Most reactive element ever! Keeps teeth strong.',['Toothpaste (fluoride)','Non-stick frying pans (Teflon)','Tap water (in many places)']],
  [10,'Ne','Neon',20.18,1,18,'noble','[He] 2s² 2p⁶',1898,'Ramsay & Travers',-249,'Makes glowing orange-red signs in cities.',['Neon signs at restaurants','Some TV screens','Glow-in-the-dark watch dials (older ones)']],
  [11,'Na','Sodium',22.99,3,1,'alkali','[Ne] 3s¹',1807,'Humphry Davy',98,'Half of every grain of table salt.',['Table salt on your fries (NaCl)','Yellow streetlights','Baking soda in cupcakes']],
  [12,'Mg','Magnesium',24.31,3,2,'alkaline','[Ne] 3s²',1755,'Joseph Black',650,'Makes plants green and burns super bright!',['Sparklers on your birthday cake','Green leaves (chlorophyll)','Lightweight laptop cases']],
  [13,'Al','Aluminium',26.98,3,13,'post','[Ne] 3s² 3p¹',1825,'Hans Christian Ørsted',660,'The most common metal in Earth\'s crust.',['Soda cans (Coke, Pepsi)','Kitchen foil','Bicycle frames','Aircraft bodies']],
  [14,'Si','Silicon',28.09,3,14,'metalloid','[Ne] 3s² 3p²',1824,'Jöns Jacob Berzelius',1414,'Inside every computer, phone, and game console.',['iPhone and PlayStation chips','Sand on the beach','Glass windows','Solar panels']],
  [15,'P','Phosphorus',30.97,3,15,'nonmetal','[Ne] 3s² 3p³',1669,'Hennig Brand',44,'Makes matches strike. In your DNA and bones.',['Match heads that strike','Fireworks (bright white)','Fertilizer for plants','Your DNA!']],
  [16,'S','Sulfur',32.06,3,16,'nonmetal','[Ne] 3s² 3p⁴',-2000,'Known since ancient times',115,'Smells like rotten eggs! Yellow when pure.',['Match smell','Stink bombs','Rubber tires (vulcanization)','Onions making you cry']],
  [17,'Cl','Chlorine',35.45,3,17,'halogen','[Ne] 3s² 3p⁵',1774,'Carl Wilhelm Scheele',-102,'Cleans swimming pools. Other half of salt.',['Swimming pool water','Bleach for cleaning','Table salt (with sodium)','Tap water (tiny amounts)']],
  [18,'Ar','Argon',39.95,3,18,'noble','[Ne] 3s² 3p⁶',1894,'Ramsay & Rayleigh',-189,'Boring on purpose — fills lightbulbs safely.',['Inside old lightbulbs','Double-glazed windows','Welding shields']],
  [19,'K','Potassium',39.10,4,1,'alkali','[Ar] 4s¹',1807,'Humphry Davy',64,'Bananas are full of it! Helps muscles work.',['Bananas','Potatoes','Plant fertilizer','Your beating heart needs it']],
  [20,'Ca','Calcium',40.08,4,2,'alkaline','[Ar] 4s²',1808,'Humphry Davy',842,'Builds strong bones and teeth.',['Milk and cheese','Your bones and teeth','Eggshells','Chalk on the blackboard']],
  [21,'Sc','Scandium',44.96,4,3,'transition','[Ar] 3d¹ 4s²',1879,'Lars Fredrik Nilson',1541,'Makes super-bright stadium lights.',['Stadium floodlights','Fighter jet parts','High-end bike frames']],
  [22,'Ti','Titanium',47.87,4,4,'transition','[Ar] 3d² 4s²',1791,'William Gregor',1668,'Strong as steel but much lighter!',['iPhone Pro frames','Hip and knee replacements','Fighter jets','Golf clubs']],
  [23,'V','Vanadium',50.94,4,5,'transition','[Ar] 3d³ 4s²',1801,'Andrés Manuel del Río',1910,'Makes steel super tough — like in tools.',['Spanner and wrench tools','Bicycle gears','Spring steel in cars']],
  [24,'Cr','Chromium',52.00,4,6,'transition','[Ar] 3d⁵ 4s¹',1797,'Louis Vauquelin',1907,'Makes things shiny and rust-proof!',['Shiny car bumpers','Stainless steel cutlery','Emerald green color','Rubies (red color)']],
  [25,'Mn','Manganese',54.94,4,7,'transition','[Ar] 3d⁵ 4s²',1774,'Johan Gottlieb Gahn',1246,'Hidden in batteries and steel cans.',['AA and AAA batteries','Steel food cans','Some glass colours']],
  [26,'Fe','Iron',55.85,4,8,'transition','[Ar] 3d⁶ 4s²',-3000,'Known since ancient times',1538,'In your blood (makes it red!) and Earth\'s core.',['Your blood (haemoglobin)','Skyscrapers and bridges','Cars','Cast-iron skillets','Earth\'s core']],
  [27,'Co','Cobalt',58.93,4,9,'transition','[Ar] 3d⁷ 4s²',1735,'Georg Brandt',1495,'Makes the deep blue colour in pottery.',['Blue ceramic mugs','Phone batteries','Magnets in headphones']],
  [28,'Ni','Nickel',58.69,4,10,'transition','[Ar] 3d⁸ 4s²',1751,'Axel Fredrik Cronstedt',1455,'Inside coins and stainless steel forks.',['5p coins (UK), 5¢ nickel (US)','Stainless steel sinks','Rechargeable batteries']],
  [29,'Cu','Copper',63.55,4,11,'transition','[Ar] 3d¹⁰ 4s¹',-9000,'Known since ancient times',1085,'Pinkish-orange metal in every wall socket.',['Electrical wires in walls','1p and 2p coins (UK)','Pennies (US, before 1982)','Copper bottoms on pans']],
  [30,'Zn','Zinc',65.38,4,12,'transition','[Ar] 3d¹⁰ 4s²',1746,'Andreas Marggraf',420,'Coats steel to stop it rusting.',['Galvanised metal roofs','Sunscreen (zinc oxide)','Pennies (US, since 1982)','Helps your immune system']],
  [31,'Ga','Gallium',69.72,4,13,'post','[Ar] 3d¹⁰ 4s² 4p¹',1875,'Paul-Émile Lecoq',30,'Melts in your hand! (Don\'t actually try.)',['LED lights','Blu-ray players','Funny "spoon melting" tricks online']],
  [32,'Ge','Germanium',72.63,4,14,'metalloid','[Ar] 3d¹⁰ 4s² 4p²',1886,'Clemens Winkler',938,'Used in fibre-optic cables that carry the internet.',['Fibre-optic internet cables','Night-vision goggles','Some camera lenses']],
  [33,'As','Arsenic',74.92,4,15,'metalloid','[Ar] 3d¹⁰ 4s² 4p³',1250,'Albertus Magnus',817,'Famously poisonous — used in old detective stories!',['Old wood preservatives','Some pesticides (banned now)','Semiconductors']],
  [34,'Se','Selenium',78.97,4,16,'nonmetal','[Ar] 3d¹⁰ 4s² 4p⁴',1817,'Jöns Jacob Berzelius',221,'Helps photocopiers copy pages.',['Photocopier drums','Anti-dandruff shampoo','Some glass colouring']],
  [35,'Br','Bromine',79.90,4,17,'halogen','[Ar] 3d¹⁰ 4s² 4p⁵',1826,'Antoine-Jérôme Balard',-7,'A red-brown liquid that smells terrible!',['Old film photography','Some swimming pool treatments','Flame retardants']],
  [36,'Kr','Krypton',83.80,4,18,'noble','[Ar] 3d¹⁰ 4s² 4p⁶',1898,'Ramsay & Travers',-157,'Sounds like Superman\'s home — used in lasers!',['High-end car headlights','Some camera flashes','Energy-saving lightbulbs']],
  [37,'Rb','Rubidium',85.47,5,1,'alkali','[Kr] 5s¹',1861,'Bunsen & Kirchhoff',39,'Used in atomic clocks that keep super-precise time.',['Atomic clocks (in GPS satellites)','Some types of glass','Research labs']],
  [38,'Sr','Strontium',87.62,5,2,'alkaline','[Kr] 5s²',1790,'Adair Crawford',777,'Makes the bright red colour in fireworks!',['Red fireworks','Glow-in-the-dark toys','Old tube TVs']],
  [39,'Y','Yttrium',88.91,5,3,'transition','[Kr] 4d¹ 5s²',1794,'Johan Gadolin',1526,'Makes the red glow in old TV screens.',['Red colour in older TVs','LED lightbulbs','Camera lenses']],
  [40,'Zr','Zirconium',91.22,5,4,'transition','[Kr] 4d² 5s²',1789,'Martin Heinrich Klaproth',1855,'Fake diamonds in jewelry are made of it!',['Cubic zirconia jewelry','Inside nuclear reactors','Ceramic knives']],
  [41,'Nb','Niobium',92.91,5,5,'transition','[Kr] 4d⁴ 5s¹',1801,'Charles Hatchett',2477,'Used in MRI machines that take pictures of your insides.',['MRI hospital scanners','Particle accelerators','Some jewelry']],
  [42,'Mo','Molybdenum',95.95,5,6,'transition','[Kr] 4d⁵ 5s¹',1778,'Carl Wilhelm Scheele',2623,'Makes super-strong steel for tools and tanks.',['Sword and knife blades','Engine parts','Aircraft armour']],
  [43,'Tc','Technetium',98,5,7,'transition','[Kr] 4d⁵ 5s²',1937,'Perrier & Segrè',2157,'First element ever made by humans in a lab!',['Hospital body scans','Medical research','Not found in nature']],
  [44,'Ru','Ruthenium',101.1,5,8,'transition','[Kr] 4d⁷ 5s¹',1844,'Karl Ernst Claus',2334,'Makes hard tips for fountain pens.',['Fountain pen nibs','Solar cells','Hard drive coatings']],
  [45,'Rh','Rhodium',102.9,5,9,'transition','[Kr] 4d⁸ 5s¹',1803,'William Hyde Wollaston',1964,'One of the most expensive metals on Earth!',['Catalytic converters in cars','White-gold jewelry coatings','Mirrors in searchlights']],
  [46,'Pd','Palladium',106.4,5,10,'transition','[Kr] 4d¹⁰',1803,'William Hyde Wollaston',1555,'Cleans up car exhaust to keep air cleaner.',['Catalytic converters in cars','White-gold jewelry','Dental fillings']],
  [47,'Ag','Silver',107.9,5,11,'transition','[Kr] 4d¹⁰ 5s¹',-5000,'Known since ancient times',962,'The shiniest metal — better than gold for mirrors!',['Mirrors','Silver jewelry and cutlery','Olympic silver medals','Some Christmas tree decorations']],
  [48,'Cd','Cadmium',112.4,5,12,'transition','[Kr] 4d¹⁰ 5s²',1817,'Stromeyer & Hermann',321,'Used in old toy paint — bright yellow!',['Older paints (cadmium yellow)','Rechargeable NiCd batteries','Some solar panels']],
  [49,'In','Indium',114.8,5,13,'post','[Kr] 4d¹⁰ 5s² 5p¹',1863,'Reich & Richter',157,'Makes touchscreens work on your tablet.',['iPad and phone touchscreens','LCD TV screens','Solar panels']],
  [50,'Sn','Tin',118.7,5,14,'post','[Kr] 4d¹⁰ 5s² 5p²',-3000,'Known since ancient times',232,'In tin cans (well, mostly steel with a tin coat).',['Tin cans of food','Solder for electronics','Bronze (mixed with copper)','Tin foil (older type)']],
  [51,'Sb','Antimony',121.8,5,15,'metalloid','[Kr] 4d¹⁰ 5s² 5p³',1540,'Vannoccio Biringuccio',631,'Stops fabrics catching fire easily.',['Flame-retardant pyjamas','Battery plates','Some makeup (eyeliner, in ancient times)']],
  [52,'Te','Tellurium',127.6,5,16,'metalloid','[Kr] 4d¹⁰ 5s² 5p⁴',1782,'Franz-Joseph Müller',450,'Makes solar panels turn sunshine into electricity.',['Solar panels on roofs','Rewritable DVDs','Some alloys for steel']],
  [53,'I','Iodine',126.9,5,17,'halogen','[Kr] 4d¹⁰ 5s² 5p⁵',1811,'Bernard Courtois',114,'In the antiseptic that stings on a cut!',['Antiseptic for cuts and grazes','Iodised table salt','Some seaweed and seafood']],
  [54,'Xe','Xenon',131.3,5,18,'noble','[Kr] 4d¹⁰ 5s² 5p⁶',1898,'Ramsay & Travers',-112,'Powers the brightest car headlights!',['Xenon car headlights','Flash lamps in old cameras','Ion engines on spacecraft']],
  [55,'Cs','Caesium',132.9,6,1,'alkali','[Xe] 6s¹',1860,'Bunsen & Kirchhoff',28,'Defines what one second is — atomic clocks!',['Atomic clocks (most accurate ever)','GPS satellites','Drilling fluids']],
  [56,'Ba','Barium',137.3,6,2,'alkaline','[Xe] 6s²',1808,'Humphry Davy',727,'Makes green sparks in fireworks!',['Green fireworks','Hospital "barium meal" X-rays','Spark plugs']],
  [57,'La','Lanthanum',138.9,9,4,'lanthanide','[Xe] 5d¹ 6s²',1839,'Carl Gustaf Mosander',920,'Inside camera lenses for clearer photos.',['Camera and telescope lenses','Hybrid car batteries (Prius)','Studio lighting']],
  [58,'Ce','Cerium',140.1,9,5,'lanthanide','[Xe] 4f¹ 5d¹ 6s²',1803,'Berzelius & Hisinger',795,'Makes the sparks in lighters!',['Lighter flints (when you spin the wheel)','Self-cleaning ovens','Polishing powders']],
  [59,'Pr','Praseodymium',140.9,9,6,'lanthanide','[Xe] 4f³ 6s²',1885,'Carl Auer von Welsbach',935,'Makes welder\'s goggles dark green.',['Welder\'s safety goggles','Aircraft engine parts','Coloured glass']],
  [60,'Nd','Neodymium',144.2,9,7,'lanthanide','[Xe] 4f⁴ 6s²',1885,'Carl Auer von Welsbach',1024,'The world\'s strongest magnets!',['Fridge magnets (the really strong ones)','Headphones and earbuds','Wind turbines','Hard drives']],
  [61,'Pm','Promethium',145,9,8,'lanthanide','[Xe] 4f⁵ 6s²',1945,'Marinsky, Glendenin, Coryell',1042,'Glow-in-the-dark watch dials (older type).',['Old glow-in-the-dark watches','Atomic batteries','Research only — radioactive!']],
  [62,'Sm','Samarium',150.4,9,9,'lanthanide','[Xe] 4f⁶ 6s²',1879,'Lecoq de Boisbaudran',1072,'Magnets that work in really hot places.',['Headphone magnets','Guitar pickups','Cancer treatment']],
  [63,'Eu','Europium',152.0,9,10,'lanthanide','[Xe] 4f⁷ 6s²',1901,'Eugène-Anatole Demarçay',822,'Makes euro banknotes glow under UV light!',['Anti-counterfeit ink on euro notes','Red colour in TV screens','Energy-saving bulbs']],
  [64,'Gd','Gadolinium',157.3,9,11,'lanthanide','[Xe] 4f⁷ 5d¹ 6s²',1880,'Jean Charles de Marignac',1313,'Helps MRI machines take clearer pictures of your body.',['MRI scan dye at hospitals','Microwave ovens','Camera image sensors']],
  [65,'Tb','Terbium',158.9,9,12,'lanthanide','[Xe] 4f⁹ 6s²',1843,'Carl Gustaf Mosander',1359,'Makes green pixels in TV screens.',['Green colour in TV and phone screens','Submarine sonar','Energy-saving bulbs']],
  [66,'Dy','Dysprosium',162.5,9,13,'lanthanide','[Xe] 4f¹⁰ 6s²',1886,'Lecoq de Boisbaudran',1412,'In motors that spin electric cars.',['Tesla and EV motors','Wind turbines','Hard drive read heads']],
  [67,'Ho','Holmium',164.9,9,14,'lanthanide','[Xe] 4f¹¹ 6s²',1878,'Soret, Delafontaine & Cleve',1472,'Makes the strongest magnetic fields ever measured.',['Medical lasers','Nuclear reactor controls','Microwave equipment']],
  [68,'Er','Erbium',167.3,9,15,'lanthanide','[Xe] 4f¹² 6s²',1843,'Carl Gustaf Mosander',1529,'Boosts internet signals through fibre cables.',['Fibre-optic internet','Pink sunglasses tint','Some lasers for eye surgery']],
  [69,'Tm','Thulium',168.9,9,16,'lanthanide','[Xe] 4f¹³ 6s²',1879,'Per Teodor Cleve',1545,'Used in tiny portable X-ray machines.',['Portable X-ray machines','Some lasers','Currency anti-counterfeiting']],
  [70,'Yb','Ytterbium',173.0,9,17,'lanthanide','[Xe] 4f¹⁴ 6s²',1878,'Jean Charles de Marignac',819,'Makes some of the world\'s most accurate clocks!',['Atomic clocks (super precise)','Some lasers','Stress sensors']],
  [71,'Lu','Lutetium',175.0,9,18,'lanthanide','[Xe] 4f¹⁴ 5d¹ 6s²',1907,'Urbain, von Welsbach, James',1663,'Used in cancer treatments at hospitals.',['Cancer therapy at hospitals','PET scanners','Petroleum refining']],
  [72,'Hf','Hafnium',178.5,6,4,'transition','[Xe] 4f¹⁴ 5d² 6s²',1923,'Coster & von Hevesy',2233,'Inside the chips of your tablet and computer!',['Computer and phone chips','Nuclear submarine controls','Plasma cutting torches']],
  [73,'Ta','Tantalum',180.9,6,5,'transition','[Xe] 4f¹⁴ 5d³ 6s²',1802,'Anders Ekeberg',3017,'Inside almost every mobile phone!',['Phone capacitors (every smartphone!)','Hearing aids','Surgical bone implants']],
  [74,'W','Tungsten',183.8,6,6,'transition','[Xe] 4f¹⁴ 5d⁴ 6s²',1783,'Juan & Fausto Elhuyar',3422,'Highest melting point of any metal — bulb filaments!',['Old lightbulb filaments','Drill bits and saws','Darts (for steady throwing)','Mobile phone vibration motors']],
  [75,'Re','Rhenium',186.2,6,7,'transition','[Xe] 4f¹⁴ 5d⁵ 6s²',1925,'Noddack, Tacke & Berg',3186,'In jet engines that take you on holiday!',['Jet engine turbine blades','High-temperature alloys','Some catalysts']],
  [76,'Os','Osmium',190.2,6,8,'transition','[Xe] 4f¹⁴ 5d⁶ 6s²',1803,'Tennant & Wollaston',3033,'Densest natural metal — feels really heavy!',['Old fountain pen tips','Phonograph needles (vinyl records)','Some surgical implants']],
  [77,'Ir','Iridium',192.2,6,9,'transition','[Xe] 4f¹⁴ 5d⁷ 6s²',1803,'Smithson Tennant',2466,'A meteorite layer of iridium tells us what killed the dinosaurs!',['Spark plugs in cars','Fountain pen tips','Standard kilogram (old definition)']],
  [78,'Pt','Platinum',195.1,6,10,'transition','[Xe] 4f¹⁴ 5d⁹ 6s¹',1735,'Antonio de Ulloa',1768,'More valuable than gold! In wedding rings.',['Wedding rings','Catalytic converters in cars','Olympic platinum jubilee items']],
  [79,'Au','Gold',197.0,6,11,'transition','[Xe] 4f¹⁴ 5d¹⁰ 6s¹',-6000,'Known since ancient times',1064,'Doesn\'t rust or tarnish — stays shiny forever!',['Olympic gold medals','Rings, necklaces, jewelry','Inside phone connectors','Astronaut helmet visors']],
  [80,'Hg','Mercury',200.6,6,12,'transition','[Xe] 4f¹⁴ 5d¹⁰ 6s²',-2000,'Known since ancient times',-39,'A liquid metal! The only one at room temperature.',['Old thermometers','Old fluorescent lightbulbs','The planet named after it']],
  [81,'Tl','Thallium',204.4,6,13,'post','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',1861,'William Crookes',304,'Was used to kill rats — now strictly controlled!',['Old rat poison (banned now)','Some thermometers','Heart-imaging tracers']],
  [82,'Pb','Lead',207.2,6,14,'post','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',-7000,'Known since ancient times',327,'Heavy and toxic — once in old paint and pencils.',['Car batteries (lead-acid)','Stained-glass windows','X-ray aprons at the dentist','Fishing weights']],
  [83,'Bi','Bismuth',209.0,6,15,'post','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',1500,'Unknown alchemists',271,'Forms beautiful rainbow staircase crystals!',['Pepto-Bismol tummy medicine','Cosmetic shimmer','Replacement for lead in fishing weights']],
  [84,'Po','Polonium',209,6,16,'post','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',1898,'Marie & Pierre Curie',254,'Discovered by Marie Curie — extremely radioactive!',['Static eliminators','Heat sources for old satellites','Almost nothing safe!']],
  [85,'At','Astatine',210,6,17,'halogen','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',1940,'Corson, MacKenzie & Segrè',302,'The rarest naturally-occurring element — only a few grams in all of Earth!',['Cancer research','Not used in everyday life','Made in tiny amounts in labs']],
  [86,'Rn','Radon',222,6,18,'noble','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',1900,'Friedrich Ernst Dorn',-71,'A radioactive gas that seeps from rocks!',['Detected in basement air','Some old hot springs','Why houses get radon tested']],
  [87,'Fr','Francium',223,7,1,'alkali','[Rn] 7s¹',1939,'Marguerite Perey',27,'So rare that less than 30g exists on Earth at any time!',['Research only','Not enough exists to use','Half-life of just 22 minutes']],
  [88,'Ra','Radium',226,7,2,'alkaline','[Rn] 7s²',1898,'Marie & Pierre Curie',700,'Once in glow-in-the-dark watch dials — until people got sick!',['Old glow-in-the-dark watches (banned)','Once in toothpaste (yikes!)','Cancer treatment (carefully)']],
  [89,'Ac','Actinium',227,10,4,'actinide','[Rn] 6d¹ 7s²',1899,'André-Louis Debierne',1050,'Glows blue in the dark from radioactivity.',['Cancer treatment','Neutron sources','Research only']],
  [90,'Th','Thorium',232.0,10,5,'actinide','[Rn] 6d² 7s²',1828,'Jöns Jacob Berzelius',1750,'Could be a future nuclear fuel!',['Some old camping lantern mantles','Nuclear reactor research','Some optical lenses (older)']],
  [91,'Pa','Protactinium',231.0,10,6,'actinide','[Rn] 5f² 6d¹ 7s²',1913,'Fajans & Göhring',1568,'Super rare and radioactive — labs only.',['Scientific research only','Not used in everyday life','Very dangerous!']],
  [92,'U','Uranium',238.0,10,7,'actinide','[Rn] 5f³ 6d¹ 7s²',1789,'Martin Heinrich Klaproth',1135,'Powers nuclear power stations.',['Nuclear power plants','Old yellow-green Vaseline glass','Submarine power']],
  [93,'Np','Neptunium',237,10,8,'actinide','[Rn] 5f⁴ 6d¹ 7s²',1940,'McMillan & Abelson',644,'Named after planet Neptune. Made by humans.',['Smoke detector parts (some)','Neutron detectors','Research only']],
  [94,'Pu','Plutonium',244,10,9,'actinide','[Rn] 5f⁶ 7s²',1940,'Seaborg, McMillan, Kennedy & Wahl',640,'Powers spacecraft going to deep space — like Voyager!',['NASA Mars rovers (Curiosity, Perseverance)','Voyager spacecraft','Nuclear weapons (sadly)']],
  [95,'Am','Americium',243,10,10,'actinide','[Rn] 5f⁷ 7s²',1944,'Seaborg, James, Morgan & Ghiorso',1176,'Inside almost every smoke detector in your home!',['Smoke detectors (tiny amount)','Industrial gauges','Research only']],
  [96,'Cm','Curium',247,10,11,'actinide','[Rn] 5f⁷ 6d¹ 7s²',1944,'Seaborg, James & Ghiorso',1340,'Named after Marie Curie!',['Mars rover instruments','Pacemakers (older type)','Research only']],
  [97,'Bk','Berkelium',247,10,12,'actinide','[Rn] 5f⁹ 7s²',1949,'Thompson, Ghiorso & Seaborg',986,'Named after Berkeley, California where it was discovered.',['Research only','Used to make even heavier elements','Not in everyday life']],
  [98,'Cf','Californium',251,10,13,'actinide','[Rn] 5f¹⁰ 7s²',1950,'Thompson, Street, Ghiorso & Seaborg',900,'One gram costs $27 million — most expensive element!',['Cancer treatments','Neutron starter for nuclear reactors','Oil-well scanning']],
  [99,'Es','Einsteinium',252,10,14,'actinide','[Rn] 5f¹¹ 7s²',1952,'Ghiorso et al.',860,'Found in fallout from the first H-bomb test.',['Scientific research only','Not enough exists to use','Named after Einstein!']],
  [100,'Fm','Fermium',257,10,15,'actinide','[Rn] 5f¹² 7s²',1952,'Ghiorso et al.',1527,'Named after Enrico Fermi, nuclear pioneer.',['Research only','No commercial uses','Made in tiny amounts']],
  [101,'Md','Mendelevium',258,10,16,'actinide','[Rn] 5f¹³ 7s²',1955,'Ghiorso et al.',827,'Named after Mendeleev — the man who invented this table!',['Research only','Not in everyday life','Honors the table\'s inventor']],
  [102,'No','Nobelium',259,10,17,'actinide','[Rn] 5f¹⁴ 7s²',1966,'JINR / LBNL',827,'Named after Alfred Nobel of the Nobel Prize.',['Research only','Not in everyday life','Just a few atoms ever made']],
  [103,'Lr','Lawrencium',266,10,18,'actinide','[Rn] 5f¹⁴ 7s² 7p¹',1961,'Ghiorso et al.',1627,'Named after the inventor of the cyclotron.',['Research only','Lasts only minutes','Just a few atoms ever made']],
  [104,'Rf','Rutherfordium',267,7,4,'transition','[Rn] 5f¹⁴ 6d² 7s²',1964,'JINR / LBNL',2100,'Named after Ernest Rutherford. Made one atom at a time.',['Research only','Lasts about an hour','Made one atom at a time']],
  [105,'Db','Dubnium',268,7,5,'transition','[Rn] 5f¹⁴ 6d³ 7s²',1968,'JINR / LBNL',2017,'Named after Dubna, a Russian science town.',['Research only','Lasts seconds','Just a few atoms made']],
  [106,'Sg','Seaborgium',269,7,6,'transition','[Rn] 5f¹⁴ 6d⁴ 7s²',1974,'Ghiorso et al.',2480,'Named after living chemist Glenn Seaborg!',['Research only','Lasts seconds','Honors Glenn Seaborg']],
  [107,'Bh','Bohrium',270,7,7,'transition','[Rn] 5f¹⁴ 6d⁵ 7s²',1981,'GSI Darmstadt',2627,'Named after physicist Niels Bohr.',['Research only','Lasts seconds','Just a few atoms ever made']],
  [108,'Hs','Hassium',269,7,8,'transition','[Rn] 5f¹⁴ 6d⁶ 7s²',1984,'GSI Darmstadt',127,'Named after Hesse, a German state.',['Research only','Lasts seconds','Just a few atoms made']],
  [109,'Mt','Meitnerium',278,7,9,'unknown','[Rn] 5f¹⁴ 6d⁷ 7s² (predicted)',1982,'GSI Darmstadt',1227,'Named after Lise Meitner, who discovered fission.',['Research only','Lasts milliseconds','Honors Lise Meitner']],
  [110,'Ds','Darmstadtium',281,7,10,'unknown','[Rn] 5f¹⁴ 6d⁸ 7s² (predicted)',1994,'GSI Darmstadt',null,'Named after Darmstadt, Germany where it was made.',['Research only','Lasts milliseconds','Just a few atoms ever made']],
  [111,'Rg','Roentgenium',282,7,11,'unknown','[Rn] 5f¹⁴ 6d⁹ 7s² (predicted)',1994,'GSI Darmstadt',null,'Named after Wilhelm Röntgen, who discovered X-rays.',['Research only','Lasts seconds','Honors discoverer of X-rays']],
  [112,'Cn','Copernicium',285,7,12,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² (predicted)',1996,'GSI Darmstadt',null,'Named after astronomer Copernicus.',['Research only','Lasts seconds','Honors Nicolaus Copernicus']],
  [113,'Nh','Nihonium',286,7,13,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹ (predicted)',2003,'RIKEN, Japan',null,'First element discovered in Japan — "Nihon" means Japan!',['Research only','Lasts seconds','First element from Japan']],
  [114,'Fl','Flerovium',289,7,14,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p² (predicted)',1998,'JINR Dubna',null,'Named after Russian physicist Georgy Flyorov.',['Research only','Lasts seconds','Just a few atoms ever made']],
  [115,'Mc','Moscovium',290,7,15,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³ (predicted)',2003,'JINR / LLNL',null,'Named after Moscow.',['Research only','Lasts milliseconds','Honors Moscow region']],
  [116,'Lv','Livermorium',293,7,16,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴ (predicted)',2000,'JINR / LLNL',null,'Named after Lawrence Livermore lab.',['Research only','Lasts milliseconds','Honors LLNL lab']],
  [117,'Ts','Tennessine',294,7,17,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵ (predicted)',2010,'JINR / ORNL / Vanderbilt',null,'Named after Tennessee, USA.',['Research only','Lasts milliseconds','Just a few atoms ever made']],
  [118,'Og','Oganesson',294,7,18,'unknown','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶ (predicted)',2002,'JINR / LLNL',null,'Heaviest known element! Named after living scientist Yuri Oganessian.',['Research only','Lasts less than a millisecond','Heaviest element ever made']]
];

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const tableEl = document.getElementById('table');
const detailEl = document.getElementById('detail');
const filtersEl = document.getElementById('filters');
const legendEl = document.getElementById('legend');
const modesEl = document.getElementById('modes');
const searchEl = document.getElementById('search');
const quizEl = document.getElementById('quiz');

let displayMode = 'name';
let activeFilter = 'all';
let inQuiz = false;

function colorFor(cat) {
  const c = CATS[cat] || CATS.unknown;
  return { bg: isDark ? c.dark : c.light, fg: isDark ? c.dtext : c.text };
}

function formatYear(y) {
  if (y < 0) return Math.abs(y) + ' BC';
  if (y < 1500) return '~' + y + ' AD';
  return String(y);
}

function formatMelt(m) {
  if (m === null || m === undefined) return '?';
  return m + '°C';
}

function extraText(el, mode) {
  const config = el[7];
  const year = el[8];
  const melt = el[10];
  if (mode === 'name') return el[2];
  if (mode === 'config') {
    const m = config.match(/(\d[spdf][¹²³⁴⁵⁶⁷⁸⁹⁰]+)\s*(?:\(predicted\))?\s*$/);
    return m ? m[1] : config.split(' ').slice(-1)[0];
  }
  if (mode === 'year') return formatYear(year);
  if (mode === 'melt') return formatMelt(melt);
  return el[2];
}

function makeCell(el) {
  const [num, sym, name, mass, period, group, cat] = el;
  const { bg, fg } = colorFor(cat);
  const div = document.createElement('div');
  div.className = 'el';
  div.dataset.cat = cat;
  div.dataset.num = num;
  div.dataset.sym = sym.toLowerCase();
  div.dataset.name = name.toLowerCase();
  div.style.background = bg;
  div.style.color = fg;
  div.style.gridRow = period;
  div.style.gridColumn = group;
  div.addEventListener('click', () => {
    if (inQuiz) return;
    openElement(el, div);
  });
  renderCell(div, el);
  return div;
}

function renderCell(div, el) {
  const [num, sym] = el;
  div.innerHTML = '<div class="num">' + num + '</div><div class="sym">' + sym + '</div><div class="extra">' + extraText(el, displayMode) + '</div><div class="tick">⭐</div>';
}

function showDetail(el) {
  const [num, sym, name, mass, period, group, cat, config, year, disc, melt, fact, examples] = el;
  const { bg, fg } = colorFor(cat);
  const c = CATS[cat] || CATS.unknown;
  const found = (typeof discSet !== 'undefined') && discSet.has(num);
  detailEl.style.justifyContent = 'flex-start';
  detailEl.style.alignItems = 'flex-start';
  detailEl.style.color = isDark ? '#F3F1FB' : '#1B1633';

  const exIcons = ['🔹','🔸'];
  const exList = examples.map((e,i) => '<li style="margin:6px 0;list-style:none;">' + exIcons[i % 2] + ' ' + e + '</li>').join('');

  detailEl.innerHTML =
    '<div style="display:flex;gap:16px;width:100%;flex-wrap:wrap;align-items:flex-start;">' +
      '<div style="background:' + bg + ';color:' + fg + ';width:108px;height:108px;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;box-shadow:var(--shadow);position:relative;overflow:hidden;">' +
        '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.15;">' + svgIcon(iconKeyFor(el), fg, 88) + '</div>' +
        '<div style="position:absolute;top:6px;left:9px;font-size:12px;font-weight:800;opacity:.7;z-index:2;">' + num + '</div>' +
        '<div style="position:absolute;top:5px;right:8px;font-size:16px;z-index:2;">' + c.emoji + '</div>' +
        '<div style="font-size:40px;font-weight:900;line-height:1;position:relative;z-index:1;">' + sym + '</div>' +
        '<div style="font-size:11px;opacity:.75;margin-top:3px;font-weight:700;position:relative;z-index:1;">' + (typeof mass === 'number' ? mass.toFixed(2) : mass) + '</div>' +
      '</div>' +
      '<div style="flex:1;min-width:200px;">' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
          '<span style="font-size:22px;font-weight:900;">' + name + '</span>' +
          (found ? '<span class="disc-badge">⭐ Discovered</span>' : '') +
        '</div>' +
        '<div style="font-size:12px;color:var(--soft);margin:3px 0 10px;font-weight:700;">' + c.emoji + ' ' + c.name + ' · period ' + period + ' · group ' + (group > 18 ? '–' : group) + '</div>' +
        '<div class="fact-callout">💡 ' + fact + '</div>' +
      '</div>' +
      '<div style="flex-basis:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:4px;">' +
        '<div class="detail-card"><div style="font-size:11px;color:var(--soft);font-weight:700;margin-bottom:2px;">⚛️ Electrons</div><div style="font-size:12px;font-family:ui-monospace,Menlo,monospace;">' + config + '</div></div>' +
        '<div class="detail-card"><div style="font-size:11px;color:var(--soft);font-weight:700;margin-bottom:2px;">🔭 Discovered</div><div style="font-size:14px;font-weight:700;">' + formatYear(year) + '</div><div style="font-size:11px;color:var(--soft);">' + disc + '</div></div>' +
        '<div class="detail-card"><div style="font-size:11px;color:var(--soft);font-weight:700;margin-bottom:2px;">🌡️ Melts at</div><div style="font-size:14px;font-weight:700;">' + formatMelt(melt) + '</div></div>' +
      '</div>' +
      '<div class="learn-wrap detail-card" style="flex-basis:100%;">' +
        '<div class="learn-tabs">' +
          '<button class="learn-tab active" onclick="pkTab(this,0)">🔧 Uses</button>' +
          '<button class="learn-tab" onclick="pkTab(this,1)">📜 History</button>' +
          '<button class="learn-tab" onclick="pkTab(this,2)">🧪 How we get it</button>' +
        '</div>' +
        '<div class="learn-pane" style="display:block"><ul style="margin:0;padding-left:0;font-size:15px;line-height:1.4;">' + exList + '</ul></div>' +
        '<div class="learn-pane" style="display:none"><div class="learn-body">' + histFor(el) + '</div></div>' +
        '<div class="learn-pane" style="display:none"><div class="learn-body">' + procFor(el) + '</div></div>' +
      '</div>' +
    '</div>';
}

const cells = ELS.map(el => {
  const c = makeCell(el);
  tableEl.appendChild(c);
  return { el: el, node: c };
});

function addLabel(row, col, text, dashed) {
  const d = document.createElement('div');
  d.className = 'lbl';
  d.style.gridRow = row;
  d.style.gridColumn = col;
  d.textContent = text;
  if (!dashed) {
    d.style.borderStyle = 'solid';
    d.style.background = isDark ? '#444441' : '#F1EFE8';
    d.style.color = isDark ? '#F1EFE8' : '#2C2C2A';
  }
  tableEl.appendChild(d);
}
addLabel(9, 3, '57–71', true);
addLabel(10, 3, '89–103', true);
addLabel(6, 3, '*', false);
addLabel(7, 3, '**', false);

const modes = [
  { k: 'name', label: 'Names' },
  { k: 'config', label: 'Outer e⁻' },
  { k: 'year', label: 'Discovered' },
  { k: 'melt', label: 'Melting' },
  { k: 'quiz', label: '❓ Quiz' },
  { k: 'timed', label: '⏱️ Timed' },
  { k: 'compare', label: '⚖️ Compare' }
];
modes.forEach(m => {
  const btn = document.createElement('button');
  btn.className = 'm-btn' + (m.k === 'name' ? ' active' : '');
  btn.textContent = m.label;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.m-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (typeof stopTimed === 'function') stopTimed();
    const games = { quiz: startQuiz, timed: startTimed, compare: startCompare };
    if (games[m.k]) {
      inQuiz = true;
      quizEl.style.display = 'block';
      detailEl.style.display = 'none';
      games[m.k]();
    } else {
      inQuiz = false;
      quizEl.style.display = 'none';
      detailEl.style.display = 'flex';
      displayMode = m.k;
      cells.forEach(c => renderCell(c.node, c.el));
    }
  });
  modesEl.appendChild(btn);
});

const filterCats = ['all', 'alkali', 'alkaline', 'transition', 'post', 'metalloid', 'nonmetal', 'halogen', 'noble', 'lanthanide', 'actinide'];
filterCats.forEach(c => {
  const btn = document.createElement('button');
  btn.className = 'f-btn' + (c === 'all' ? ' active' : '');
  btn.textContent = c === 'all' ? 'All' : (CATS[c] ? CATS[c].name : c);
  btn.addEventListener('click', () => {
    activeFilter = c;
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.el').forEach(cell => {
      if (c === 'all' || cell.dataset.cat === c) cell.classList.remove('dim');
      else cell.classList.add('dim');
    });
  });
  filtersEl.appendChild(btn);
});

searchEl.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.el').forEach(cell => cell.classList.remove('match', 'dim'));
  if (!q) return;
  let firstMatch = null;
  document.querySelectorAll('.el').forEach(cell => {
    const matches = cell.dataset.sym === q || cell.dataset.name.includes(q) || cell.dataset.num === q;
    if (matches) {
      cell.classList.add('match');
      if (!firstMatch) firstMatch = cell;
    } else {
      cell.classList.add('dim');
    }
  });
  if (firstMatch && !inQuiz) {
    const num = parseInt(firstMatch.dataset.num);
    const el = ELS.find(e => e[0] === num);
    if (el) showDetail(el);
  }
});

Object.keys(CATS).filter(k => k !== 'unknown').forEach(k => {
  const span = document.createElement('span');
  span.className = 'lg-item';
  const dot = document.createElement('span');
  dot.className = 'lg-dot';
  dot.style.background = isDark ? CATS[k].dark : CATS[k].light;
  dot.style.border = '0.5px solid ' + (isDark ? CATS[k].dtext : CATS[k].text);
  span.appendChild(dot);
  span.appendChild(document.createTextNode(CATS[k].name));
  span.addEventListener('click', () => {
    const btn = Array.from(document.querySelectorAll('.f-btn')).find(b => b.textContent === CATS[k].name);
    if (btn) btn.click();
  });
  legendEl.appendChild(span);
});

// ============================ GAME ENGINE ============================
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function pickN(arr,n,exclude){ const pool=arr.filter(x=>!exclude||x[0]!==exclude[0]); const out=[]; while(out.length<n&&pool.length){ out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]); } return out; }

// ---- players / profiles (each kid has their own saved progress) ----
const P_KEY='pk-profiles-v1', C_KEY='pk-current-v1', SND_KEY='pk-sound-v1';
const AVATARS=['🦊','🐼','🐯','🦄','🐸','🐧','🦉','🐙','🐝','🦖','🐶','🐱','🦁','🐵','🐨','🐢','🐬','🦋','🌟','🚀','🤖','🦕','🐰','🦔'];
let profiles=loadProfiles();
let curId=localStorage.getItem(C_KEY)||null;
let soundOn=localStorage.getItem(SND_KEY)!=='0';
let S=null;             // current profile object (null until a kid is chosen)
let discSet=new Set();  // current profile's discovered set
function loadProfiles(){ try{ return JSON.parse(localStorage.getItem(P_KEY)||'[]'); }catch(e){ return []; } }
function saveProfiles(){ try{ localStorage.setItem(P_KEY,JSON.stringify(profiles)); }catch(e){} }
function curProfile(){ return profiles.find(p=>p.id===curId)||null; }
function loadCurrent(){ S=curProfile(); if(S){ S.badges=S.badges||[]; S.discovered=S.discovered||[]; discSet=new Set(S.discovered); } }
function saveState(){ if(!S) return; S.discovered=[...discSet]; saveProfiles(); }

// ---- xp / levels ----
function levelFromXp(xp){ let lvl=1,need=100; while(xp>=need){ xp-=need; lvl++; need=Math.round(need*1.35); } return {lvl,into:xp,need}; }
function addXp(n){ const before=levelFromXp(S.xp).lvl; S.xp+=n; const after=levelFromXp(S.xp).lvl; saveState(); renderHud(); renderLeaderboard(); if(after>before){ playSound('level'); confettiBurst(); toast('⭐','Level '+after+'!','You leveled up, explorer!'); mascot('star','Level '+after+'! You’re on fire 🚀'); checkBadges(); } }

// ---- discovery ----
function openElement(el,node){
  const num=el[0];
  if(!discSet.has(num)){
    discSet.add(num); node.classList.remove('undiscovered'); node.classList.add('found','pop');
    setTimeout(()=>node.classList.remove('pop'),460);
    saveState(); playSound('pop'); sparkleAt(node); addXp(10); checkBadges();
    mascot('wow', pick(['Whoa — new element! 🎉','Great find!','Added to your collection!','Cool one! 🔬']));
  }
  showDetail(el);
}
function paintDiscovered(){ cells.forEach(c=>{ c.node.classList.remove('found','undiscovered'); if(discSet.has(c.el[0])) c.node.classList.add('found'); else c.node.classList.add('undiscovered'); }); }

// ---- HUD ----
function renderHud(){
  const L=levelFromXp(S.xp);
  document.getElementById('lvl').textContent=L.lvl;
  document.getElementById('xpfill').style.width=Math.round(L.into/L.need*100)+'%';
  document.getElementById('xptext').textContent=S.xp+' XP · '+L.into+'/'+L.need+' to Lv '+(L.lvl+1);
  const d=discSet.size;
  document.getElementById('disctext').textContent=d+' / 118';
  document.getElementById('discfill').style.width=Math.round(d/118*100)+'%';
  document.getElementById('streaktext').textContent='🔥 Best quiz streak: '+S.bestStreak;
}

// ---- sound (Web Audio, generated — no files) ----
let actx=null;
function playSound(type){
  if(!soundOn) return;
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended') actx.resume();
    const seqs={pop:[[660,0,.08]],correct:[[660,0,.09],[880,.08,.13]],wrong:[[196,0,.16],[165,.12,.16]],
                level:[[523,0,.1],[659,.1,.1],[784,.2,.1],[1047,.3,.2]],badge:[[784,0,.1],[988,.1,.1],[1319,.2,.18]]};
    (seqs[type]||seqs.pop).forEach(([f,t,d])=>tone(f,t,d));
  }catch(e){}
}
function tone(freq,delay,dur){ const o=actx.createOscillator(),g=actx.createGain(); o.type='triangle'; o.frequency.value=freq; o.connect(g); g.connect(actx.destination); const t=actx.currentTime+delay; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.16,t+.012); g.gain.exponentialRampToValueAtTime(.0008,t+dur); o.start(t); o.stop(t+dur+.03); }

// ---- confetti ----
const cvs=document.getElementById('confetti'),cx=cvs.getContext('2d'); let parts=[],raf=null;
function sizeCvs(){ cvs.width=innerWidth*devicePixelRatio; cvs.height=innerHeight*devicePixelRatio; cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
addEventListener('resize',sizeCvs); sizeCvs();
const COLS=['#5B2FE0','#9B5DE5','#FFC23C','#2BB673','#EF5366','#3BA7FF'];
function spawn(x,y,n,power){ for(let i=0;i<n;i++){ parts.push({x,y,vx:(Math.random()-.5)*power,vy:Math.random()*-power-2,g:.32,r:Math.random()*6+3,c:COLS[(Math.random()*COLS.length)|0],rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:90}); } if(!raf) raf=requestAnimationFrame(tickCon); }
function confettiBurst(x,y){ spawn(x==null?innerWidth/2:x, y==null?innerHeight*0.32:y, 96, 11); }
function sparkleAt(node){ const r=node.getBoundingClientRect(); spawn(r.left+r.width/2, r.top+r.height/2, 16, 7); }
function tickCon(){ cx.clearRect(0,0,innerWidth,innerHeight); parts.forEach(p=>{ p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.life--; cx.save(); cx.translate(p.x,p.y); cx.rotate(p.rot); cx.fillStyle=p.c; cx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6); cx.restore(); }); parts=parts.filter(p=>p.life>0&&p.y<innerHeight+50); if(parts.length) raf=requestAnimationFrame(tickCon); else { cx.clearRect(0,0,innerWidth,innerHeight); raf=null; } }

// ---- toast ----
let toastT=null;
function toast(emoji,title,sub){ const t=document.getElementById('toast'); t.innerHTML='<span class="t-emoji">'+emoji+'</span><div><div>'+title+'</div>'+(sub?'<div class="t-sub">'+sub+'</div>':'')+'</div>'; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }

// ---- badges ----
function catAll(cat){ const a=ELS.filter(e=>e[6]===cat); return a.length>0 && a.every(e=>discSet.has(e[0])); }
const BADGES=[
  {id:'first',emoji:'🌱',name:'First Find',desc:'Discover 1 element',test:()=>discSet.size>=1},
  {id:'ten',emoji:'🔟',name:'Getting Curious',desc:'Discover 10 elements',test:()=>discSet.size>=10},
  {id:'fifty',emoji:'🚀',name:'Element Hunter',desc:'Discover 50 elements',test:()=>discSet.size>=50},
  {id:'all',emoji:'🏆',name:'Element Master',desc:'Discover all 118!',test:()=>discSet.size>=118},
  {id:'noble',emoji:'🎈',name:'Noble Crew',desc:'Find every noble gas',test:()=>catAll('noble')},
  {id:'halo',emoji:'🧴',name:'Halogen Hero',desc:'Find every halogen',test:()=>catAll('halogen')},
  {id:'streak5',emoji:'🔥',name:'On Fire',desc:'Quiz streak of 5',test:()=>S.bestStreak>=5},
  {id:'streak10',emoji:'⚡',name:'Quiz Wizard',desc:'Quiz streak of 10',test:()=>S.bestStreak>=10},
  {id:'lvl5',emoji:'⭐',name:'Star Explorer',desc:'Reach level 5',test:()=>levelFromXp(S.xp).lvl>=5},
  {id:'blitz',emoji:'⏱️',name:'Blitz Champ',desc:'Score 10+ in Timed mode',test:()=>!!(S&&S.bestTimed>=10)}
];
function checkBadges(){ if(!S) return; let changed=false; BADGES.forEach(b=>{ if(!S.badges.includes(b.id) && b.test()){ S.badges.push(b.id); changed=true; playSound('badge'); confettiBurst(); toast(b.emoji,'Badge unlocked!',b.name); mascot('wow','New badge: '+b.name+'! '+b.emoji); } }); if(changed){ saveState(); renderBadges(); renderLeaderboard(); } }
function renderBadges(){ document.getElementById('badge-grid').innerHTML=BADGES.map(b=>{ const got=S.badges.includes(b.id); return '<div class="badge'+(got?'':' locked')+'"><span class="b-emoji">'+(got?b.emoji:'🔒')+'</span><div><div class="b-name">'+b.name+'</div><div class="b-desc">'+b.desc+'</div></div></div>'; }).join(''); }

// ---- element of the day ----
function elementOfDay(){ const idx=Math.floor(Date.now()/864e5)%ELS.length; const el=ELS[idx]; const box=document.getElementById('eotd'); box.innerHTML='<div class="ed-sym">'+el[1]+'</div><div><div class="ed-k">✨ Element of the day</div><div class="ed-n">'+el[2]+'</div><div class="ed-f">'+el[11]+'</div></div>'; box.onclick=()=>{ const c=cells.find(c=>c.el[0]===el[0]); openElement(el,c.node); c.node.scrollIntoView({block:'center',behavior:'smooth'}); }; }

// ---- buttons ----
const soundBtn=document.getElementById('sound-btn');
soundBtn.textContent=soundOn?'🔊':'🔇';
soundBtn.addEventListener('click',()=>{ soundOn=!soundOn; try{localStorage.setItem(SND_KEY,soundOn?'1':'0');}catch(e){} soundBtn.textContent=soundOn?'🔊':'🔇'; if(soundOn) playSound('pop'); });
const badgesDrawer=document.getElementById('badges');
document.getElementById('badges-btn').addEventListener('click',()=>{ const open=badgesDrawer.style.display==='block'; badgesDrawer.style.display=open?'none':'block'; if(!open) badgesDrawer.scrollIntoView({behavior:'smooth',block:'nearest'}); });

// ---- progressive streak quiz ----
let qStreak=0,qScore=0,qTotal=0,qAnswered=false;
function curDiff(){ return qStreak>=7?3:(qStreak>=3?2:1); }
const Q={
  1:[
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=20)); const w=pickN(ELS.filter(e=>e[0]<=20),3,a); return {q:'Which element has the symbol "'+a[1]+'"?',opts:[a,...w].map(e=>({t:e[2],ok:e[0]===a[0]})),why:a[1]+' is '+a[2]+'.'}; },
    ()=>{ const a=pick(ELS.filter(e=>e[12]&&e[12].length&&e[0]<=20)); const ex=pick(a[12]); const w=pickN(ELS.filter(e=>e[0]<=20),3,a); return {q:'Which element is in: "'+ex+'"?',opts:[a,...w].map(e=>({t:e[2]+' ('+e[1]+')',ok:e[0]===a[0]})),why:'It\'s '+a[2]+'!'}; }
  ],
  2:[
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=36)); const w=pickN(ELS.filter(e=>e[0]<=36),3,a); return {q:'What is the atomic number of '+a[2]+'?',opts:[a,...w].map(e=>({t:String(e[0]),ok:e[0]===a[0]})),why:a[2]+' is number '+a[0]+'.'}; },
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=54&&e[6]!=='unknown')); const cats=['alkali','alkaline','transition','post','metalloid','nonmetal','halogen','noble']; const wc=cats.filter(c=>c!==a[6]).sort(()=>Math.random()-.5).slice(0,3); return {q:'What kind of element is '+a[2]+'?',opts:[a[6],...wc].map(c=>({t:CATS[c].emoji+' '+CATS[c].name,ok:c===a[6]})),why:a[2]+' is a '+CATS[a[6]].name+'.'}; },
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=54)); const w=pickN(ELS.filter(e=>e[0]<=54),3,a); return {q:'Which symbol means "'+a[2]+'"?',opts:[a,...w].map(e=>({t:e[1],ok:e[0]===a[0]})),why:a[2]+'’s symbol is '+a[1]+'.'}; }
  ],
  3:[
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=86&&e[12]&&e[12].length)); const ex=pick(a[12]); const w=pickN(ELS.filter(e=>e[0]<=86),3,a); return {q:'Tricky! Which element is in: "'+ex+'"?',opts:[a,...w].map(e=>({t:e[2]+' ('+e[1]+')',ok:e[0]===a[0]})),why:'It\'s '+a[2]+'.'}; },
    ()=>{ const four=pickN(ELS.filter(e=>e[0]<=83),4); const heavy=four.slice().sort((x,y)=>y[3]-x[3])[0]; return {q:'Which of these is the heaviest atom?',opts:four.map(e=>({t:e[2],ok:e[0]===heavy[0]})),why:heavy[2]+' is heaviest.'}; },
    ()=>{ const a=pick(ELS.filter(e=>e[0]<=86)); const w=pickN(ELS.filter(e=>e[0]<=86),3,a); return {q:'Who first described '+a[2]+'?',opts:[a,...w].map(e=>({t:e[9],ok:e[0]===a[0]})),why:a[2]+': '+a[9]+'.'}; }
  ]
};
function startQuiz(){ qStreak=0; qScore=0; qTotal=0; nextQuestion(); }
function nextQuestion(){ qAnswered=false; const d=curDiff(); const data=pick(Q[d])(); const opts=[...data.opts].sort(()=>Math.random()-.5); renderQuiz(data,opts,d); }
function renderQuiz(data,opts,d){
  const dl=['','Easy','Medium','Hard'][d];
  const flames='🔥'.repeat(Math.min(qStreak,5));
  quizEl.innerHTML=
    '<div class="q-head"><span class="q-prog">Q'+(qTotal+1)+' · Score '+qScore+'/'+qTotal+'</span><span class="q-diff">'+dl+'</span><span class="q-streak">'+(qStreak>0?flames+' '+qStreak:'')+'</span></div>'+
    '<div class="q-text">'+data.q+'</div>'+
    '<div>'+opts.map((o,i)=>'<button class="q-opt" data-i="'+i+'" data-ok="'+o.ok+'">'+o.t+'</button>').join('')+'</div>'+
    '<div class="q-feedback" id="q-fb"></div>'+
    '<button class="q-next" id="q-next" style="display:none;">Next question →</button>';
  quizEl.querySelectorAll('.q-opt').forEach(btn=>btn.addEventListener('click',()=>answer(btn,data)));
  quizEl.querySelector('#q-next').addEventListener('click',nextQuestion);
}
function answer(btn,data){
  if(qAnswered) return; qAnswered=true;
  const ok=btn.dataset.ok==='true'; qTotal++;
  const fb=document.getElementById('q-fb');
  quizEl.querySelectorAll('.q-opt').forEach(b=>{ b.disabled=true; if(b.dataset.ok==='true') b.classList.add('correct'); else if(b===btn&&!ok) b.classList.add('wrong'); });
  if(ok){
    qScore++; qStreak++;
    if(qStreak>S.bestStreak) S.bestStreak=qStreak;
    const gain=6+curDiff()*2+Math.min(qStreak,10);
    const cheers=['Correct! 🎉','Nice one! 🌟','You got it! 💪','Brilliant! ✨','Boom! 🚀'];
    fb.textContent=pick(cheers)+' +'+gain+' XP'+(qStreak>=3?'  ·  '+qStreak+' in a row!':'');
    fb.className='q-feedback good';
    playSound('correct');
    if(qStreak>=3) confettiBurst(); else { const r=btn.getBoundingClientRect(); spawn(r.left+r.width/2,r.top,18,7); }
    addXp(gain); checkBadges();
    mascot(qStreak>=3?'star':'happy', qStreak>=3?('🔥 '+qStreak+' in a row! Amazing!'):pick(['Yes! 🎉','You’re a star! 🌟','Spot on! 💪']));
  } else {
    qStreak=0;
    fb.textContent='Oops! '+data.why;
    fb.className='q-feedback bad';
    playSound('wrong'); saveState(); renderHud();
    mascot('think','Good try! '+data.why);
  }
  document.getElementById('q-next').style.display='block';
}

// ---- learn: curated history + extraction lore (accurate; fallback by family) ----
const LORE={
 H:{h:"In 1766 Henry Cavendish collected the ‘inflammable air’ that fizzes off metal in acid, and showed it makes water when it burns.",p:"Made by splitting water with electricity (electrolysis), or stripped from natural gas."},
 He:{h:"First spotted in 1868 as a mystery yellow line in sunlight during an eclipse — found in the Sun before it was found on Earth!",p:"Pumped from underground natural-gas wells, then chilled until everything else turns to liquid."},
 C:{h:"Known since ancient campfires as soot and charcoal; later, diamond and graphite were shown to be the very same element.",p:"Mined as graphite and coal; diamonds form deep underground under huge pressure — and are now grown in labs too."},
 N:{h:"Daniel Rutherford bottled ‘noxious air’ in 1772 — the part of air that won’t let a candle keep burning.",p:"Air is cooled to a liquid, then the nitrogen is boiled off first (fractional distillation)."},
 O:{h:"Joseph Priestley (1774) heated a red powder of mercury and found a gas that made flames roar and mice frisky.",p:"Separated from liquid air by its boiling point, just like nitrogen."},
 F:{h:"So fierce that several chemists were poisoned trying to capture it; Henri Moissan finally won in 1886.",p:"Pulled from a fluoride compound using electricity — very carefully!"},
 Na:{h:"Humphry Davy used a powerful battery in 1807 to pull sodium out of melted salt — a brand-new way to find elements.",p:"Made by electrolysis of molten salt (sodium chloride)."},
 Si:{h:"Berzelius isolated it in 1824; centuries later it became the heart of every computer chip.",p:"Sand is heated with carbon, then refined until it is 99.9999999% pure for chips."},
 P:{h:"Hennig Brand discovered it in 1669 by boiling down buckets of urine hunting for gold — and got a glowing solid instead!",p:"Heated out of phosphate rock in a fierce electric furnace."},
 S:{h:"Burned in temples since ancient times — the ‘brimstone’ of old stories.",p:"Pumped from underground deposits, or captured while cleaning oil and gas."},
 Cl:{h:"Carl Scheele made the choking green gas in 1774; it later cleaned drinking water and saved millions of lives.",p:"Made by passing electricity through salty water (brine)."},
 K:{h:"The very first metal Davy freed with electricity, in 1807.",p:"Made by electrolysis of its molten compounds."},
 Ca:{h:"Davy isolated it in 1808; it builds your bones and teeth.",p:"Made by electrolysis of melted calcium chloride."},
 Ti:{h:"Found in 1791 in black sand by a curious clergyman, William Gregor.",p:"The Kroll process turns its ore into a pure titanium ‘sponge’."},
 Fe:{h:"People have smelted iron for over 3,000 years — a whole age of history is named after it.",p:"Iron ore is heated with carbon in a towering blast furnace until liquid iron pours out."},
 Cu:{h:"One of the first metals humans ever used; mixing it with tin began the Bronze Age.",p:"Roasted and smelted from ores, then purified using electricity."},
 Ag:{h:"Shaped into coins, cups and mirrors for thousands of years.",p:"Mostly collected as a by-product while mining copper, lead and zinc."},
 Sn:{h:"Half of bronze — worked for more than 5,000 years.",p:"Smelted from the ore cassiterite."},
 I:{h:"Discovered by accident in 1811 from the ash of burnt seaweed.",p:"Drawn from brine or seaweed, then purified into shiny purple crystals."},
 W:{h:"The Elhuyar brothers isolated it in 1783; the name means ‘heavy stone’.",p:"Reduced from its ore to a powder, then pressed and heated into hard metal."},
 Al:{h:"Once more precious than gold — Napoleon III served his best guests on aluminium plates! Cheap extraction arrived in the 1880s.",p:"Electrolysis of aluminium oxide (the Hall–Héroult process) using huge amounts of electricity."},
 Pt:{h:"South American peoples used it long before Europeans, who first dismissed it as ‘unripe silver’.",p:"Mined with other precious metals, then separated by careful chemistry."},
 Au:{h:"Treasured for over 6,000 years; alchemists spent lifetimes (and failed) trying to make it.",p:"Panned or dug from rock and rivers — so unreactive it turns up as pure nuggets."},
 Hg:{h:"Found in Egyptian tombs; the only metal that is liquid at room temperature.",p:"Roasting the red mineral cinnabar releases mercury vapour, which is cooled back to liquid."},
 Pb:{h:"Romans plumbed whole cities with it — we now know it is toxic.",p:"Smelted from the mineral galena."},
 Ne:{h:"Ramsay and Travers found it in 1898; its name is Greek for ‘new’.",p:"Separated from liquid air by boiling point — it glows orange-red in tubes."},
 U:{h:"Klaproth found it in 1789 and named it after the new planet Uranus; its radioactivity came to light a century later.",p:"Mined as ore, concentrated into ‘yellowcake’, then enriched."},
 Po:{h:"Marie and Pierre Curie discovered it in 1898 and named it after Marie’s homeland, Poland.",p:"Teased in tiny amounts from tonnes of uranium ore (pitchblende)."},
 Ra:{h:"The Curies discovered radium in 1898; Marie earned two Nobel Prizes for this work.",p:"Extracted in tiny traces from huge amounts of pitchblende ore."},
 Tc:{h:"The first element ever MADE by people, in 1937 — its name means ‘artificial’.",p:"Created inside nuclear reactors and particle accelerators."},
 Pu:{h:"Made by Glenn Seaborg’s team in 1940; today it powers spacecraft far from the Sun.",p:"‘Bred’ from uranium inside nuclear reactors."},
 Og:{h:"Made just a few atoms at a time in 2002, vanishing in less than a blink — the heaviest element known.",p:"Smashed together from lighter atoms in a particle accelerator; it decays almost instantly."}
};
const PROC={
 alkali:"So reactive it is never found pure — scientists split it from its compounds using electricity (electrolysis).",
 alkaline:"Freed from its minerals using electricity, or by heating with a more reactive metal.",
 transition:"Dug up as ore, heated in a furnace (smelting), and often purified with electricity.",
 post:"Smelted from ores, then refined to high purity.",
 metalloid:"Purified from minerals into ultra-pure crystals — perfect for electronics.",
 nonmetal:"Separated from air, water, or minerals by cooling or chemical reactions.",
 halogen:"Freed from its salts using electricity or strong chemicals.",
 noble:"Air is chilled until it turns to liquid, then the gases are separated by their boiling points.",
 lanthanide:"Separated from rare minerals through many careful chemical steps.",
 actinide:"The natural ones are refined from ore; the heaviest are built atom-by-atom in particle accelerators.",
 unknown:"Made one atom at a time in a particle accelerator — it vanishes almost instantly."
};
function procFor(el){ const L=LORE[el[1]]; return (L&&L.p)?L.p:(PROC[el[6]]||PROC.unknown); }
function histFor(el){ const L=LORE[el[1]]; return (L&&L.h)?L.h:(el[11]+' Discovered in '+formatYear(el[8])+' by '+el[9]+'.'); }
function pkTab(btn,i){ const root=btn.closest('.learn-wrap'); root.querySelectorAll('.learn-tab').forEach((b,j)=>b.classList.toggle('active',j===i)); root.querySelectorAll('.learn-pane').forEach((p,j)=>p.style.display=(j===i?'block':'none')); }

// ---- mascot "Atomi" ----
function mascot(mood,text){ const m=document.getElementById('mascot'); if(!m) return; const f=document.getElementById('mascot-face'),b=document.getElementById('mascot-bubble'); const faces={idle:'🤓',happy:'🥳',wow:'🤩',think:'🤔',sad:'😟',star:'🌟'}; f.textContent=faces[mood]||'🤓'; b.textContent=text; m.classList.add('show'); if(mood==='happy'||mood==='wow'||mood==='star'){ m.classList.remove('cheer'); void m.offsetWidth; m.classList.add('cheer'); } clearTimeout(mascot._t); mascot._t=setTimeout(()=>m.classList.remove('show'),3400); }

// ---- player chip + leaderboard ----
function renderPlayerChip(){ if(!S) return; document.getElementById('chip-av').textContent=S.avatar; document.getElementById('chip-name').textContent=S.name; }
function renderLeaderboard(){ const list=document.getElementById('lb-list'); if(!list) return; const sorted=[...profiles].sort((a,b)=>(b.xp-a.xp)||((b.discovered?b.discovered.length:0)-(a.discovered?a.discovered.length:0))); const medals=['👑','🥈','🥉']; list.innerHTML = sorted.length ? sorted.map((p,i)=>{ const L=levelFromXp(p.xp); const me=p.id===curId; return '<div class="lb-row'+(me?' me':'')+'"><div class="lb-rank">'+(medals[i]||('#'+(i+1)))+'</div><div class="lb-av">'+p.avatar+'</div><div class="lb-name">'+p.name+(me?' (you)':'')+'</div><div class="lb-stat">Lv '+L.lvl+' · '+p.xp+' XP<br>'+(p.discovered?p.discovered.length:0)+'/118 · '+(p.badges?p.badges.length:0)+'🏅</div></div>'; }).join('') : '<p style="color:var(--soft);font-weight:600;">No explorers yet — tap your name to add one!</p>'; }

// ---- profile picker (who is playing) ----
let pickerNewAvatar=AVATARS[0];
function showPicker(forceCreate){ renderPickerCard(forceCreate); document.getElementById('picker').classList.add('show'); }
function hidePicker(){ document.getElementById('picker').classList.remove('show'); }
function renderPickerCard(forceCreate){
  const card=document.getElementById('picker-card'); let html='';
  if(profiles.length && !forceCreate){
    html+='<h2>Who’s playing? 👋</h2><p>Pick your explorer, or add a new one.</p>';
    html+=profiles.map(p=>{ const L=levelFromXp(p.xp); return '<div class="pl-row" onclick="switchProfile(\''+p.id+'\')"><span class="pa">'+p.avatar+'</span><div class="meta"><div class="pn">'+p.name+'</div><div class="sub">Lv '+L.lvl+' · '+p.xp+' XP · '+(p.discovered?p.discovered.length:0)+'/118</div></div><button class="pl-del" title="Remove" onclick="event.stopPropagation();deleteProfile(\''+p.id+'\')">🗑️</button></div>'; }).join('');
    html+='<button class="btn-ghost" onclick="showPicker(true)">➕ New explorer</button>';
  } else {
    html+='<h2>New explorer! 🚀</h2><p>Type your name and pick a buddy.</p>';
    html+='<input id="name-input" maxlength="14" placeholder="Your name" />';
    html+='<div class="av-grid">'+AVATARS.map(a=>'<button class="av-opt'+(a===pickerNewAvatar?' sel':'')+'" onclick="selAvatar(this,\''+a+'\')">'+a+'</button>').join('')+'</div>';
    html+='<button class="btn-primary" onclick="createProfile()">Start exploring!</button>';
    if(profiles.length) html+='<button class="btn-ghost" onclick="showPicker(false)">← Back</button>';
  }
  card.innerHTML=html; const ni=document.getElementById('name-input'); if(ni) setTimeout(()=>{try{ni.focus();}catch(e){}},60);
}
function selAvatar(btn,a){ pickerNewAvatar=a; btn.closest('.av-grid').querySelectorAll('.av-opt').forEach(b=>b.classList.remove('sel')); btn.classList.add('sel'); }
function createProfile(){ const v=document.getElementById('name-input'); const name=((v&&v.value)||'').trim().slice(0,14)||'Explorer'; const p={id:'p'+Date.now()+'_'+Math.floor(Math.random()*999),name:name,avatar:pickerNewAvatar,xp:0,discovered:[],badges:[],bestStreak:0}; profiles.push(p); saveProfiles(); curId=p.id; try{localStorage.setItem(C_KEY,curId);}catch(e){} pickerNewAvatar=AVATARS[0]; applyProfile(); mascot('happy','Welcome, '+p.name+'! Tap an element to begin 🔬'); }
function switchProfile(id){ curId=id; try{localStorage.setItem(C_KEY,curId);}catch(e){} applyProfile(); const p=curProfile(); if(p) mascot('idle','Welcome back, '+p.name+'! 👋'); }
function deleteProfile(id){ profiles=profiles.filter(p=>p.id!==id); saveProfiles(); if(curId===id){ curId=null; try{localStorage.removeItem(C_KEY);}catch(e){} } renderLeaderboard(); showPicker(profiles.length===0); }

function applyProfile(){ loadCurrent(); if(!S) return; paintDiscovered(); renderHud(); renderBadges(); renderLeaderboard(); renderPlayerChip(); hidePicker(); checkBadges(); }

// ---- wiring + boot ----
document.getElementById('player-chip').addEventListener('click',()=>showPicker(false));
const lbDrawer=document.getElementById('leaderboard');
document.getElementById('lb-btn').addEventListener('click',()=>{ renderLeaderboard(); const open=lbDrawer.style.display==='block'; lbDrawer.style.display=open?'none':'block'; if(!open) lbDrawer.scrollIntoView({behavior:'smooth',block:'nearest'}); });

elementOfDay();
loadCurrent();
if(!S){ showPicker(profiles.length===0); } else { applyProfile(); mascot('idle','Welcome back, '+S.name+'! 👋'); }

// ============================ SVG MINI-ILLUSTRATIONS ============================
const ICONS={
 drop:'<path d="M12 3C8 9 5 12.5 5 16a7 7 0 0 0 14 0c0-3.5-3-7-7-13z"/>',
 balloon:'<ellipse cx="12" cy="9" rx="6" ry="7"/><path d="M11 15.5h2l1 5.5h-4z"/>',
 flame:'<path d="M12 2c3.2 4 5 6.5 5 9.5A5 5 0 0 1 7 11.5c0-1.2.5-2.3 1.2-3.3.5 2.3 2.3 2.3 2.3 0 0-2.2.8-4.2 1.5-6.2z"/>',
 battery:'<rect x="3" y="8" width="16" height="9" rx="2.5"/><rect x="19" y="10.5" width="2.5" height="4" rx="1"/><path d="M12 9l-3 4.5h2.2L10 18l4.5-5.5h-2.4L13 9z" fill="#fff"/>',
 diamond:'<path d="M5 9l3-5h8l3 5-7 12z"/><path d="M5 9h14M9 4l3 5 3-5M12 9v12" stroke="#fff" stroke-width="1" opacity=".4" fill="none"/>',
 magnet:'<path d="M6 3v9a6 6 0 0 0 12 0V3h-4.2v9a1.8 1.8 0 0 1-3.6 0V3z"/><rect x="13.8" y="3" width="4.2" height="3" fill="#fff" opacity=".55"/>',
 bulb:'<circle cx="12" cy="9" r="6"/><rect x="9.3" y="14.5" width="5.4" height="3.5" rx="1"/><rect x="10" y="18.5" width="4" height="2.2" rx="1"/>',
 coin:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5.2" fill="#fff" opacity=".35"/>',
 ingot:'<path d="M4 10h16l-2.2 6H6.2z"/>',
 chip:'<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1.4" fill="#fff" opacity=".45"/>',
 gas:'<circle cx="9" cy="13" r="3.2"/><circle cx="15.2" cy="10" r="2.4"/><circle cx="14" cy="16.5" r="1.8"/>',
 crystal:'<path d="M12 2l4.5 6-2.3 14h-4.4L7.5 8z"/><path d="M7.5 8h9M12 2v20" stroke="#fff" stroke-width="1" opacity=".35" fill="none"/>',
 radioactive:'<circle cx="12" cy="12" r="2.6"/><path d="M12 12 7 3.3a10 10 0 0 1 10 0z"/><path d="M12 12 21.5 14.5a10 10 0 0 1-5 8.2z"/><path d="M12 12 7.5 22.7a10 10 0 0 1-5-8.2z"/>',
 rocket:'<path d="M12 2c3.2 2.6 4.4 6.2 4.4 9.6L12 15.6 7.6 11.6C7.6 8.2 8.8 4.6 12 2z"/><path d="M7.6 12.4 4.5 17l4.3-1.2zM16.4 12.4 19.5 17l-4.3-1.2z"/><circle cx="12" cy="9.2" r="1.7" fill="#fff" opacity=".55"/>',
 tooth:'<path d="M7 3C5 3 4 5.2 4 8.2c0 4 1.2 9 2.4 11 .8 1.4 2 .7 2.1-1l.6-3.2c.25-1.3 1.6-1.3 1.85 0l.6 3.2c.1 1.7 1.3 2.4 2.1 1 1.2-2 2.4-7 2.4-11C16 5.2 15 3 13 3c-1.6 0-2.4 1-3 1s-1.4-1-3-1z"/>',
 salt:'<path d="M8 9h8l-1.1 11h-5.8z"/><rect x="7.6" y="5.6" width="8.8" height="3.6" rx="1.8"/><circle cx="11" cy="3.8" r=".7"/><circle cx="13" cy="3.8" r=".7"/><circle cx="12" cy="2.8" r=".7"/>',
 leaf:'<path d="M5 19C4 11 9.5 5 19 5c.3 9.5-5.5 15-14 14z"/>',
 star:'<path d="M12 2l2.7 6.3 6.8.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.1 1.6-6.7-5.2-4.5 6.8-.6z"/>',
 atom:'<circle cx="12" cy="12" r="3"/><circle cx="3.2" cy="12" r="1.7"/><circle cx="18.4" cy="7.5" r="1.7"/><circle cx="17" cy="18" r="1.7"/>'
};
const CATICON={alkali:'battery',alkaline:'flame',transition:'ingot',post:'ingot',metalloid:'chip',nonmetal:'gas',halogen:'drop',noble:'balloon',lanthanide:'crystal',actinide:'radioactive',unknown:'atom'};
const ICON_KEY={H:'drop',He:'balloon',Li:'battery',B:'crystal',C:'diamond',N:'gas',O:'gas',F:'tooth',Ne:'bulb',Na:'salt',Mg:'flame',Al:'ingot',Si:'chip',P:'flame',S:'flame',Cl:'salt',Ar:'bulb',K:'leaf',Ca:'tooth',Ti:'rocket',Fe:'magnet',Co:'magnet',Ni:'coin',Cu:'coin',Zn:'ingot',Ga:'bulb',Ge:'chip',Se:'chip',Br:'drop',Kr:'bulb',Ag:'coin',Sn:'ingot',Sb:'flame',Te:'chip',I:'tooth',Xe:'bulb',Nd:'magnet',Sm:'magnet',Eu:'bulb',Tb:'bulb',W:'bulb',Pt:'coin',Au:'coin',Hg:'drop',Pb:'ingot',Po:'radioactive',Rn:'radioactive',Ra:'radioactive',Ac:'radioactive',Th:'radioactive',U:'radioactive',Np:'radioactive',Pu:'rocket',Am:'bulb',Tc:'radioactive',Og:'atom'};
function iconKeyFor(el){ return ICON_KEY[el[1]] || CATICON[el[6]] || 'atom'; }
function svgIcon(key,color,px){ return '<svg viewBox="0 0 24 24" width="'+px+'" height="'+px+'" fill="'+color+'" style="color:'+color+'" aria-hidden="true">'+(ICONS[key]||ICONS.atom)+'</svg>'; }

// ============================ TIMED CHALLENGE (60s) ============================
let timedTimer=null, timedLeft=0, timedScore=0, timedAnswered=false;
function stopTimed(){ if(timedTimer){ clearInterval(timedTimer); timedTimer=null; } }
function startTimed(){ stopTimed(); timedScore=0; timedLeft=60; const best=(S&&S.bestTimed)||0;
  quizEl.innerHTML='<div style="text-align:center;padding:8px 0;"><div style="font-size:44px;">⏱️</div><div class="q-text" style="margin:6px 0 4px;">60-Second Blitz!</div><div style="color:var(--soft);font-weight:700;margin-bottom:14px;">Answer as many as you can before time runs out!'+(best?'<br>Your best: '+best+' 🏅':'')+'</div><button class="q-next" id="timed-start" style="max-width:240px;margin:0 auto;">Start! 🚀</button></div>';
  quizEl.querySelector('#timed-start').addEventListener('click',runTimed);
}
function runTimed(){ timedScore=0; timedLeft=60; timedNext(); stopTimed(); timedTimer=setInterval(()=>{ timedLeft--; const l=document.getElementById('t-left'); if(l) l.textContent=Math.max(timedLeft,0); const b=document.getElementById('t-bar'); if(b) b.style.width=Math.max(timedLeft,0)/60*100+'%'; if(timedLeft<=0){ stopTimed(); endTimed(); } },1000); }
function timedNext(){ timedAnswered=false; const d=timedScore>=8?3:(timedScore>=4?2:1); const data=pick(Q[d])(); const opts=[...data.opts].sort(()=>Math.random()-.5);
  quizEl.innerHTML='<div class="q-head"><span class="q-prog">⏱️ <b id="t-left">'+Math.max(timedLeft,0)+'</b>s left</span><span class="q-diff">Score '+timedScore+'</span></div>'+
    '<div class="bar xp" style="margin-bottom:12px;"><span id="t-bar" style="width:'+Math.max(timedLeft,0)/60*100+'%"></span></div>'+
    '<div class="q-text">'+data.q+'</div><div>'+opts.map(o=>'<button class="q-opt" data-ok="'+o.ok+'">'+o.t+'</button>').join('')+'</div>';
  quizEl.querySelectorAll('.q-opt').forEach(btn=>btn.addEventListener('click',()=>timedAnswer(btn)));
}
function timedAnswer(btn){ if(timedAnswered) return; timedAnswered=true; const ok=btn.dataset.ok==='true';
  quizEl.querySelectorAll('.q-opt').forEach(b=>{ b.disabled=true; if(b.dataset.ok==='true') b.classList.add('correct'); else if(b===btn&&!ok) b.classList.add('wrong'); });
  if(ok){ timedScore++; playSound('correct'); const r=btn.getBoundingClientRect(); spawn(r.left+r.width/2,r.top,12,6); } else { playSound('wrong'); }
  setTimeout(()=>{ if(timedTimer) timedNext(); }, ok?420:850);
}
function endTimed(){ const prevBest=(S&&S.bestTimed)||0; const gain=timedScore*5; const isBest=timedScore>prevBest&&timedScore>0;
  if(S){ if(isBest) S.bestTimed=timedScore; saveState(); addXp(gain); checkBadges(); }
  confettiBurst(); playSound('level'); mascot('star','Time! You scored '+timedScore+'! 🎉');
  quizEl.innerHTML='<div style="text-align:center;padding:10px 0;"><div style="font-size:46px;">🏁</div><div class="q-text" style="margin:6px 0;">Time’s up!</div><div style="font-size:32px;font-weight:900;color:var(--brand);">'+timedScore+' correct</div><div style="color:var(--soft);font-weight:700;margin:6px 0 14px;">+'+gain+' XP'+(isBest?'  ·  new best! 🏅':'')+'</div><button class="q-next" id="timed-again" style="max-width:240px;margin:0 auto;">Play again 🔁</button></div>';
  quizEl.querySelector('#timed-again').addEventListener('click',startTimed);
}

// ============================ COMPARE TWO ELEMENTS ============================
let cmpPair=null, cmpMetric=null, cmpAnswered=false;
const CMP_METRICS=[
  {q:'Which is HEAVIER? ⚖️', label:'Atomic mass', val:e=>e[3], hi:true, fmt:e=>(typeof e[3]==='number'?e[3].toFixed(1):e[3])+' u'},
  {q:'Which MELTS at a higher temperature? 🌡️', label:'Melting point', val:e=>e[10], hi:true, fmt:e=>formatMelt(e[10])},
  {q:'Which was discovered FIRST? 📜', label:'Discovered', val:e=>e[8], hi:false, fmt:e=>formatYear(e[8])},
  {q:'Which has the BIGGER atomic number? 🔢', label:'Atomic number', val:e=>e[0], hi:true, fmt:e=>'#'+e[0]}
];
function startCompare(){ comparePair(); }
function comparePair(){ cmpAnswered=false; cmpPair=pickN(ELS,2); const ok=CMP_METRICS.filter(m=>m.val(cmpPair[0])!=null && m.val(cmpPair[1])!=null && m.val(cmpPair[0])!==m.val(cmpPair[1])); cmpMetric=ok.length?pick(ok):CMP_METRICS[3]; renderCompare(false); }
function whoWins(){ const a=cmpMetric.val(cmpPair[0]), b=cmpMetric.val(cmpPair[1]); if(a===b) return -1; return (cmpMetric.hi?a>b:a<b)?0:1; }
function cmpCard(el,reveal,win){ const {bg,fg}=colorFor(el[6]); return '<button class="cmp-card'+(reveal&&win?' win':'')+'" data-n="'+el[0]+'" style="--cbg:'+bg+';--cfg:'+fg+';">'+
  '<div class="cmp-ill">'+svgIcon(iconKeyFor(el),fg,40)+'</div><div class="cmp-sym">'+el[1]+'</div><div class="cmp-name">'+el[2]+'</div>'+
  '<div class="cmp-val"'+(reveal?'':' style="opacity:.4"')+'>'+(reveal?(cmpMetric.fmt(el)+(win?' 🏆':'')):'?')+'</div></button>'; }
function renderCompare(reveal){ const win=reveal?whoWins():-1;
  quizEl.innerHTML='<div class="q-head"><span class="q-prog">⚖️ Compare</span><span class="q-diff">'+cmpMetric.label+'</span></div>'+
    '<div class="q-text">'+cmpMetric.q+'</div>'+
    '<div class="cmp-row">'+cmpCard(cmpPair[0],reveal,win===0)+'<div class="cmp-vs">VS</div>'+cmpCard(cmpPair[1],reveal,win===1)+'</div>'+
    '<div class="q-feedback" id="cmp-fb"></div>'+(reveal?'<button class="q-next" id="cmp-next">New pair 🎲</button>':'');
  if(!reveal){ quizEl.querySelectorAll('.cmp-card').forEach(c=>c.addEventListener('click',()=>compareGuess(parseInt(c.dataset.n)))); }
  else { quizEl.querySelector('#cmp-next').addEventListener('click',comparePair); }
}
function compareGuess(num){ if(cmpAnswered) return; cmpAnswered=true; const win=whoWins(); renderCompare(true); const fb=document.getElementById('cmp-fb');
  if(win===-1){ fb.textContent='It’s a tie! 🤝'; playSound('pop'); }
  else if(num===cmpPair[win][0]){ fb.textContent=pick(['Correct! 🎉','Nice compare! 🌟','You got it! 💪']); fb.className='q-feedback good'; playSound('correct'); confettiBurst(); if(S){ addXp(8); checkBadges(); } mascot('happy','Great compare! 🎉'); }
  else { fb.textContent='Not quite — now you know!'; fb.className='q-feedback bad'; playSound('wrong'); mascot('think','Good try! 🔎'); }
}
