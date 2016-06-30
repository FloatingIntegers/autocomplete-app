const submitButton = document.getElementById('submit');

function clearDataList() {
  const list = document.getElementById('suggestions');

  Array.from(list.childNodes).forEach(node => {
    list.removeChild(node);
  });
}

function setDataList(optionValues) {
  const list = document.getElementById('suggestions');

  optionValues.forEach(word => {
    const optionNode = document.createElement('option');
    optionNode.value = word;
    list.appendChild(optionNode);
  });
}

function updateList(listValues) {
  clearDataList();
  setDataList(listValues);
}

function getData() {
  const xhr = new XMLHttpRequest();
  const inputStr = document.getElementById('autocomplete-field').value;
  xhr.onreadystatechange = function onReadyStateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = xhr.responseText.split('\n');
      updateList(response);
    }
  };
  xhr.open('GET', `api/words?match=${inputStr}`);
  xhr.send();
}

submitButton.addEventListener('click', getData);
