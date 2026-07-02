export type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
};

export type AdminStat = {
  label: string;
  value: string;
  detail: string;
  tone: "red" | "green" | "yellow" | "navy";
  href: string;
  actionLabel: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  status: "Disponible" | "Bajo stock" | "Agotado";
  featured: boolean;
  seasonal: boolean;
  latin: boolean;
};

export type AdminOrder = {
  id: string;
  customer: string;
  phone: string;
  status: "Nuevo" | "Confirmado" | "Preparando" | "Listo" | "Entregado";
  fulfillment: "Recogida" | "Entrega";
  total: string;
  createdAt: string;
};

export type AdminPost = {
  id: string;
  title: string;
  category: string;
  status: "Publicado" | "Borrador";
  localeStatus: string;
  updatedAt: string;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Panel", icon: "⌂" },
  { href: "/admin/products", label: "Productos", icon: "◉" },
  { href: "/admin/categories", label: "Categorías", icon: "▦" },
  { href: "/admin/orders", label: "Pedidos", icon: "☑" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/gallery", label: "Galería", icon: "▣" },
  { href: "/admin/banners", label: "Promociones", icon: "◆" },
  { href: "/admin/settings", label: "Ajustes", icon: "⚙" },
  { href: "/admin/seasonal", label: "Temporada", icon: "☼" },
];

export const adminStats: AdminStat[] = [
  {
    label: "Pedidos hoy",
    value: "8",
    detail: "3 pendientes de confirmar",
    tone: "red",
    href: "/admin/orders?date=today",
    actionLabel: "Revisar pedidos",
  },
  {
    label: "Pedidos pendientes",
    value: "5",
    detail: "2 para recogida",
    tone: "yellow",
    href: "/admin/orders?status=pending",
    actionLabel: "Confirmar pedidos",
  },
  {
    label: "Bajo stock",
    value: "11",
    detail: "Revisar inventario fresco",
    tone: "yellow",
    href: "/admin/products?stock=low",
    actionLabel: "Actualizar stock",
  },
  {
    label: "Sin stock",
    value: "4",
    detail: "Ocultos de la tienda online",
    tone: "red",
    href: "/admin/products?stock=out",
    actionLabel: "Reponer o editar",
  },
  {
    label: "Temporada activa",
    value: "18",
    detail: "Fruta y verdura destacada",
    tone: "green",
    href: "/admin/seasonal",
    actionLabel: "Gestionar temporada",
  },
  {
    label: "Artículos publicados",
    value: "4",
    detail: "3 idiomas preparados",
    tone: "navy",
    href: "/admin/blog?status=published",
    actionLabel: "Editar artículos",
  },
  {
    label: "Promociones activas",
    value: "2",
    detail: "Inicio y rincón latino",
    tone: "green",
    href: "/admin/banners?status=active",
    actionLabel: "Gestionar promociones",
  },
];

export const adminProducts: AdminProduct[] = [
  {
    id: "prd-001",
    name: "Aguacate Hass",
    category: "Fruta",
    price: "2,95",
    unit: "unidad",
    stock: "24",
    status: "Disponible",
    featured: true,
    seasonal: false,
    latin: true,
  },
  {
    id: "prd-002",
    name: "Alcachofa del Prat",
    category: "Hortalizas",
    price: "4,80",
    unit: "kg",
    stock: "Bajo",
    status: "Bajo stock",
    featured: true,
    seasonal: true,
    latin: false,
  },
  {
    id: "prd-003",
    name: "Plátano macho",
    category: "Productos latinos",
    price: "3,20",
    unit: "kg",
    stock: "0",
    status: "Agotado",
    featured: false,
    seasonal: false,
    latin: true,
  },
  {
    id: "prd-004",
    name: "Kiwi",
    category: "Fruta",
    price: "5,40",
    unit: "kg",
    stock: "38",
    status: "Disponible",
    featured: true,
    seasonal: true,
    latin: false,
  },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "ORD-1048",
    customer: "María González",
    phone: "+34 612 222 110",
    status: "Nuevo",
    fulfillment: "Recogida",
    total: "28,60",
    createdAt: "Hoy, 10:35",
  },
  {
    id: "ORD-1047",
    customer: "Casa Riera",
    phone: "+34 699 418 221",
    status: "Preparando",
    fulfillment: "Entrega",
    total: "64,10",
    createdAt: "Hoy, 09:18",
  },
  {
    id: "ORD-1046",
    customer: "Ana Pérez",
    phone: "+34 633 901 778",
    status: "Listo",
    fulfillment: "Recogida",
    total: "17,25",
    createdAt: "Ayer, 18:02",
  },
];

