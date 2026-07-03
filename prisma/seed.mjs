import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const seedDatabaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!seedDatabaseUrl) {
  console.error("No database URL available for seed.");
  process.exit(1);
}

console.log(process.env.DIRECT_URL ? "Seed using DIRECT_URL" : "Seed using DATABASE_URL");

const { PrismaClient } = await import("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: seedDatabaseUrl,
    },
  },
});

const categories = [
  ["Fruita", "Fruta", "Fruit", "fruita"],
  ["Verdura", "Verdura", "Greens", "verdura"],
  ["Hortalisses", "Hortalizas", "Vegetables", "hortalisses"],
  ["Productes llatins", "Productos latinos", "Latin products", "productes-llatins"],
  ["Begudes", "Bebidas", "Drinks", "begudes"],
  ["Dolços i snacks", "Dulces y snacks", "Sweets and snacks", "dolcos-i-snacks"],
  ["Rebost", "Despensa", "Pantry", "rebost"],
  ["Cistelles i packs", "Cestas y packs", "Baskets and packs", "cistelles-i-packs"],
  ["Temporada", "Temporada", "Seasonal", "temporada"],
];

function articleContent(readingTime, sections) {
  return JSON.stringify({ readingTime, sections }, null, 2);
}

const blogArticles = [
  {
    slug: "nevera-si-o-no-que-guardem-i-que-no",
    category: "Consells de conservació",
    coverImage: "/images/blog/nevera.png",
    titleCa: "Nevera sí o no? Què guardem i què no",
    titleEs: "Nevera sí o no? Qué guardamos y qué no",
    titleEn: "Fridge or not? What to store and what to keep out",
    excerptCa:
      "Una guia senzilla per saber quines fruites i verdures van a la nevera, quines és millor deixar fora i com evitar que madurin massa ràpid.",
    excerptEs:
      "Una guía sencilla para saber qué frutas y verduras van a la nevera, cuáles es mejor dejar fuera y cómo evitar que maduren demasiado rápido.",
    excerptEn:
      "A simple guide to know which fruit and vegetables go in the fridge, which are best kept out and how to slow down ripening.",
    contentCa: articleContent("4 min", [
      {
        heading: "Nevera sí o no? La guia ràpida de Calalina",
        paragraphs: [
          "Arribes a casa amb la compra feta, obres la nevera i arriba la pregunta de sempre: això ho guardo aquí o ho deixo fora?",
          "La resposta depèn del producte, del punt de maduració i de quan el vulguis consumir. Alguns aliments duren més a la nevera, altres perden sabor o textura si els poses en fred massa aviat.",
          "A Calalina ens agrada dir-ho així: la nevera conserva, però no sempre millora.",
        ],
      },
      {
        heading: "El que sí convé guardar a la nevera",
        intro: "Guarda a la nevera:",
        items: [
          "Maduixes, nabius, gerds i fruites vermelles.",
          "Raïm.",
          "Enciam, espinacs, bledes i rúcula.",
          "Herbes fresques.",
          "Pastanagues, bròcoli, coliflor i cols.",
          "Carxofes, xampinyons, bolets i fruita tallada.",
        ],
        note: "La fruita i verdura tallada sempre ha d'anar refrigerada per seguretat alimentària.",
      },
      {
        heading: "El que és millor deixar fora",
        items: [
          "Plàtans, patates, moniatos, cebes seques i alls.",
          "Tomàquets si encara han de madurar.",
          "Alvocats, mangos, peres, préssecs i nectarines quan encara són verds.",
          "Carbasses senceres.",
        ],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "Si tens dubtes, pregunta'ns a la botiga. Hi ha productes que canvien segons la temporada, el punt de maduració i la calor que faci a Barcelona aquell dia.",
          "La millor conservació comença triant bé: compra al punt, guarda amb cura i gaudeix sense presses.",
        ],
      },
    ]),
    contentEs: articleContent("4 min", [
      {
        heading: "Nevera sí o no? La guía rápida de Calalina",
        paragraphs: [
          "Llegas a casa con la compra hecha, abres la nevera y aparece la pregunta de siempre: ¿esto lo guardo aquí o lo dejo fuera?",
          "La respuesta depende del producto, del punto de maduración y de cuándo lo quieras consumir. Algunos alimentos duran más en la nevera, otros pierden sabor o textura si los pones en frío demasiado pronto.",
          "En Calalina nos gusta decirlo así: la nevera conserva, pero no siempre mejora.",
        ],
      },
      {
        heading: "Lo que sí conviene guardar en la nevera",
        intro: "Guarda en la nevera:",
        items: [
          "Fresas, arándanos, frambuesas y frutos rojos.",
          "Uva.",
          "Lechuga, espinacas, acelgas y rúcula.",
          "Hierbas frescas.",
          "Zanahorias, brócoli, coliflor y coles.",
          "Alcachofas, champiñones, setas y fruta cortada.",
        ],
        note: "La fruta y verdura cortada siempre debe ir refrigerada por seguridad alimentaria.",
      },
      {
        heading: "Lo que es mejor dejar fuera",
        items: [
          "Plátanos, patatas, boniatos, cebollas secas y ajos.",
          "Tomates si todavía tienen que madurar.",
          "Aguacates, mangos, peras, melocotones y nectarinas cuando aún están verdes.",
          "Calabazas enteras.",
        ],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "Si tienes dudas, pregúntanos en la tienda. Hay productos que cambian según la temporada, el punto de maduración y el calor que haga en Barcelona ese día.",
          "La mejor conservación empieza eligiendo bien: compra al punto, guarda con cuidado y disfruta sin prisas.",
        ],
      },
    ]),
    contentEn: articleContent("4 min", [
      {
        heading: "Fridge or not? Calalina's quick guide",
        paragraphs: [
          "You get home with your shopping, open the fridge and the usual question appears: should this go in here or stay outside?",
          "The answer depends on the product, its ripeness and when you want to eat it. Some foods last longer in the fridge, while others lose flavour or texture if chilled too early.",
          "At Calalina we like to say it this way: the fridge preserves, but it does not always improve.",
        ],
      },
      {
        heading: "What should go in the fridge",
        intro: "Keep these in the fridge:",
        items: [
          "Strawberries, blueberries, raspberries and berries.",
          "Grapes.",
          "Lettuce, spinach, chard and rocket.",
          "Fresh herbs.",
          "Carrots, broccoli, cauliflower and cabbages.",
          "Artichokes, mushrooms and cut fruit.",
        ],
        note: "Cut fruit and vegetables should always be refrigerated for food safety.",
      },
      {
        heading: "What is better kept outside",
        items: [
          "Bananas, potatoes, sweet potatoes, dry onions and garlic.",
          "Tomatoes if they still need to ripen.",
          "Avocados, mangoes, pears, peaches and nectarines while still firm.",
          "Whole pumpkins.",
        ],
      },
      {
        heading: "Calalina's tip",
        paragraphs: [
          "If you are not sure, ask us in the shop. Produce changes with the season, ripeness and the heat in Barcelona that day.",
          "Better storage starts with choosing well: buy at the right point, store with care and enjoy without rushing.",
        ],
      },
    ]),
  },
  {
    slug: "fruita-de-temporada-que-mengem-cada-mes",
    category: "Fruita de temporada",
    coverImage: "/images/blog/temporada.png",
    titleCa: "Fruita de temporada: què mengem cada mes",
    titleEs: "Fruta de temporada: qué comemos cada mes",
    titleEn: "Seasonal fruit: what to eat each month",
    excerptCa:
      "Una guia visual i senzilla per descobrir quines fruites estan en el seu millor moment durant cada època de l’any.",
    excerptEs:
      "Una guía visual y sencilla para descubrir qué frutas están en su mejor momento durante cada época del año.",
    excerptEn:
      "A simple visual guide to discover which fruits are at their best in each season.",
    contentCa: articleContent("5 min", [
      {
        heading: "Per què menjar fruita de temporada",
        paragraphs: [
          "Menjar fruita de temporada és una manera de gaudir de més sabor, millor textura i una compra amb més sentit.",
          "Quan la fruita arriba en el seu moment natural, necessita menys viatge, conserva millor l'aroma i sol estar més equilibrada de preu.",
        ],
      },
      {
        heading: "Calendari ràpid",
        items: [
          "Gener i febrer: taronges, mandarines, kiwi, pomes i peres.",
          "Primavera: maduixes, nespres, albercocs i les primeres cireres.",
          "Estiu: préssecs, nectarines, meló, síndria, prunes i figues.",
          "Tardor: raïm, caqui, magrana, pomes, peres i cítrics primerencs.",
        ],
      },
      {
        heading: "Comprar amb criteri",
        tips: [
          {
            title: "Mira el punt de maduració",
            text: "Si ho vols per avui, tria peces més madures. Si és per d'aquí uns dies, millor una mica més fermes.",
          },
          {
            title: "Pregunta per l'origen",
            text: "El producte proper acostuma a arribar amb més frescor i menys temps de transport.",
          },
        ],
      },
    ]),
    contentEs: articleContent("5 min", [
      {
        heading: "Por qué comer fruta de temporada",
        paragraphs: [
          "Comer fruta de temporada es una manera de disfrutar más sabor, mejor textura y una compra con más sentido.",
          "Cuando la fruta llega en su momento natural, necesita menos viaje, conserva mejor el aroma y suele estar más equilibrada de precio.",
        ],
      },
      {
        heading: "Calendario rápido",
        items: [
          "Enero y febrero: naranjas, mandarinas, kiwi, manzanas y peras.",
          "Primavera: fresas, nísperos, albaricoques y las primeras cerezas.",
          "Verano: melocotones, nectarinas, melón, sandía, ciruelas e higos.",
          "Otoño: uva, caqui, granada, manzanas, peras y primeros cítricos.",
        ],
      },
      {
        heading: "Comprar con criterio",
        tips: [
          {
            title: "Mira el punto de maduración",
            text: "Si lo quieres para hoy, elige piezas más maduras. Si es para dentro de unos días, mejor algo más firmes.",
          },
          {
            title: "Pregunta por el origen",
            text: "El producto cercano suele llegar con más frescura y menos tiempo de transporte.",
          },
        ],
      },
    ]),
    contentEn: articleContent("5 min", [
      {
        heading: "Why eat seasonal fruit",
        paragraphs: [
          "Eating seasonal fruit is a way to enjoy more flavour, better texture and a more thoughtful shop.",
          "When fruit arrives at its natural moment, it travels less, keeps more aroma and is usually better balanced in price.",
        ],
      },
      {
        heading: "Quick calendar",
        items: [
          "January and February: oranges, mandarins, kiwi, apples and pears.",
          "Spring: strawberries, loquats, apricots and the first cherries.",
          "Summer: peaches, nectarines, melon, watermelon, plums and figs.",
          "Autumn: grapes, persimmon, pomegranate, apples, pears and early citrus.",
        ],
      },
      {
        heading: "Shop with intention",
        tips: [
          {
            title: "Check ripeness",
            text: "If you want it for today, choose riper pieces. If it is for a few days from now, choose firmer fruit.",
          },
          {
            title: "Ask about origin",
            text: "Local produce often arrives fresher and with less transport time.",
          },
        ],
      },
    ]),
  },
  {
    slug: "com-conservar-les-verdures-fresques-mes-temps",
    category: "Consells de conservació",
    coverImage: "/images/blog/frescas.png",
    titleCa: "Com conservar les verdures fresques més temps",
    titleEs: "Cómo conservar las verduras frescas más tiempo",
    titleEn: "How to keep vegetables fresh for longer",
    excerptCa:
      "Petits canvis a l’hora de guardar les verdures poden ajudar-te a mantenir-les fresques, cruixents i saboroses durant més dies.",
    excerptEs:
      "Pequeños cambios al guardar las verduras pueden ayudarte a mantenerlas frescas, crujientes y sabrosas durante más días.",
    excerptEn:
      "Small storage changes can help keep vegetables fresh, crisp and flavourful for more days.",
    contentCa: articleContent("4 min", [
      {
        heading: "La nevera ajuda, però l'ordre també",
        paragraphs: [
          "Per seguretat, la nevera hauria d'estar a 4 °C o menys, especialment per productes peribles com fulles verdes, herbes i bolets.",
          "La clau és controlar humitat, aire i maduració. No totes les verdures demanen el mateix.",
        ],
      },
      {
        heading: "Fulles verdes i herbes",
        intro: "Per conservar millor:",
        items: [
          "No rentis tot abans de guardar-ho.",
          "Fes servir paper absorbent o draps nets.",
          "Evita recipients massa hermètics si acumulen humitat.",
          "Revisa cada dos dies i retira peces molt madures.",
        ],
      },
      {
        heading: "El que millor viu fora",
        paragraphs: [
          "Patates, cebes seques, alls, carbasses senceres i tomàquets que encara han de madurar es conserven millor en un lloc fresc, sec i ventilat.",
        ],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "Una bona verdura comença al mercat, però es manté a casa amb petits gestos: fred correcte, poca humitat i una mica d'ordre.",
        ],
      },
    ]),
    contentEs: articleContent("4 min", [
      {
        heading: "La nevera ayuda, pero el orden también",
        paragraphs: [
          "Por seguridad, la nevera debería estar a 4 °C o menos, especialmente para productos perecederos como hojas verdes, hierbas y setas.",
          "La clave es controlar humedad, aire y maduración. No todas las verduras piden lo mismo.",
        ],
      },
      {
        heading: "Hojas verdes y hierbas",
        intro: "Para conservar mejor:",
        items: [
          "No lo laves todo antes de guardarlo.",
          "Usa papel absorbente o paños limpios.",
          "Evita recipientes demasiado herméticos si acumulan humedad.",
          "Revisa cada dos días y retira piezas muy maduras.",
        ],
      },
      {
        heading: "Lo que vive mejor fuera",
        paragraphs: [
          "Patatas, cebollas secas, ajos, calabazas enteras y tomates que todavía tienen que madurar se conservan mejor en un lugar fresco, seco y ventilado.",
        ],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "Una buena verdura empieza en el mercado, pero se mantiene en casa con pequeños gestos: frío correcto, poca humedad y un poco de orden.",
        ],
      },
    ]),
    contentEn: articleContent("4 min", [
      {
        heading: "The fridge helps, but order matters too",
        paragraphs: [
          "For safety, the fridge should be at 4 °C or below, especially for perishable products such as leafy greens, herbs and mushrooms.",
          "The key is controlling humidity, airflow and ripening. Not every vegetable needs the same care.",
        ],
      },
      {
        heading: "Leafy greens and herbs",
        intro: "To store them better:",
        items: [
          "Do not wash everything before storing it.",
          "Use absorbent paper or clean cloths.",
          "Avoid containers that are too airtight if they trap moisture.",
          "Check every couple of days and remove very ripe pieces.",
        ],
      },
      {
        heading: "What lives better outside",
        paragraphs: [
          "Potatoes, dry onions, garlic, whole pumpkins and tomatoes that still need to ripen keep better in a cool, dry and ventilated place.",
        ],
      },
      {
        heading: "Calalina's tip",
        paragraphs: [
          "Good vegetables start at the market, but they last at home with small habits: the right cold, less humidity and a little order.",
        ],
      },
    ]),
  },
  {
    slug: "idees-rapides-amb-productes-del-mercat",
    category: "Receptes fàcils",
    coverImage: "/images/blog/recetas.png",
    titleCa: "Idees ràpides amb productes del mercat",
    titleEs: "Ideas rápidas con productos del mercado",
    titleEn: "Quick ideas with market produce",
    excerptCa:
      "Receptes simples, fresques i amb molt sabor per resoldre el dia a dia amb fruita, verdura i productes de temporada.",
    excerptEs:
      "Recetas simples, frescas y con mucho sabor para resolver el día a día con fruta, verdura y productos de temporada.",
    excerptEn:
      "Simple, fresh and flavourful recipes for everyday meals with fruit, vegetables and seasonal produce.",
    contentCa: articleContent("3 min", [
      {
        heading: "Cuinar bé sense complicar-se",
        paragraphs: [
          "Amb bons productes del mercat pots preparar plats ràpids, frescos i saborosos en pocs minuts.",
          "La clau és tenir a mà ingredients versàtils: tomàquets bons, alvocat, ous, herbes fresques, verdures cruixents i fruita de temporada.",
        ],
      },
      {
        heading: "Idees per repetir",
        items: [
          "Amanida de tomàquet, alvocat i herbes fresques.",
          "Saltat ràpid de verdures amb ou.",
          "Bol de fruita de temporada amb llima i menta.",
          "Torrada amb formatge fresc, tomàquet i oli d'oliva.",
        ],
      },
      {
        heading: "El consell de Calalina",
        paragraphs: [
          "Passa per la botiga, mira què està al punt i deixa que la temporada et doni idees. A vegades, el millor plat comença amb una pregunta molt simple: què està bo avui?",
        ],
      },
    ]),
    contentEs: articleContent("3 min", [
      {
        heading: "Cocinar bien sin complicarse",
        paragraphs: [
          "Con buenos productos del mercado puedes preparar platos rápidos, frescos y sabrosos en pocos minutos.",
          "La clave es tener a mano ingredientes versátiles: buenos tomates, aguacate, huevos, hierbas frescas, verduras crujientes y fruta de temporada.",
        ],
      },
      {
        heading: "Ideas para repetir",
        items: [
          "Ensalada de tomate, aguacate y hierbas frescas.",
          "Salteado rápido de verduras con huevo.",
          "Bol de fruta de temporada con lima y menta.",
          "Tostada con queso fresco, tomate y aceite de oliva.",
        ],
      },
      {
        heading: "El consejo de Calalina",
        paragraphs: [
          "Pasa por la tienda, mira qué está en su punto y deja que la temporada te dé ideas. A veces, el mejor plato empieza con una pregunta muy simple: ¿qué está bueno hoy?",
        ],
      },
    ]),
    contentEn: articleContent("3 min", [
      {
        heading: "Cooking well without overcomplicating it",
        paragraphs: [
          "With good market produce you can prepare quick, fresh and tasty dishes in just a few minutes.",
          "The key is keeping versatile ingredients on hand: good tomatoes, avocado, eggs, fresh herbs, crisp vegetables and seasonal fruit.",
        ],
      },
      {
        heading: "Ideas to repeat",
        items: [
          "Tomato, avocado and fresh herb salad.",
          "Quick vegetable stir-fry with egg.",
          "Seasonal fruit bowl with lime and mint.",
          "Toast with fresh cheese, tomato and olive oil.",
        ],
      },
      {
        heading: "Calalina's tip",
        paragraphs: [
          "Come by the shop, see what is at its best and let the season give you ideas. Sometimes the best dish starts with a very simple question: what is good today?",
        ],
      },
    ]),
  },
].map((article) => ({
  ...article,
  contentEs: article.contentEs,
  contentEn: article.contentEn,
  seoTitleCa: article.titleCa,
  seoTitleEs: article.titleEs,
  seoTitleEn: article.titleEn,
  seoDescriptionCa: article.excerptCa,
  seoDescriptionEs: article.excerptEs,
  seoDescriptionEn: article.excerptEn,
}));

