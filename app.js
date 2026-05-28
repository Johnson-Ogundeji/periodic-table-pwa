// Periodic Kids — interactive periodic table for children
// All element data, examples, quiz logic in one file.

const CATS = {
  'alkali':       { name: 'Alkali metal',      light: '#FBEAF0', dark: '#72243E', text: '#4B1528', dtext: '#FBEAF0' },
  'alkaline':     { name: 'Alkaline earth',    light: '#FAECE7', dark: '#712B13', text: '#4A1B0C', dtext: '#FAECE7' },
  'transition':   { name: 'Transition metal',  light: '#E6F1FB', dark: '#0C447C', text: '#042C53', dtext: '#E6F1FB' },
  'post':         { name: 'Post-transition',   light: '#EEEDFE', dark: '#3C3489', text: '#26215C', dtext: '#EEEDFE' },
  'metalloid':    { name: 'Metalloid',         light: '#E1F5EE', dark: '#085041', text: '#04342C', dtext: '#E1F5EE' },
  'nonmetal':     { name: 'Reactive nonmetal', light: '#EAF3DE', dark: '#27500A', text: '#173404', dtext: '#EAF3DE' },
  'halogen':      { name: 'Halogen',           light: '#FAEEDA', dark: '#633806', text: '#412402', dtext: '#FAEEDA' },
  'noble':        { name: 'Noble gas',         light: '#FCEBEB', dark: '#791F1F', text: '#501313', dtext: '#FCEBEB' },
  'lanthanide':   { name: 'Lanthanide',        light: '#F1EFE8', dark: '#444441', text: '#2C2C2A', dtext: '#F1EFE8' },
  'actinide':     { name: 'Actinide',          light: '#D3D1C7', dark: '#5F5E5A', text: '#2C2C2A', dtext: '#F1EFE8' },
  'unknown':      { name: 'Unknown',           light: '#F1EFE8', dark: '#2C2C2A', text: '#444441', dtext: '#B4B2A9' }
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
    showDetail(el);
  });
  renderCell(div, el);
  return div;
}

function renderCell(div, el) {
  const [num, sym] = el;
  div.innerHTML = '<div class="num">' + num + '</div><div class="sym">' + sym + '</div><div class="extra">' + extraText(el, displayMode) + '</div>';
}

