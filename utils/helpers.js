const date_formatting =  dateToFormat => {
    return `${new Date(dateToFormat).getMonth() + 1}/${new Date(dateToFormat).getDate()}/${new Date(
      dateToFormat
    ).getFullYear()}`;
  }


const plural_formatting = (wordToPluralize, number) => {
  if (number !== 1) {
    return `${wordToPluralize}s`;
  }
  return wordToPluralize;
}

module.exports = {date_formatting, plural_formatting}