const galleryImages = [
  ["g1", "botiga"],
  ["g2", "fruita"],
  ["g3", "verdura"],
  ["g4", "raco-llati"],
  ["g5", "botiga"],
  ["g6", "fruita"],
  ["g7", "verdura"],
  ["g10", "temporada"],
  ["g11", "botiga"],
  ["g12", "fruita"],
  ["g13", "verdura"],
  ["g14", "raco-llati"],
  ["g15", "verdura"],
  ["g16", "verdura"],
  ["g17", "pissarres"],
  ["g19", "botiga"],
  ["g20", "raco-llati"],
  ["g22", "temporada"],
  ["g23", "botiga"],
  ["g24", "fruita"],
  ["g25", "verdura"],
  ["g26", "fruita"],
  ["g27", "fruita"],
  ["g28", "botiga"],
].map(([name, category], index) => {
  const title = `Galeria Calalina ${index + 1}`;

  return {
    image: `/images/gallery/calalina/${name}.png`,
    titleCa: title,
    titleEs: `Galería Calalina ${index + 1}`,
    titleEn: `Calalina gallery ${index + 1}`,
    altCa: `${title} amb productes i detalls de la botiga`,
    altEs: `Galería Calalina ${index + 1} con productos y detalles de la tienda`,
    altEn: `Calalina gallery ${index + 1} with shop products and details`,
    category,
    isFeatured: index < 6,
    isVisible: true,
    showOnHome: index < 12,
    isArchived: false,
    sortOrder: index,
  };
});

