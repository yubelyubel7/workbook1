function changeImage(src, thumbnail) {
  // Update the main image
  document.getElementById('main-image').src = src;
  
  // Remove active class from all thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  
  // Add active class to clicked thumbnail
  thumbnail.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  // Make window draggable
  const window = document.querySelector('.window');
  const titleBar = document.querySelector('.title-bar');
  
  // Add draggable functionality
  dragElement(window, titleBar);
  
  // Add close button functionality
  document.querySelector('.close').addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent drag events from triggering
    window.location.href = '../index.html';
  });
  
  // Prevent dragging from control buttons
  const controlButtons = document.querySelectorAll('.controls button');
  controlButtons.forEach(button => {
    button.addEventListener('mousedown', function(e) {
      e.stopPropagation(); // Prevent drag when clicking buttons
    });
  });
});

function dragElement(elmnt, header) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  if (header) {
    // If a header is provided, make only the header draggable
    header.onmousedown = dragMouseDown;
  } else {
    // Otherwise make the whole element draggable
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Add a dragging class for visual feedback
    elmnt.classList.add('dragging');
    
    // Call functions on mouse move and mouse up
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
    
    // Remove dragging visual feedback
    elmnt.classList.remove('dragging');
  }
}

//taken and altered from Mathilda's Github, explained by chatGPT on how it works
//https://github.com/matildasutho/matildasutho.github.io