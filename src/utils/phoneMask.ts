export const phoneMask = (value: string): string => {
  if (!value) {
    return "";
  }

  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // (XX) XXXXX-XXXX for mobile phones
  if (digitsOnly.length === 11) {
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  }
  
  // (XX) XXXX-XXXX for landlines
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
  }

  // Return the original value if it doesn't match expected lengths
  return digitsOnly;
};