const featuredProducts = [
  {
    slug: "malta-llatina",
    categorySlug: "begudes",
    nameCa: "Malta llatina",
    nameEs: "Malta latina",
    nameEn: "Latin malt drink",
    price: 2.2,
    unit: "bottle",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/latino1_cvrwe5.png",
    isLatin: true,
  },
  {
    slug: "alberginies",
    categorySlug: "verdura",
    nameCa: "Albergínies",
    nameEs: "Berenjenas",
    nameEn: "Eggplants",
    price: 2.95,
    unit: "kg",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g16_ijkdcj.png",
  },
  {
    slug: "kiwi",
    categorySlug: "fruita",
    nameCa: "Kiwi",
    nameEs: "Kiwi",
    nameEn: "Kiwi",
    price: 3.9,
    unit: "kg",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g26_abv1bz.png",
  },
  {
    slug: "carxofa",
    categorySlug: "verdura",
    nameCa: "Carxofa",
    nameEs: "Alcachofa",
    nameEn: "Artichoke",
    price: 3.5,
    unit: "kg",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g15_pcxlzk.png",
  },
  {
    slug: "platan-mascle",
    categorySlug: "productes-llatins",
    nameCa: "Plàtan mascle",
    nameEs: "Plátano macho",
    nameEn: "Plantain",
    price: 2.8,
    unit: "kg",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921729/g20_fqbbni.png",
    isLatin: true,
  },
  {
    slug: "alvocat",
    categorySlug: "fruita",
    nameCa: "Alvocat",
    nameEs: "Aguacate",
    nameEn: "Avocado",
    price: 1.65,
    unit: "unit",
    image:
      "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921835/g27_n0gqsk.png",
  },
];

