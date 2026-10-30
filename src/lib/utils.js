// Mock retreat dates for development.
export const mockRetreats = [
  {
    id: 1,
    startDate: new Date(2025, 4, 15), // May 15, 2025
    endDate: new Date(2025, 4, 22), // May 22, 2025
    title: "Spring Renewal Retreat",
    description: "Connect with nature and yourself in this rejuvenating spring retreat.",
    availableSpots: 25,
    bookedSpots: 8,
  },
  {
    id: 2,
    startDate: new Date(2025, 6, 10), // July 10, 2025
    endDate: new Date(2025, 6, 17), // July 17, 2025
    title: "Summer Solstice Retreat",
    description: "Celebrate the summer solstice with spiritual practices and mountain meditation.",
    availableSpots: 30,
    bookedSpots: 15,
  },
  {
    id: 3,
    startDate: new Date(2025, 8, 20), // September 20, 2025
    endDate: new Date(2025, 8, 27), // September 27, 2025
    title: "Autumn Equinox Retreat",
    description: "Embrace balance and transformation during the autumn equinox.",
    availableSpots: 25,
    bookedSpots: 10,
  },
  {
    id: 4,
    startDate: new Date(2025, 11, 15), // December 15, 2025
    endDate: new Date(2025, 11, 22), // December 22, 2025
    title: "Winter Solstice Retreat",
    description: "Reflect and renew as we approach the winter solstice.",
    availableSpots: 20,
    bookedSpots: 5,
  },
];

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

export const calculateDays = (startDate, endDate) => {
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};
