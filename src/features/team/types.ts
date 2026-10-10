import { Timestamp } from 'firebase/firestore';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photo: string;
  department?: string;
  skills?: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateTeamMemberInput = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTeamMemberInput = Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>>;
