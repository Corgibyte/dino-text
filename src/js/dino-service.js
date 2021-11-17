export default class DinoService {
  static getDinos(words, paragraphs) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dinoipsum.com/api?format=json&words=${words}&paragraphs=${paragraphs}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request.responseText);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}