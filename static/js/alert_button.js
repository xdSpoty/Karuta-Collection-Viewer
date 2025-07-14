const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-light alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('copyCode')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    var codeElement = document.getElementById('code');
    var codeText =  codeElement.innerText;
    appendAlert('Code copied to clipboard: ' + codeText , 'success')
  })
}

const alertTrigger1 = document.getElementById('copyViewCode')
if (alertTrigger1) {
  alertTrigger1.addEventListener('click', () => {
    var codeElement = document.getElementById('code');
    var codeText =  'kv ' + codeElement.innerText;
    appendAlert('Code copied to clipboard: ' + codeText , 'success')
  })
}

const alertTrigger2 = document.getElementById('burnButton')
if (alertTrigger2) {
  alertTrigger2.addEventListener('click', () => {
    if (document.getElementById('burn').innerText === 'False') {
        appendAlert('Undo Burn burn burn', 'success')
    } else {
        appendAlert('Burn burn burn', 'success')
        }
    })
}