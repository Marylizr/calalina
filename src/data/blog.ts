import type { Locale } from "./site";

export type BlogTip = {
  title: string;
  text: string;
};

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  secondIntro?: string;
  secondItems?: string[];
  tips?: BlogTip[];
  note?: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  readingTime: string;
  title: string;
  excerpt: string;
  coverImage: string;
  sections: BlogSection[];
};

const neveraSlug = "nevera-si-o-no-que-guardem-i-que-no";
const neveraCoverImage = "/images/blog/nevera.png";
const temporadaSlug = "fruta-de-temporada-que-comemos-cada-mes";
const temporadaCoverImage = "/images/blog/temporada.png";
const verdurasSlug = "como-conservar-las-verduras-frescas-mas-tiempo";
const verdurasCoverImage = "/images/blog/frescas.png";
const ideesSlug = "idees-rapides-amb-productes-del-mercat";
const ideesCoverImage = "/images/blog/recetas.png";

export const blogPostNeveraByLocale: Record<Locale, BlogPost> = {
  ca: {
    slug: neveraSlug,
    category: "Consells de conservació",
    readingTime: "4 min",
    title: "Nevera sí o no? Què guardem i què no",
    excerpt:
      "Una guia senzilla per saber quines fruites i verdures van a la nevera, quines és millor deixar fora i com evitar que madurin massa ràpid.",
    coverImage: neveraCoverImage,
    sections: [
      {
        heading: "Nevera sí o no? La guia ràpida de Calalina",
        paragraphs: [
          "Arribes a casa amb la compra feta, obres la nevera i arriba la pregunta de sempre: això ho guardo aquí o ho deixo fora?",
          "La resposta depèn del producte, del punt de maduració i de quan el vulguis consumir. Alguns aliments duren més a la nevera, altres perden sabor, textura o maduren pitjor si els poses en fred massa aviat.",
          "A Calalina ens agrada dir-ho així: la nevera conserva, però no sempre millora.",
        ],
      },
      {
        heading: "El que sí convé guardar a la nevera",
        paragraphs: [
          "Hi ha productes que agraeixen el fred perquè són delicats, tenen molta aigua o es fan malbé ràpidament.",
        ],
        intro: "Guarda a la nevera:",
        items: [
          "Maduixes, nabius, gerds i fruites vermelles.",
          "Raïm.",
          "Verdures de fulla: enciam, espinacs, bledes, rúcula.",
          "Herbes fresques, excepte l'alfàbrega si la vols conservar millor en aigua i fora del fred intens.",
          "Pastanagues.",
          "Bròcoli, coliflor i cols.",
          "Carxofes.",
          "Xampinyons i bolets.",
          "Cogombre, si ja està molt madur o fa molta calor.",
          "Fruita tallada o pelada.",
        ],
        note: "La fruita i verdura tallada sempre ha d'anar refrigerada per seguretat alimentària. També és recomanable mantenir la nevera a una temperatura adequada, idealment al voltant de 4 °C o menys.",
      },
      {
        heading: "El que és millor deixar fora de la nevera",
        paragraphs: [
          "Alguns productes prefereixen un lloc fresc, sec i ventilat. El fred pot alterar-ne la textura, el sabor o el procés de maduració.",
        ],
        intro: "Deixa fora:",
        items: [
          "Plàtans.",
          "Patates.",
          "Moniatos.",
          "Cebes seques.",
          "Alls.",
          "Tomàquets, sobretot si encara necessiten acabar de madurar.",
          "Alvocats verds.",
          "Mangos verds.",
          "Peres dures.",
          "Préssecs o nectarines encara verds.",
          "Carbasses senceres.",
        ],
        note: "El USDA recomana no refrigerar productes com plàtans, patates, moniatos i cebes seques, i guardar-los en espais secs i temperats.",
      },
      {
        heading: "Primer fora, després nevera",
        paragraphs: [
          "Aquest és el truc que més ajuda a no perdre sabor.",
          "Hi ha fruites que han d'acabar de madurar fora i, quan ja estan al punt, poden anar a la nevera per aguantar uns dies més.",
        ],
        intro: "Funciona molt bé amb:",
        items: [
          "Alvocats.",
          "Mangos.",
          "Peres.",
          "Préssecs.",
          "Nectarines.",
          "Kiwi.",
          "Tomàquets molt madurs, si no els consumiràs aviat.",
        ],
        note: "Per exemple: si compres un alvocat dur, deixa'l fora. Quan cedeixi una mica al tacte, guarda'l a la nevera per frenar la maduració.",
      },
      {
        heading: "No ho guardis tot junt",
        paragraphs: [
          "Aquí ve una de les claus: algunes fruites produeixen etilè, un gas natural que accelera la maduració. Això no és dolent, però pot fer que altres productes es facin malbé abans.",
        ],
        intro: "Separa, sempre que puguis:",
        items: ["Pomes.", "Plàtans.", "Peres.", "Préssecs.", "Tomàquets.", "Alvocats madurs."],
        secondIntro: "Dels productes més delicats com:",
        secondItems: ["Enciam.", "Bròcoli.", "Cogombre.", "Pastanagues.", "Herbes fresques."],
        note: "UC Davis explica que fruites com pomes, peres i préssecs poden augmentar el nivell d'etilè dins de l'espai on es guarden, i això pot afectar altres productes sensibles.",
      },
      {
        heading: "Consells ràpids per conservar millor",
        tips: [
          {
            title: "No rentis tot abans de guardar-ho.",
            text: "La humitat accelera el deteriorament. Renta la fruita i verdura just abans de consumir-la, especialment fruites delicades com maduixes o raïm.",
          },
          {
            title: "Fes servir paper o draps nets.",
            text: "Per fulles verdes i herbes, un paper absorbent pot ajudar a controlar l'excés d'humitat.",
          },
          {
            title: "No tanquis tot hermèticament.",
            text: "Moltes verdures necessiten respirar. Les bosses o recipients massa tancats poden acumular humitat.",
          },
          {
            title: "Revisa cada dos dies.",
            text: "Una peça molt madura pot accelerar el deteriorament de la resta.",
          },
          {
            title: "Compra pensant en el ritme de casa.",
            text: "Si ho vols per avui, tria madur. Si ho vols per d'aquí a tres dies, millor una mica més verd.",
          },
        ],
      },
      {
        heading: "Resum fàcil",
        paragraphs: [
          "A la nevera: fruites vermelles, raïm, fulles verdes, herbes, carxofes, pastanagues, bròcoli, bolets i producte tallat.",
          "Fora de la nevera: plàtan, patata, moniato, ceba, all, tomàquet, carbassa sencera i fruita que encara ha de madurar.",
          "Primer fora i després nevera: alvocat, mango, pera, préssec, nectarina i kiwi.",
        ],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "Si tens dubtes, pregunta'ns a la botiga. Hi ha productes que canvien segons la temporada, el punt de maduració i la calor que faci a Barcelona aquell dia.",
          "La millor conservació comença triant bé: compra al punt, guarda amb cura i gaudeix sense presses.",
        ],
      },
    ],
  },
  es: {
    slug: neveraSlug,
    category: "Consejos de conservación",
    readingTime: "4 min",
    title: "¿Nevera sí o no? Qué guardamos y qué no",
    excerpt:
      "Una guía sencilla para saber qué frutas y verduras van a la nevera, cuáles es mejor dejar fuera y cómo evitar que maduren demasiado rápido.",
    coverImage: neveraCoverImage,
    sections: [
      {
        heading: "¿Nevera sí o no? La guía rápida de Calalina",
        paragraphs: [
          "Llegas a casa con la compra hecha, abres la nevera y aparece la pregunta de siempre: ¿esto lo guardo aquí o lo dejo fuera?",
          "La respuesta depende del producto, del punto de maduración y de cuándo lo quieras consumir. Algunos alimentos duran más en la nevera; otros pierden sabor, textura o maduran peor si los pones en frío demasiado pronto.",
          "En Calalina nos gusta decirlo así: la nevera conserva, pero no siempre mejora.",
        ],
      },
      {
        heading: "Lo que sí conviene guardar en la nevera",
        paragraphs: [
          "Hay productos que agradecen el frío porque son delicados, tienen mucha agua o se estropean rápidamente.",
        ],
        intro: "Guarda en la nevera:",
        items: [
          "Fresas, arándanos, frambuesas y frutos rojos.",
          "Uvas.",
          "Verduras de hoja: lechuga, espinacas, acelgas y rúcula.",
          "Hierbas frescas, excepto la albahaca si prefieres conservarla en agua y fuera del frío intenso.",
          "Zanahorias.",
          "Brócoli, coliflor y coles.",
          "Alcachofas.",
          "Champiñones y setas.",
          "Pepino, si ya está muy maduro o hace mucho calor.",
          "Fruta cortada o pelada.",
        ],
        note: "La fruta y verdura cortada siempre debe ir refrigerada por seguridad alimentaria. También es recomendable mantener la nevera a una temperatura adecuada, idealmente alrededor de 4 °C o menos.",
      },
      {
        heading: "Lo que es mejor dejar fuera de la nevera",
        paragraphs: [
          "Algunos productos prefieren un lugar fresco, seco y ventilado. El frío puede alterar su textura, su sabor o su proceso de maduración.",
        ],
        intro: "Deja fuera:",
        items: [
          "Plátanos.",
          "Patatas.",
          "Boniatos.",
          "Cebollas secas.",
          "Ajos.",
          "Tomates, sobre todo si todavía necesitan terminar de madurar.",
          "Aguacates verdes.",
          "Mangos verdes.",
          "Peras duras.",
          "Melocotones o nectarinas todavía verdes.",
          "Calabazas enteras.",
        ],
        note: "El USDA recomienda no refrigerar productos como plátanos, patatas, boniatos y cebollas secas, y guardarlos en espacios secos y templados.",
      },
      {
        heading: "Primero fuera, después nevera",
        paragraphs: [
          "Este es el truco que más ayuda a no perder sabor.",
          "Hay frutas que deben terminar de madurar fuera y, cuando ya están en su punto, pueden ir a la nevera para aguantar unos días más.",
        ],
        intro: "Funciona muy bien con:",
        items: [
          "Aguacates.",
          "Mangos.",
          "Peras.",
          "Melocotones.",
          "Nectarinas.",
          "Kiwi.",
          "Tomates muy maduros, si no los vas a consumir pronto.",
        ],
        note: "Por ejemplo: si compras un aguacate duro, déjalo fuera. Cuando ceda un poco al tacto, guárdalo en la nevera para frenar la maduración.",
      },
      {
        heading: "No lo guardes todo junto",
        paragraphs: [
          "Aquí viene una de las claves: algunas frutas producen etileno, un gas natural que acelera la maduración. No es malo, pero puede hacer que otros productos se estropeen antes.",
        ],
        intro: "Separa, siempre que puedas:",
        items: ["Manzanas.", "Plátanos.", "Peras.", "Melocotones.", "Tomates.", "Aguacates maduros."],
        secondIntro: "De los productos más delicados como:",
        secondItems: ["Lechuga.", "Brócoli.", "Pepino.", "Zanahorias.", "Hierbas frescas."],
        note: "UC Davis explica que frutas como manzanas, peras y melocotones pueden aumentar el nivel de etileno dentro del espacio donde se guardan, y eso puede afectar a otros productos sensibles.",
      },
      {
        heading: "Consejos rápidos para conservar mejor",
        tips: [
          {
            title: "No lo laves todo antes de guardarlo.",
            text: "La humedad acelera el deterioro. Lava la fruta y la verdura justo antes de consumirla, especialmente piezas delicadas como fresas o uvas.",
          },
          {
            title: "Usa papel o paños limpios.",
            text: "Para hojas verdes y hierbas, un papel absorbente puede ayudar a controlar el exceso de humedad.",
          },
          {
            title: "No cierres todo herméticamente.",
            text: "Muchas verduras necesitan respirar. Las bolsas o recipientes demasiado cerrados pueden acumular humedad.",
          },
          {
            title: "Revisa cada dos días.",
            text: "Una pieza muy madura puede acelerar el deterioro del resto.",
          },
          {
            title: "Compra pensando en el ritmo de casa.",
            text: "Si lo quieres para hoy, elige maduro. Si lo quieres para dentro de tres días, mejor un poco más verde.",
          },
        ],
      },
      {
        heading: "Resumen fácil",
        paragraphs: [
          "A la nevera: frutos rojos, uvas, hojas verdes, hierbas, alcachofas, zanahorias, brócoli, setas y producto cortado.",
          "Fuera de la nevera: plátano, patata, boniato, cebolla, ajo, tomate, calabaza entera y fruta que todavía tiene que madurar.",
          "Primero fuera y después nevera: aguacate, mango, pera, melocotón, nectarina y kiwi.",
        ],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "Si tienes dudas, pregúntanos en la tienda. Hay productos que cambian según la temporada, el punto de maduración y el calor que haga en Barcelona ese día.",
          "La mejor conservación empieza eligiendo bien: compra en su punto, guarda con cuidado y disfruta sin prisas.",
        ],
      },
    ],
  },
  en: {
    slug: neveraSlug,
    category: "Storage tips",
    readingTime: "4 min",
    title: "Fridge or not? What to store and what to keep out",
    excerpt:
      "A simple guide to which fruit and vegetables belong in the fridge, which are better kept out and how to stop them ripening too fast.",
    coverImage: neveraCoverImage,
    sections: [
      {
        heading: "Fridge or not? Calalina's quick guide",
        paragraphs: [
          "You get home with your shopping, open the fridge and the usual question appears: should this go in here, or should I leave it out?",
          "The answer depends on the product, its ripeness and when you want to eat it. Some foods last longer in the fridge; others lose flavour, texture or ripen badly if they get cold too soon.",
          "At Calalina we like to say it this way: the fridge preserves, but it does not always improve.",
        ],
      },
      {
        heading: "What should go in the fridge",
        paragraphs: [
          "Some produce benefits from the cold because it is delicate, high in water or spoils quickly.",
        ],
        intro: "Keep these in the fridge:",
        items: [
          "Strawberries, blueberries, raspberries and other berries.",
          "Grapes.",
          "Leafy greens: lettuce, spinach, chard and rocket.",
          "Fresh herbs, except basil if you prefer to keep it in water and away from intense cold.",
          "Carrots.",
          "Broccoli, cauliflower and cabbages.",
          "Artichokes.",
          "Mushrooms.",
          "Cucumber, if it is already very ripe or the weather is very hot.",
          "Cut or peeled fruit.",
        ],
        note: "Cut fruit and vegetables should always be refrigerated for food safety. It is also best to keep the fridge at a suitable temperature, ideally around 4 °C or below.",
      },
      {
        heading: "What is better kept out of the fridge",
        paragraphs: [
          "Some products prefer a cool, dry and ventilated place. Cold can affect their texture, flavour or ripening process.",
        ],
        intro: "Keep these out:",
        items: [
          "Bananas.",
          "Potatoes.",
          "Sweet potatoes.",
          "Dry onions.",
          "Garlic.",
          "Tomatoes, especially if they still need to finish ripening.",
          "Unripe avocados.",
          "Unripe mangoes.",
          "Firm pears.",
          "Peaches or nectarines that are still firm.",
          "Whole pumpkins.",
        ],
        note: "The USDA recommends not refrigerating produce such as bananas, potatoes, sweet potatoes and dry onions, and storing them in dry, temperate spaces.",
      },
      {
        heading: "First out, then fridge",
        paragraphs: [
          "This is the trick that helps preserve flavour the most.",
          "Some fruit should finish ripening outside the fridge. Once it is ready, it can go into the fridge to last a few more days.",
        ],
        intro: "It works very well with:",
        items: [
          "Avocados.",
          "Mangoes.",
          "Pears.",
          "Peaches.",
          "Nectarines.",
          "Kiwi.",
          "Very ripe tomatoes, if you will not eat them soon.",
        ],
        note: "For example: if you buy a firm avocado, leave it out. When it gives slightly to the touch, put it in the fridge to slow down ripening.",
      },
      {
        heading: "Do not store everything together",
        paragraphs: [
          "Here is one of the keys: some fruit produces ethylene, a natural gas that speeds up ripening. That is not bad, but it can make other produce spoil sooner.",
        ],
        intro: "Separate these whenever you can:",
        items: ["Apples.", "Bananas.", "Pears.", "Peaches.", "Tomatoes.", "Ripe avocados."],
        secondIntro: "From more delicate produce such as:",
        secondItems: ["Lettuce.", "Broccoli.", "Cucumber.", "Carrots.", "Fresh herbs."],
        note: "UC Davis explains that fruit such as apples, pears and peaches can increase ethylene levels in the storage space, which can affect other sensitive produce.",
      },
      {
        heading: "Quick tips for better storage",
        tips: [
          {
            title: "Do not wash everything before storing it.",
            text: "Moisture speeds up spoilage. Wash fruit and vegetables just before eating them, especially delicate produce such as strawberries or grapes.",
          },
          {
            title: "Use paper or clean cloths.",
            text: "For leafy greens and herbs, absorbent paper can help control excess moisture.",
          },
          {
            title: "Do not seal everything airtight.",
            text: "Many vegetables need to breathe. Bags or containers that are too tightly closed can trap moisture.",
          },
          {
            title: "Check every couple of days.",
            text: "One very ripe piece can speed up the deterioration of the rest.",
          },
          {
            title: "Shop with your household rhythm in mind.",
            text: "If you want it for today, choose ripe. If you want it in three days, choose something a little firmer.",
          },
        ],
      },
      {
        heading: "Easy summary",
        paragraphs: [
          "In the fridge: berries, grapes, leafy greens, herbs, artichokes, carrots, broccoli, mushrooms and cut produce.",
          "Out of the fridge: banana, potato, sweet potato, onion, garlic, tomato, whole pumpkin and fruit that still needs to ripen.",
          "First out and then fridge: avocado, mango, pear, peach, nectarine and kiwi.",
        ],
      },
      {
        heading: "Calalina's advice",
        paragraphs: [
          "If you have doubts, ask us at the shop. Some products change depending on the season, ripeness and the heat in Barcelona that day.",
          "The best storage starts with choosing well: buy at the right point, store with care and enjoy without rushing.",
        ],
      },
    ],
  },
};

