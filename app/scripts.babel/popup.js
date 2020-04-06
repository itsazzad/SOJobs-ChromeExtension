'use strict';

const appendLog = (message) => {
  const li = document.createElement('li');
  li.innerHTML = JSON.stringify(message);
  document.getElementById('logs').append(li);
};

const getQueryParams = (url) => {
  let queryParams = {};
  //create an anchor tag to use the property called search
  let anchor = document.createElement('a');
  //assigning url to href of anchor tag
  anchor.href = url;
  //search property returns the query string of url
  let queryStrings = anchor.search.substring(1);
  let params = queryStrings.split('&');

  for (let i = 0; i < params.length; i++) {
    const pair = params[i].split('=');
    queryParams[pair[0]] = decodeURIComponent(pair[1]);
  }
  return queryParams;
};


chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  const urlParams = getQueryParams(tabs[0].url);
  const pg = urlParams['pg'];
  chrome.tabs.sendMessage(tabs[0].id, {
    greeting: 'hello',
    pg
  }, function (response) {
    appendLog(response);
  });
});
