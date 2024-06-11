const replaceText = (event) => {
  const target = event.target;
  if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') || target.getAttribute('contenteditable') === 'true') {
    let value;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      value = target.value;
    } else if (target.getAttribute('contenteditable') === 'true') {
      value = target.textContent;
    }
    if (value.startsWith('heygpt') && value.endsWith(';')) {
      const data = value.split(':')[1]?.split(";")[0]?.trim();
      if (data) {
        target.textContent = 'loading.....'; // Change value to textContent for contenteditable divs
        const url = new URL('http://localhost:8000');
        url.searchParams.append('data', data);

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(responseData => {
          target.textContent = responseData.message; // Change value to textContent for contenteditable divs
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    }
  }
}

document.addEventListener('input', replaceText);
