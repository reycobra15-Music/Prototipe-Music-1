import { Video, SongRelease, BlogPost, Testimonial, FAQ, TimelineEvent } from './types';

export const STATS = [
  { label: 'Suscriptores', target: 54200, suffix: '+', icon: 'Youtube' },
  { label: 'Visualizaciones', target: 12800000, suffix: 'M+', icon: 'TrendingUp' },
  { label: 'Canciones Publicadas', target: 145, suffix: '', icon: 'Music' },
  { label: 'Años Creando Música', target: 7, suffix: '', icon: 'Calendar' }
];

export const LATEST_RELEASE: SongRelease = {
  id: 'latest-01',
  title: 'Veneno Letal',
  coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80', // Dark neon aesthetic
  releaseDate: '13 de Julio, 2026',
  genre: 'Música Urbana / Rap / Corridos',
  duration: '3:45',
  description: 'Un tema desgarrador que fusiona los ritmos pesados del rap de Ecuador con las guitarras acústicas y trompetas del corrido tumbado moderno. Grabado en CobraSoundBeats, "Veneno Letal" narra la traición y la supervivencia en las calles de Guayaquil.',
  links: {
    spotify: 'https://open.spotify.com',
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    appleMusic: 'https://www.apple.com/apple-music/',
    amazonMusic: 'https://music.amazon.com'
  }
};

export const VIDEOS: Video[] = [
  {
    id: 'vid-01',
    title: 'Veneno Letal - Dark Cobra (Videoclip Oficial)',
    thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80',
    views: '124K',
    date: 'Hace 1 día',
    duration: '3:45',
    category: 'Rap',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-02',
    title: 'Noches de Guayaquil - Reggaetón Mix ft. CobraSoundBeats',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80', // Club lights
    views: '2.4M',
    date: 'Hace 2 meses',
    duration: '4:12',
    category: 'Reggaetón',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-03',
    title: 'Lealtad de Serpiente - Corridos Tumbados (Official Video)',
    thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80', // Guitar close up
    views: '840K',
    date: 'Hace 3 meses',
    duration: '3:20',
    category: 'Corridos',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-04',
    title: 'Bajo la Lluvia - Rap Romántico ft. Melodía',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80', // Rain neon window
    views: '1.2M',
    date: 'Hace 6 meses',
    duration: '3:58',
    category: 'Románticas',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-05',
    title: 'Cobra Imperial - Hip Hop Freestyle (Studio Session)',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80', // Microphone in studio
    views: '540K',
    date: 'Hace 9 meses',
    duration: '2:55',
    category: 'Hip Hop',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-06',
    title: 'Cumbia Callejera - Dark Cobra ft. Sonido del Barrio',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80', // Latin concert
    views: '320K',
    date: 'Hace 1 año',
    duration: '4:05',
    category: 'Hip Hop', // Matches genres but has cumbia vibe
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const DISCOGRAPHY: SongRelease[] = [
  {
    id: 'disc-01',
    title: 'Veneno Letal',
    coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=80',
    releaseDate: '13 Jul 2026',
    genre: 'Rap / Corridos',
    duration: '3:45',
    description: 'La fusión definitiva entre el folklore mexicano y el rap andino.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube.com', appleMusic: 'https://apple.com', amazonMusic: 'https://amazon.com' }
  },
  {
    id: 'disc-02',
    title: 'Instinto Animal (Álbum Completo)',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    releaseDate: '12 Ene 2026',
    genre: 'Hip Hop / Reggaetón',
    duration: '42:15',
    description: 'El primer álbum de estudio de Dark Cobra, con colaboraciones estelares de toda la escena ecuatoriana.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube', appleMusic: 'https://apple.com', amazonMusic: 'https://amazon.com' }
  },
  {
    id: 'disc-03',
    title: 'Lealtad de Serpiente',
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80',
    releaseDate: '15 Oct 2025',
    genre: 'Corridos Tumbados',
    duration: '3:20',
    description: 'Un tributo a la amistad sincera ya la lealtad que pocos entienden en la vida.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube', appleMusic: 'https://apple.com', amazonMusic: 'https://amazon.com' }
  },
  {
    id: 'disc-04',
    title: 'Noches de Guayaquil',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    releaseDate: '01 Sep 2025',
    genre: 'Reggaetón',
    duration: '4:12',
    description: 'Para encender las discotecas y las calles con bajo profundo y lírica afilada.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube', appleMusic: 'https://apple.com' }
  },
  {
    id: 'disc-05',
    title: 'Frío Sin Ti',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80',
    releaseDate: '14 Feb 2025',
    genre: 'Música Romántica / R&B',
    duration: '3:50',
    description: 'El lado más humano y romántico de la Cobra, expresando el dolor de la ausencia.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube', appleMusic: 'https://apple.com' }
  },
  {
    id: 'disc-06',
    title: 'Sabor de Esquina',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80',
    releaseDate: '20 Dic 2024',
    genre: 'Cumbia / Urbana',
    duration: '4:05',
    description: 'La fusión guapachosa callejera que pone a bailar a todo el Ecuador.',
    links: { spotify: 'https://spotify.com', youtube: 'https://youtube', amazonMusic: 'https://amazon.com' }
  }
];

