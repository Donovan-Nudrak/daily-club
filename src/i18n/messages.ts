import type { CategoryId, LookId } from '../types.ts'

export type Locale = 'es' | 'en'

export type ProductCopy = {
  name: string
  color: string
  description: string
}

export type Messages = {
  language: { label: string }
  nav: {
    label: string
    menu: string
    closeMenu: string
    collection: string
    looks: string
    club: string
    home: string
    footer: string
  }
  hero: {
    phrase: string
    promise: string
    cta: string
    mainAlt: string
    portraitAlt: string
  }
  collection: {
    title: string
    subtitle: string
    filterLabel: string
    all: string
  }
  categories: Record<CategoryId, string>
  products: Record<string, ProductCopy>
  card: { open: (name: string) => string; photo: string }
  dialog: {
    close: string
    add: string
    added: (name: string, quantity: number) => string
    photo: string
  }
  looks: {
    title: string
    subtitle: string
    choose: string
    explore: string
    photo: string
    items: Record<LookId, { title: string; alt: string }>
  }
  club: {
    title: string
    subtitle: string
    story: string
    closing: string
    back: string
    scenes: Record<LookId, { label: string; alt: string }>
  }
  footer: {
    note: string
    creator: string
    prompt: string
    linksLabel: string
    linkedin: string
    github: string
    portfolio: string
  }
  cart: {
    label: string
    open: (count: number) => string
    title: string
    close: string
    empty: string
    explore: string
    demo: string
    unitPrice: string
    quantity: (name: string, count: number) => string
    increase: (name: string) => string
    decrease: (name: string) => string
    remove: (name: string) => string
    removeLabel: string
    subtotal: string
    buy: string
    purchaseTitle: string
    purchaseMessage: string
    keepExploring: string
  }
}

const productsEs: Record<string, ProductCopy> = {
  P01: {
    name: 'Camiseta Boxy',
    color: 'Blanco',
    description:
      'Camiseta amplia y ligeramente corta con un emblema DAILY CLUB discreto; base para combinar capas.',
  },
  P02: {
    name: 'Camiseta Ringer',
    color: 'Rosa suave y carbón',
    description:
      'Camiseta con contraste en cuello y mangas; acento pop fácil de combinar.',
  },
  P03: {
    name: 'Polo Knit',
    color: 'Azul cielo',
    description:
      'Polo de punto de cuello abierto y corte relajado; pieza cotidiana de presencia editorial.',
  },
  P04: {
    name: 'Chaqueta Denim Crop',
    color: 'Gris lavado',
    description:
      'Chaqueta corta y amplia con bolsillos marcados; define la silueta del conjunto principal.',
  },
  P05: {
    name: 'Camisa Stripe',
    color: 'Azul y blanco',
    description:
      'Camisa amplia de rayas finas que puede llevarse abierta sobre una camiseta.',
  },
  P06: {
    name: 'Sudadera Zip',
    color: 'Gris claro',
    description:
      'Sudadera con capucha, cremallera, hombros caídos y logotipo discreto.',
  },
  P07: {
    name: 'Denim Wide',
    color: 'Carbón',
    description:
      'Jeans de pierna ancha y caída relajada, en contraste con las prendas superiores cortas.',
  },
  P08: {
    name: 'Pantalón Parachute',
    color: 'Gris piedra',
    description:
      'Pantalón holgado con bolsillos laterales y ajuste visible en el bajo.',
  },
  P09: {
    name: 'Bermuda Pleat',
    color: 'Carbón',
    description: 'Bermuda amplia hasta la rodilla con pinzas que aportan volumen.',
  },
  P10: {
    name: 'Bolsa Bubble',
    color: 'Rosa suave',
    description:
      'Bolsa de hombro redondeada que introduce el acento rosa de la colección.',
  },
  P11: {
    name: 'Gorra Daily',
    color: 'Azul cielo',
    description: 'Gorra de seis paneles con bordado frontal pequeño.',
  },
  P12: {
    name: 'Cinturón Loop',
    color: 'Negro y plata',
    description:
      'Cinturón con hebilla ovalada plateada que conecta con los acentos cromados.',
  },
}

