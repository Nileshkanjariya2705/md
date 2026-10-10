import { where, orderBy } from 'firebase/firestore';
import { firebaseService } from '@/lib/firebase';
import { TeamMember, CreateTeamMemberInput, UpdateTeamMemberInput } from '../types';
import { MOCK_TEAM } from '../data/mock-team';

const COLLECTION_NAME = 'teamMembers';

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  return firebaseService.getDocuments<TeamMember>(
    COLLECTION_NAME,
    [where('isActive', '==', true), orderBy('sortOrder', 'asc')],
    MOCK_TEAM.filter((m) => m.isActive)
  );
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return firebaseService.getDocuments<TeamMember>(
    COLLECTION_NAME,
    [orderBy('sortOrder', 'asc')],
    MOCK_TEAM
  );
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const fallback = MOCK_TEAM.find((m) => m.id === id) || null;
  return firebaseService.getDocumentById<TeamMember>(COLLECTION_NAME, id, fallback);
}

export async function createTeamMember(data: CreateTeamMemberInput): Promise<string> {
  return firebaseService.createDocument(COLLECTION_NAME, data);
}

export async function updateTeamMember(id: string, data: UpdateTeamMemberInput): Promise<void> {
  return firebaseService.updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteTeamMember(id: string): Promise<void> {
  return firebaseService.deleteDocument(COLLECTION_NAME, id);
}

export async function setTeamMemberActive(id: string, isActive: boolean): Promise<void> {
  return updateTeamMember(id, { isActive });
}
