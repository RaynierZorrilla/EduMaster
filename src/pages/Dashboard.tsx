import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award } from 'lucide-react';
import ProgressStats from '../components/dashboard/ProgressStats';
import AchievementsList from '../components/dashboard/AchievementsList';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/ui/Button';
import { Course, Achievement, UserProgress } from '../types';

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
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primer Curso Completado',
    description: 'Completaste tu primer curso con éxito',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/6941/6941697.png',
    points: 50,
    earnedAt: '2025-04-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Racha de 7 Días',
    description: 'Mantuviste una racha de estudio por 7 días',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2150/2150464.png',
    points: 25,
    earnedAt: '2025-04-18T10:15:00Z',
  },
  {
    id: '3',
    title: 'Primer Comentario',
    description: 'Dejaste tu primer comentario en la comunidad',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/6460/6460111.png',
    points: 15,
    earnedAt: '2025-04-20T16:45:00Z',
  },
];

const Dashboard: React.FC = () => {
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progressStats, setProgressStats] = useState({
    activeCourses: 0,
    completedCourses: 0,
    totalTimeSpent: 0,
    consecutiveDays: 0,
    averageCompletion: 0,
  });
  
  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      // In a real app, fetch from Supabase here
      setActiveCourses(mockCourses);
      setAchievements(mockAchievements);
      setProgressStats({
        activeCourses: 2,
        completedCourses: 3,
        totalTimeSpent: 1350, // minutes
        consecutiveDays: 12,
        averageCompletion: 68,
      });
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido de vuelta, Miguel</h1>
            <p className="text-gray-500 mt-1">
              Continúa aprendiendo desde donde lo dejaste.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Nivel 4</span>
            </div>
            <div className="ml-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">420 Puntos</span>
            </div>
          </div>
        </div>
        
        <ProgressStats 
          activeCourses={progressStats.activeCourses}
          completedCourses={progressStats.completedCourses}
          totalTimeSpent={progressStats.totalTimeSpent}
          consecutiveDays={progressStats.consecutiveDays}
          averageCompletion={progressStats.averageCompletion}
        />
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Continúa Aprendiendo</h2>
            </div>
            <Link to="/courses">
              <Button variant="outline" size="sm">Ver todos los cursos</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        <AchievementsList achievements={achievements} recent={true} />
        
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-12 md:flex md:items-center md:justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-white">¿Listo para compartir tu proyecto?</h2>
              <p className="mt-2 text-indigo-100">
                Muestra tus habilidades a la comunidad y recibe feedback valioso para seguir mejorando.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link to="/community/share">
                <Button size="lg" className="dark:text-white text-indigo-600 hover:bg-indigo-50">
                  Compartir Proyecto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;