export const blogPostTemporadaByLocale: Record<Locale, BlogPost> = {
  ca: {
    slug: temporadaSlug,
    category: "Alimentació km0",
    readingTime: "6 min",
    title: "Fruita de temporada: què mengem cada mes",
    excerpt:
      "Una guia mes a mes, dels cítrics de gener fins a la verema de setembre, per saber quina fruita catalana està en el seu millor moment.",
    coverImage: temporadaCoverImage,
    sections: [
      {
        heading: "De la terra al plat",
        paragraphs: [
          "A Catalunya, el calendari del camp marca millor que cap supermercat el que hauria d'estar a la teva cistella.",
          "Menjar fruita de temporada no és només una qüestió de sabor, tot i que ja seria motiu suficient. També és una manera de donar suport a l'agricultura local, reduir la petjada del transport i alimentar-se amb allò que el cos demana en cada estació.",
          "Catalunya, amb la seva varietat climàtica - costa mediterrània, Pirineus, interior prelitoral i Terra Alta - produeix una gamma extraordinària de fruites al llarg de l'any.",
        ],
      },
      {
        heading: "Hivern · Gener i febrer",
        paragraphs: [
          "Gener és el regne dels cítrics. Les taronges de les Terres de l'Ebre i les mandarines de Tarragona estan en el seu punt més alt. El kiwi encara aguanta, i les pomes i peres de conservació continuen sent una bona opció.",
          "Al febrer les mandarines s'acomiaden i les taronges segueixen sent protagonistes. És el mes més auster del calendari fruiter, i en aquesta austeritat també hi ha honestedat.",
        ],
        intro: "Fruites del moment:",
        items: ["Taronja.", "Mandarina.", "Llimona.", "Aranja.", "Kiwi.", "Pera.", "Poma."],
        note: "És un bon moment per aprofitar la llimona en amaniments, coccions i infusions.",
      },
      {
        heading: "Primavera · Març, abril i maig",
        paragraphs: [
          "Al març arriben les primeres maduixes, encara primerenques i una mica àcides, mentre les taronges fan les últimes setmanes.",
          "L'abril és el mes de la maduixa i el nespra: dolçor, aroma i la primera fruita de pinyol de l'any.",
          "Al maig comença la temporada de pinyol. Les primeres cireres, l'albercoc i les prunes fan que el mercat passi d'un color a molts.",
        ],
        intro: "Fruites del moment:",
        items: ["Maduixa.", "Nespra.", "Cirera.", "Albercoc.", "Pruna.", "Llimona.", "Pera.", "Poma."],
      },
      {
        heading: "Estiu · Juny, juliol i agost",
        paragraphs: [
          "Juny és l'eufòria del mercat: cireres, albercocs, nectarines, prunes, síndria i meló coincideixen al taulell.",
          "Al juliol, el préssec de Lleida amb Indicació Geogràfica Protegida és el producte estrella: pell vellutada, polpa groga o blanca i aroma intens.",
          "A l'agost els figues arriben al seu punt màxim, apareixen les móres i les primeres varietats de raïm de verema primerenca.",
        ],
        intro: "Fruites del moment:",
        items: [
          "Cirera.",
          "Albercoc.",
          "Préssec.",
          "Nectarina.",
          "Pruna.",
          "Síndria.",
          "Meló.",
          "Figa.",
          "Móra.",
          "Raïm primerenc.",
          "Pera de nova collita.",
        ],
      },
      {
        heading: "Tardor · Setembre, octubre, novembre i desembre",
        paragraphs: [
          "Setembre és la verema. El Penedès, el Priorat, la Terra Alta i l'Empordà s'omplen de raïm, camins i cooperatives en moviment.",
          "A l'octubre arriben les pomes del Pirineu i les magranes troben el millor equilibri entre dolçor i acidesa. Cap a finals de mes apareix el caqui.",
          "Al novembre el caqui, especialment el del Baix Ebre, és un dels tresors menys coneguts de la temporada. Al desembre, clementines, mandarines i taronges tanquen i tornen a obrir el calendari.",
        ],
        intro: "Fruites del moment:",
        items: ["Raïm.", "Figa.", "Pera.", "Poma.", "Magrana.", "Codony.", "Caqui.", "Taronja.", "Mandarina.", "Clementina."],
      },
      {
        heading: "Comprar fruita de temporada: 4 claus pràctiques",
        tips: [
          {
            title: "Compra en mercats municipals.",
            text: "Mercats com la Boqueria, Santa Caterina, l'Abaceria o qualsevol mercat de barri treballen amb productors i proveïdors que venen segons la temporada real.",
          },
          {
            title: "Busca l'origen català.",
            text: "El Préssec de Lleida IGP, la Pera de Lleida, l'Avellana de Reus o la Cirera del Baix Camp són exemples d'origen i qualitat.",
          },
          {
            title: "Mira l'abundància.",
            text: "Si hi ha molta quantitat d'una fruita i el preu acompanya, normalment és senyal que està en el seu moment òptim.",
          },
          {
            title: "Prova caixes de finca o cooperatives.",
            text: "Connecten directament amb el calendari real del camp i et permeten descobrir varietats que no sempre arriben al supermercat.",
          },
        ],
      },
    ],
  },
  es: {
    slug: temporadaSlug,
    category: "Alimentación km0",
    readingTime: "6 min",
    title: "Fruta de temporada: qué comemos cada mes",
    excerpt:
      "Una guía mes a mes, desde los cítricos de enero hasta la vendimia de septiembre, para saber qué fruta catalana está en su mejor momento.",
    coverImage: temporadaCoverImage,
    sections: [
      {
        heading: "De la tierra al plato",
        paragraphs: [
          "En Cataluña, el calendario del campo marca mejor que ningún supermercado lo que debería estar en tu cesta.",
          "Comer fruta de temporada no es solo una cuestión de sabor, aunque ya sería motivo suficiente. También es una forma de apoyar la agricultura local, reducir la huella de transporte y alimentarse con lo que el cuerpo necesita en cada estación.",
          "Cataluña, con su variedad climática - costa mediterránea, Pirineos, interior prelitoral y Terra Alta - produce una gama extraordinaria de frutas a lo largo del año.",
        ],
      },
      {
        heading: "Invierno · Enero y febrero",
        paragraphs: [
          "Enero es el reino de los cítricos. Las naranjas de Terres de l'Ebre y las mandarinas de Tarragona están en su punto álgido. El kiwi todavía aguanta, y las manzanas y peras de conservación siguen siendo una buena opción.",
          "En febrero las mandarinas se despiden y las naranjas siguen siendo protagonistas absolutas. Es el mes más austero del calendario frutal, y en esa austeridad hay honestidad.",
        ],
        intro: "Frutas del momento:",
        items: ["Naranja.", "Mandarina.", "Limón.", "Pomelo.", "Kiwi.", "Pera.", "Manzana."],
        note: "Es un buen momento para sacar el máximo partido al limón en aliños, cocciones e infusiones.",
      },
      {
        heading: "Primavera · Marzo, abril y mayo",
        paragraphs: [
          "En marzo llegan las primeras fresas, todavía tempranas y ligeramente ácidas, mientras las naranjas viven sus últimas semanas.",
          "Abril es el mes de la fresa y el níspero: dulzor, aroma y la primera fruta de hueso del año.",
          "En mayo empieza la temporada de hueso. Las primeras cerezas, el albaricoque y las ciruelas hacen que el puesto de fruta pase de un color a muchos.",
        ],
        intro: "Frutas del momento:",
        items: ["Fresa.", "Níspero.", "Cereza.", "Albaricoque.", "Ciruela.", "Limón.", "Pera.", "Manzana."],
      },
      {
        heading: "Verano · Junio, julio y agosto",
        paragraphs: [
          "Junio es la euforia del mercado: cerezas, albaricoques, nectarinas, ciruelas, sandía y melón coinciden en el mostrador.",
          "En julio, el Melocotón de Lleida con Indicación Geográfica Protegida es el producto estrella: piel aterciopelada, pulpa amarilla o blanca y aroma intenso.",
          "En agosto los higos alcanzan su punto máximo, aparecen las moras y llegan con timidez las primeras variedades de uva de vendimia temprana.",
        ],
        intro: "Frutas del momento:",
        items: [
          "Cereza.",
          "Albaricoque.",
          "Melocotón.",
          "Nectarina.",
          "Ciruela.",
          "Sandía.",
          "Melón.",
          "Higo.",
          "Mora.",
          "Uva temprana.",
          "Pera de nueva cosecha.",
        ],
      },
      {
        heading: "Otoño · Septiembre, octubre, noviembre y diciembre",
        paragraphs: [
          "Septiembre es la vendimia. El Penedès, el Priorat, la Terra Alta y el Empordà se llenan de uva, caminos y cooperativas en movimiento.",
          "En octubre llegan las manzanas del Pirineu y las granadas encuentran el mejor equilibrio entre dulzor y acidez. Hacia finales de mes aparece el kaki.",
          "En noviembre el kaki, especialmente el del Baix Ebre, es uno de los tesoros menos conocidos de la temporada. En diciembre, clementinas, mandarinas y naranjas cierran y vuelven a abrir el calendario.",
        ],
        intro: "Frutas del momento:",
        items: ["Uva.", "Higo.", "Pera.", "Manzana.", "Granada.", "Membrillo.", "Kaki.", "Naranja.", "Mandarina.", "Clementina."],
      },
      {
        heading: "Comprar fruta de temporada: 4 claves prácticas",
        tips: [
          {
            title: "Compra en mercados municipales.",
            text: "La Boqueria, Santa Caterina, el Mercat de l'Abaceria o cualquier mercado de barrio trabajan con producto que responde mejor a la temporada real.",
          },
          {
            title: "Busca el origen catalán.",
            text: "El Melocotón de Lleida IGP, la Pera de Lleida, la Avellana de Reus o la Cereza del Baix Camp son ejemplos de origen y calidad.",
          },
          {
            title: "Mira la abundancia.",
            text: "Si hay mucha cantidad de una fruta y el precio acompaña, normalmente es señal de que está en su momento óptimo.",
          },
          {
            title: "Prueba cajas de finca o cooperativas.",
            text: "Conectan directamente con el calendario real del campo y permiten descubrir variedades que no siempre llegan al supermercado.",
          },
        ],
      },
    ],
  },
  en: {
    slug: temporadaSlug,
    category: "Local food",
    readingTime: "6 min",
    title: "Seasonal fruit: what to eat each month",
    excerpt:
      "A month-by-month guide, from January citrus to September harvest grapes, to know which Catalan fruit is at its best.",
    coverImage: temporadaCoverImage,
    sections: [
      {
        heading: "From the land to the plate",
        paragraphs: [
          "In Catalonia, the farming calendar tells you better than any supermarket what should be in your basket.",
          "Eating seasonal fruit is not only about flavour, although that would already be reason enough. It also supports local agriculture, reduces transport impact and helps you eat what each season naturally offers.",
          "Catalonia, with its varied climate - Mediterranean coast, Pyrenees, inland pre-coastal areas and Terra Alta - produces an extraordinary range of fruit throughout the year.",
        ],
      },
      {
        heading: "Winter · January and February",
        paragraphs: [
          "January belongs to citrus. Oranges from Terres de l'Ebre and mandarins from Tarragona are at their peak. Kiwi still holds well, and stored apples and pears remain a good choice.",
          "In February, mandarins say goodbye while oranges remain the main character. It is the most austere month in the fruit calendar, and there is honesty in that simplicity.",
        ],
        intro: "Fruit of the moment:",
        items: ["Orange.", "Mandarin.", "Lemon.", "Grapefruit.", "Kiwi.", "Pear.", "Apple."],
        note: "It is a good time to make the most of lemon in dressings, cooking and infusions.",
      },
      {
        heading: "Spring · March, April and May",
        paragraphs: [
          "In March the first strawberries arrive, still early and slightly sharp, while oranges live their final weeks.",
          "April is the month of strawberries and loquats: sweetness, aroma and the first stone fruit of the year.",
          "In May the stone fruit season begins. The first cherries, apricots and plums turn the fruit stand from one colour into many.",
        ],
        intro: "Fruit of the moment:",
        items: ["Strawberry.", "Loquat.", "Cherry.", "Apricot.", "Plum.", "Lemon.", "Pear.", "Apple."],
      },
      {
        heading: "Summer · June, July and August",
        paragraphs: [
          "June is market euphoria: cherries, apricots, nectarines, plums, watermelon and melon all meet at the stand.",
          "In July, Lleida peach with Protected Geographical Indication is the star product: velvety skin, yellow or white flesh and intense aroma.",
          "In August figs reach their peak, blackberries appear and the first early harvest grapes arrive quietly.",
        ],
        intro: "Fruit of the moment:",
        items: [
          "Cherry.",
          "Apricot.",
          "Peach.",
          "Nectarine.",
          "Plum.",
          "Watermelon.",
          "Melon.",
          "Fig.",
          "Blackberry.",
          "Early grape.",
          "New-season pear.",
        ],
      },
      {
        heading: "Autumn · September, October, November and December",
        paragraphs: [
          "September is harvest time. Penedès, Priorat, Terra Alta and Empordà fill with grapes, country roads and busy cooperatives.",
          "In October, apples from the Pyrenees arrive and pomegranates find their best balance between sweetness and acidity. Persimmon begins to appear towards the end of the month.",
          "In November, persimmon, especially from Baix Ebre, is one of the lesser-known treasures of the Catalan season. In December, clementines, mandarins and oranges close the calendar and open it again.",
        ],
        intro: "Fruit of the moment:",
        items: ["Grape.", "Fig.", "Pear.", "Apple.", "Pomegranate.", "Quince.", "Persimmon.", "Orange.", "Mandarin.", "Clementine."],
      },
      {
        heading: "Buying seasonal fruit: 4 practical keys",
        tips: [
          {
            title: "Shop at municipal markets.",
            text: "La Boqueria, Santa Caterina, Mercat de l'Abaceria and neighbourhood markets tend to work with produce that follows the real season more closely.",
          },
          {
            title: "Look for Catalan origin.",
            text: "Lleida Peach PGI, Lleida Pear, Reus Hazelnut and Baix Camp cherries are examples of origin and quality.",
          },
          {
            title: "Look at abundance.",
            text: "When there is plenty of a fruit and the price makes sense, it is usually a sign that it is at its best.",
          },
          {
            title: "Try farm boxes or cooperatives.",
            text: "They connect directly with the real farming calendar and help you discover varieties that do not always reach the supermarket.",
          },
        ],
      },
    ],
  },
};