function showDetail(el) {
  const [num, sym, name, mass, period, group, cat, config, year, disc, melt, fact, examples] = el;
  const { bg, fg } = colorFor(cat);
  const catName = (CATS[cat] || CATS.unknown).name;
  detailEl.style.justifyContent = 'flex-start';
  detailEl.style.alignItems = 'flex-start';
  detailEl.style.color = isDark ? '#F1EFE8' : '#1A1A1A';

  const exList = examples.map(e => '<li style="margin: 4px 0;">' + e + '</li>').join('');

  detailEl.innerHTML =
    '<div style="display: flex; gap: 16px; width: 100%; flex-wrap: wrap;">' +
      '<div style="background: ' + bg + '; color: ' + fg + '; width: 92px; height: 92px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">' +
        '<div style="font-size: 12px; opacity: 0.75;">' + num + '</div>' +
        '<div style="font-size: 30px; font-weight: 500; line-height: 1;">' + sym + '</div>' +
        '<div style="font-size: 11px; opacity: 0.75; margin-top: 2px;">' + (typeof mass === 'number' ? mass.toFixed(2) : mass) + '</div>' +
      '</div>' +
      '<div style="flex: 1; min-width: 200px;">' +
        '<div style="font-size: 18px; font-weight: 500; margin-bottom: 2px;">' + name + '</div>' +
        '<div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">' + catName + ' &middot; period ' + period + ' &middot; group ' + (group > 18 ? '–' : group) + '</div>' +
        '<div style="font-size: 14px; line-height: 1.5;">' + fact + '</div>' +
      '</div>' +
      '<div style="flex-basis: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 4px;">' +
        '<div class="detail-card">' +
          '<div style="font-size: 11px; opacity: 0.7; margin-bottom: 2px;">Electron config</div>' +
          '<div style="font-size: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">' + config + '</div>' +
        '</div>' +
        '<div class="detail-card">' +
          '<div style="font-size: 11px; opacity: 0.7; margin-bottom: 2px;">Discovered</div>' +
          '<div style="font-size: 14px;">' + formatYear(year) + '</div>' +
          '<div style="font-size: 11px; opacity: 0.7;">' + disc + '</div>' +
        '</div>' +
        '<div class="detail-card">' +
          '<div style="font-size: 11px; opacity: 0.7; margin-bottom: 2px;">Melting point</div>' +
          '<div style="font-size: 14px;">' + formatMelt(melt) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="detail-card" style="flex-basis: 100%;">' +
        '<div style="font-size: 12px; opacity: 0.7; margin-bottom: 6px; font-weight: 500;">Where you\'ll find it around you</div>' +
        '<ul style="margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.5;">' + exList + '</ul>' +
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
  { k: 'quiz', label: 'Quiz' }
];
modes.forEach(m => {
  const btn = document.createElement('button');
  btn.className = 'm-btn' + (m.k === 'name' ? ' active' : '');
  btn.textContent = m.label;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.m-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (m.k === 'quiz') {
      inQuiz = true;
      quizEl.style.display = 'block';
      detailEl.style.display = 'none';
      startQuiz();
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

// QUIZ
let quizScore = 0;
let quizTotal = 0;
let quizQuestion = null;

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n, exclude) {
  const pool = arr.filter(x => !exclude || x[0] !== exclude[0]);
  const out = [];
  while (out.length < n && pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

const QUIZ_TYPES = [
  () => {
    const a = pick(ELS.filter(e => e[0] <= 86));
    const wrong = pickN(ELS.filter(e => e[0] <= 86), 3, a);
    return {
      q: 'Which element has the symbol "' + a[1] + '"?',
      options: [a, ...wrong].sort(() => Math.random() - 0.5).map(e => ({ text: e[2], correct: e[0] === a[0] }))
    };
  },
  () => {
    const a = pick(ELS.filter(e => e[12] && e[12].length > 0 && e[0] <= 86));
    const example = pick(a[12]);
    const wrong = pickN(ELS.filter(e => e[0] <= 86), 3, a);
    return {
      q: 'Which element is found in: "' + example + '"?',
      options: [a, ...wrong].sort(() => Math.random() - 0.5).map(e => ({ text: e[2] + ' (' + e[1] + ')', correct: e[0] === a[0] }))
    };
  },
  () => {
    const a = pick(ELS.filter(e => e[0] <= 36));
    const wrong = pickN(ELS.filter(e => e[0] <= 36), 3, a);
    return {
      q: 'What is the atomic number of ' + a[2] + '?',
      options: [a, ...wrong].sort(() => Math.random() - 0.5).map(e => ({ text: String(e[0]), correct: e[0] === a[0] }))
    };
  },
  () => {
    const a = pick(ELS.filter(e => e[0] <= 86 && e[6] !== 'unknown'));
    const cats = ['alkali', 'alkaline', 'transition', 'post', 'metalloid', 'nonmetal', 'halogen', 'noble'];
    const wrongCats = cats.filter(c => c !== a[6]).sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      q: 'What kind of element is ' + a[2] + '?',
      options: [a[6], ...wrongCats].sort(() => Math.random() - 0.5).map(c => ({ text: CATS[c].name, correct: c === a[6] }))
    };
  }
];

function startQuiz() {
  quizScore = 0;
  quizTotal = 0;
  nextQuestion();
}

function nextQuestion() {
  quizQuestion = pick(QUIZ_TYPES)();
  renderQuiz();
}

function renderQuiz() {
  const opts = quizQuestion.options.map((o, i) =>
    '<button class="q-opt" data-i="' + i + '" data-correct="' + o.correct + '">' + o.text + '</button>'
  ).join('');
  quizEl.innerHTML =
    '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">' +
      '<div style="font-size: 13px; opacity: 0.7;" id="q-score">Score: ' + quizScore + ' / ' + quizTotal + '</div>' +
      '<button class="f-btn" id="q-next" style="font-size: 12px;">New question →</button>' +
    '</div>' +
    '<div style="font-size: 16px; font-weight: 500; margin-bottom: 12px;">' + quizQuestion.q + '</div>' +
    '<div>' + opts + '</div>';

  quizEl.querySelectorAll('.q-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const correct = btn.dataset.correct === 'true';
      quizTotal++;
      if (correct) quizScore++;
      quizEl.querySelectorAll('.q-opt').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else if (b === btn && !correct) b.classList.add('wrong');
      });
      const scoreEl = document.getElementById('q-score');
      if (scoreEl) scoreEl.textContent = 'Score: ' + quizScore + ' / ' + quizTotal;
    });
  });
  quizEl.querySelector('#q-next').addEventListener('click', nextQuestion);
}
