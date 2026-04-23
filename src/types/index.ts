// Wizard answers collected across steps
export type UseCaseOption = 'city' | 'highway' | 'family' | 'mixed';
export type PriorityOption = 'economy' | 'safety' | 'comfort' | 'resale';
export type BodyTypeOption = 'hatchback' | 'sedan' | 'suv' | 'muv' | 'any';

export type BuyerProfile = {
  budgetLakh: number;           // 5–50
  useCase: UseCaseOption;
  priority: PriorityOption;
  bodyType: BodyTypeOption;
}

// API request/response shapes
export type RecommendRequest = BuyerProfile;

export type CarRecommendation = {
  rank: number;
  name: string;         // e.g. "Maruti Suzuki Fronx Sigma 1.2"
  price: string;        // e.g. "₹8.5 – ₹9.2 lakh (on-road)"
  why: string;          // 2–3 sentences personalised to buyer
  specs: string[];      // e.g. ["21 km/l", "5-star NCAP", "Easy resale"]
}

export type RecommendResponse = {
  intro: string;
  cars: CarRecommendation[];
}
