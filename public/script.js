  const url = '/';
  const keyPressInput = document.getElementById('autocomplete-field');
  keyPressInput.addEventListener('keypress', function () {

    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("IT WORKS");
        document.getElementById('word').innerHTML = 'Hello World!'
      }
    }
    xhr.open('GET', url);
    xhr.send();
  });
