import * as slugify from 'slugify';

export default function normalizeName(name: string) {
  const studentNameArray = name.split(' ');
  const studentNameWithSpecialCharacters = `${studentNameArray[0]} ${studentNameArray[studentNameArray.length - 1]}`
    .substr(0, 16);

  let studentNameNormalized = (<string>slugify(studentNameWithSpecialCharacters)).toUpperCase();

  for (let i = studentNameNormalized.length; i < 16; i += 1) {
    studentNameNormalized += ' ';
  }

  return studentNameNormalized.replace('-', ' ');
}