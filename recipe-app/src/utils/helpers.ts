export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 127;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && 
         password.length <= 63 && 
         /^[a-zA-Z0-9]+$/.test(password);
};