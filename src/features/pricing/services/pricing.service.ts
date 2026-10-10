import { where, orderBy } from 'firebase/firestore';
import { firebaseService } from '@/lib/firebase';
import { PricingPlan, CreatePricingPlanInput, UpdatePricingPlanInput } from '../types';
import { MOCK_PRICING_PLANS } from '../data/mock-pricing';

const COLLECTION_NAME = 'pricing';

export async function getAllPricingPlans(): Promise<PricingPlan[]> {
  return firebaseService.getDocuments<PricingPlan>(
    COLLECTION_NAME,
    [orderBy('sortOrder', 'asc')],
    MOCK_PRICING_PLANS
  );
}

export async function getActivePricingPlans(): Promise<PricingPlan[]> {
  return firebaseService.getDocuments<PricingPlan>(
    COLLECTION_NAME,
    [where('isActive', '==', true), orderBy('sortOrder', 'asc')],
    MOCK_PRICING_PLANS.filter((p) => p.isActive)
  );
}

export async function getPricingPlanById(id: string): Promise<PricingPlan | null> {
  const fallback = MOCK_PRICING_PLANS.find((p) => p.id === id) || null;
  return firebaseService.getDocumentById<PricingPlan>(COLLECTION_NAME, id, fallback);
}

export async function createPricingPlan(data: CreatePricingPlanInput): Promise<string> {
  return firebaseService.createDocument(COLLECTION_NAME, data);
}

export async function updatePricingPlan(id: string, data: UpdatePricingPlanInput): Promise<void> {
  return firebaseService.updateDocument(COLLECTION_NAME, id, data);
}

export async function deletePricingPlan(id: string): Promise<void> {
  return firebaseService.deleteDocument(COLLECTION_NAME, id);
}

export async function setPricingPlanActive(id: string, isActive: boolean): Promise<void> {
  return updatePricingPlan(id, { isActive });
}

export async function setPricingPlanPopular(id: string, popular: boolean): Promise<void> {
  return updatePricingPlan(id, { popular });
}
