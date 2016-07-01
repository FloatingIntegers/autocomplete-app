/* global OriDomi */
const folded = new OriDomi('#origami', {
  hPanels: 10,
  ripple: true,
  shading: 'hard',
  speed: 1000,
  maxAngle: 70,
  perspective: 800,
  touchEnabled: false,
});

folded.collapse('top');

const textInputNode = document.getElementById('data-input');

function clearDataList(listNode) {
  Array.from(listNode.childNodes).forEach(node => {
    listNode.removeChild(node);
  });
}

function clearList() {
  folded.modifyContent(clearDataList);
}

function getData(elem, callback) {
  return function xhrCallback() {
    const xhr = new XMLHttpRequest();
    const inputStr = elem.value;
    if (inputStr.length < 3) {
      clearList();
      folded.collapse('top');
      return;
    }
    xhr.onreadystatechange = function onReadyStateChange() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = xhr.responseText.split('\n');
        callback(response);
      }
    };
    xhr.open('GET', `/api/words?match=${inputStr}`);
    xhr.send();
  };
}

function setDataList(listNode, optionValues) {
  optionValues.forEach(word => {
    const childNode = document.createElement('div');
    childNode.className = 'fold';
    childNode.textContent = word;
    // eslint-disable-next-line no-use-before-define
    childNode.addEventListener('click', setTextInput(word));
    listNode.appendChild(childNode);
  });
}

function updateList(listValues) {
  folded.modifyContent((el) => {
    clearDataList(el);
    setDataList(el, listValues);
  });
  folded.accordion('top');
}

const clickHandler = getData(textInputNode, updateList);

const setTextInput = (word) => () => {
  textInputNode.value = word;
  clickHandler();
};

textInputNode.addEventListener('input', clickHandler);
