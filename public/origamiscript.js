// global OriDomi

function clearDataList(listNode) {
  Array.from(listNode.childNodes).forEach(node => {
    listNode.removeChild(node);
  });
}

function setDataList(listNode, optionValues) {
  optionValues.forEach(word => {
    const childNode = document.createElement('div');
    childNode.className = 'fold';
    childNode.textContent = word;
    listNode.appendChild(childNode);
  });
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

// globals OriDomi
const folded = new OriDomi('#origami', {
  hPanels: 10,
  ripple: true,
  shading: 'hard',
  speed: 1000,
  maxAngle: 70,
  perspective: 800,
});

folded.collapse('top');

function clearList() {
  folded.modifyContent(clearDataList);
}

function updateList(listValues) {
  folded.modifyContent((el) => {
    clearDataList(el);
    setDataList(el, listValues);
  });
  folded.accordion('top');
}

const textInputNode = document.getElementById('data-input');
const clickHandler = getData(textInputNode, updateList);

textInputNode.addEventListener('input', clickHandler);


// folded.modifyContent((el) => {
//   setDataList(el, dummyData);
// });
//
// document.getElementById('button-fold').addEventListener('click', () => {
//   folded.modifyContent((el) => {
//     clearDataList(el);
//     setDataList(el, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
//   });
//   folded.accordion('top');
// });
