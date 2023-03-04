export interface ValidationResult {
  isValid: boolean;
  error: Error | null;
  errorType: "MISSING_PARAM" | "INVALID_PARAM" | null;
  statusCode: number;
}
