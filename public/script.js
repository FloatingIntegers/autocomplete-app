  const keyPressInput = document.getElementById('autocomplete-field');

  function getData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onReadyStateChange() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('IT WORKS');
        document.getElementById('word').innerHTML = 'Hello World!';
      }
    };
    xhr.open('GET', '/');
    xhr.send();
  }

  keyPressInput.addEventListener('keypress', getData);
