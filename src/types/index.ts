export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  level: number;
  points: number;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  modules: number;
  rating: number;
  enrolled: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  completed: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  points: number;
  earnedAt?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: number;
  totalModules: number;
  lastAccessedAt: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: string;
}

export interface ProjectShare {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  courseId?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  content: string;
  createdAt: string;
}