export const locales = ["ca", "es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ca";

export const localeLabels: Record<Locale, string> = {
  ca: "CA",
  es: "ES",
  en: "EN",
};

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

const shared = {
  address: "Passeig de Sant Joan, 195 - CALALINA, 08037 Barcelona, Espana",
  streetAddress: "Passeig de Sant Joan, 195 - CALALINA",
  postalCode: "08037",
  phone: "+34 932 10 21 53",
  email: "hola@calalina.cat",
  website: "calalina.com",
  plusCode: "C537+H7 Barcelona, Espana",
  mapUrl:
    "https://www.google.com/maps/place/Fruteria+Calalina/@41.4038791,2.1605812,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a2bde0a527b9:0x1ab15ea5396060d2!8m2!3d41.4038791!4d2.1631561!16s%2Fg%2F11g6vghdwy?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Fruteria%20Calalina%2C%20Passeig%20de%20Sant%20Joan%20195%2C%20Barcelona&z=17&output=embed",
  googlePlaceId: "",
  useGoogleHours: true,
  mapsVideoUrl: "https://maps.app.goo.gl/DdMEr7k7oinNf57u5",
  galleryVideoImage:
    "https://res.cloudinary.com/doroh5hbv/image/upload/v1782916236/Screenshot_2026-06-30_at_15.38.43_cklhnt.png",
  social: ["Instagram", "Facebook", "WhatsApp"],
};

const animationAssets = [
  {
    key: "fruit",
    image: "https://res.cloudinary.com/doroh5hbv/image/upload/v1782913987/1_ddwwiv.png",
    video: "https://res.cloudinary.com/doroh5hbv/video/upload/v1782914007/animacion1_jsyyd2.mp4",
  },
  {
    key: "vegetables",
    image: "https://res.cloudinary.com/doroh5hbv/image/upload/v1782913998/3_u55wzm.png",
    video: "https://res.cloudinary.com/doroh5hbv/video/upload/v1782913995/animacion3_bpkzh0.mp4",
  },
  {
    key: "greens",
    image: "https://res.cloudinary.com/doroh5hbv/image/upload/v1782913990/2_abzyra.png",
    video: "https://res.cloudinary.com/doroh5hbv/video/upload/v1782913994/animacion2_yoztpn.mp4",
  },
  {
    key: "products",
    image: "https://res.cloudinary.com/doroh5hbv/image/upload/v1782913989/4_mid6sd.png",
    video: "https://res.cloudinary.com/doroh5hbv/video/upload/v1782913990/animacion4_kgo4xn.mp4",
  },
] as const;

function localizedAnimations(labels: Record<(typeof animationAssets)[number]["key"], string>) {
  return animationAssets.map((item) => ({
    title: labels[item.key],
    label: labels[item.key],
    image: item.image,
    video: item.video,
  }));
}

export const siteContent = {
  ca: {
    metadata: {
      title: "Calalina · Fruita, verdura i sabors llatins a Barcelona",
      description:
        "Fruiteria de barri a Barcelona amb fruita fresca, verdura de temporada, productes de proximitat i un raco llati especial.",
      ogLocale: "ca_ES",
      imageAlt: "Calalina fruiteria de barri a Barcelona",
    },
    navItems: [
      { label: "Inici", href: "#inici" },
      { label: "Qui som", href: "#qui-som" },
      { label: "Temporada", href: "#temporada" },
      { label: "Productes", href: "/productes" },
      { label: "Raco llati", href: "/raco-llati" },
      { label: "Consells", href: "/consells" },
      { label: "Galeria", href: "#galeria" },
      { label: "Ubicacio", href: "#ubicacio" },
    ],
    header: {
      brandSubtitle: "Fruiteria",
      homeAriaLabel: "Calalina inici",
      navAriaLabel: "Navegacio principal",
      mobileNavAriaLabel: "Navegacio mobil",
      menuAriaLabel: "Obrir menu",
    },
    hero: {
      eyebrow: "Producte de proximitat · Raco llati · Barcelona",
      title: "Fruita fresca, verdura de temporada i sabors llatins a Barcelona.",
      text: "Una botiga de barri amb productes triats amb amor, colors vius i una seleccio especial que connecta tradicio mediterrania i sabors llatins.",
      primaryCta: "Veure temporada",
      secondaryCta: "Com arribar",
      chips: ["Producte de proximitat", "Raco llati", "Consells de conservacio"],
      animations: localizedAnimations({
        fruit: "Fruita",
        vegetables: "Hortalisses",
        greens: "Verdures",
        products: "Productes",
      }),
    },
    about: {
      label: "1. Qui som",
      title: "Fruita de veritat, servei de barri.",
      text: "Som Calalina, una fruiteria de Barcelona amb anima mediterrania i cor llati. Seleccionem cada dia el millor de la terra per oferir-te frescor, sabor i confianca. Ens mou el respecte per la temporada, el producte de proximitat i la connexio humana.",
      imageAlt: "Interior calid de Calalina amb producte fresc",
      badgeTitle: "Ca la Lina",
      badgeText: "Fresc, proper i fet amb cura",
      cta: "Coneix-nos millor",
    },
    offer: {
      label: "2. Que oferim",
      title: "Tot el que necessites per menjar fresc, bo i amb sabor.",
      discover: "Descobrir",
      cards: [
        {
          title: "Fruita de temporada",
          text: "Dolca, sucosa i plena de color. Directe del camp a la nostra botiga.",
          icon: "fruit",
          href: "/ca/temporada",
        },
        {
          title: "Verdures fresques",
          text: "De proximitat i de mercat, collides al punt optim.",
          icon: "leaf",
          href: "/ca/verdures",
        },
        {
          title: "Raco llati",
          text: "Productes llatins seleccionats per portar els teus sabors mes a prop.",
          icon: "sun",
          href: "/ca/raco-llati",
        },
        {
          title: "Consells de conservacio",
          text: "Idees i trucs per guardar mes temps els teus aliments preferits.",
          icon: "jar",
          href: "/ca/consells",
        },
      ],
    },
    products: {
      label: "3. Productes destacats",
      title: "Avui a Calalina.",
      viewAll: "Veure tots els productes",
      empty: "Aviat afegirem productes per demanar online.",
      items: [
        {
          name: "Malta llatina",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/latino1_cvrwe5.png",
        },
        {
          name: "Alberginies",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g16_ijkdcj.png",
        },
        {
          name: "Kiwi",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g26_abv1bz.png",
        },
        {
          name: "Carxofa",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g15_pcxlzk.png",
        },
        {
          name: "Platan mascle",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921729/g20_fqbbni.png",
        },
        {
          name: "Alvocat",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921835/g27_n0gqsk.png",
        },
      ],
    },
    blog: {
      label: "4. El rebost de Calalina",
      title: "Consells utils per comprar, guardar i gaudir millor.",
      readMore: "Llegir article",
      empty: "Els articles estaran disponibles molt aviat.",
    },
    gallery: {
      label: "5. Galeria",
      title: "Colors, textures i vida de mercat.",
      empty: "La galeria estara disponible molt aviat.",
    },
    cart: {
      button: "Carret",
      title: "El teu carret",
      pickup: "Recollida a botiga",
      checkoutTitle: "Finalitzar comanda",
      checkoutDescription:
        "Recollida a botiga. El total es estimat. Confirmarem disponibilitat i import final abans de preparar la comanda.",
      fulfillmentTitle: "Com vols rebre la comanda?",
      pickupOption: "Recollida a botiga",
      pickupDescription: "Vine a buscar la teva comanda quan estigui preparada.",
      deliveryOption: "Delivery al barri",
      deliveryDescription:
        "Nomes disponible en zones properes. Confirmarem disponibilitat abans de preparar la comanda.",
      empty: "Encara no tens productes al carret.",
      subtotal: "Subtotal",
      deliveryFee: "Delivery",
      estimatedTotal: "Total estimat",
      estimatedNote:
        "El total es estimat. Confirmarem disponibilitat i import final abans de preparar la comanda.",
      checkoutCta: "Finalitzar comanda",
      name: "Nom",
      phone: "Telefon",
      email: "Email opcional",
      pickupDate: "Dia/hora de recollida opcional",
      deliveryAddress: "Adreca de delivery",
      deliveryAddressExtra: "Pis, porta o referencia opcional",
      deliveryPostalCode: "Codi postal",
      deliveryInstructions: "Instruccions de delivery opcionals",
      notes: "Notes",
      sending: "Enviant...",
      order: "Comanda",
      whatsapp: "Enviar resum per WhatsApp",
      whatsappMissing: "WhatsApp no configurat.",
      ordersUnavailable: "Les comandes online no estan disponibles ara mateix.",
      add: "Afegir al carret",
      soldOut: "Esgotat",
      remove: "Eliminar",
      close: "Tancar carret",
    },
    location: {
      label: "6. Ubicacio",
      title: "On som",
      storeName: "Fruteria Calalina",
      addressLabel: "Adreca",
      address: shared.address,
      scheduleLabel: "Horari",
      schedule: "Dimarts a dissabte · consulta horaris detallats",
      phoneLabel: "Telefon",
      phone: shared.phone,
      websiteLabel: "Web",
      website: shared.website,
      plusCodeLabel: "Plus Code",
      plusCode: shared.plusCode,
      emailLabel: "Email",
      email: shared.email,
      services: "Compra en botiga · A domicili",
      mapLabel: "Fruteria Calalina a Google Maps",
      mapUrl: shared.mapUrl,
      mapEmbedUrl: shared.mapEmbedUrl,
      googlePlaceId: shared.googlePlaceId,
      useGoogleHours: shared.useGoogleHours,
      googleHoursUpdatedText: "Horari actualitzat des de Google Maps",
      openStatusText: "Obert ara",
      closedStatusText: "Tancat ara",
      hours: [
        { day: "Dilluns", time: "Tancat" },
        { day: "Dimarts", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Dimecres", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Dijous", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Divendres", time: "9:00-15:00 / 17:00-20:00" },
        { day: "Dissabte", time: "9:00-14:00" },
        { day: "Diumenge", time: "Tancat" },
      ],
      visitTitle: "Vine a veure'ns!",
      visitText: "T'esperem amb somriure, bons productes i molt bon ambient.",
      specialNotice: "",
      cta: "Com arribar",
      social: shared.social,
    },
    footer: {
      tagline: "Sabors que ens connecten.",
      columns: [
        { title: "BOTIGA", links: ["Inici", "Qui som", "Temporada", "Productes"] },
        { title: "INSPIRACIO", links: ["Raco llati", "Consells", "Galeria"] },
        {
          title: "INFORMACIO",
          links: ["Ubicacio", "Contacte", "Politica de privacitat", "Avis legal"],
        },
      ],
      newsletterTitle: "Butlleti Calalina",
      newsletterText: "Rep consells, novetats i ofertes de temporada al teu correu.",
      emailLabel: "El teu correu",
      emailPlaceholder: "El teu correu",
      submit: "Subscriure",
      copyright:
        "© 2026 Calalina · Fruiteria de barri a Barcelona · Tots els drets reservats",
    },
    jsonLdDescription:
      "Fruiteria de barri a Barcelona amb fruita fresca, verdura de temporada, productes de proximitat i raco llati.",
  },
  es: {
    metadata: {
      title: "Calalina · Fruta, verdura y sabores latinos en Barcelona",
      description:
        "Fruteria de barrio en Barcelona con fruta fresca, verdura de temporada, productos de proximidad y un rincon latino especial.",
      ogLocale: "es_ES",
      imageAlt: "Calalina fruteria de barrio en Barcelona",
    },
    navItems: [
      { label: "Inicio", href: "#inici" },
      { label: "Quienes somos", href: "#qui-som" },
      { label: "Temporada", href: "#temporada" },
      { label: "Productos", href: "/productos" },
      { label: "Rincon latino", href: "/rincon-latino" },
      { label: "Consejos", href: "/consejos" },
      { label: "Galeria", href: "#galeria" },
      { label: "Ubicacion", href: "#ubicacio" },
    ],
    header: {
      brandSubtitle: "Fruteria",
      homeAriaLabel: "Calalina inicio",
      navAriaLabel: "Navegacion principal",
      mobileNavAriaLabel: "Navegacion movil",
      menuAriaLabel: "Abrir menu",
    },
    hero: {
      eyebrow: "Producto de proximidad · Rincon latino · Barcelona",
      title: "Fruta fresca, verdura de temporada y sabores latinos en Barcelona.",
      text: "Una tienda de barrio con productos elegidos con carino, colores vivos y una seleccion especial que conecta tradicion mediterranea y sabores latinos.",
      primaryCta: "Ver temporada",
      secondaryCta: "Como llegar",
      chips: ["Producto de proximidad", "Rincon latino", "Consejos de conservacion"],
      animations: localizedAnimations({
        fruit: "Frutas",
        vegetables: "Hortalizas",
        greens: "Verduras",
        products: "Productos",
      }),
    },
    about: {
      label: "1. Quienes somos",
      title: "Fruta de verdad, servicio de barrio.",
      text: "Somos Calalina, una fruteria de Barcelona con alma mediterranea y corazon latino. Seleccionamos cada dia lo mejor de la tierra para ofrecerte frescura, sabor y confianza. Nos mueve el respeto por la temporada, el producto de proximidad y la conexion humana.",
      imageAlt: "Interior calido de Calalina con producto fresco",
      badgeTitle: "Ca la Lina",
      badgeText: "Fresco, cercano y hecho con cuidado",
      cta: "Conocenos mejor",
    },
    offer: {
      label: "2. Que ofrecemos",
      title: "Todo lo que necesitas para comer fresco, rico y con sabor.",
      discover: "Descubrir",
      cards: [
        {
          title: "Fruta de temporada",
          text: "Dulce, jugosa y llena de color. Directa del campo a nuestra tienda.",
          icon: "fruit",
          href: "/es/temporada",
        },
        {
          title: "Verduras frescas",
          text: "De proximidad y de mercado, recogidas en su punto optimo.",
          icon: "leaf",
          href: "/es/verduras",
        },
        {
          title: "Rincon latino",
          text: "Productos latinos seleccionados para acercarte tus sabores favoritos.",
          icon: "sun",
          href: "/es/rincon-latino",
        },
        {
          title: "Consejos de conservacion",
          text: "Ideas y trucos para guardar mas tiempo tus alimentos preferidos.",
          icon: "jar",
          href: "/es/consejos",
        },
      ],
    },
    products: {
      label: "3. Productos destacados",
      title: "Hoy en Calalina.",
      viewAll: "Ver todos los productos",
      empty: "Pronto agregaremos productos para pedir online.",
      items: [
        {
          name: "Malta",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/latino1_cvrwe5.png",
        },
        {
          name: "Berenjenas",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g16_ijkdcj.png",
        },
        {
          name: "Kiwi",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g26_abv1bz.png",
        },
        {
          name: "Alcachofa",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g15_pcxlzk.png",
        },
        {
          name: "Platano macho",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921729/g20_fqbbni.png",
        },
        {
          name: "Aguacate",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921835/g27_n0gqsk.png",
        },
      ],
    },
    blog: {
      label: "4. La despensa de Calalina",
      title: "Consejos utiles para comprar, guardar y disfrutar mejor.",
      readMore: "Leer articulo",
      empty: "Los articulos estaran disponibles muy pronto.",
    },
    gallery: {
      label: "5. Galeria",
      title: "Colores, texturas y vida de mercado.",
      empty: "La galeria estara disponible muy pronto.",
    },
    cart: {
      button: "Carrito",
      title: "Tu carrito",
      pickup: "Recogida en tienda",
      checkoutTitle: "Finalizar pedido",
      checkoutDescription:
        "Recogida en tienda. El total es estimado. Confirmaremos disponibilidad e importe final antes de preparar el pedido.",
      fulfillmentTitle: "¿Cómo quieres recibir tu pedido?",
      pickupOption: "Recogida en tienda",
      pickupDescription: "Ven a buscar tu pedido cuando esté preparado.",
      deliveryOption: "Delivery en el barrio",
      deliveryDescription:
        "Solo disponible en zonas cercanas. Confirmaremos disponibilidad antes de preparar el pedido.",
      empty: "Todavia no tienes productos en el carrito.",
      subtotal: "Subtotal",
      deliveryFee: "Delivery",
      estimatedTotal: "Total estimado",
      estimatedNote:
        "El total es estimado. Confirmaremos disponibilidad e importe final antes de preparar el pedido.",
      checkoutCta: "Finalizar pedido",
      name: "Nombre",
      phone: "Telefono",
      email: "Email opcional",
      pickupDate: "Dia/hora de recogida opcional",
      deliveryAddress: "Dirección de delivery",
      deliveryAddressExtra: "Piso, puerta o referencia opcional",
      deliveryPostalCode: "Código postal",
      deliveryInstructions: "Instrucciones de delivery opcionales",
      notes: "Notas",
      sending: "Enviando...",
      order: "Pedido",
      whatsapp: "Enviar resumen por WhatsApp",
      whatsappMissing: "WhatsApp no configurado.",
      ordersUnavailable: "Los pedidos online no están disponibles ahora mismo.",
      add: "Añadir al carrito",
      soldOut: "Agotado",
      remove: "Eliminar",
      close: "Cerrar carrito",
    },
    location: {
      label: "6. Ubicacion",
      title: "Donde estamos",
      storeName: "Fruteria Calalina",
      addressLabel: "Direccion",
      address: shared.address,
      scheduleLabel: "Horario",
      schedule: "Martes a sabado · consulta horarios detallados",
      phoneLabel: "Telefono",
      phone: shared.phone,
      websiteLabel: "Web",
      website: shared.website,
      plusCodeLabel: "Plus Code",
      plusCode: shared.plusCode,
      emailLabel: "Email",
      email: shared.email,
      services: "Compra en tienda · A domicilio",
      mapLabel: "Fruteria Calalina en Google Maps",
      mapUrl: shared.mapUrl,
      mapEmbedUrl: shared.mapEmbedUrl,
      googlePlaceId: shared.googlePlaceId,
      useGoogleHours: shared.useGoogleHours,
      googleHoursUpdatedText: "Horario actualizado desde Google Maps",
      openStatusText: "Abierto ahora",
      closedStatusText: "Cerrado ahora",
      hours: [
        { day: "lunes", time: "Cerrado" },
        { day: "martes", time: "9:00-14:00 / 17:00-20:00" },
        { day: "miercoles", time: "9:00-14:00 / 17:00-20:00" },
        { day: "jueves", time: "9:00-14:00 / 17:00-20:00" },
        { day: "viernes", time: "9:00-15:00 / 17:00-20:00" },
        { day: "sabado", time: "9:00-14:00" },
        { day: "domingo", time: "Cerrado" },
      ],
      visitTitle: "Ven a vernos!",
      visitText: "Te esperamos con sonrisa, buenos productos y muy buen ambiente.",
      specialNotice: "",
      cta: "Como llegar",
      social: shared.social,
    },
    footer: {
      tagline: "Sabores que nos conectan.",
      columns: [
        { title: "TIENDA", links: ["Inicio", "Quienes somos", "Temporada", "Productos"] },
        { title: "INSPIRACION", links: ["Rincon latino", "Consejos", "Galeria"] },
        {
          title: "INFORMACION",
          links: ["Ubicacion", "Contacto", "Politica de privacidad", "Aviso legal"],
        },
      ],
      newsletterTitle: "Boletin Calalina",
      newsletterText: "Recibe consejos, novedades y ofertas de temporada en tu correo.",
      emailLabel: "Tu correo",
      emailPlaceholder: "Tu correo",
      submit: "Suscribirse",
      copyright:
        "© 2026 Calalina · Fruteria de barrio en Barcelona · Todos los derechos reservados",
    },
    jsonLdDescription:
      "Fruteria de barrio en Barcelona con fruta fresca, verdura de temporada, productos de proximidad y rincon latino.",
  },
  en: {
    metadata: {
      title: "Calalina · Fruit, vegetables and Latin flavours in Barcelona",
      description:
        "A neighbourhood greengrocer in Barcelona with fresh fruit, seasonal vegetables, local produce and a special Latin corner.",
      ogLocale: "en_US",
      imageAlt: "Calalina neighbourhood greengrocer in Barcelona",
    },
    navItems: [
      { label: "Home", href: "#inici" },
      { label: "About", href: "#qui-som" },
      { label: "Seasonal", href: "#temporada" },
      { label: "Products", href: "/products" },
      { label: "Latin corner", href: "/latin-corner" },
      { label: "Tips", href: "/tips" },
      { label: "Gallery", href: "#galeria" },
      { label: "Location", href: "#ubicacio" },
    ],
    header: {
      brandSubtitle: "Greengrocer",
      homeAriaLabel: "Calalina home",
      navAriaLabel: "Main navigation",
      mobileNavAriaLabel: "Mobile navigation",
      menuAriaLabel: "Open menu",
    },
    hero: {
      eyebrow: "Local produce · Latin corner · Barcelona",
      title: "Fresh fruit, seasonal vegetables and Latin flavours in Barcelona.",
      text: "A neighbourhood shop with lovingly chosen produce, vivid colours and a special selection that connects Mediterranean tradition with Latin flavours.",
      primaryCta: "See seasonal picks",
      secondaryCta: "How to get here",
      chips: ["Local produce", "Latin corner", "Storage tips"],
      animations: localizedAnimations({
        fruit: "Fruit",
        vegetables: "Vegetables",
        greens: "Greens",
        products: "Products",
      }),
    },
    about: {
      label: "1. About us",
      title: "Real fruit, neighbourhood service.",
      text: "We are Calalina, a Barcelona greengrocer with a Mediterranean soul and a Latin heart. Every day we choose the best from the land to offer freshness, flavour and trust. We care about seasonality, local produce and human connection.",
      imageAlt: "Warm Calalina interior with fresh produce",
      badgeTitle: "Ca la Lina",
      badgeText: "Fresh, local and carefully chosen",
      cta: "Get to know us",
    },
    offer: {
      label: "2. What we offer",
      title: "Everything you need to eat fresh, well and full of flavour.",
      discover: "Discover",
      cards: [
        {
          title: "Seasonal fruit",
          text: "Sweet, juicy and full of colour. Straight from the field to our shop.",
          icon: "fruit",
          href: "/en/seasonal",
        },
        {
          title: "Fresh vegetables",
          text: "Market-fresh and local, picked at just the right moment.",
          icon: "leaf",
          href: "/en/vegetables",
        },
        {
          title: "Latin corner",
          text: "Selected Latin products that bring your favourite flavours closer.",
          icon: "sun",
          href: "/en/latin-corner",
        },
        {
          title: "Storage tips",
          text: "Ideas and tricks to keep your favourite foods fresh for longer.",
          icon: "jar",
          href: "/en/tips",
        },
      ],
    },
    products: {
      label: "3. Featured products",
      title: "Today at Calalina.",
      viewAll: "See all products",
      empty: "We will add products for online requests soon.",
      items: [
        {
          name: "Malt drink",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/latino1_cvrwe5.png",
        },
        {
          name: "Eggplants",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g16_ijkdcj.png",
        },
        {
          name: "Kiwi",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g26_abv1bz.png",
        },
        {
          name: "Artichoke",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921730/g15_pcxlzk.png",
        },
        {
          name: "Plantain",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921729/g20_fqbbni.png",
        },
        {
          name: "Avocado",
          image:
            "https://res.cloudinary.com/doroh5hbv/image/upload/v1782921835/g27_n0gqsk.png",
        },
      ],
    },
    blog: {
      label: "4. Calalina pantry",
      title: "Useful tips to shop, store and enjoy better.",
      readMore: "Read article",
      empty: "Articles will be available very soon.",
    },
    gallery: {
      label: "5. Gallery",
      title: "Colours, textures and market life.",
      empty: "The gallery will be available very soon.",
    },
    cart: {
      button: "Cart",
      title: "Your cart",
      pickup: "In-store pickup",
      checkoutTitle: "Finish order",
      checkoutDescription:
        "In-store pickup. The total is estimated. We will confirm availability and final amount before preparing your order.",
      fulfillmentTitle: "How would you like to receive your order?",
      pickupOption: "Store pickup",
      pickupDescription: "Pick up your order when it is ready.",
      deliveryOption: "Local delivery",
      deliveryDescription:
        "Only available in nearby zones. We will confirm availability before preparing your order.",
      empty: "You do not have products in your cart yet.",
      subtotal: "Subtotal",
      deliveryFee: "Delivery",
      estimatedTotal: "Estimated total",
      estimatedNote:
        "The total is estimated. We will confirm availability and final amount before preparing your order.",
      checkoutCta: "Finish order",
      name: "Name",
      phone: "Phone",
      email: "Optional email",
      pickupDate: "Optional pickup day/time",
      deliveryAddress: "Delivery address",
      deliveryAddressExtra: "Floor, door or reference optional",
      deliveryPostalCode: "Postal code",
      deliveryInstructions: "Optional delivery instructions",
      notes: "Notes",
      sending: "Sending...",
      order: "Order",
      whatsapp: "Send summary by WhatsApp",
      whatsappMissing: "WhatsApp is not configured.",
      ordersUnavailable: "Online orders are not available right now.",
      add: "Add to cart",
      soldOut: "Sold out",
      remove: "Remove",
      close: "Close cart",
    },
    location: {
      label: "6. Location",
      title: "Where to find us",
      storeName: "Fruteria Calalina",
      addressLabel: "Address",
      address: shared.address,
      scheduleLabel: "Opening hours",
      schedule: "Tuesday to Saturday · see detailed hours",
      phoneLabel: "Phone",
      phone: shared.phone,
      websiteLabel: "Website",
      website: shared.website,
      plusCodeLabel: "Plus Code",
      plusCode: shared.plusCode,
      emailLabel: "Email",
      email: shared.email,
      services: "In-store shopping · Delivery",
      mapLabel: "Fruteria Calalina on Google Maps",
      mapUrl: shared.mapUrl,
      mapEmbedUrl: shared.mapEmbedUrl,
      googlePlaceId: shared.googlePlaceId,
      useGoogleHours: shared.useGoogleHours,
      googleHoursUpdatedText: "Hours updated from Google Maps",
      openStatusText: "Open now",
      closedStatusText: "Closed now",
      hours: [
        { day: "Monday", time: "Closed" },
        { day: "Tuesday", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Wednesday", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Thursday", time: "9:00-14:00 / 17:00-20:00" },
        { day: "Friday", time: "9:00-15:00 / 17:00-20:00" },
        { day: "Saturday", time: "9:00-14:00" },
        { day: "Sunday", time: "Closed" },
      ],
      visitTitle: "Come visit us!",
      visitText: "We are waiting with a smile, good produce and a warm atmosphere.",
      specialNotice: "",
      cta: "How to get here",
      social: shared.social,
    },
    footer: {
      tagline: "Flavours that connect us.",
      columns: [
        { title: "SHOP", links: ["Home", "About", "Seasonal", "Products"] },
        { title: "INSPIRATION", links: ["Latin corner", "Tips", "Gallery"] },
        { title: "INFO", links: ["Location", "Contact", "Privacy policy", "Legal notice"] },
      ],
      newsletterTitle: "Calalina newsletter",
      newsletterText: "Get tips, news and seasonal offers in your inbox.",
      emailLabel: "Your email",
      emailPlaceholder: "Your email",
      submit: "Subscribe",
      copyright:
        "© 2026 Calalina · Neighbourhood greengrocer in Barcelona · All rights reserved",
    },
    jsonLdDescription:
      "A neighbourhood greengrocer in Barcelona with fresh fruit, seasonal vegetables, local produce and a Latin corner.",
  },
} satisfies Record<Locale, object>;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
