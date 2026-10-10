/**
 * Generate a URL-safe slug from a title string.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a numeric suffix if needed.
 * @param title - The title to slugify
 * @param existingSlugs - Array of slugs that already exist
 */
export function generateUniqueSlug(title: string, existingSlugs: string[]): string {
  const baseSlug = generateSlug(title);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let candidateSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(candidateSlug)) {
    counter++;
    candidateSlug = `${baseSlug}-${counter}`;
  }

  return candidateSlug;
}
