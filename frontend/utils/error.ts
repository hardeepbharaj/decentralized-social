import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

/**
 * Handles API errors consistently across the application
 * @param error - Error object from catch block
 * @param customMessage - Optional custom message to show instead of default
 */
export const handleError = (error: unknown, customMessage?: string): void => {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    const message = error.response?.data?.message || error.message;
    toast.error(customMessage || message || 'An error occurred');
  } else if (error instanceof Error) {
    // Handle standard errors
    toast.error(customMessage || error.message || 'An error occurred');
  } else {
    // Handle unknown errors
    toast.error(customMessage || 'An unexpected error occurred');
  }
}; 