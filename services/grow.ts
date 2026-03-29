import type { GetGrowLatestResponse, GrowCategoryGroup, GrowItem } from "@/types/grow";

type GetGrowAllResponse = {
  status: number;
  data: {
    grows: GrowItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  cached?: boolean;
};

function groupGrowsByCategory(items: GrowItem[], limitPerCategory: number) {
  const grouped = new Map<string, GrowCategoryGroup>();

  for (const item of items) {
    if (!item.category) continue;

    if (!grouped.has(item.category.id)) {
      grouped.set(item.category.id, {
        ...item.category,
        items: [],
      });
    }

    const categoryGroup = grouped.get(item.category.id)!;
    if (categoryGroup.items.length < limitPerCategory) {
      categoryGroup.items.push(item);
    }
  }

  return [...grouped.values()].sort((a, b) =>
    a.sortOrder === b.sortOrder
      ? a.title.localeCompare(b.title)
      : a.sortOrder - b.sortOrder,
  );
}

async function getJson<T>(url: string) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getGrowLatest(limitPerCategory = 5) {
  try {
    const response = await getJson<GetGrowLatestResponse>(
      `/backend/grow/latest?limitPerCategory=${limitPerCategory}`,
    );

    return {
      success: true,
      status: response.status,
      data: response.data,
      cached: response.cached,
    };
  } catch (error) {
    try {
      const fallback = await getJson<GetGrowAllResponse>(
        "/backend/grow/get-all?page=1&limit=200&search=&category=&dateFrom=&dateTo=&includeUnpublished=true",
      );

      const liveItems = fallback.data.grows.filter(
        (item) => item.visibilityStatus === "live",
      );

      return {
        success: true,
        status: fallback.status,
        data: {
          limitPerCategory,
          categories: groupGrowsByCategory(liveItems, limitPerCategory),
        },
        cached: fallback.cached,
      };
    } catch {
      return {
        success: false,
        status: 500,
        data: undefined,
      };
    }
  }
}
