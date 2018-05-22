function onCommand(command) {
  chrome.tabs.query({url: 'https://*.soundcloud.com/*'}, function(tabs) {

    // Open a spotify tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://soundcloud.com'});
    }

    // Apply command on all spotify tabs.
    for (var tab of tabs) {

      var code = '';
      if (tab.url.startsWith('https://soundcloud.com')) {
        code = "document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";
      } else if (tab.url.startsWith('https://open.spotify.com')) {
        switch (command) {
          case 'next': code = 'document.querySelector(".playControls__next").click()'; break;
          case 'previous': code = 'document.querySelector(".playControls__prev").click()'; break;
          case 'shuffle': code = 'document.querySelector(".shuffleControl").click()'; break;
          case 'repeat': code = 'document.querySelector(".playControls__repeat").click()'; break;
          case 'play-pause': code = 'document.querySelector(".playControls__play")'; break;
        }
      }
      if (code.length) {
        chrome.tabs.executeScript(tab.id, {code: code});
      }
    }

    // Unload background page as soon as we're done.
    window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
