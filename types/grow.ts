export interface GrowCategory {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
}

export interface GrowItem {
  id: string;
  image: string;
  date: string;
  description: string;
  isPublished: boolean;
  visibilityStatus: "draft" | "scheduled" | "live";
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category: GrowCategory | null;
}

export interface GrowCategoryGroup extends GrowCategory {
  items: GrowItem[];
}

export interface GetGrowLatestResponse {
  status: number;
  data: {
    limitPerCategory: number;
    categories: GrowCategoryGroup[];
  };
  cached?: boolean;
}
