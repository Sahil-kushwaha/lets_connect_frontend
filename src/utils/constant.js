// dev
// export const BASE_URL = "http://localhost:3000";

//production
// export const BASE_URL = ""; // i have configure nginx which is act as reverse proxy for my backend /api/ i have follow  covnetion for writing api /api/v1/.. that's why i don't include /api as BASE url;

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000" : "";
