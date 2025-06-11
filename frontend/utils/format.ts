/**
 * Formats an Ethereum address for display by showing first 6 and last 4 characters
 * @param address - The full Ethereum address
 * @returns Formatted address string
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  
  // For display purposes only - keep the full address for links and data
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 