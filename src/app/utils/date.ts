

const dateToString =  (dateText : string)=>{
  const date = new Date(dateText);
  const month = completeCero(date.getUTCMonth()+1);
  const day = completeCero(date.getUTCDate());
  return `${date.getUTCFullYear()}-${month}-${day}`;
};

const dateToStringPlusYear = (dateText : string)=>{
  const date = new Date(dateText);
  const month = completeCero(date.getUTCMonth()+1);
  const day = completeCero(date.getUTCDate());
  return `${date.getUTCFullYear()+1}-${month}-${day}`;
};

const completeCero = (n: number) => {
  return n >= 10 ? n : '0'+n;
}

export const DateUtil = {
  completeCero,
  dateToStringPlusYear,
  dateToString
}
