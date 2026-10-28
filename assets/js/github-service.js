
const CATALOG_URL = "./data/videos.json";

export async function loadVideoCatalog() {
  const response = await fetch(CATALOG_URL, {
    cache: "no-cache"
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load video catalog: ${response.status}`
    );
  }

  const catalog = await response.json();

  if (!Array.isArray(catalog.categories)) {
    throw new Error("Invalid video catalog format.");
  }

  return catalog;
}