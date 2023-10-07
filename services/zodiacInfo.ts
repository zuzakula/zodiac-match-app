import { X_RAPID_KEY } from "@env";

export const getZodiacInfo = async (zodiac) => {
  const response = await fetch(
    `https://horoscope-astrology.p.rapidapi.com/sign?s=${zodiac}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": X_RAPID_KEY,
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    }
  );
  return await response.json();
};
