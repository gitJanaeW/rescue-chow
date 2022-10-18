export function captializeFirstChar(phrase) {
    const phraseArr = phrase.split('');
    phraseArr.splice(0, 1, phrase[0].toUpperCase());
    return phraseArr.join('');
  }
  
export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}