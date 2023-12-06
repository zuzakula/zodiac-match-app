import {
  X_RAPID_KEY,
  X_RAPID_KEY_MATCH,
  X_RAPID_KEY_MATCH_DETAILS,
} from "@env";

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

export const matchInfo = async (loggedUser, user) => {
  try {
    const queryParams = new URLSearchParams({
      birthdetails: `name=${loggedUser.name}&dob=${loggedUser.birthdayDate}&name1=${user.name}&dob1=${user.birthdayDate}&sort=S&NC=C&ryr=2023&details=N&coupon=12345678`,
    });

    const url = `https://starlovematch.p.rapidapi.com/api/?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": X_RAPID_KEY_MATCH,
        "X-RapidAPI-Host": "starlovematch.p.rapidapi.com",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const matchInfoDetails = async (loggedUser, user) => {
  try {
    const queryParams = new URLSearchParams({
      sign1: loggedUser,
      sign2: user,
    });

    const url = `https://horoscope-astrology.p.rapidapi.com/affinity?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": X_RAPID_KEY_MATCH_DETAILS,
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
