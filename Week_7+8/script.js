document.addEventListener('DOMContentLoaded', function() {
    const emails = document.querySelectorAll('.email');
    const emailContent = document.getElementById('email-content');
    const window = document.querySelector('.window');
    const titleBar = document.querySelector('.title-bar');
    const maximizeBtn = document.querySelector('button[aria-label="Maximize"]');
    const minimizeBtn = document.querySelector('button[aria-label="Minimize"]');
    const closeBtn = document.querySelector('button[aria-label="Close"]');
    const taskbarItems = document.querySelector('.taskbar-items');
    
    // Window state tracking
    let isMaximized = false;
    let isMinimized = false;
    let originalStyles = {
        width: null,
        height: null,
        top: null,
        left: null,
        transform: null
    };
    
    // Make window draggable
    if (window && titleBar) {
        dragElement(window, titleBar);
    }
    
    // Add maximize functionality
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', toggleMaximize);
    }
    
    // Add minimize functionality
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', minimizeWindow);
    }
    
    // Add close functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeWindow(window);
        });
    }
    
    // Update the time in the taskbar
    updateTaskbarTime();
    setInterval(updateTaskbarTime, 60000); // Update every minute
    
    function updateTaskbarTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        
        const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        document.getElementById('taskbar-time').textContent = timeString;
    }
    
    function minimizeWindow() {
        if (!isMinimized) {
            // Save current state before minimizing
            if (!isMaximized) {
                originalStyles = {
                    width: window.style.width || getComputedStyle(window).width,
                    height: window.style.height || getComputedStyle(window).height,
                    top: window.style.top || getComputedStyle(window).top,
                    left: window.style.left || getComputedStyle(window).left,
                    transform: window.style.transform || getComputedStyle(window).transform
                };
            }
            
            // Add window to taskbar
            const taskbarItem = document.createElement('div');
            taskbarItem.className = 'taskbar-item';
            taskbarItem.id = 'umail-taskbar-item';
            taskbarItem.innerHTML = '<img src="../IMG/mail-icon.png" alt="Mail"> Umail - Inbox';
            taskbarItem.addEventListener('click', restoreWindow);
            taskbarItems.appendChild(taskbarItem);
            
            // Hide the window
            window.classList.add('minimized');
            isMinimized = true;
        }
    }
    
    function restoreWindow() {
        if (isMinimized) {
            // Remove from taskbar
            const taskbarItem = document.getElementById('umail-taskbar-item');
            if (taskbarItem) {
                taskbarItem.remove();
            }
            
            // Show the window
            window.classList.remove('minimized');
            isMinimized = false;
            
            // If it was maximized before minimizing, keep it maximized
            if (isMaximized) {
                // It's already maximized, no need to change styles
            } else {
                // Restore original position and size
                window.style.width = originalStyles.width;
                window.style.height = originalStyles.height;
                window.style.top = originalStyles.top;
                window.style.left = originalStyles.left;
                window.style.transform = originalStyles.transform;
            }
        }
    }
    
    function closeWindow(windowElement) {
        // Hide the window
        windowElement.style.display = 'none';
        
        // Remove from taskbar if it was minimized
        const taskbarItem = document.getElementById('umail-taskbar-item');
        if (taskbarItem) {
            taskbarItem.remove();
        }
    }
    
    // Your existing code for maximize, drag, etc. remains the same
    function toggleMaximize() {
        if (!isMaximized) {
            // Store original styles before maximizing
            originalStyles = {
                width: window.style.width || getComputedStyle(window).width,
                height: window.style.height || getComputedStyle(window).height,
                top: window.style.top || getComputedStyle(window).top,
                left: window.style.left || getComputedStyle(window).left,
                transform: window.style.transform || getComputedStyle(window).transform
            };
            
            // Maximize the window
            window.style.width = '100%';
            window.style.height = 'calc(100vh - 28px)'; // Adjusted for taskbar
            window.style.top = '0';
            window.style.left = '0';
            window.style.transform = 'none';
            window.style.borderRadius = '0';
            window.style.maxWidth = 'none';
            window.style.maxHeight = 'none';
            
            // Update button state
            maximizeBtn.setAttribute('aria-label', 'Restore');
            maximizeBtn.title = 'Restore';
            
            isMaximized = true;
        } else {
            // Restore the window
            window.style.width = originalStyles.width;
            window.style.height = originalStyles.height;
            window.style.top = originalStyles.top;
            window.style.left = originalStyles.left;
            window.style.transform = originalStyles.transform;
            window.style.borderRadius = '';
            window.style.maxWidth = '';
            window.style.maxHeight = '';
            
            // Update button state
            maximizeBtn.setAttribute('aria-label', 'Maximize');
            maximizeBtn.title = 'Maximize';
            
            isMaximized = false;
        }
    }
    
    // Prevent dragging when maximized
    function dragElement(elmnt, header) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        if (header) {
            header.onmousedown = dragMouseDown;
            header.style.cursor = 'move';
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            // Don't allow dragging when maximized
            if (isMaximized) {
                return;
            }
            
            e = e || window.event;
            e.preventDefault();
            
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            elmnt.classList.add('dragging');
            
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
            
            elmnt.classList.remove('dragging');
        }
    }
    
    // Double-clicking the title bar should also maximize/restore
    if (titleBar) {
        titleBar.addEventListener('dblclick', toggleMaximize);
    }
    
    // Prevent dragging from control buttons
    const controlButtons = document.querySelectorAll('.title-bar-controls button');
    controlButtons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });
    
    // Set initial email content
    showEmail('week7');
    
    // Add click event to all emails
    emails.forEach(email => {
        email.addEventListener('click', function() {
            // Get email ID from data attribute
            const emailId = this.getAttribute('data-email');
            
            // Mark as read and selected
            selectEmail(this);
            
            // Show the email content
            showEmail(emailId);
        });
    });
    
    function selectEmail(email) {
        // Remove selected class from all emails
        emails.forEach(e => e.classList.remove('selected'));
        
        // Add selected class to clicked email
        email.classList.add('selected');
        
        // Update status bar (simplified since we don't track unread)
        document.querySelector('.status-bar p').textContent = 
            `${emails.length} message(s), 0 unread`;
    }
    
    function showEmail(id) {
        // Set the email content based on ID
        switch(id) {
            case 'week7':
                emailContent.innerHTML = createEmailHTML(
                    'Umbralis', 'UmbralisNym420@umail.com',
                    'Jurgen Winata', 'winataj@student.unimelb.edu.au',
                    'Week 7',
                    'April 17, 2025 9:00 AM',
                    `<p>Dear Jurgen,</p>
                    <p>For Week 7, you will be learning about PHYSICAL COMPUTING!
                    HORRAYY HORRAY HORRAYY!!! ROBOTS!</p>
                    <h3>PHYSICAL COMPUTING</h3>
                    <ul>
                        <li>Introduction to the Arduino Kit</li>
                        <li>Introduction to Tinkercad for existing projects and templates</li>
                        <li>Using Arduino IDE to code functions</li>
                    </ul>
                    
                    <p>Please, see the attached files below to prepare for the upcoming projects. If there are any questions, do not hesitate to contact me back.</p>
                    
                    <p>Best regards,<br>Professor Umbralis</p>`,
                    'Arduino CHEATSHEET.zip', '4.20 MB', './Arduinokit/index.html'  // Added URL parameter
                );
                
                // Add a second attachment with link to Week7Activity
                const attachmentContainer = document.querySelector('.email-preview-body .attachment').parentNode;
                const secondAttachment = document.createElement('div');
                secondAttachment.className = 'attachment';
                secondAttachment.innerHTML = `
                    <a href="./Week7Activity/index.html" class="attachment-link">
                        <div class="attachment-icon">📎</div>
                        <div class="attachment-info">
                            <div class="attachment-name">Example Projects 1 Final Final.zip</div>
                            <div class="attachment-size">8.7 MB</div>
                        </div>
                    </a>
                `;
                attachmentContainer.appendChild(secondAttachment);
                break;
            case 'week8':
                emailContent.innerHTML = createEmailHTML(
                    'Umbralis', 'UmbralisNym420@umail.com',
                    'Jurgen Winata', 'winataj@student.unimelb.edu.au',
                    'Week 8',
                    'May 1, 2025 9:00 AM',
                    `<p>Dear Jurgen again,</p>
                    <p>Welcome to Week 8! Hope you guys had a fun semester break, not it's time to go BACK TO WORK!
                    We are going to be continuing with PHYSICAL COMPUTING! So be ready.</p>
                    
                    <h3>PHYSICAL COMPUTING (continued)</h3>
                    <ul>
                        <li>Installing Arduino Libraries</li>
                        <li>Using more compotents from the Arduino kit, such as touch sensors!</li>
                        <li>Learn about ideation sketches (for final project!)</li>
                        <li>What is a Chindogu?</li>
                    </ul>
                    
                    <p>Good Luck,<br>Professor Umbralis</p>`,
                    'Example Projects 2 Final Final1111.zip', '8.6 MB', './Week8Activity/index.html'
                );
                break;
            case 'activities':
                emailContent.innerHTML = createEmailHTML(
                    'NotUmbralis', 'Fakeumbralis@umail.com',
                    'Jurgen Winata', 'winataj@student.unimelb.edu.au',
                    'Feeling Inspirational?',
                    'May 15, 2025 02:15 PM',
                    `<p>Yo bro! Word around the street is that you are looking for some inspirations? You feel me xd xd
                    Well, I can hook you up ezz lol! just get l44t with me, ifyk yk? ts ts.
                    I'll give you this super secret website that has some LIT🔥🔥🔥 stuffs!
                    Make sure to check it out lol! </p>
                    <p><a href="./Inspirational/index.html" class="link">https.awesomehuntngather7n8.com</a></p>`,
                );
                break;
            case 'proposals':
                emailContent.innerHTML = createEmailHTML(
                    'Umbralis2', 'designerumbralis@umail.com',
                    'Jurgen Winata', 'winataj@student.unimelb.edu.au',
                    'Project Proposals',
                    'May 20, 2025 03:13 AM',
                    `<p>Hello Mr.Jurgen Winata,</p>
                    <p>It has come to my attention that you are in search of interesting Chindogu concepts and
                    are looking for well made design sketches. Well, you are in luck, I am here to offer you 4 different unique ideas.
                    Attached is my documented proposals for the designs, please have a look and contact me back if you are interested in funding any of them.</p>

                    <p>Bestest of best Regards,<br>Designer Umbralis</p>`,
                    'ProjectProposals.pdf', '32.3 TB', './Sketches/index.html'
                );
                break;
            case 'zach':
                emailContent.innerHTML = createEmailHTML(
                    'Zach', 'zach@thezacharies.com',
                    'Jurgen Winata', 'winataj@student.unimelb.edu.au',
                    'Super Important Information',
                    'May 16, 2025 10:45 AM',
                    `<p>Hi Jurgen,</p>
                    <p>Click on this link for free iphone5!</p>
                    
                    <p><a href="https://youtube.com/shorts/pXYrre3FF-E" class="fake-link">www.freeiphone5.com</a></p>`
                );
                break;
        }
    }
    
    function createEmailHTML(fromName, fromEmail, toName, toEmail, subject, date, body, attachmentName, attachmentSize, attachmentUrl = '') {
        // Only create attachment HTML if attachmentName exists
        const attachmentHtml = attachmentName 
            ? (attachmentUrl 
                ? `<div class="attachment">
                    <a href="${attachmentUrl}" class="attachment-link">
                        <div class="attachment-icon">📎</div>
                        <div class="attachment-info">
                            <div class="attachment-name">${attachmentName}</div>
                            <div class="attachment-size">${attachmentSize}</div>
                        </div>
                    </a>
                  </div>`
                : `<div class="attachment">
                    <div class="attachment-icon">📎</div>
                    <div class="attachment-info">
                        <div class="attachment-name">${attachmentName}</div>
                        <div class="attachment-size">${attachmentSize}</div>
                    </div>
                  </div>`)
            : ''; // Return empty string if no attachment name
            
        return `
            <div class="email-preview-header">
                <div><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</div>
                <div><strong>To:</strong> ${toName} &lt;${toEmail}&gt;</div>
                <div><strong>Subject:</strong> ${subject}</div>
                <div><strong>Date:</strong> ${date}</div>
            </div>
            <div class="email-preview-body">
                ${body}
                ${attachmentHtml}
            </div>
        `;
    }
});

// Used Chatgpt and Copilot to help create and explain this code, as well as taking from https://dustinbrett.com and https://pohwp.dev //