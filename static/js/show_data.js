let codeList = [];
var current = 0;

function copyCode() {
    var codeElement = document.getElementById('code');
    var codeText =  codeElement.innerText;
    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.setAttribute('value', codeText);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function copyViewCode() {
    var codeElement = document.getElementById('code');
    var codeText =  'kv ' + codeElement.innerText;
    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.setAttribute('value', codeText);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function prevData() {
    if (current > 0) {
        current--;
        updateData();
    }
}

function nextData() {
    if (current < maxIndex) {
        current++;
        updateData();
    }
}

function backbtn() {
    window.location.href = "/";
}

function updateData() {
    if (data && current >= 0 && current < data.length) {
        document.getElementById('code').innerText = data[current]['code'];
        document.getElementById('character').innerText = data[current]['character'];
        document.getElementById('series').innerText = data[current]['series'];
        document.getElementById('wishlists').innerText = data[current]['wishlists'];      
        document.getElementById('edition').innerText = data[current]['edition'];
        document.getElementById('number').innerText = data[current]['number'];
        document.getElementById('quality').innerText = data[current]['quality'];
        document.getElementById('burnValue').innerText = data[current]['burnValue'];
        document.getElementById('tag').innerText = data[current]['tag'];
        

        var indexToRemove = codeList.indexOf(document.getElementById('code').innerText);
        if (indexToRemove !== -1) {
            document.getElementById('burn').innerText = 'True';
        } else {
            document.getElementById('burn').innerText = 'False';
        }      
        
        var imageUrl = 'http://d2l56h9h5tj8ue.cloudfront.net/images/cards/' +
            data[current]['character'].replace(' ', '-').toLowerCase() +
            '-' + data[current]['edition'] + '.jpg';

        document.querySelector('.character-image').src = imageUrl;
    }
}

function burnButton() {
    if (document.getElementById('burn').innerText === 'False') {
        var codeText = document.getElementById('code').innerText;
        document.getElementById('burn').innerText = 'True';
        codeList.push(codeText);
    } else {
        document.getElementById('burn').innerText = 'False';
        var indexToRemove = codeList.indexOf(document.getElementById('code').innerText);
        if (indexToRemove !== -1) {
            codeList.splice(indexToRemove, 1);
        }
    }    
}

function downloadFile() {
    if (codeList.length === 0) {
      return;
    }
  
    const zip = new JSZip();
    const codeText = codeList.join(', ');
  
    zip.file('code.txt', codeText);
  
    zip.generateAsync({ type: 'blob' }).then(function(content) {
      saveAs(content, 'burning cards.zip');
      codeList = [];
    });
}