const productsEn: Record<string, ProductCopy> = {
  P01: {
    name: 'Boxy T-shirt',
    color: 'White',
    description:
      'A relaxed, slightly cropped T-shirt with a discreet DAILY CLUB emblem; a base for layering.',
  },
  P02: {
    name: 'Ringer T-shirt',
    color: 'Soft pink and charcoal',
    description:
      'A T-shirt with contrast at the neck and sleeves; an easy pop accent to mix in.',
  },
  P03: {
    name: 'Knit Polo',
    color: 'Sky blue',
    description:
      'An open-collar knit polo with a relaxed cut; an everyday piece with an editorial presence.',
  },
  P04: {
    name: 'Crop Denim Jacket',
    color: 'Washed grey',
    description:
      'A short, roomy jacket with defined pockets; it sets the silhouette of the main look.',
  },
  P05: {
    name: 'Stripe Shirt',
    color: 'Blue and white',
    description: 'A loose fine-stripe shirt that can be worn open over a T-shirt.',
  },
  P06: {
    name: 'Zip Hoodie',
    color: 'Light grey',
    description: 'A zip hoodie with dropped shoulders and a discreet logo.',
  },
  P07: {
    name: 'Wide Denim',
    color: 'Charcoal',
    description: 'Wide-leg jeans with a relaxed fall, set against the cropped tops.',
  },
  P08: {
    name: 'Parachute Trousers',
    color: 'Stone grey',
    description: 'A loose trouser with side pockets and a visible adjustment at the hem.',
  },
  P09: {
    name: 'Pleat Bermuda',
    color: 'Charcoal',
    description: 'A loose knee-length bermuda with pleats that add volume.',
  },
  P10: {
    name: 'Bubble Bag',
    color: 'Soft pink',
    description: "A rounded shoulder bag that brings in the collection's pink accent.",
  },
  P11: {
    name: 'Daily Cap',
    color: 'Sky blue',
    description: 'A six-panel cap with a small front embroidery.',
  },
  P12: {
    name: 'Loop Belt',
    color: 'Black and silver',
    description: 'A belt with an oval silver buckle that picks up the chrome accents.',
  },
}

function unitsEs(count: number) {
  return count === 1 ? '1 unidad' : `${count} unidades`
}

function unitsEn(count: number) {
  return count === 1 ? '1 item' : `${count} items`
}

