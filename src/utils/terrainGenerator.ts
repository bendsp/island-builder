/**
 * Generates a 2D array of terrain height values using Perlin noise
 * @param gridSize The size of the grid
 * @param gridSegments The number of segments in the grid
 * @param heightScale The scale of the terrain height
 * @returns A 2D array of terrain height values
 */
export function generateTerrain(
  gridSize: number,
  gridSegments: number,
  heightScale: number = 0.5
): number[][] {
  // Create a 2D array to store the terrain height values
  const terrain: number[][] = Array(gridSegments + 1)
    .fill(0)
    .map(() => Array(gridSegments + 1).fill(0));

  // Generate terrain using simplex noise
  for (let x = 0; x <= gridSegments; x++) {
    for (let z = 0; z <= gridSegments; z++) {
      // Normalize coordinates to [0, 1]
      const nx = x / gridSegments;
      const nz = z / gridSegments;

      // Generate base terrain using multiple octaves of noise
      let height = 0;

      // Large features (mountains, valleys)
      height += simplex2(nx * 2, nz * 2) * 0.5;

      // Medium features (hills, depressions)
      height += simplex2(nx * 4, nz * 4) * 0.25;

      // Small features (rocks, bumps)
      height += simplex2(nx * 8, nz * 8) * 0.125;

      // Very small details
      height += simplex2(nx * 16, nz * 16) * 0.0625;

      // Apply island shape (higher in the center, lower at the edges)
      const distanceFromCenter =
        Math.sqrt(Math.pow(nx - 0.5, 2) + Math.pow(nz - 0.5, 2)) * 2; // Normalize to [0, 1] for a unit circle

      // Create island falloff effect
      const falloff = Math.max(0, 1 - distanceFromCenter);

      // Apply falloff and height scale
      height = height * falloff * heightScale;

      // Store the height value
      terrain[x][z] = height;
    }
  }

  return terrain;
}

/**
 * A simple implementation of 2D simplex noise
 * Note: In a real application, you would use a library like simplex-noise
 * This is a simplified version for demonstration purposes
 */
function simplex2(x: number, y: number): number {
  // This is a very simplified version of simplex noise
  // In a real application, use a proper noise library
  return Math.sin(x * 10 + Math.cos(y * 10)) * 0.5 + 0.5;
}
