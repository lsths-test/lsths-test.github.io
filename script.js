// Navbar
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-options");
menuBtn.onclick = () => {
  menu.classList.toggle("active-nav");
};

document.addEventListener('DOMContentLoaded', function() {
  const dropdownButton = document.querySelector('.accessibility');
  const dropdownMenu = document.querySelector('.accessibilityDropdown');

  dropdownButton.addEventListener('click', function() {
      // Toggle the visibility of the dropdown menu
      dropdownMenu.style.top = dropdownMenu.style.top === '4.3vw' ? '-20vw' : '4.3vw';
  });

  // Optional: Hide the dropdown when clicking outside
  document.addEventListener('click', function(event) {
      if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.style.top = '-20vw';
      }
  });
});

const lumosBtn = document.querySelector(".lumos")
const noxBtn = document.querySelector(".nox")
const wand = document.querySelector(".wand");
// High Contrast
function lumos(){
  root = document.documentElement;
  wand.style.display = 'block';
  setTimeout(() => {
    root.style.setProperty('--textColor', "black");
    root.style.setProperty('--backgroundColor', "white");
    root.style.setProperty('--divBackgroundColor', "#f5f5f5");
    wand.classList.add("active-wand");
  },10)
  wand.style.opacity = 1;
  setTimeout(() => {
    wand.style.opacity = 0;
  }, 600);
  setTimeout(() => {
    wand.classList.remove("active-wand");
    wand.style.display = 'none';
  },800);
  noxBtn.style.display = 'block';
  lumosBtn.style.display = 'none';
}

function nox(){
  root = document.documentElement;
  wand.style.display = 'block';
  setTimeout(() => {
    root.style.setProperty('--textColor', "white");
    root.style.setProperty('--backgroundColor', "black");
    root.style.setProperty('--divBackgroundColor', "#242424");
    wand.classList.add("active-wand");
  }, 10);
  wand.style.opacity = 1;
  setTimeout(() => {
    wand.style.opacity = 0;
  }, 600);
  setTimeout(() => {
    wand.classList.remove("active-wand");
    wand.style.display = 'none';
  },800);
  lumosBtn.style.display = 'block';
  noxBtn.style.display = 'none';
}

lumosBtn.addEventListener('click', lumos);
noxBtn.addEventListener('click', nox);

// Arrow Up
const arrowUp = document.querySelector(".arrow_up")
const arrowDown = document.querySelector(".arrow_down")
window.addEventListener('scroll', function() {  
  // Calculate the scroll position and document height
  const scrollTop = window.scrollY; // Number of pixels the document has already been scrolled vertically
  const windowHeight = window.innerHeight; // Inner height of the window in pixels

  // Check if the user has scrolled to the bottom
  if (scrollTop <= windowHeight / 4) {
    arrowUp.classList.remove("active-up")
  } else {
    arrowUp.classList.add("active-up")
  }
});

// Scroll Up & Down
arrowUp.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior:'smooth'
  });
}
arrowDown.onclick = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior:'smooth'
  });
}

// Function to increase text size
function increaseTextSize() {
  const root = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--defaultTextSize'));
  const newSize = Math.min(currentSize + 0.1, 2.3);
  root.style.setProperty('--defaultTextSize', newSize);
}

// Function to decrease text size
function decreaseTextSize() {
  const root = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--defaultTextSize'));
  const newSize = Math.max(currentSize - 0.1, 1.8);
  root.style.setProperty('--defaultTextSize', newSize);
}

// Add event listeners to the buttons
document.querySelector('.text_increase').addEventListener('click', increaseTextSize);
document.querySelector('.text_decrease').addEventListener('click', decreaseTextSize);

// Fill Student Tables
function populateData(data) {
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
          
          // Add click event listener only if the name is not blank
          if (maleData[i].originalName.trim()) {
              maleTd.addEventListener('click', () => showCard(`student${i * 2 + 1}-card`));
          }
      }

      if (femaleData[i]) {
          femaleTd.innerText = `${i + 1}. ${femaleData[i].originalName.toUpperCase()}`;
          updateCard(`student${i * 2 + 2}-card`, femaleData[i].cardName, femaleData[i].birthdate);
          
          // Add click event listener only if the name is not blank
          if (femaleData[i].originalName.trim()) {
              femaleTd.addEventListener('click', () => showCard(`student${i * 2 + 2}-card`));
          }
      }

      tr.appendChild(maleTd);
      tr.appendChild(femaleTd);
      tbody.appendChild(tr);
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
    const othername = parts.slice(2).join(' ').trim(); // Join and trim to remove extra spaces

    // Add initial and dot only if othername is not empty
    const othernameInitial = othername ? `${othername.charAt(0)}. ` : '';

    return `${firstname} ${othernameInitial}${lastname}`;
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


// Promotional Video
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
          controls: 1,
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
