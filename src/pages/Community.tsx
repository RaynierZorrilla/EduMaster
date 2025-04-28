import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, TrendingUp } from 'lucide-react';
import ProjectCard from '../components/community/ProjectCard';
import Button from '../components/ui/Button';
import { ProjectShare } from '../types';

// Mock data for demo purposes
const mockProjects: ProjectShare[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Portfolio personal con React y Tailwind',
    description: 'He creado mi portfolio personal utilizando React, Tailwind CSS y animaciones con Framer Motion. Incluye secciones para proyectos, habilidades y contacto.',
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg',
    courseId: '1',
    likes: 24,
    comments: 8,
    createdAt: '2025-04-10T15:30:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Aplicación de seguimiento de hábitos con React Native',
    description: 'Desarrollé una aplicación móvil para seguimiento de hábitos diarios que genera gráficos de progreso y envía recordatorios personalizados.',
    imageUrl: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg',
    courseId: '4',
    likes: 37,
    comments: 12,
    createdAt: '2025-04-15T12:45:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    title: 'Visualización de datos de ventas con D3.js',
    description: 'Proyecto de visualización interactiva para analizar tendencias de ventas mensuales con gráficos personalizados y filtros dinámicos.',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    courseId: '3',
    likes: 18,
    comments: 5,
    createdAt: '2025-04-18T09:20:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    title: 'Rediseño UX/UI para tienda online',
    description: 'He rediseñado la experiencia de usuario de una tienda online existente, mejorando la navegación y el proceso de compra para aumentar las conversiones.',
    imageUrl: 'https://images.pexels.com/photos/34577/pexels-photo.jpg',
    courseId: '2',
    likes: 42,
    comments: 15,
    createdAt: '2025-04-20T18:10:00Z',
  },
];

// Mock user data
const mockUsers = {
  user1: {
    id: 'user1',
    username: 'laura_dev',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  user2: {
    id: 'user2',
    username: 'carlos_mobile',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  user3: {
    id: 'user3',
    username: 'ana_dataviz',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  user4: {
    id: 'user4',
    username: 'miguel_ux',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
};

const filters = [
  { id: 'all', name: 'Todos' },
  { id: 'trending', name: 'Tendencia' },
  { id: 'recent', name: 'Recientes' },
  { id: 'most-liked', name: 'Más votados' },
];

const Community: React.FC = () => {
  const [projects, setProjects] = useState<ProjectShare[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectShare[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  useEffect(() => {
    // Simulate fetching data from API
    const fetchProjects = async () => {
      // In a real app, fetch from Supabase here
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
    };
    
    fetchProjects();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = projects;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply other filters
    switch (selectedFilter) {
      case 'trending':
        result = [...result].sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
        break;
      case 'recent':
        result = [...result].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'most-liked':
        result = [...result].sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [searchQuery, selectedFilter, projects]);
  
  const getUserById = (userId: string) => {
    return mockUsers[userId as keyof typeof mockUsers];
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comunidad</h1>
            <p className="text-gray-500 mt-1">
              Explora, comparte y aprende de los proyectos de otros estudiantes.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button size="md" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Compartir Proyecto
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap pb-1 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500" />
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilter === filter.id
                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        {selectedFilter === 'trending' && (
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 flex items-start">
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Proyectos en Tendencia</h3>
              <p className="text-sm text-amber-700">
                Estos son los proyectos más populares de la comunidad esta semana.
              </p>
            </div>
          </div>
        )}
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                user={getUserById(project.userId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">No se encontraron proyectos</h3>
            <p className="text-gray-500 text-sm mb-4">
              Intenta con otra búsqueda o sé el primero en compartir un proyecto.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
            >
              Restablecer filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;