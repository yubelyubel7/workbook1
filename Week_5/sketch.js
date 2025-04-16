document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.canvas-container');
    const tools = document.querySelectorAll('.tool');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const coordinatesDisplay = document.querySelector('.coordinates');
    
    // Drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentTool = 'pencil';
    let currentColor = '#000000';
    
    // Set up canvas
    function resizeCanvas() {
        canvas.width = container.clientWidth - 2;
        canvas.height = container.clientHeight - 2;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Tool & color selection
    tools.forEach(tool => {
        tool.addEventListener('click', function() {
            tools.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.dataset.tool;
        });
    });
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            currentColor = this.dataset.color;
        });
    });
    
    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        // Update coordinates display
        coordinatesDisplay.textContent = `${e.offsetX},${e.offsetY} px`;
        
        ctx.strokeStyle = currentColor;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        switch(currentTool) {
            case 'pencil':
                ctx.lineWidth = 1;
                drawLine(e.offsetX, e.offsetY);
                break;
                
            case 'brush':
                ctx.lineWidth = 5;
                drawLine(e.offsetX, e.offsetY);
                break;
                
            case 'eraser':
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#FFFFFF';
                drawLine(e.offsetX, e.offsetY);
                break;
        }
    }
    
    function drawLine(x, y) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', function(e) {
        coordinatesDisplay.textContent = `${e.offsetX},${e.offsetY} px`;
        draw(e);
    });
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Window controls
    document.querySelector('.close').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});

//inspired from https://mspaint.humanhead.com/#local:5d0bcc7b14606, and https://jspaint.app/#local:e02c8571ee6da, and used chatgpt to help re-create it with explanations on code.