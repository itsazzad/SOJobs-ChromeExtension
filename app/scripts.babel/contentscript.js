'use strict';

console.log('SOJobs ...');

const start = () => {
  document.querySelectorAll('#content .listResults .-job').forEach((item, index) => {
    let data = {
      company: null,
      tags: []
    };
    item.querySelectorAll('h3 > span:first-child').forEach((tag) => {
      data.company = tag.innerText.trim();
    });
    item.querySelectorAll('div > .post-tag').forEach((tag) => {
      data.tags.push(tag.innerText.trim());
    });
    let key = `jobid-${item.dataset.jobid}`;
    let value = JSON.stringify(data);
    chrome.storage.local.set({ [key]: value }, () => {
      // console.log(key, value);
    });
  });
};

const processData = () => {
  chrome.storage.local.get(null, (obj) => {
    // console.log(obj);
    const allKeys = Object.keys(obj);
    // console.log(allKeys);

    const tagsByCompany = {};
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const data = JSON.parse(obj[prop]);
        // console.log(prop, data);
        data.tags.forEach(tag => {
          if (data.company in tagsByCompany) {
            if (tag in tagsByCompany[data.company]) {
              tagsByCompany[data.company][tag]++;
            } else {
              tagsByCompany[data.company][tag] = 1;
            }
          } else {
            tagsByCompany[data.company] = {};
          }
        });
      }
    }
    console.log(tagsByCompany);
    processCompanyForTags(tagsByCompany);
  });
};

const processCompanyForTags = (data) => {
  // console.log(data);
  const countByTags = {};

  for (const company in data) {
    if (data.hasOwnProperty(company)) {
      // console.log(company, data[company]);
      for (const tag in data[company]) {
        if (data[company].hasOwnProperty(tag)) {
          if (countByTags[tag]) {
            countByTags[tag]++;
          } else {
            countByTags[tag] = 1;
          }
        }
      }
    }
  }
  // console.log(countByTags);
  const output = Object.entries(countByTags).sort(
    (a, b) => b[1] - a[1]
  );
  console.log(output);

  const objSorted = {};
  output.forEach(item => {
    objSorted[item[0]] = item[1]
  });
  console.log(objSorted);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse(request);
  if (request.greeting === 'hello') {
    if (typeof request.pg === 'undefined' || request.pg === '1' || request.pg === '' || request.pg === null) {
      chrome.storage.local.clear();
      chrome.storage.sync.clear();
      console.log('Storage cleared!')
    }
  }
});

start();
processData();
