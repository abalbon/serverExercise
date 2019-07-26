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
		  for(var i = 3; i < data.length; i++){
			  var art = document.createElement('article');
			  art.innerHTML = '<article><h2 data-posts="title">'+ data[i].title +'</h2><p data-posts="body">'+data[i].body+'</p><button data-posts="id" value="'+i+'" type="button" onclick="aFunction(value)">Show comments</button><section class="comments" id="comments-'+i+'" hidden><h3>Comments</h3></section></article>';
			  document.body.appendChild(art);
		  	console.log(data[i]);
		  }  
		  var script = document.createElement('script');
		  script.innerHTML = 'src="comments.js"';
		  document.body.appendChild(script);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function aFunction(n){
fetch('http://jsonplaceholder.typicode.com/comments?postId=' + n)
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
			  var paragraph = document.createElement('p');
			  paragraph.innerHTML = '<p data-comments="body">' + data[i].body + '</p>';
			  document.getElementById('comments-' + n).appendChild(paragraph);
			  
			  var address = document.createElement('address');
			  address.innerHTML = '<address data-comments="' + data[i].name+ '"><a data-comments="' + data[i].email + '" href="mailto:' + data[i].email + '">id labore ex et quam laborum</a></address>';
			  document.getElementById('comments-' + n).appendChild(address);
		  	console.log(data[i]);
		  }       
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}