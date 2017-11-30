import * as slugify from 'slugify';
import normalizeLength from './normalizeLength';

export default function normalizeName(name: string) {
  const studentNameArray = name.split(' ');
  const studentNameWithSpecialCharacters = `${studentNameArray[0]} ${studentNameArray[studentNameArray.length - 1]}`
    .substr(0, 16);

  const studentNameSlugified = (<string>slugify(studentNameWithSpecialCharacters)).toUpperCase();
  const studentNameNormalized = normalizeLength(studentNameSlugified);

  return studentNameNormalized.replace('-', ' ');
}