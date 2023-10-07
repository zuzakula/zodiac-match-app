enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

export const getZodiacSign = (month, day) => {
  let sign: string = "";

  if (month === Month.DECEMBER) {
    if (day < 22) {
      sign = "Sagittarius";
    } else {
      sign = "Capricorn";
    }
  } else if (month === Month.JANUARY) {
    if (day < 20) sign = "Capricorn";
    else sign = "Aquarius";
  } else if (month === Month.FEBRUARY) {
    if (day < 19) sign = "Aquarius";
    else sign = "Pisces";
  } else if (month === Month.MARCH) {
    if (day < 21) sign = "Pisces";
    else sign = "Aries";
  } else if (month === Month.APRIL) {
    if (day < 20) sign = "Aries";
    else sign = "Taurus";
  } else if (month === Month.MAY) {
    if (day < 21) sign = "Taurus";
    else sign = "Gemini";
  } else if (month === Month.JUNE) {
    if (day < 21) sign = "Gemini";
    else sign = "Cancer";
  } else if (month === Month.JULY) {
    if (day < 23) sign = "Cancer";
    else sign = "Leo";
  } else if (month === Month.AUGUST) {
    if (day < 23) sign = "Leo";
    else sign = "Virgo";
  } else if (month === Month.SEPTEMBER) {
    if (day < 23) sign = "Virgo";
    else sign = "Libra";
  } else if (month === Month.OCTOBER) {
    if (day < 23) sign = "Libra";
    else sign = "Scorpio";
  } else if (month === Month.NOVEMBER) {
    if (day < 22) sign = "Scorpio";
    else sign = "Sagittarius";
  }

  return sign;
};