export const blogPostVerdurasByLocale: Record<Locale, BlogPost> = {
  ca: {
    slug: verdurasSlug,
    category: "Consells de conservació",
    readingTime: "4 min",
    title: "Com conservar les verdures fresques més temps",
    excerpt:
      "Petits canvis a l'hora de guardar les verdures poden ajudar-te a mantenir-les fresques, cruixents i saboroses durant més dies.",
    coverImage: verdurasCoverImage,
    sections: [
      {
        heading: "Verdures fresques durant més temps",
        paragraphs: [
          "Les verdures són delicades. Algunes necessiten fred, altres necessiten aire, i moltes es fan malbé abans d'hora per una raó molt senzilla: excés d'humitat.",
          "A Calalina sempre recomanem guardar-les pensant en tres coses: fred, respiració i separació. No totes les verdures es comporten igual, però amb uns quants trucs pots evitar fulles pansides, cogombres tous o herbes que duren només dos dies.",
          "Per seguretat, la nevera hauria d'estar a 4 °C o menys, especialment per productes peribles com fulles verdes, herbes i bolets.",
        ],
      },
      {
        heading: "1. No ho rentis tot abans de guardar-ho",
        paragraphs: [
          "Sembla lògic arribar a casa i rentar tota la compra, però amb les verdures no sempre és bona idea. Si les guardes mullades, la humitat pot accelerar el deteriorament.",
        ],
        intro: "Millor:",
        items: [
          "Guarda-les seques.",
          "Renta-les just abans de consumir-les.",
          "Si ja les has rentat, asseca-les molt bé abans de posar-les a la nevera.",
        ],
        note: "Això és especialment important amb enciam, espinacs, bledes, rúcula, herbes fresques i bolets.",
      },
      {
        heading: "2. Fulles verdes: paper absorbent i recipient ventilat",
        paragraphs: [
          "Les fulles verdes necessiten fred, però també necessiten no quedar atrapades en aigua.",
        ],
        intro: "Per conservar millor:",
        items: [
          "Retira fulles molt tocades.",
          "Col·loca paper absorbent o un drap net dins del recipient.",
          "Guarda-les en una carmanyola o bossa lleugerament oberta.",
          "Evita pressionar-les massa.",
        ],
        secondIntro: "Funciona molt bé amb:",
        secondItems: ["Enciam.", "Espinacs.", "Rúcula.", "Canonges.", "Bledes.", "Kale."],
        note: "El paper ajuda a controlar la humitat i evita que les fulles es facin viscoses massa ràpid.",
      },
      {
        heading: "3. Herbes fresques: no totes es guarden igual",
        paragraphs: [
          "Les herbes són petites, però tenen caràcter. Julivert, coriandre, menta i cibulet aguanten millor amb les tiges tallades, en un got amb poca aigua, cobertes suaument amb una bossa i guardades a la nevera.",
          "Per a l'alfàbrega, millor evitar el fred intens. Es conserva millor com un ram petit en un got amb aigua, fora de la nevera i lluny del sol directe.",
        ],
      },
      {
        heading: "4. Bolets: millor en bossa de paper",
        paragraphs: [
          "Els bolets respiren i tenen molta aigua. Si els tanques en plàstic, poden acabar tous o enganxosos.",
        ],
        intro: "Millor:",
        items: [
          "Guarda'ls a la nevera.",
          "Fes servir una bossa de paper.",
          "Evita rentar-los abans de guardar-los.",
          "Neteja'ls just abans de cuinar-los.",
        ],
        note: "La FDA inclou els bolets entre els productes frescos peribles que s'han de refrigerar.",
      },
      {
        heading: "5. Pastanagues, api i cogombre",
        paragraphs: [
          "Aquestes verdures es tornen toves quan perden humitat, per això convé protegir-les sense deixar-les completament mullades.",
        ],
        items: [
          "Pastanagues: guarda-les en bossa o recipient tancat, però no completament humit.",
          "Api: embolica'l amb paper o un drap i posa'l a la nevera.",
          "Cogombre: millor en una zona no massa freda de la nevera, perquè el fred excessiu pot afectar-ne la textura.",
          "Si ja estan tallats, guarda'ls sempre en recipient tancat dins la nevera.",
        ],
      },
      {
        heading: "6. Tomàquets, patates, cebes i alls: millor fora",
        paragraphs: [
          "No tot ha d'anar a la nevera. Patates, cebes seques, alls, carbasses senceres i tomàquets que encara han de madurar es conserven millor en un lloc fresc, sec i ventilat.",
          "Un detall important: no guardis patates i cebes juntes. Les cebes poden accelerar el deteriorament de les patates.",
        ],
      },
      {
        heading: "7. Separa les verdures sensibles de fruites molt madures",
        paragraphs: [
          "Algunes fruites produeixen etilè, un gas natural que accelera la maduració. Això pot fer que certes verdures es posin lletges abans.",
        ],
        intro: "Mantén fulles verdes, bròcoli, cogombre i herbes fresques lluny de:",
        items: ["Pomes.", "Plàtans.", "Peres.", "Préssecs.", "Alvocats madurs.", "Tomàquets madurs."],
        note: "UC Davis explica que l'etilè pot accelerar la maduració i afectar negativament alguns productes sensibles.",
      },
      {
        heading: "8. El calaix de la nevera importa",
        paragraphs: [
          "Els calaixos de la nevera ajuden a conservar millor la humitat, però no els omplis massa. Si tot queda molt apretat, l'aire no circula bé i és més fàcil que aparegui condensació.",
        ],
        intro: "Guarda al calaix:",
        items: ["Enciams.", "Pastanagues.", "Bròcoli.", "Carxofes.", "Carbassó.", "Pebrots.", "Mongetes tendres."],
        secondIntro: "Evita posar-hi:",
        secondItems: ["Bolets tancats en plàstic.", "Herbes aixafades.", "Verdures ja molt mullades."],
      },
      {
        heading: "Resum fàcil",
        paragraphs: [
          "A la nevera: fulles verdes, herbes fresques, pastanagues, bròcoli, carxofes, carbassó, pebrots, mongetes tendres i bolets.",
          "Fora de la nevera: patates, cebes, alls, carbasses senceres i tomàquets que encara han de madurar.",
          "No facis: rentar-ho tot abans de guardar, tancar verdures mullades en plàstic, barrejar fulles verdes amb fruita molt madura o omplir massa el calaix.",
        ],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "Compra pensant en el teu ritme de setmana. Si vols cuinar avui o demà, tria verdura al punt. Si vols que duri més, demana'ns quina peça aguantarà millor.",
          "Una bona verdura comença al mercat, però es manté a casa amb petits gestos: fred correcte, poca humitat i una mica d'ordre a la nevera.",
        ],
      },
    ],
  },
  es: {
    slug: verdurasSlug,
    category: "Consejos de conservación",
    readingTime: "4 min",
    title: "Cómo conservar las verduras frescas más tiempo",
    excerpt:
      "Pequeños cambios al guardar las verduras pueden ayudarte a mantenerlas frescas, crujientes y sabrosas durante más días.",
    coverImage: verdurasCoverImage,
    sections: [
      {
        heading: "Verduras frescas durante más tiempo",
        paragraphs: [
          "Las verduras son delicadas. Algunas necesitan frío, otras necesitan aire, y muchas se estropean antes de tiempo por una razón muy sencilla: exceso de humedad.",
          "En Calalina recomendamos guardarlas pensando en tres cosas: frío, respiración y separación. No todas las verduras se comportan igual, pero con unos cuantos trucos puedes evitar hojas mustias, pepinos blandos o hierbas que duran solo dos días.",
          "Por seguridad, la nevera debería estar a 4 °C o menos, especialmente para productos perecederos como hojas verdes, hierbas y setas.",
        ],
      },
      {
        heading: "1. No lo laves todo antes de guardarlo",
        paragraphs: [
          "Parece lógico llegar a casa y lavar toda la compra, pero con las verduras no siempre es buena idea. Si las guardas mojadas, la humedad puede acelerar el deterioro.",
        ],
        intro: "Mejor:",
        items: [
          "Guárdalas secas.",
          "Lávalas justo antes de consumirlas.",
          "Si ya las has lavado, sécalas muy bien antes de ponerlas en la nevera.",
        ],
        note: "Esto es especialmente importante con lechuga, espinacas, acelgas, rúcula, hierbas frescas y setas.",
      },
      {
        heading: "2. Hojas verdes: papel absorbente y recipiente ventilado",
        paragraphs: [
          "Las hojas verdes necesitan frío, pero también necesitan no quedar atrapadas en agua.",
        ],
        intro: "Para conservar mejor:",
        items: [
          "Retira hojas muy dañadas.",
          "Coloca papel absorbente o un paño limpio dentro del recipiente.",
          "Guárdalas en una fiambrera o bolsa ligeramente abierta.",
          "Evita presionarlas demasiado.",
        ],
        secondIntro: "Funciona muy bien con:",
        secondItems: ["Lechuga.", "Espinacas.", "Rúcula.", "Canónigos.", "Acelgas.", "Kale."],
        note: "El papel ayuda a controlar la humedad y evita que las hojas se vuelvan viscosas demasiado rápido.",
      },
      {
        heading: "3. Hierbas frescas: no todas se guardan igual",
        paragraphs: [
          "Las hierbas son pequeñas, pero tienen carácter. Perejil, cilantro, menta y cebollino aguantan mejor con los tallos recortados, en un vaso con poca agua, cubiertas suavemente con una bolsa y guardadas en la nevera.",
          "Para la albahaca, mejor evitar el frío intenso. Se conserva mejor como un ramo pequeño en un vaso con agua, fuera de la nevera y lejos del sol directo.",
        ],
      },
      {
        heading: "4. Setas: mejor en bolsa de papel",
        paragraphs: [
          "Las setas respiran y tienen mucha agua. Si las cierras en plástico, pueden acabar blandas o pegajosas.",
        ],
        intro: "Mejor:",
        items: [
          "Guárdalas en la nevera.",
          "Usa una bolsa de papel.",
          "Evita lavarlas antes de guardarlas.",
          "Límpialas justo antes de cocinarlas.",
        ],
        note: "La FDA incluye las setas entre los productos frescos perecederos que deben refrigerarse.",
      },
      {
        heading: "5. Zanahorias, apio y pepino",
        paragraphs: [
          "Estas verduras se vuelven blandas cuando pierden humedad, por eso conviene protegerlas sin dejarlas completamente mojadas.",
        ],
        items: [
          "Zanahorias: guárdalas en bolsa o recipiente cerrado, pero no completamente húmedo.",
          "Apio: envuélvelo con papel o un paño y ponlo en la nevera.",
          "Pepino: mejor en una zona no demasiado fría de la nevera, porque el frío excesivo puede afectar su textura.",
          "Si ya están cortados, guárdalos siempre en recipiente cerrado dentro de la nevera.",
        ],
      },
      {
        heading: "6. Tomates, patatas, cebollas y ajos: mejor fuera",
        paragraphs: [
          "No todo tiene que ir a la nevera. Patatas, cebollas secas, ajos, calabazas enteras y tomates que todavía tienen que madurar se conservan mejor en un lugar fresco, seco y ventilado.",
          "Un detalle importante: no guardes patatas y cebollas juntas. Las cebollas pueden acelerar el deterioro de las patatas.",
        ],
      },
      {
        heading: "7. Separa las verduras sensibles de frutas muy maduras",
        paragraphs: [
          "Algunas frutas producen etileno, un gas natural que acelera la maduración. Esto puede hacer que ciertas verduras se estropeen antes.",
        ],
        intro: "Mantén hojas verdes, brócoli, pepino y hierbas frescas lejos de:",
        items: ["Manzanas.", "Plátanos.", "Peras.", "Melocotones.", "Aguacates maduros.", "Tomates maduros."],
        note: "UC Davis explica que el etileno puede acelerar la maduración y afectar negativamente a algunos productos sensibles.",
      },
      {
        heading: "8. El cajón de la nevera importa",
        paragraphs: [
          "Los cajones de la nevera ayudan a conservar mejor la humedad, pero no los llenes demasiado. Si todo queda muy apretado, el aire no circula bien y es más fácil que aparezca condensación.",
        ],
        intro: "Guarda en el cajón:",
        items: ["Lechugas.", "Zanahorias.", "Brócoli.", "Alcachofas.", "Calabacín.", "Pimientos.", "Judías verdes."],
        secondIntro: "Evita poner:",
        secondItems: ["Setas cerradas en plástico.", "Hierbas aplastadas.", "Verduras ya muy mojadas."],
      },
      {
        heading: "Resumen fácil",
        paragraphs: [
          "A la nevera: hojas verdes, hierbas frescas, zanahorias, brócoli, alcachofas, calabacín, pimientos, judías verdes y setas.",
          "Fuera de la nevera: patatas, cebollas, ajos, calabazas enteras y tomates que todavía tienen que madurar.",
          "No hagas: lavar todo antes de guardar, cerrar verduras mojadas en plástico, mezclar hojas verdes con fruta muy madura o llenar demasiado el cajón.",
        ],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "Compra pensando en tu ritmo de semana. Si quieres cocinar hoy o mañana, elige verdura en su punto. Si quieres que dure más, pregúntanos qué pieza aguantará mejor.",
          "Una buena verdura empieza en el mercado, pero se mantiene en casa con pequeños gestos: frío correcto, poca humedad y un poco de orden en la nevera.",
        ],
      },
    ],
  },
  en: {
    slug: verdurasSlug,
    category: "Storage tips",
    readingTime: "4 min",
    title: "How to keep vegetables fresh for longer",
    excerpt:
      "Small changes in how you store vegetables can help keep them fresh, crisp and flavourful for more days.",
    coverImage: verdurasCoverImage,
    sections: [
      {
        heading: "Fresh vegetables for longer",
        paragraphs: [
          "Vegetables are delicate. Some need cold, others need air, and many spoil too soon for one simple reason: excess moisture.",
          "At Calalina we recommend storing them with three ideas in mind: cold, breathing and separation. Not all vegetables behave the same way, but a few habits can help you avoid wilted leaves, soft cucumbers or herbs that only last two days.",
          "For safety, the fridge should be at 4 °C or below, especially for perishable produce such as leafy greens, herbs and mushrooms.",
        ],
      },
      {
        heading: "1. Do not wash everything before storing it",
        paragraphs: [
          "It may seem logical to wash the whole shop when you get home, but with vegetables it is not always a good idea. If you store them wet, moisture can speed up spoilage.",
        ],
        intro: "Better:",
        items: [
          "Store them dry.",
          "Wash them just before eating.",
          "If you have already washed them, dry them very well before putting them in the fridge.",
        ],
        note: "This is especially important for lettuce, spinach, chard, rocket, fresh herbs and mushrooms.",
      },
      {
        heading: "2. Leafy greens: absorbent paper and a ventilated container",
        paragraphs: [
          "Leafy greens need cold, but they also need to avoid sitting in trapped water.",
        ],
        intro: "For better storage:",
        items: [
          "Remove damaged leaves.",
          "Place absorbent paper or a clean cloth inside the container.",
          "Store them in a container or bag left slightly open.",
          "Avoid pressing them too tightly.",
        ],
        secondIntro: "Works very well with:",
        secondItems: ["Lettuce.", "Spinach.", "Rocket.", "Lamb's lettuce.", "Chard.", "Kale."],
        note: "The paper helps control moisture and stops leaves becoming slimy too quickly.",
      },
      {
        heading: "3. Fresh herbs: not all are stored the same way",
        paragraphs: [
          "Herbs are small, but they have character. Parsley, coriander, mint and chives keep better with trimmed stems, in a glass with a little water, gently covered with a bag and stored in the fridge.",
          "For basil, it is better to avoid intense cold. Keep it like a small bouquet in a glass of water, out of the fridge and away from direct sunlight.",
        ],
      },
      {
        heading: "4. Mushrooms: paper bags work better",
        paragraphs: [
          "Mushrooms breathe and contain a lot of water. If you seal them in plastic, they can become soft or sticky.",
        ],
        intro: "Better:",
        items: [
          "Keep them in the fridge.",
          "Use a paper bag.",
          "Avoid washing them before storing.",
          "Clean them just before cooking.",
        ],
        note: "The FDA includes mushrooms among perishable fresh products that should be refrigerated.",
      },
      {
        heading: "5. Carrots, celery and cucumber",
        paragraphs: [
          "These vegetables soften when they lose moisture, so it helps to protect them without leaving them completely wet.",
        ],
        items: [
          "Carrots: keep them in a bag or closed container, but not completely wet.",
          "Celery: wrap it in paper or a cloth and place it in the fridge.",
          "Cucumber: keep it in an area of the fridge that is not too cold, because excessive cold can affect its texture.",
          "If they are already cut, always store them in a closed container inside the fridge.",
        ],
      },
      {
        heading: "6. Tomatoes, potatoes, onions and garlic: better outside",
        paragraphs: [
          "Not everything belongs in the fridge. Potatoes, dry onions, garlic, whole pumpkins and tomatoes that still need to ripen keep better in a cool, dry and ventilated place.",
          "One important detail: do not store potatoes and onions together. Onions can speed up the deterioration of potatoes.",
        ],
      },
      {
        heading: "7. Separate sensitive vegetables from very ripe fruit",
        paragraphs: [
          "Some fruit produces ethylene, a natural gas that speeds up ripening. This can make certain vegetables spoil sooner.",
        ],
        intro: "Keep leafy greens, broccoli, cucumber and fresh herbs away from:",
        items: ["Apples.", "Bananas.", "Pears.", "Peaches.", "Ripe avocados.", "Ripe tomatoes."],
        note: "UC Davis explains that ethylene can speed up ripening and negatively affect some sensitive produce.",
      },
      {
        heading: "8. The fridge drawer matters",
        paragraphs: [
          "Fridge drawers help preserve humidity, but do not overfill them. When everything is too tightly packed, air cannot circulate well and condensation appears more easily.",
        ],
        intro: "Keep in the drawer:",
        items: ["Lettuces.", "Carrots.", "Broccoli.", "Artichokes.", "Courgette.", "Peppers.", "Green beans."],
        secondIntro: "Avoid putting in:",
        secondItems: ["Mushrooms sealed in plastic.", "Crushed herbs.", "Vegetables that are already very wet."],
      },
      {
        heading: "Easy summary",
        paragraphs: [
          "In the fridge: leafy greens, fresh herbs, carrots, broccoli, artichokes, courgette, peppers, green beans and mushrooms.",
          "Out of the fridge: potatoes, onions, garlic, whole pumpkins and tomatoes that still need to ripen.",
          "Do not: wash everything before storing, seal wet vegetables in plastic, mix leafy greens with very ripe fruit or overfill the drawer.",
        ],
      },
      {
        heading: "Calalina's advice",
        paragraphs: [
          "Shop with your weekly rhythm in mind. If you want to cook today or tomorrow, choose vegetables at their point. If you need them to last longer, ask us which pieces will hold best.",
          "Good vegetables start at the market, but they stay good at home with small gestures: the right cold, little moisture and a bit of order in the fridge.",
        ],
      },
    ],
  },
};

