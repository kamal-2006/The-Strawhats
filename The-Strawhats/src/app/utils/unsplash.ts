// Mock Unsplash API for images
export async function getUnsplashImage(query: string): Promise<string> {
  // Return placeholder image
  return `https://images.unsplash.com/photo-1603375739154-8a8e8c2f0e4c?w=800&q=80`;
}
