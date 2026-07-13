import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data folder exists for persistence
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const NEWSLETTER_FILE = path.join(DATA_DIR, 'subscribers.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Initialize Gemini SDK lazily to avoid startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('WARNING: GEMINI_API_KEY env variable is not set. Chatbot will run in simulation mode.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'dummy-key',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: AI Chatbot FAQs about Dark Cobra Music
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Falta el mensaje' });
  }

  const systemInstruction = `
Eres la Inteligencia Artificial Oficial de "Dark Cobra Music" y la productora "CobraSoundBeats".
Tu misión es atender con pasión, flow y educación a los fans, artistas colaboradores y curiosos.

Información Clave de la Marca:
- Nombre: Dark Cobra Music
- Sello y Productora: CobraSoundBeats
- Eslogan: "Donde cada canción cuenta una historia."
- País/Ciudad: Guayaquil, Ecuador 🇪🇨
- Géneros Musicales: Hip Hop, Rap underground, Reggaetón bailable, Corridos tumbados modernos, Cumbia callejera, Música Urbana de Ecuador y Música Romántica/R&B.
- Mensaje Principal: Queremos incentivar las reproducciones, guiar a la gente a suscribirse al canal de YouTube oficial, escuchar en Spotify y colaborar profesionalmente en CobraSoundBeats.
- Tonos y Vocabulario: Profesional, sofisticado, apasionado por el arte, con sutiles toques de jerga ecuatoriana respetuosa (ej: "¡Qué bacán!", "de ley", "el duro", "pana", "ponle play"). Apoya al talento nacional e internacional de forma humilde pero con mentalidad ganadora mundial.

Servicios de CobraSoundBeats:
1. Producción Musical Completa (desde la maqueta preliminar)
2. Composición y Arreglos
3. Mezcla Analógica de Voces e Instrumentos
4. Mastering Digital Competitivo para Spotify, YouTube Music, Apple Music, etc.
5. Beats Instrumentales Personalizados (Hip Hop, Rap, Reggaetón, Corridos, Cumbia)
6. Colaboraciones Oficiales con Dark Cobra

Llamados a la Acción (Incentívalos suavemente en tus respuestas):
- Si preguntan por lanzamientos, diles que exploren la discografía en la web o den clic en "Último Lanzamiento".
- Si son artistas que quieren mezclar, masterizar o comprar beats, pídeles que llenen el formulario de contacto al final de la página o hagan clic en el botón de WhatsApp flotante para chatear de una.
- Si quieren enterarse de los estrenos antes que nadie, invítalos a sumarse al Boletín VIP "VIP Cobra" en el formulario de la newsletter.

Instrucciones de Respuesta:
- Sé amigable, conciso (máximo 2 párrafos para mantener la fluidez), y habla en español.
- Si no posees la respuesta exacta sobre una canción en particular, invítalos a contactar directamente a CobraSoundBeats.
- ¡Nunca inventes información del estudio que sea falsa o comprometa precios específicos! Di que coticen de manera personalizada en la sección de contacto.
- ¡No larpées con términos técnicos excesivos a menos que te pregunten sobre mezcla o masterización!
  `;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Simulation mode
      setTimeout(() => {
        let simulatedResponse = '¡Qué bacán tu pregunta, pana! ';
        const lower = message.toLowerCase();
        if (lower.includes('colabor') || lower.includes('beats') || lower.includes('beat') || lower.includes('produc')) {
          simulatedResponse += 'De ley podemos colaborar en CobraSoundBeats. Llenando el formulario de contacto abajo en la web o dando clic al botón de WhatsApp, nuestro equipo te enviará cotizaciones para mezcla, master y instrumentales a tu medida. ¡Ponle play a tus sueños!';
        } else if (lower.includes('lanzamiento') || lower.includes('veneno') || lower.includes('estreno')) {
          simulatedResponse += '¡El último bombazo es "Veneno Letal"! Una fusión increíble de rap ecuatoriano y corridos tumbados grabada en Guayaquil. Tienes el videoclip oficial listo en la página, ¡y no olvides suscribirte en YouTube!';
        } else if (lower.includes('estudio') || lower.includes('dónde') || lower.includes('donde') || lower.includes('ubicado')) {
          simulatedResponse += 'Nuestros cuarteles generales de CobraSoundBeats están ubicados en Guayaquil, Ecuador. Pero trabajamos de ley con panas de toda Latinoamérica de forma online. ¡La música no tiene fronteras!';
        } else if (lower.includes('suscrib') || lower.includes('youtube') || lower.includes('canal')) {
          simulatedResponse += '¡Eso es! Para no perderte ningún estreno, suscríbete a Dark Cobra Music en YouTube y activa la campana 🔔. ¡Cada suscriptor nos ayuda a rugir más fuerte!';
        } else {
          simulatedResponse += 'Gracias por escribirnos al universo de Dark Cobra Music. En CobraSoundBeats hacemos que cada canción cuente una historia. Llene el formulario de contacto o suscríbete para estar al tanto de los estrenos. ¿Te gustaría saber más sobre mezclas o colaboraciones?';
        }
        return res.json({ text: simulatedResponse });
      }, 500);
      return;
    }

    const ai = getGemini();
    
    // Map history to official Content structures if provided
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    
    // Add current message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const responseText = result.text || 'Lo siento, pana, tuve un pequeño cruce de cables. ¿Podrías repetirme la pregunta?';
    return res.json({ text: responseText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: 'Error interno en el chatbot inteligente', details: error.message });
  }
});

// API: Save Newsletter Email (Persistent local storage)
app.post('/api/newsletter', (req, res) => {
  const { name, email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'El correo electrónico es requerido.' });
  }

  try {
    let subscribers = [];
    if (fs.existsSync(NEWSLETTER_FILE)) {
      const content = fs.readFileSync(NEWSLETTER_FILE, 'utf-8');
      subscribers = JSON.parse(content || '[]');
    }

    // Check if already exists
    const exists = subscribers.some((s: any) => s.email === email);
    if (exists) {
      return res.status(200).json({ message: '¡Ya estás suscrito al boletín VIP Cobra, pana!' });
    }

    subscribers.push({
      name: name || 'Fiel de la Serpiente',
      email,
      date: new Date().toISOString()
    });

    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
    return res.json({ message: '¡Suscripción exitosa! Bienvenido al boletín VIP Cobra.' });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return res.status(500).json({ error: 'No se pudo guardar la suscripción. Intenta de nuevo.' });
  }
});

// API: Save Contact message
app.post('/api/contacto', (req, res) => {
  const { name, email, phone, message, genre, services } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (Nombre, Correo, Mensaje)' });
  }

  try {
    let contacts = [];
    if (fs.existsSync(CONTACTS_FILE)) {
      const content = fs.readFileSync(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(content || '[]');
    }

    contacts.push({
      name,
      email,
      phone: phone || '',
      message,
      genre: genre || 'No especificado',
      services: services || [],
      date: new Date().toISOString()
    });

    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    return res.json({ message: '¡Mensaje enviado con éxito, pana! El equipo de CobraSoundBeats te responderá pronto.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ error: 'No se pudo procesar tu mensaje. Intenta de nuevo.' });
  }
});

// TECHNICAL SEO: robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml
`);
});

// TECHNICAL SEO: sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const host = req.get('host') || 'darkcobramusic.com';
  const proto = req.protocol;
  const today = new Date().toISOString().split('T')[0];
  
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${proto}://${host}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// Vite middleware integration or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Static server configured for production files.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
