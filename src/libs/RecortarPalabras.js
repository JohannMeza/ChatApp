export function characterTrim(string, cant = 15) {
  let stringTrim = string.substring(0, cant);
  let validateString = string.substring(0, cant + 1);
  if (validateString.substr(-1) === ' ') return `${stringTrim} ...`
  return `${stringTrim}...`
}

export function wordTrim(string, cant = 10) {
  let quantWords = string.split(' ');
  return quantWords.splice(0, cant, '...').join(' ')
}
