import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getLevelBadgeVariant = () => {
    switch (course.level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  const getLevelLabel = () => {
    switch (course.level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return course.level;
    }
  };
  
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
        <div className="relative">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={getLevelBadgeVariant()}>
              {getLevelLabel()}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{course.title}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{course.description}</p>
          
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-auto">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration} mins</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.modules} módulos</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.enrolled.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.274l-6.182 3.245 1.179-6.873-5-4.867 6.91-1.002L10 0l3.093 6.777 6.91 1.002-5 4.867 1.179 6.873L10 15.274z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{course.rating.toFixed(1)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;