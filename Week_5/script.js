document.addEventListener('DOMContentLoaded', function() {
    // Get all window elements and their title bars
    const windows = [
        { window: document.querySelector('.paint-window'), 
          titlebar: document.querySelector('.paint-window .title-bar') },
        { window: document.querySelector('.p5webcam-container'), 
          titlebar: document.querySelector('.p5webcam-titlebar') },
        { window: document.querySelector('.p5texttopoints-container'), 
          titlebar: document.querySelector('.p5texttopoints-titlebar') },
        { window: document.querySelector('.popup-container'), 
          titlebar: document.querySelector('.popup-titlebar') },
        { window: document.querySelector('.popup2-container'), 
          titlebar: document.querySelector('.popup2-container .popup-titlebar') },
        { window: document.querySelector('.popup3-container'), 
          titlebar: document.querySelector('.popup3-container .popup-titlebar') }
    ];
    
    // Apply drag functionality to all windows
    windows.forEach(({window, titlebar}) => {
        if (window && titlebar) {
            dragElement(window, titlebar);
        }
    });
    
    // Run button functionality
    const runButton = document.querySelector('.run-button');
    if (runButton) {
        runButton.addEventListener('click', function() {
            window.location.href = 'umbraliscolour/index.html';
        });
    }
    
    // Prevent dragging from control buttons
    const controlButtons = document.querySelectorAll('.controls button, .window-controls button');
    controlButtons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });
});

function dragElement(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        elmnt.classList.add('dragging');
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        
        elmnt.classList.remove('dragging');
    }
}

//taken and altered from Mathilda's Github, explained by chatGPT on how it works
//https://github.com/matildasutho/matildasutho.github.io