export const adminPosts: AdminPost[] = [
  {
    id: "nevera-si-o-no-que-guardem-i-que-no",
    title: "Nevera sí o no? Qué guardamos y qué no",
    category: "Consejos de conservación",
    status: "Publicado",
    localeStatus: "CA · ES · EN",
    updatedAt: "Hace 2 días",
  },
  {
    id: "fruta-de-temporada-que-comemos-cada-mes",
    title: "Fruta de temporada: qué comemos cada mes",
    category: "Temporada",
    status: "Publicado",
    localeStatus: "CA · ES · EN",
    updatedAt: "Hace 2 días",
  },
  {
    id: "ideas-rapidas-productos-mercado",
    title: "Ideas rápidas con productos del mercado",
    category: "Recetas fáciles",
    status: "Borrador",
    localeStatus: "ES pendiente",
    updatedAt: "Hoy",
  },
];

export const adminCategories = [
  "Fruta",
  "Verdura",
  "Hortalizas",
  "Productos latinos",
  "Bebidas",
  "Dulces y snacks",
  "Despensa",
  "Cestas y packs",
  "Temporada",
];

export const adminGallery = Array.from({ length: 8 }, (_, index) => ({
  id: `gallery-${index + 1}`,
  image: `/images/gallery/calalina/g${index + 1}.png`,
  title: `Foto de tienda ${index + 1}`,
  category: index % 2 === 0 ? "Producto fresco" : "Tienda",
  featured: index < 4,
}));

export const adminBanners = [
  {
    title: "Temporada de verano",
    placement: "Hero de inicio",
    status: "Activo",
    date: "01/07 - 31/08",
  },
  {
    title: "Rincón latino",
    placement: "Barra superior",
    status: "Programado",
    date: "15/07 - 15/09",
  },
];

export const adminSeasonalHighlights = [
  "Melocotón amarillo",
  "Tomate rosa",
  "Alcachofa",
  "Cereza",
  "Judía verde",
  "Calabacín",
];

export const adminSettings = {
  businessName: "Fruteria Calalina",
  address: "Passeig de Sant Joan, 195 - CALALINA, 08037 Barcelona",
  phone: "+34 932 10 21 53",
  whatsapp: "+34 932 10 21 53",
  email: "hola@calalina.cat",
  googlePlaceId: "",
  googleMapsUrl: "https://www.google.com/maps/place/Fruteria+Calalina/",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Fruteria%20Calalina%2C%20Passeig%20de%20Sant%20Joan%20195%2C%20Barcelona&z=17&output=embed",
  useGoogleHours: true,
  manualOpeningHoursCa:
    "Dimarts a dijous: 9:00-14:00 / 17:00-20:00\nDivendres: 9:00-15:00 / 17:00-20:00\nDissabte: 9:00-14:00\nDiumenge i dilluns: Tancat",
  manualOpeningHoursEs:
    "Martes a jueves: 9:00-14:00 / 17:00-20:00\nViernes: 9:00-15:00 / 17:00-20:00\nSábado: 9:00-14:00\nDomingo y lunes: Cerrado",
  manualOpeningHoursEn:
    "Tuesday to Thursday: 9:00-14:00 / 17:00-20:00\nFriday: 9:00-15:00 / 17:00-20:00\nSaturday: 9:00-14:00\nSunday and Monday: Closed",
  specialNoticeCa: "",
  specialNoticeEs: "",
  specialNoticeEn: "",
};
