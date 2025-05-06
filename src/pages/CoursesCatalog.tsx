import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/ui/Button';
import { Course } from '../types';

// Mock data for demo purposes
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introducción a la Programación con JavaScript',
    description: 'Aprende los fundamentos de la programación con JavaScript desde cero.',
    imageUrl: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    category: 'programming',
    level: 'beginner',
    duration: 480,
    modules: 8,
    rating: 4.7,
    enrolled: 1520,
  },
  {
    id: '2',
    title: 'Diseño de Interfaz de Usuario con Figma',
    description: 'Domina Figma y crea diseños profesionales para web y móvil.',
    imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    category: 'design',
    level: 'intermediate',
    duration: 360,
    modules: 6,
    rating: 4.9,
    enrolled: 980,
  },
  {
    id: '3',
    title: 'Machine Learning para Analítica de Datos',
    description: 'Implementa algoritmos de ML para analizar y predecir tendencias en datos.',
    imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    category: 'data-science',
    level: 'advanced',
    duration: 720,
    modules: 12,
    rating: 4.8,
    enrolled: 750,
  },
  {
    id: '4',
    title: 'Desarrollo Web con React.js',
    description: 'Construye aplicaciones web interactivas con React.js y bibliotecas modernas.',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    category: 'programming',
    level: 'intermediate',
    duration: 540,
    modules: 9,
    rating: 4.6,
    enrolled: 1250,
  },
  {
    id: '5',
    title: 'Marketing Digital para Principiantes',
    description: 'Aprende estrategias efectivas de marketing digital para crecer tu negocio.',
    imageUrl: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    category: 'marketing',
    level: 'beginner',
    duration: 300,
    modules: 5,
    rating: 4.5,
    enrolled: 1800,
  },
  {
    id: '6',
    title: 'Bases de Datos con SQL',
    description: 'Domina el lenguaje SQL y aprende a diseñar bases de datos eficientes.',
    imageUrl: 'https://images.pexels.com/photos/7775641/pexels-photo-7775641.jpeg',
    category: 'programming',
    level: 'beginner',
    duration: 420,
    modules: 7,
    rating: 4.4,
    enrolled: 950,
  },
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'programming', name: 'Programación' },
  { id: 'design', name: 'Diseño' },
  { id: 'data-science', name: 'Ciencia de Datos' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'business', name: 'Negocios' },
];

const levels = [
  { id: 'all', name: 'Todos los niveles' },
  { id: 'beginner', name: 'Principiante' },
  { id: 'intermediate', name: 'Intermedio' },
  { id: 'advanced', name: 'Avanzado' },
];

const CoursesCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchCourses = async () => {
      // In a real app, fetch from Supabase here
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = courses;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel !== 'all') {
      result = result.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory, selectedLevel, courses]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cursos</h1>
          <p className="text-gray-500 mt-1">
            Descubre cursos para adquirir nuevas habilidades y avanzar en tu carrera.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category.id
                          ? 'bg-indigo-100 text-indigo-800 font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Nivel</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedLevel === level.id
                          ? 'bg-indigo-100 text-indigo-800 font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">No se encontraron cursos</h3>
            <p className="text-gray-500 text-sm mb-4">
              Intenta con otra búsqueda o elimina algunos filtros.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
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

export default CoursesCatalog;