export const messages: Record<Locale, Messages> = {
  es: {
    language: { label: 'Idioma' },
    nav: {
      label: 'Secciones',
      menu: 'Menú',
      closeMenu: 'Cerrar menú',
      collection: 'Colección',
      looks: 'Looks',
      club: 'El club',
      home: 'Inicio',
      footer: 'Pie de página',
    },
    hero: {
      phrase: 'a tu manera.',
      promise: 'Tu día. Tu estilo. Tus reglas.',
      cta: 'Explorar colección',
      mainAlt: 'Dos modelos frente a una cafetería.',
      portraitAlt: 'Retrato de una modelo con chaqueta denim gris.',
    },
    collection: {
      title: 'La colección',
      subtitle: 'Tu próximo favorito. Para todos tus días.',
      filterLabel: 'Filtrar por categoría',
      all: 'Todo',
    },
    categories: {
      tops: 'Camisetas y polos',
      layers: 'Camisas y chaquetas',
      bottoms: 'Pantalones',
      accessories: 'Accesorios',
    },
    products: productsEs,
    card: {
      open: (name) => `Abrir ficha de ${name}`,
      photo: 'Fotografía',
    },
    dialog: {
      close: 'Cerrar',
      add: 'Añadir al carrito',
      added: (name, quantity) => `${name} está en el carrito (${quantity}).`,
      photo: 'Fotografía',
    },
    looks: {
      title: 'Looks',
      subtitle: 'Una colección. Mil formas de llevarla.',
      choose: 'Elegir look',
      explore: 'Explorar el look',
      photo: 'Fotografía del look',
      items: {
        '01': {
          title: 'Café de paso',
          alt: 'Look Café de paso: dos modelos frente a una cafetería.',
        },
        '02': {
          title: 'Lado B',
          alt: 'Look Lado B: un modelo frente a una tienda de discos.',
        },
        '03': {
          title: 'Sin prisa',
          alt: 'Look Sin prisa: una modelo caminando por una plaza.',
        },
      },
    },
    club: {
      title: 'El club',
      subtitle: 'La vida entre planes',
      story:
        'DAILY CLUB vive entre trayectos por la ciudad, tardes de café, tiendas de discos y planes improvisados. Sus prendas acompañan esos momentos: siluetas relajadas, capas sencillas y detalles que hacen propia cada combinación. Cada día tiene un ritmo distinto. La ropa te permite encontrar el tuyo.',
      closing: 'El club empieza contigo.',
      back: 'Volver a la colección',
      scenes: {
        '01': {
          label: 'Tarde de café',
          alt: 'Tarde de café: dos modelos frente a una cafetería.',
        },
        '02': {
          label: 'Tienda de discos',
          alt: 'Tienda de discos: un modelo frente al escaparate.',
        },
        '03': {
          label: 'Paseo',
          alt: 'Paseo: una modelo caminando por una plaza.',
        },
      },
    },
    footer: {
      note: 'Proyecto conceptual. La marca, las prendas y los textos son ficticios.',
      creator: 'Donovan',
      prompt: 'Consulta los enlaces del creador.',
      linksLabel: 'Enlaces del creador',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      portfolio: 'Portafolio',
    },
    cart: {
      label: 'Carrito',
      open: (count) => `Abrir carrito, ${unitsEs(count)}`,
      title: 'Carrito',
      close: 'Cerrar',
      empty: 'El carrito está vacío.',
      explore: 'Explorar la colección',
      demo: 'Precios de demostración en MXN. No se realizan pedidos ni cobros.',
      unitPrice: 'Precio unitario',
      quantity: (name, count) => `Cantidad de ${name}: ${count}`,
      increase: (name) => `Aumentar cantidad de ${name}`,
      decrease: (name) => `Reducir cantidad de ${name}`,
      remove: (name) => `Eliminar ${name}`,
      removeLabel: 'Eliminar',
      subtotal: 'Subtotal',
      buy: 'Comprar',
      purchaseTitle: 'Esta compra es de prueba',
      purchaseMessage:
        'DAILY CLUB es una tienda conceptual. Puedes explorar los productos y probar el carrito, pero no se realizará ningún pedido ni se efectuará ningún cobro.',
      keepExploring: 'Seguir explorando',
    },
  },
  en: {
    language: { label: 'Language' },
    nav: {
      label: 'Sections',
      menu: 'Menu',
      closeMenu: 'Close menu',
      collection: 'Collection',
      looks: 'Looks',
      club: 'The club',
      home: 'Home',
      footer: 'Footer',
    },
    hero: {
      phrase: 'your way.',
      promise: 'Your day. Your style. Your rules.',
      cta: 'Explore the collection',
      mainAlt: 'Two models outside a café.',
      portraitAlt: 'Portrait of a model in a grey denim jacket.',
    },
    collection: {
      title: 'The collection',
      subtitle: 'Your next favorite. For every day.',
      filterLabel: 'Filter by category',
      all: 'All',
    },
    categories: {
      tops: 'T-shirts and polos',
      layers: 'Shirts and jackets',
      bottoms: 'Trousers',
      accessories: 'Accessories',
    },
    products: productsEn,
    card: {
      open: (name) => `Open the details for ${name}`,
      photo: 'Photograph',
    },
    dialog: {
      close: 'Close',
      add: 'Add to cart',
      added: (name, quantity) => `${name} is in the cart (${quantity}).`,
      photo: 'Photograph',
    },
    looks: {
      title: 'Looks',
      subtitle: 'One collection. A thousand ways to wear it.',
      choose: 'Choose a look',
      explore: 'Explore the look',
      photo: 'Look photograph',
      items: {
        '01': {
          title: 'Coffee stop',
          alt: 'Look Coffee stop: two models outside a café.',
        },
        '02': {
          title: 'B-side',
          alt: 'Look B-side: a model outside a record shop.',
        },
        '03': {
          title: 'No rush',
          alt: 'Look No rush: a model walking through a square.',
        },
      },
    },
    club: {
      title: 'The club',
      subtitle: 'Life between plans',
      story:
        'DAILY CLUB lives between city trips, coffee afternoons, record shops and last-minute plans. The clothes follow those moments: relaxed silhouettes, simple layers and details that make each combination your own. Every day has a different rhythm. Clothes let you find yours.',
      closing: 'The club starts with you.',
      back: 'Back to the collection',
      scenes: {
        '01': {
          label: 'Coffee afternoon',
          alt: 'Coffee afternoon: two models outside a café.',
        },
        '02': {
          label: 'Record shop',
          alt: 'Record shop: a model in front of the window.',
        },
        '03': {
          label: 'A walk',
          alt: 'A walk: a model walking through a square.',
        },
      },
    },
    footer: {
      note: 'A conceptual project. The brand, the clothes and the copy are fictional.',
      creator: 'Donovan',
      prompt: "View the creator's links.",
      linksLabel: "Creator's links",
      linkedin: 'LinkedIn',
      github: 'GitHub',
      portfolio: 'Portfolio',
    },
    cart: {
      label: 'Cart',
      open: (count) => `Open cart, ${unitsEn(count)}`,
      title: 'Cart',
      close: 'Close',
      empty: 'The cart is empty.',
      explore: 'Explore the collection',
      demo: 'Demo prices in MXN. No orders or charges are placed.',
      unitPrice: 'Unit price',
      quantity: (name, count) => `Quantity of ${name}: ${count}`,
      increase: (name) => `Increase the quantity of ${name}`,
      decrease: (name) => `Decrease the quantity of ${name}`,
      remove: (name) => `Remove ${name}`,
      removeLabel: 'Remove',
      subtotal: 'Subtotal',
      buy: 'Buy',
      purchaseTitle: 'This is a demo purchase',
      purchaseMessage:
        'DAILY CLUB is a concept store. You can explore the products and try the cart, but no order will be placed and no payment will be taken.',
      keepExploring: 'Keep exploring',
    },
  },
}
