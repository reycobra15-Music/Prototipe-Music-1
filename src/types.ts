export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
  duration: string;
  category: string; // 'Hip Hop' | 'Rap' | 'Reggaetón' | 'Corridos' | 'Románticas'
  youtubeUrl: string;
}

export interface SongRelease {
  id: string;
  title: string;
  coverImage: string;
  releaseDate: string;
  genre: string;
  duration: string;
  description: string;
  links: {
    spotify?: string;
    youtube?: string;
    appleMusic?: string;
    amazonMusic?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // 'Artista' | 'Fan' | 'Productor'
  comment: string;
  avatar: string;
  platform: 'YouTube' | 'Instagram' | 'TikTok';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}