export const blogPostIdeesByLocale: Record<Locale, BlogPost> = {
  ca: {
    slug: ideesSlug,
    category: "Receptes fàcils",
    readingTime: "4 min",
    title: "Idees ràpides amb productes del mercat",
    excerpt:
      "Receptes simples, fresques i amb molt sabor per resoldre el dia a dia amb fruita, verdura i productes de temporada.",
    coverImage: ideesCoverImage,
    sections: [
      {
        heading: "Menjar bé no ha de ser complicat",
        paragraphs: [
          "Hi ha dies en què no tens temps, energia o ganes de fer una recepta llarga. Però això no vol dir que hagis de menjar qualsevol cosa.",
          "Amb bons productes del mercat pots preparar plats ràpids, frescos i saborosos en pocs minuts. La clau és tenir a mà ingredients versàtils: tomàquets bons, alvocat, ous, herbes fresques, verdures cruixents, fruita de temporada i algun producte especial que doni alegria al plat.",
          "A Calalina ens agrada pensar que una bona compra et pot resoldre mitja setmana.",
        ],
      },
      {
        heading: "1. Torrada d'alvocat, tomàquet i herbes",
        paragraphs: [
          "Una opció ràpida per esmorzar, dinar lleuger o sopar sense complicar-te. Aixafa l'alvocat amb una mica de sal i oli d'oliva, posa'l sobre pa torrat i afegeix tomàquet tallat a rodanxes o a daus.",
        ],
        intro: "Ingredients:",
        items: ["Pa torrat.", "Alvocat madur.", "Tomàquet.", "Oli d'oliva.", "Sal.", "Pebre.", "Coriandre, julivert o alfàbrega."],
        note: "Tip Calalina: si el tomàquet és dolç i està al punt, no cal gaire més.",
      },
      {
        heading: "2. Amanida cruixent de cogombre, poma i pastanaga",
        paragraphs: [
          "Fresca, ràpida i perfecta per acompanyar qualsevol plat. Talla el cogombre i la poma en làmines fines, ratlla la pastanaga i barreja-ho tot amb suc de llimona, oli d'oliva i herbes fresques.",
        ],
        intro: "Ingredients:",
        items: ["Cogombre.", "Poma.", "Pastanaga.", "Llimona.", "Oli d'oliva.", "Sal.", "Menta o julivert."],
        note: "Extra: pots afegir fruits secs o llavors si vols més textura.",
      },
      {
        heading: "3. Verdures saltejades amb ou",
        paragraphs: [
          "Un clàssic de nevera que sempre funciona. Salteja les verdures tallades petites amb oli d'oliva i, quan estiguin tendres, afegeix un ou a sobre o barreja-ho tot tipus remenat.",
        ],
        intro: "Ingredients:",
        items: ["Carbassó.", "Pebrot.", "Ceba.", "Tomàquet.", "Ous.", "Oli d'oliva.", "Sal i pebre."],
        note: "Idea ràpida: serveix-ho amb pa, arròs, patata cuita o una amanida fresca.",
      },
      {
        heading: "4. Bowl mediterrani amb fruita i verdura",
        paragraphs: [
          "Ideal quan vols menjar fresc, però complet. Col·loca una base de fulles verdes i afegeix fruita i verdura tallada. Amaneix amb oli d'oliva, vinagre o llimona.",
        ],
        intro: "Ingredients:",
        items: ["Fulles verdes.", "Tomàquet.", "Cogombre.", "Pastanaga.", "Alvocat.", "Raïm, poma o taronja.", "Oli d'oliva.", "Vinagre o llimona.", "Sal."],
        note: "Tip Calalina: una mica de fruita en una amanida canvia completament el sabor.",
      },
      {
        heading: "5. Tomàquet rosa amb oli, sal i alguna cosa més",
        paragraphs: [
          "Quan el producte és bo, la recepta pot ser mínima. Talla el tomàquet en rodanxes gruixudes, afegeix oli, sal i herbes, i completa'l amb formatge fresc, tonyina o ou dur si vols.",
        ],
        intro: "Ingredients:",
        items: ["Tomàquet rosa.", "Oli d'oliva verge extra.", "Sal.", "Orenga, alfàbrega o ceba tendra.", "Formatge fresc, tonyina o ou dur opcional."],
      },
      {
        heading: "6. Plàtan mascle a la planxa",
        paragraphs: [
          "Una idea fàcil amb sabor llatí. Talla el plàtan en làmines o rodanxes i cuina'l a la planxa amb una mica d'oli fins que quedi daurat.",
        ],
        intro: "Ingredients:",
        items: ["Plàtan mascle madur.", "Una mica d'oli.", "Sal.", "Formatge, alvocat o una salsa suau opcional."],
        note: "Tip Calalina: si està ben madur, queda més dolç i cremós. Si està verd, queda més ferm i salat.",
      },
      {
        heading: "7. Fruita tallada amb toc especial",
        paragraphs: [
          "Per berenar, postres o per tenir a la nevera. Talla la fruita i barreja-la amb unes gotes de llimona o llima. Afegeix menta fresca.",
        ],
        intro: "Ingredients:",
        items: ["Mango.", "Pinya.", "Taronja.", "Maduixes.", "Raïm.", "Llimona o llima.", "Menta."],
        note: "Extra: si vols un punt més tropical, combina mango, pinya i plàtan.",
      },
      {
        heading: "8. Crema ràpida de verdures",
        paragraphs: [
          "Una solució perfecta per aprofitar el que tens a casa. Sofregeix una mica la ceba, afegeix la verdura tallada i cobreix amb aigua o brou. Cou fins que estigui tendre i tritura.",
        ],
        intro: "Ingredients:",
        items: ["Carbassa, pastanaga o carbassó.", "Patata.", "Ceba.", "Oli d'oliva.", "Sal.", "Aigua o brou."],
        note: "Tip Calalina: pots fer-ne més quantitat i guardar-la per dos o tres dies.",
      },
      {
        heading: "Com comprar per resoldre millor la setmana",
        paragraphs: [
          "Una compra ben pensada t'ajuda molt. Combina producte fresc per menjar al moment, verdures per cuinar ràpid i ingredients que donin sabor.",
        ],
        intro: "Per menjar fresc:",
        items: ["Enciam.", "Cogombre.", "Tomàquet.", "Pastanaga.", "Fruita de temporada."],
        secondIntro: "Per cuinar ràpid i donar sabor:",
        secondItems: ["Carbassó.", "Pebrot.", "Ceba.", "Patata.", "Carbassa.", "Herbes fresques.", "Llimona.", "Alvocat.", "Plàtan mascle.", "Productes del racó llatí."],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "No necessites receptes complicades per menjar bé. Necessites bon producte, una mica d'ordre i idees senzilles que puguis repetir.",
          "Passa per la botiga, mira què està al punt i deixa que la temporada et doni idees. A vegades, el millor plat comença amb una pregunta molt simple: què està bo avui?",
        ],
      },
    ],
  },
  es: {
    slug: ideesSlug,
    category: "Recetas fáciles",
    readingTime: "4 min",
    title: "Ideas rápidas con productos del mercado",
    excerpt:
      "Recetas simples, frescas y con mucho sabor para resolver el día a día con fruta, verdura y productos de temporada.",
    coverImage: ideesCoverImage,
    sections: [
      {
        heading: "Comer bien no tiene que ser complicado",
        paragraphs: [
          "Hay días en los que no tienes tiempo, energía o ganas de hacer una receta larga. Pero eso no significa que tengas que comer cualquier cosa.",
          "Con buenos productos del mercado puedes preparar platos rápidos, frescos y sabrosos en pocos minutos. La clave es tener a mano ingredientes versátiles: buenos tomates, aguacate, huevos, hierbas frescas, verduras crujientes, fruta de temporada y algún producto especial que dé alegría al plato.",
          "En Calalina nos gusta pensar que una buena compra puede resolverte media semana.",
        ],
      },
      {
        heading: "1. Tostada de aguacate, tomate y hierbas",
        paragraphs: [
          "Una opción rápida para desayunar, comer ligero o cenar sin complicarte. Machaca el aguacate con sal y aceite de oliva, ponlo sobre pan tostado y añade tomate en rodajas o dados.",
        ],
        intro: "Ingredientes:",
        items: ["Pan tostado.", "Aguacate maduro.", "Tomate.", "Aceite de oliva.", "Sal.", "Pimienta.", "Cilantro, perejil o albahaca."],
        note: "Tip Calalina: si el tomate es dulce y está en su punto, no hace falta mucho más.",
      },
      {
        heading: "2. Ensalada crujiente de pepino, manzana y zanahoria",
        paragraphs: [
          "Fresca, rápida y perfecta para acompañar cualquier plato. Corta el pepino y la manzana en láminas finas, ralla la zanahoria y mezcla todo con limón, aceite de oliva y hierbas frescas.",
        ],
        intro: "Ingredientes:",
        items: ["Pepino.", "Manzana.", "Zanahoria.", "Limón.", "Aceite de oliva.", "Sal.", "Menta o perejil."],
        note: "Extra: puedes añadir frutos secos o semillas si quieres más textura.",
      },
      {
        heading: "3. Verduras salteadas con huevo",
        paragraphs: [
          "Un clásico de nevera que siempre funciona. Saltea las verduras cortadas pequeñas con aceite de oliva y, cuando estén tiernas, añade un huevo encima o mézclalo todo como revuelto.",
        ],
        intro: "Ingredientes:",
        items: ["Calabacín.", "Pimiento.", "Cebolla.", "Tomate.", "Huevos.", "Aceite de oliva.", "Sal y pimienta."],
        note: "Idea rápida: sírvelo con pan, arroz, patata cocida o una ensalada fresca.",
      },
      {
        heading: "4. Bowl mediterráneo con fruta y verdura",
        paragraphs: [
          "Ideal cuando quieres comer fresco, pero completo. Coloca una base de hojas verdes y añade fruta y verdura cortada. Aliña con aceite de oliva, vinagre o limón.",
        ],
        intro: "Ingredientes:",
        items: ["Hojas verdes.", "Tomate.", "Pepino.", "Zanahoria.", "Aguacate.", "Uvas, manzana o naranja.", "Aceite de oliva.", "Vinagre o limón.", "Sal."],
        note: "Tip Calalina: un poco de fruta en una ensalada cambia completamente el sabor.",
      },
      {
        heading: "5. Tomate rosa con aceite, sal y algo más",
        paragraphs: [
          "Cuando el producto es bueno, la receta puede ser mínima. Corta el tomate en rodajas gruesas, añade aceite, sal y hierbas, y complétalo con queso fresco, atún o huevo duro si quieres.",
        ],
        intro: "Ingredientes:",
        items: ["Tomate rosa.", "Aceite de oliva virgen extra.", "Sal.", "Orégano, albahaca o cebolleta.", "Queso fresco, atún o huevo duro opcional."],
      },
      {
        heading: "6. Plátano macho a la plancha",
        paragraphs: [
          "Una idea fácil con sabor latino. Corta el plátano en láminas o rodajas y cocínalo a la plancha con un poco de aceite hasta que quede dorado.",
        ],
        intro: "Ingredientes:",
        items: ["Plátano macho maduro.", "Un poco de aceite.", "Sal.", "Queso, aguacate o una salsa suave opcional."],
        note: "Tip Calalina: si está bien maduro, queda más dulce y cremoso. Si está verde, queda más firme y salado.",
      },
      {
        heading: "7. Fruta cortada con toque especial",
        paragraphs: [
          "Para merendar, postre o para tener en la nevera. Corta la fruta y mézclala con unas gotas de limón o lima. Añade menta fresca.",
        ],
        intro: "Ingredientes:",
        items: ["Mango.", "Piña.", "Naranja.", "Fresas.", "Uvas.", "Limón o lima.", "Menta."],
        note: "Extra: si quieres un punto más tropical, combina mango, piña y plátano.",
      },
      {
        heading: "8. Crema rápida de verduras",
        paragraphs: [
          "Una solución perfecta para aprovechar lo que tienes en casa. Sofríe un poco la cebolla, añade la verdura cortada y cubre con agua o caldo. Cuece hasta que esté tierna y tritura.",
        ],
        intro: "Ingredientes:",
        items: ["Calabaza, zanahoria o calabacín.", "Patata.", "Cebolla.", "Aceite de oliva.", "Sal.", "Agua o caldo."],
        note: "Tip Calalina: puedes hacer más cantidad y guardarla para dos o tres días.",
      },
      {
        heading: "Cómo comprar para resolver mejor la semana",
        paragraphs: [
          "Una compra bien pensada ayuda mucho. Combina producto fresco para comer al momento, verduras para cocinar rápido e ingredientes que den sabor.",
        ],
        intro: "Para comer fresco:",
        items: ["Lechuga.", "Pepino.", "Tomate.", "Zanahoria.", "Fruta de temporada."],
        secondIntro: "Para cocinar rápido y dar sabor:",
        secondItems: ["Calabacín.", "Pimiento.", "Cebolla.", "Patata.", "Calabaza.", "Hierbas frescas.", "Limón.", "Aguacate.", "Plátano macho.", "Productos del rincón latino."],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "No necesitas recetas complicadas para comer bien. Necesitas buen producto, un poco de orden e ideas sencillas que puedas repetir.",
          "Pasa por la tienda, mira qué está en su punto y deja que la temporada te dé ideas. A veces, el mejor plato empieza con una pregunta muy simple: ¿qué está bueno hoy?",
        ],
      },
    ],
  },
  en: {
    slug: ideesSlug,
    category: "Easy recipes",
    readingTime: "4 min",
    title: "Quick ideas with market produce",
    excerpt:
      "Simple, fresh and flavourful recipes for everyday meals with fruit, vegetables and seasonal produce.",
    coverImage: ideesCoverImage,
    sections: [
      {
        heading: "Eating well does not have to be complicated",
        paragraphs: [
          "Some days you do not have the time, energy or patience for a long recipe. But that does not mean you have to eat just anything.",
          "With good market produce you can prepare quick, fresh and tasty dishes in just a few minutes. The key is to keep versatile ingredients close: good tomatoes, avocado, eggs, fresh herbs, crisp vegetables, seasonal fruit and a special product that brings joy to the plate.",
          "At Calalina we like to think that a good shop can solve half your week.",
        ],
      },
      {
        heading: "1. Avocado, tomato and herb toast",
        paragraphs: [
          "A quick option for breakfast, a light lunch or an easy dinner. Mash the avocado with salt and olive oil, spread it on toast and add sliced or diced tomato.",
        ],
        intro: "Ingredients:",
        items: ["Toast.", "Ripe avocado.", "Tomato.", "Olive oil.", "Salt.", "Pepper.", "Coriander, parsley or basil."],
        note: "Calalina tip: if the tomato is sweet and at its point, you do not need much more.",
      },
      {
        heading: "2. Crunchy cucumber, apple and carrot salad",
        paragraphs: [
          "Fresh, quick and perfect with any dish. Slice the cucumber and apple finely, grate the carrot and mix everything with lemon juice, olive oil and fresh herbs.",
        ],
        intro: "Ingredients:",
        items: ["Cucumber.", "Apple.", "Carrot.", "Lemon.", "Olive oil.", "Salt.", "Mint or parsley."],
        note: "Extra: add nuts or seeds if you want more texture.",
      },
      {
        heading: "3. Sautéed vegetables with egg",
        paragraphs: [
          "A fridge classic that always works. Sauté small-cut vegetables with olive oil and, when tender, add an egg on top or mix everything like a scramble.",
        ],
        intro: "Ingredients:",
        items: ["Courgette.", "Pepper.", "Onion.", "Tomato.", "Eggs.", "Olive oil.", "Salt and pepper."],
        note: "Quick idea: serve it with bread, rice, boiled potato or a fresh salad.",
      },
      {
        heading: "4. Mediterranean bowl with fruit and vegetables",
        paragraphs: [
          "Ideal when you want something fresh but complete. Start with leafy greens and add chopped fruit and vegetables. Dress with olive oil, vinegar or lemon.",
        ],
        intro: "Ingredients:",
        items: ["Leafy greens.", "Tomato.", "Cucumber.", "Carrot.", "Avocado.", "Grapes, apple or orange.", "Olive oil.", "Vinegar or lemon.", "Salt."],
        note: "Calalina tip: a little fruit in a salad completely changes the flavour.",
      },
      {
        heading: "5. Pink tomato with oil, salt and something extra",
        paragraphs: [
          "When the product is good, the recipe can be minimal. Cut the tomato into thick slices, add oil, salt and herbs, and make it more complete with fresh cheese, tuna or boiled egg if you like.",
        ],
        intro: "Ingredients:",
        items: ["Pink tomato.", "Extra virgin olive oil.", "Salt.", "Oregano, basil or spring onion.", "Fresh cheese, tuna or boiled egg optional."],
      },
      {
        heading: "6. Grilled plantain",
        paragraphs: [
          "An easy idea with Latin flavour. Cut the plantain into slices and cook it on a hot pan with a little oil until golden.",
        ],
        intro: "Ingredients:",
        items: ["Ripe plantain.", "A little oil.", "Salt.", "Cheese, avocado or a mild sauce optional."],
        note: "Calalina tip: when very ripe, it becomes sweeter and creamier. When green, it is firmer and more savoury.",
      },
      {
        heading: "7. Cut fruit with a special touch",
        paragraphs: [
          "For a snack, dessert or something ready in the fridge. Cut the fruit and mix it with a few drops of lemon or lime. Add fresh mint.",
        ],
        intro: "Ingredients:",
        items: ["Mango.", "Pineapple.", "Orange.", "Strawberries.", "Grapes.", "Lemon or lime.", "Mint."],
        note: "Extra: for a more tropical touch, combine mango, pineapple and banana.",
      },
      {
        heading: "8. Quick vegetable cream",
        paragraphs: [
          "A perfect solution to use what you already have at home. Sauté some onion, add chopped vegetables and cover with water or stock. Cook until tender and blend.",
        ],
        intro: "Ingredients:",
        items: ["Pumpkin, carrot or courgette.", "Potato.", "Onion.", "Olive oil.", "Salt.", "Water or stock."],
        note: "Calalina tip: make a larger batch and keep it for two or three days.",
      },
      {
        heading: "How to shop for an easier week",
        paragraphs: [
          "A well-planned shop helps a lot. Combine fresh produce for quick meals, vegetables for fast cooking and ingredients that add flavour.",
        ],
        intro: "For fresh meals:",
        items: ["Lettuce.", "Cucumber.", "Tomato.", "Carrot.", "Seasonal fruit."],
        secondIntro: "For quick cooking and flavour:",
        secondItems: ["Courgette.", "Pepper.", "Onion.", "Potato.", "Pumpkin.", "Fresh herbs.", "Lemon.", "Avocado.", "Plantain.", "Products from the Latin corner."],
      },
      {
        heading: "Calalina's advice",
        paragraphs: [
          "You do not need complicated recipes to eat well. You need good produce, a little order and simple ideas you can repeat.",
          "Come by the shop, see what is at its point and let the season give you ideas. Sometimes the best dish starts with a very simple question: what is good today?",
        ],
      },
    ],
  },
};

const blogPostCollections = [
  blogPostNeveraByLocale,
  blogPostTemporadaByLocale,
  blogPostVerdurasByLocale,
  blogPostIdeesByLocale,
];

export const blogPosts = blogPostCollections.map((posts) => posts.ca);

export function getBlogPost(locale: Locale, slug: string) {
  const post = blogPostCollections
    .map((posts) => posts[locale])
    .find((blogPost) => blogPost.slug === slug);

  return post ?? null;
}
