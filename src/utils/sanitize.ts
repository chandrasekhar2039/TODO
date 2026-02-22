/**
 * Sanitizes user input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags and event handlers
  const withoutScripts = withoutHtml.replace(/javascript:/gi, '');
  
  // Trim whitespace
  return withoutScripts.trim();
};

/**
 * Capitalizes first letter of a string
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str[0].toUpperCase() + str.substring(1);
};
