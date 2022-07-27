const Month = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "H",
  7: "L",
  8: "M",
  9: "P",
  10: "R",
  11: "S",
  12: "T",
};

const data1 = {
  name: "Somchai",
  surname: "Thomson",
  gender: "M",
  birthDate: "1/1/1900",
};
const data2 = {
  name: "Helen",
  surname: "Yu",
  gender: "F",
  birthDate: "1/12/1950",
};
const data3 = {
  name: "Mickey",
  surname: "Mouse",
  gender: "M",
  birthDate: "16/1/1928",
};

const getNameAndSurnameCode = (data) => {
  let vowels = /[aeiou]/gi;
  const match = data.match(vowels);
  let ret = data.replace(/[aeiou]/gi, "");
  const retLength = ret.length;
  if (retLength < 3) {
    ret += match.join("") + "xx";
  }
  ret = ret.substr(0, 3).toUpperCase();
  return ret;
};

const getBirthdateCode = (birthDate, gender) => {
  const dataSplit = birthDate.split("/");
  let ret = "";
  if (dataSplit[2]) {
    ret = dataSplit[2].substr(-2);
  }
  if (dataSplit[1]) {
    ret += Month[dataSplit[1]];
  }
  if (dataSplit[0]) {
    let day = Number(dataSplit[0]);
    if (gender == "F") {
      day += 40;
    }
    if (day < 10) {
      day = "0" + day;
    }
    ret += day;
  }
  return ret;
};

const generateCode = (data) => {
  const code1 = getNameAndSurnameCode(data.surname);
  const code2 = getNameAndSurnameCode(data.name);
  const code3 = getBirthdateCode(data.birthDate, data.gender);
  return code1 + code2 + code3;
};

console.log(data1);
console.log("Code : ", generateCode(data1), "\n");
console.log(data2);
console.log("Code : ", generateCode(data2), "\n");
console.log(data3);
console.log("Code : ", generateCode(data3), "\n");