async function main() {
  for (const [sortOrder, [nameCa, nameEs, nameEn, slug]] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug },
      update: { nameCa, nameEs, nameEn, sortOrder },
      create: { nameCa, nameEs, nameEn, slug, sortOrder },
    });
  }

  for (const [index, article] of blogArticles.entries()) {
    await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: {
        ...article,
        status: "published",
        publishedAt: new Date(Date.UTC(2026, 5, 30, 12, index)),
      },
      create: {
        ...article,
        status: "published",
        publishedAt: new Date(Date.UTC(2026, 5, 30, 12, index)),
      },
    });
  }

  for (const image of galleryImages) {
    await prisma.galleryImage.upsert({
      where: { image: image.image },
      update: image,
      create: image,
    });
  }

  for (const product of featuredProducts) {
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        nameCa: product.nameCa,
        nameEs: product.nameEs,
        nameEn: product.nameEn,
        categoryId: category?.id,
        price: product.price,
        unit: product.unit,
        stockStatus: "available",
        isActive: true,
        availableOnline: true,
        isFeatured: true,
        isSeasonal: true,
        isLatin: Boolean(product.isLatin),
        images: [product.image],
      },
      create: {
        slug: product.slug,
        nameCa: product.nameCa,
        nameEs: product.nameEs,
        nameEn: product.nameEn,
        categoryId: category?.id,
        price: product.price,
        unit: product.unit,
        stockStatus: "available",
        isActive: true,
        availableOnline: true,
        isFeatured: true,
        isSeasonal: true,
        isLatin: Boolean(product.isLatin),
        images: [product.image],
      },
    });
  }

  const existingSettings = await prisma.storeSettings.findFirst();
  const defaultStoreSettings = {
    businessName: "Fruteria Calalina",
    address: "Passeig de Sant Joan, 195 - CALALINA, 08037 Barcelona",
    phone: "+34 932 10 21 53",
    email: "hola@calalina.cat",
    googleMapsUrl: "https://www.google.com/maps/place/Fruteria+Calalina/",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=Fruteria%20Calalina%2C%20Passeig%20de%20Sant%20Joan%20195%2C%20Barcelona&z=17&output=embed",
    useGoogleHours: true,
    onlineOrdersEnabled: true,
    pickupEnabled: true,
    deliveryEnabled: true,
    deliveryRequestEnabled: true,
    deliveryPostalCodes: "08025,08037,08013",
    deliveryFee: 3.5,
    manualOpeningHoursCa:
      "Dimarts a dijous: 9:00-14:00 / 17:00-20:00\nDivendres: 9:00-15:00 / 17:00-20:00\nDissabte: 9:00-14:00\nDiumenge i dilluns: Tancat",
    manualOpeningHoursEs:
      "Martes a jueves: 9:00-14:00 / 17:00-20:00\nViernes: 9:00-15:00 / 17:00-20:00\nSábado: 9:00-14:00\nDomingo y lunes: Cerrado",
    manualOpeningHoursEn:
      "Tuesday to Thursday: 9:00-14:00 / 17:00-20:00\nFriday: 9:00-15:00 / 17:00-20:00\nSaturday: 9:00-14:00\nSunday and Monday: Closed",
    deliveryMessageCa:
      "Ara mateix nomes fem delivery en zones properes a la botiga. Pots triar recollida a botiga o consultar-nos per WhatsApp.",
    deliveryMessageEs:
      "Ahora mismo solo hacemos delivery en zonas cercanas a la tienda. Puedes elegir recogida en tienda o consultarnos por WhatsApp.",
    deliveryMessageEn:
      "Local delivery is currently available only near the shop. You can choose store pickup or contact us on WhatsApp.",
  };

  if (existingSettings) {
    await prisma.storeSettings.update({
      where: { id: existingSettings.id },
      data: {
        pickupEnabled: true,
        deliveryEnabled: true,
        deliveryRequestEnabled: true,
        deliveryPostalCodes: existingSettings.deliveryPostalCodes || defaultStoreSettings.deliveryPostalCodes,
        deliveryFee: existingSettings.deliveryFee ?? defaultStoreSettings.deliveryFee,
      },
    });
  } else {
    await prisma.storeSettings.create({ data: defaultStoreSettings });
  }

  if (process.env.ADMIN_EMAIL) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { role: "owner" },
      create: {
        email: process.env.ADMIN_EMAIL,
        name: "Calalina Admin",
        role: "owner",
      },
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