export const UPCOMING_RELEASES = [
  {
    id: 'up-1',
    title: 'Dinastía de Reyes',
    genre: 'Rap Latino',
    releaseDate: '2026-08-01T20:00:00-05:00', // Dynamic countdown target
    description: 'La consagración poética de la lírica urbana ecuatoriana.',
    hype: '98% Listo'
  },
  {
    id: 'up-2',
    title: 'Aroma de Corazón',
    genre: 'Música Romántica / Reggaetón',
    releaseDate: '2026-09-10T18:00:00-05:00',
    description: 'La balada urbana perfecta para dedicar esta primavera tardía.',
    hype: 'Grabaciones Terminadas'
  }
];

export const GALLERY = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    title: 'Grabando voces en CobraSoundBeats',
    category: 'Estudio'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    title: 'Show en vivo - Guayaquil Urbano Fest',
    category: 'Eventos'
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&auto=format&fit=crop&q=80',
    title: 'Detrás de consolas, mezcla analógica',
    category: 'Backstage'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    title: 'Sesión acústica para el álbum Instinto Animal',
    category: 'Estudio'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    title: 'Rodaje del videoclip "Veneno Letal"',
    category: 'Videoclips'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    title: 'Meet & Greet con los fieles de la serpiente',
    category: 'Eventos'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'El Secreto de "Veneno Letal": Fusionando Corridos con Rap Ecuatoriano',
    excerpt: 'Descubre el proceso creativo y los desafíos técnicos que enfrentamos en CobraSoundBeats al fusionar guitarras sierreñas con bajos profundos de 808.',
    content: `La música urbana evoluciona a ritmos vertiginosos. Este año, en **CobraSoundBeats**, nos propusimos un desafío titánico: ¿cómo conectar la melancolía campestre de los corridos tumbados con el asfalto pesado del Rap andino? El resultado es nuestro último estreno estrella: **"Veneno Letal"**.

### La chispa creativa
Todo comenzó en una noche de lluvia torrencial en Guayaquil. Teníamos una base pesada de trap con un bombo seco y una caja cortante. En ese momento, nuestro guitarrista estrella de sesión empezó a tararear un requinto melancólico de doce cuerdas. La química fue instantánea.

### Grabación Analógica
Para capturar la esencia cruda de las cuerdas, decidimos evitar los sintetizadores virtuales. Usamos micrófonos de cinta de alta fidelidad, grabando cada guitarra por duplicado para crear una amplitud estéreo espectacular. El bajo 808 fue procesado a través de un compresor de bulbos clásico para otorgarle esa calidez analógica que hace vibrar el pecho.

### SEO y Letras que Cuentan Historias
En Dark Cobra Music creemos firmemente que "cada canción cuenta una historia". Por eso, la lírica de este tema evita las temáticas genéricas y se enfoca en relatos de superación, lealtad y supervivencia en Ecuador. Una carta de amor y lucha para nuestro barrio.

Mira el videoclip oficial ahora mismo en nuestro canal de YouTube y experimenta este sonido único.`,
    date: '12 de Julio, 2026',
    author: 'Dark Cobra',
    category: 'Detrás de Cámaras',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    readTime: '4 min de lectura'
  },
  {
    id: 'post-2',
    title: 'Cómo Conseguir una Mezcla de Voz de Rap Profesional en Casa',
    excerpt: 'Nuestros ingenieros de CobraSoundBeats revelan la cadena de plugins y técnicas para lograr que tu voz suene gorda, al frente y cristalina sin gastar miles de dólares.',
    content: `Muchos artistas emergentes en Ecuador nos preguntan: *"¿Cómo hace Dark Cobra para que su voz suene tan al frente y profesional en Spotify?"* Hoy les abriremos las puertas de nuestra cocina en **CobraSoundBeats**.

Aquí tienes el checklist definitivo para mezclar voces de Rap y Música Urbana:

1.  **Limpieza de Frecuencias (Ecualización)**:
    Usa un filtro de paso alto (High Pass Filter) a unos 80Hz para eliminar ruidos de fondo no deseados de la habitación. Haz un ligero recorte de -2dB alrededor de los 300Hz-400Hz si sientes la voz muy "enmascarada" u "opaca".

2.  **Compresión en Dos Pasos**:
    -   *Paso 1*: Usa un compresor rápido (tipo 1176) con un ataque rápido para domar los picos más agresivos de los acentos del rap.
    -   *Paso 2*: Súmale un compresor lento (tipo LA-2A) para suavizar y dar consistencia general a toda la toma.

3.  **Saturación Armónica**:
    Un toque sutil de distorsión de cinta añade armónicos ricos que ayudan a que la voz corte a través de beats instrumentales cargados de graves.

¿Quieres perfeccionar tu sonido? Ofrecemos servicios premium de mezcla, composición y mastering en Ecuador para llevar tu talento al siguiente nivel. ¡Escríbenos en la sección de contacto!`,
    date: '28 de Junio, 2026',
    author: 'CobraSoundBeats Team',
    category: 'Consejos Musicales',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&auto=format&fit=crop&q=80',
    readTime: '6 min de lectura'
  },
  {
    id: 'post-3',
    title: 'Entrevista Exclusiva: El Crecimiento de la Escena Urbana en Ecuador',
    excerpt: 'Conversamos sobre los nuevos géneros, el impacto del streaming y la importancia de construir una base sólida de suscriptores para el éxito.',
    content: `En esta entrega especial del blog, nos sentamos a conversar de tú a tú con el alma máter de **CobraSoundBeats** sobre los desafíos y triunfos del desarrollo musical independiente en Ecuador.

### Rompiendo Barreras
*"Antes, la única forma de que te escucharan era sonar en la radio tradicional, donde las puertas estaban blindadas para los géneros urbanos,"* recuerda Dark Cobra. *"Hoy, gracias a plataformas de video como YouTube y servicios de streaming como Spotify, podemos comunicarnos directamente con el fan, sin intermediarios."*

### La Estrategia del Éxito en YouTube
El CTR y la retención no son solo algoritmos de computadoras; son personas reales eligiendo qué escuchar en un océano de estímulos. Para Dark Cobra Music, el truco ha sido mantener una constancia inquebrantable, portadas con excelente diseño premium, e involucrar a los oyentes en las decisiones creativas a través de las redes.

Lee la entrevista completa y suscríbete a nuestro boletín VIP Cobra para participar de sorteos exclusivos y adelantos de maquetas gratuitas.`,
    date: '15 de Mayo, 2026',
    author: 'Redacción Musical',
    category: 'Entrevistas',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    readTime: '5 min de lectura'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Kevin "El Asfalto"',
    role: 'Artista Colaborador',
    comment: 'Trabajar mis temas con CobraSoundBeats cambió mi carrera por completo. El nivel de detalle en la mezcla de voces y la potencia de los beats de rap de Ecuador no se consiguen en ningún otro lado. ¡Recomendado 100%!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    platform: 'Instagram'
  },
  {
    id: 'test-2',
    name: 'Santiago Muñoz',
    role: 'Fan Fiel de la Serpiente',
    comment: 'Sigo a Dark Cobra Music desde sus inicios. Su eslogan "Donde cada canción cuenta una historia" es totalmente real. Temas como "Lealtad de Serpiente" me acompañan a diario en mis entrenamientos. ¡A activar la campanita!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    platform: 'YouTube'
  },
  {
    id: 'test-3',
    name: 'Andrea G.',
    role: 'Cantautora R&B',
    comment: 'CobraSoundBeats masterizó mi último sencillo de música romántica urbana. Lograron una calidez impresionante y una pegada competitiva en plataformas de streaming. Su trato humano y profesionalismo son únicos en Ecuador.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    platform: 'TikTok'
  },
  {
    id: 'test-4',
    name: 'DJ Jhonny',
    role: 'Productor de Eventos',
    comment: 'Los sencillos de Dark Cobra no pueden faltar en mis sets de música de reggaetón y cumbia. Los graves están perfectamente afinados y en los altavoces de gran escala suenan brutalmente nítidos. ¡Gran talento ecuatoriano!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    platform: 'YouTube'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'time-1',
    year: '2019',
    title: 'Fundación del Canal',
    description: 'Nace el canal de YouTube Dark Cobra Music en Guayaquil, Ecuador, publicando los primeros freestyles rústicos y maquetas grabadas con micrófonos dinámicos.'
  },
  {
    id: 'time-2',
    year: '2021',
    title: 'Creación de CobraSoundBeats',
    description: 'Se consolida la productora y sello discográfico independiente. Inversión en equipamiento analógico premium para ofrecer producción de audio impecable.'
  },
  {
    id: 'time-3',
    year: '2023',
    title: 'Hito de 5 Millones de Vistas',
    description: 'El sencillo "Noches de Guayaquil" se viraliza en TikTok y YouTube, abriendo las puertas a giras por todo el Ecuador y colaboraciones internacionales.'
  },
  {
    id: 'time-4',
    year: '2025',
    title: 'Estilo Cinematográfico',
    description: 'Evolución total del proyecto de marca. Los videoclips pasan a grabarse en calidad cinematográfica 4K, integrando guiones dramáticos para contar historias reales.'
  },
  {
    id: 'time-5',
    year: '2026',
    title: 'Universo Multi-género & IA',
    description: 'Lanzamiento de este portal interactivo inteligente, ampliando horizontes hacia los corridos sierreños, rap romántico y reggaetón de alta fidelidad.'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: '¿Quién produce las canciones de Dark Cobra Music?',
    answer: 'Todas las producciones musicales, arreglos instrumentales, composición lírica, mezclas de audio y masterizaciones son realizadas de forma profesional en el estudio CobraSoundBeats, liderado por ingenieros ecuatorianos calificados.'
  },
  {
    id: 'faq-2',
    question: '¿Cómo puedo contratar una colaboración o beat instrumental?',
    answer: 'Si eres artista y quieres llevar tu sonido al siguiente nivel, puedes enviarnos un mensaje detallado a través de nuestra sección de Contacto o escribir directamente al botón de WhatsApp. En CobraSoundBeats realizamos producción musical personalizada, beats de rap, reggaetón y corridos a la medida, mezcla y mastering analógico.'
  },
  {
    id: 'faq-3',
    question: '¿Dónde se encuentra ubicado el estudio CobraSoundBeats?',
    answer: 'Nuestro estudio principal y oficinas centrales están en Guayaquil, Ecuador. También trabajamos a nivel internacional con artistas de toda Latinoamérica de manera remota para proyectos de mezcla y mastering digital.'
  },
  {
    id: 'faq-4',
    question: '¿Qué géneros musicales abarca el proyecto?',
    answer: 'Abarcamos un amplio abanico de géneros urbanos y populares: Hip Hop, Rap underground, Reggaetón bailable, Corridos tumbados modernos, Cumbia urbana de calle y Música Romántica/R&B melódico.'
  },
  {
    id: 'faq-5',
    question: '¿Cómo enterarme primero de los estrenos?',
    answer: '¡Es muy sencillo! Suscríbete a nuestro canal oficial de YouTube activando la campanita de notificaciones, y regístrate en nuestro boletín Newsletter VIP Cobra en la sección "Newsletter" de esta web para recibir material antes que nadie.'
  }
];
