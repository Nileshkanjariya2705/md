import { where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { firebaseService } from '@/lib/firebase';
import { Project, CreateProjectInput, UpdateProjectInput } from '../types';
import { MOCK_PROJECTS } from '../data/mock-projects';

const COLLECTION_NAME = 'projects';

export async function getPublishedProjects(): Promise<Project[]> {
  return firebaseService.getDocuments<Project>(
    COLLECTION_NAME,
    [where('isPublished', '==', true), orderBy('sortOrder', 'asc')],
    MOCK_PROJECTS.filter((p) => p.isPublished)
  );
}

export async function getFeaturedProjects(max = 3): Promise<Project[]> {
  return firebaseService.getDocuments<Project>(
    COLLECTION_NAME,
    [
      where('isPublished', '==', true),
      where('featured', '==', true),
      orderBy('sortOrder', 'asc'),
      firestoreLimit(max),
    ],
    MOCK_PROJECTS.filter((p) => p.isPublished && p.featured).slice(0, max)
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  const docs = await firebaseService.getDocuments<Project>(
    COLLECTION_NAME,
    [where('slug', '==', slug), firestoreLimit(1)],
    fallback ? [fallback] : []
  );
  return docs.length > 0 ? docs[0] : null;
}

export async function getAllProjects(): Promise<Project[]> {
  return firebaseService.getDocuments<Project>(
    COLLECTION_NAME,
    [orderBy('sortOrder', 'asc')],
    MOCK_PROJECTS
  );
}

export async function getProjectById(id: string): Promise<Project | null> {
  const fallback = MOCK_PROJECTS.find((p) => p.id === id) || null;
  return firebaseService.getDocumentById<Project>(COLLECTION_NAME, id, fallback);
}

export async function createProject(data: CreateProjectInput): Promise<string> {
  return firebaseService.createDocument(COLLECTION_NAME, data);
}

export async function updateProject(id: string, data: UpdateProjectInput): Promise<void> {
  return firebaseService.updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteProject(id: string): Promise<void> {
  return firebaseService.deleteDocument(COLLECTION_NAME, id);
}

export async function setProjectPublished(id: string, isPublished: boolean): Promise<void> {
  return updateProject(id, { isPublished });
}

export async function setProjectFeatured(id: string, featured: boolean): Promise<void> {
  return updateProject(id, { featured });
}
