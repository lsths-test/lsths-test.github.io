// Navbar
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-options");
menuBtn.onclick = () => {
  menu.classList.toggle("active-nav");
};

function populateData(data) {
  // Convert special characters like &ntilde; to their respective characters

  const rows = data.split('\n');
  const maleData = [];
  const femaleData = [];

  let currentGender = '';
  rows.forEach(row => {
      if (row.startsWith('Male:')) {
          currentGender = 'male';
      } else if (row.startsWith('Female:')) {
          currentGender = 'female';
      } else if (row.trim() && currentGender) {
          let [originalName, birthdate] = row.split(' - ');

          // Format name for card display
          const cardName = formatNameForCard(originalName);

          if (currentGender === 'male') {
              maleData.push({ originalName, cardName, birthdate });
          } else if (currentGender === 'female') {
              femaleData.push({ originalName, cardName, birthdate });
          }
      }
  });

  // Populate the table
  
  const tbody = document.querySelector('#studentsTable tbody');
  const maxRows = Math.max(maleData.length, femaleData.length);
  for (let i = 0; i < maxRows; i++) {
      const tr = document.createElement('tr');
      const maleTd = document.createElement('td');
      const femaleTd = document.createElement('td');

      if (maleData[i]) {
          maleTd.innerText = `${i + 1}. ${maleData[i].originalName.toUpperCase()}`;
          updateCard(`student${i * 2 + 1}-card`, maleData[i].cardName, maleData[i].birthdate);
      }
      if (femaleData[i]) {
          femaleTd.innerText = `${i + 1}. ${femaleData[i].originalName.toUpperCase()}`;
          updateCard(`student${i * 2 + 2}-card`, femaleData[i].cardName, femaleData[i].birthdate);
      }

      tr.appendChild(maleTd);
      tr.appendChild(femaleTd);
      tbody.appendChild(tr);

      // Add click event listeners to table cells
      maleTd.addEventListener('click', () => showCard(`student${i * 2 + 1}-card`));
      femaleTd.addEventListener('click', () => showCard(`student${i * 2 + 2}-card`));
  }
}

// Function to update the card elements
function updateCard(cardId, name, birthdate) {
  const card = document.getElementById(cardId);
  if (card) {
      card.querySelector('.Sname').innerText = name;
      card.querySelector('.Sbday').innerText = `Birthdate: ${birthdate}`;
      // Calculate and set age if needed
      const birthDateObj = new Date(birthdate.split('/').reverse().join('-'));
      const age = new Date().getFullYear() - birthDateObj.getFullYear();
      card.querySelector('.Sage').innerText = `Age: ${age}`;
  }
}

// Function to format name for card display
function formatNameForCard(name) {
  // Assuming the format "Lastname, Firstname, Othername"
  const parts = name.split(', ');
  if (parts.length >= 2) {
      const firstname = parts[1];
      const lastname = parts[0];
      const othername = parts.slice(2).join(' ');
      return `${firstname} ${othername.charAt(0)}. ${lastname}`;
  }
  return name; // Return original if format doesn't match
}

// Function to show a specific card and hide others
function showCard(cardId) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
      card.classList.remove('active-card');
  });

  const cardToShow = document.getElementById(cardId);
  if (cardToShow) {
      cardToShow.classList.add('active-card');
  }
}

