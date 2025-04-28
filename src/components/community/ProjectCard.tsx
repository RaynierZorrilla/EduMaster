import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';
import { ProjectShare } from '../../types';

interface ProjectCardProps {
  project: ProjectShare;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, user }) => {
  return (
    <Card className="overflow-hidden">
      {project.imageUrl && (
        <div className="relative h-48">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-5">
        <div className="flex items-center mb-4">
          <Avatar 
            src={user.avatarUrl}
            fallback={user.username}
            size="sm"
          />
          <div className="ml-2">
            <p className="font-medium text-gray-900">{user.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(project.createdAt).toLocaleDateString()} · 
              {project.courseId && <span> Desde un curso</span>}
            </p>
          </div>
        </div>
        
        <Link to={`/projects/${project.id}`} className="block group">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4">{project.description}</p>
        </Link>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.likes}</span>
            </button>
            
            <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.comments}</span>
            </button>
          </div>
          
          <button className="text-gray-500 hover:text-indigo-600 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;