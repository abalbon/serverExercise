(function (window) {
  'use strict';

  const BUTTON_SELECTOR = '[data-posts="id"]';

  let buttons = document.querySelectorAll(BUTTON_SELECTOR);

  buttons.forEach(function (button) {
    'use strict';

    let sectionSelector = `#comments-${button.value}`;
    let commentSection = document.querySelector(sectionSelector);

    button.addEventListener('click', function (event) {
      if (commentSection.hidden) {
        commentSection.hidden = false;
        button.textContent = 'Hide comments';
      } else {
        commentSection.hidden = true;
        button.textContent = 'Show comments';
      }

      event.preventDefault();
    });
  });
})(window);

fetch('http://jsonplaceholder.typicode.com/posts')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
		  for(var i = 0; i < data.length; i++){
			  var art = document.createElement('article');
			  art.innerHTML = "ID: " + data[i].id + "\nTITLE: " + data[i].title + "\nBODY: " + data[i].body;
			  document.body.appendChild(art);
		  	console.log(data[i]);
		  }       
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