// Custom video controls
var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video_player', {
        videoId: '21_Oiwvg3IE',
        playerVars: {
          hd: 1,
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          rel: 0,
          playlist: '21_Oiwvg3IE',
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerReady(event) {
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const unmuteBtn = document.getElementById('unmuteBtn');
  const muteBtn = document.getElementById('muteBtn');

  let Playing = false; 
  let Muted;
  function checkPlayerState() {
    Playing = player.getPlayerState() === YT.PlayerState.PLAYING;
    Muted = player.isMuted();
    updateButtonVisibility(Playing, Muted);
  }
  checkPlayerState();
  setInterval(checkPlayerState, 1);

  function updateButtonVisibility(Playing, Muted) {
    playBtn.classList.toggle("hidden", Playing);
    pauseBtn.classList.toggle("hidden", !Playing);
    unmuteBtn.classList.toggle("hidden", Muted);
    muteBtn.classList.toggle("hidden", !Muted);
  }  

  playBtn.addEventListener('click', function () {
    if (!Playing) {
      player.playVideo();
      Playing = true;
    }
    updateButtonVisibility(Playing);
  });

  pauseBtn.addEventListener('click', function () {
    if (Playing) {
      player.pauseVideo();
      Playing = false;
    }
    updateButtonVisibility(Playing);
  });

  unmuteBtn.addEventListener('click', function () {
    if (!Muted) {
      player.mute();
      Muted = true;
    }
    updateButtonVisibility(Muted)
  });

  muteBtn.addEventListener('click', function () {
    if (Muted) {
      player.unMute();
      Muted = false;
    }
      updateButtonVisibility(Muted)
  });
}

// show fullow up question
function showFollowUp(radioId, followUpDivClass) {
  var followUpDiv = document.querySelector('.' + followUpDivClass);
  if (document.getElementById(radioId).checked) {
    followUpDiv.style.display = 'block';
  }
}

function hideFollowUp(followUpDivClass) {
  var followUpDiv = document.querySelector('.' + followUpDivClass);
  
  // Reset form elements within the followUpDiv
  var inputs = followUpDiv.querySelectorAll('input');
  inputs.forEach(function(input) {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
  
  var selects = followUpDiv.querySelectorAll('select');
  selects.forEach(function(select) {
    select.selectedIndex = 0;
  });
  
  var textareas = followUpDiv.querySelectorAll('textarea');
  textareas.forEach(function(textarea) {
    textarea.value = '';
  });
  
  // Hide the followUpDiv
  followUpDiv.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
  const currentAddressFields = {
      houseNo: document.getElementById('house#'),
      streetName: document.getElementById('st-Name'),
      barangay: document.getElementById('brgy'),
      municipalCity: document.getElementById('municipal-city'),
      province: document.getElementById('province'),
      country: document.getElementById('country'),
      zipCode: document.getElementById('zipCode'),
  };

  const permanentAddressFields = {
      houseNo: document.getElementById('Phouse#'),
      streetName: document.getElementById('Pst-Name'),
      barangay: document.getElementById('Pbrgy'),
      municipalCity: document.getElementById('Pmunicipal-city'),
      province: document.getElementById('Pprovince'),
      country: document.getElementById('Pcountry'),
      zipCode: document.getElementById('PzipCode'),
  };

  const sameWithCurrentAddressYes = document.getElementById('sameWithCurrentAddressYes');

  sameWithCurrentAddressYes.addEventListener('change', () => {
      if (sameWithCurrentAddressYes.checked) {
          for (const key in currentAddressFields) {
              if (currentAddressFields.hasOwnProperty(key) && permanentAddressFields.hasOwnProperty(key)) {
                  permanentAddressFields[key].value = currentAddressFields[key].value;
              }
          }
      }
  });

  for (const key in currentAddressFields) {
      if (currentAddressFields.hasOwnProperty(key) && permanentAddressFields.hasOwnProperty(key)) {
          currentAddressFields[key].addEventListener('input', () => {
              if (sameWithCurrentAddressYes.checked) {
                  permanentAddressFields[key].value = currentAddressFields[key].value;
              }
          });
      }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Get today's date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  var maxDate = yyyy + '-' + mm + '-' + dd;

  // Calculate the date 50 years ago
  var fiftyYearsAgo = new Date(today.setFullYear(today.getFullYear() - 50));
  var dd50 = String(fiftyYearsAgo.getDate()).padStart(2, '0');
  var mm50 = String(fiftyYearsAgo.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy50 = fiftyYearsAgo.getFullYear();

  var minDate = yyyy50 + '-' + mm50 + '-' + dd50;

  // Set the max and min attributes of the date input
  var birthdateInput = document.getElementById('birthdate');
  birthdateInput.setAttribute('max', maxDate);
  birthdateInput.setAttribute('min', minDate);
});
