(function() {
  // Styles for the widget and modal
  const styles = `
    .website-widget-btn {
      position: fixed;
      bottom: 40px;
      right: 20px;
      z-index: 1000;
      background-color: #007bff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .website-widget-btn:hover {
      transform: scale(1.1);
    }
    .website-widget-text {
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 1000;
    }
    .widget-icon {
      width: 90%;
      height: 90%;
    }
    .website-modal {
      display: none;
      position: fixed;
      z-index: 1001;
      right: 20px;
      bottom: 120px !important;
      width: 350px;
      height: 500px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #ccc;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .website-modal::-webkit-scrollbar {
      display: none;
    }
    .website-modal.show {
      display: block;
    }
    .modal-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      color: #888;
    }
    #website-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .resize-handle {
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      background-color: #555;
      cursor: se-resize; /* This changes the cursor to indicate resizing */
    }
  `;

  // HTML for the button and modal
  const htmlContent = `
    <div id="website-widget-btn" class="website-widget-btn">
      <img src="https://assets.sochitelignite.com/images/logo.svg" alt="Website Icon" class="widget-icon">
    </div>
    <div class="website-widget-text">
      <small>Sochitel E-Sims</small>
    </div>
    <div id="website-modal" class="website-modal">
      <div class="modal-content">
        <!--<span class="close-btn">&times;</span>-->
        <iframe id="website-iframe" src="https://vend-widget.sochitelignite.com"></iframe>
        <div id="resize-handle" class="resize-handle"></div>
      </div>
    </div>
    <!--<div id="website-modal" class="website-modal">
      <div class="modal-content">
      </div>
    </div>-->
  `;

  // Function to create the elements and add them to the page
  function createWidget() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    while (tempDiv.firstChild) {
      document.body.appendChild(tempDiv.firstChild);
    }

    const widgetButton = document.getElementById('website-widget-btn');
    // const modal = document.getElementById('website-modal');
    // const closeButton = document.querySelector('.close-btn');
    const modal = document.getElementById('website-modal');

    // Get the new resize handle element

    // Resizing with touch

    let initialTouchDistance = null;
    let initialModalWidth = 0;
    let initialModalHeight = 0;

    modal.addEventListener('touchstart', function(e) {
      if (e.touches.length === 2) {
        e.preventDefault(); // Prevent default browser zoom
        
        // Store initial dimensions and distance
        initialModalWidth = modal.offsetWidth;
        initialModalHeight = modal.offsetHeight;
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDistance = Math.sqrt(dx * dx + dy * dy);
      }
    });

    modal.addEventListener('touchmove', function(e) {
      if (e.touches.length === 2 && initialTouchDistance) {
        e.preventDefault();
        
        // Calculate the current distance between touches
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentTouchDistance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate the scale factor
        const scaleFactor = currentTouchDistance / initialTouchDistance;
        
        // Apply the new size, centered from the current position
        modal.style.width = (initialModalWidth * scaleFactor) + 'px';
        modal.style.height = (initialModalHeight * scaleFactor) + 'px';
      }
    });

    modal.addEventListener('touchend', function(e) {
      // Reset the state
      initialTouchDistance = null;
    });

    // Mouse resizing

    const resizeHandle = document.getElementById('resize-handle');

    let isResizing = false;
    let initialX, initialY, initialWidth, initialHeight, initialLeft, initialTop;

    // 1. When the mouse button is pressed on the handle
    resizeHandle.addEventListener('mousedown', function(e) {
      isResizing = true;
      e.preventDefault();
      
      // Store the initial state of the mouse and modal
      initialX = e.clientX;
      initialY = e.clientY;
      initialWidth = modal.offsetWidth;
      initialHeight = modal.offsetHeight;
      initialLeft = modal.offsetLeft;
      initialTop = modal.offsetTop;
    });

    // 2. When the mouse moves anywhere on the page
    document.addEventListener('mousemove', function(e) {
      if (!isResizing) return;

      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      // Calculate new width and height
      const newWidth = initialWidth - deltaX;
      const newHeight = initialHeight - deltaY;

      // Update modal dimensions
      modal.style.width = newWidth + 'px';
      modal.style.height = newHeight + 'px';

      // Simultaneously update the modal's position
      modal.style.left = (initialLeft + deltaX) + 'px';
      modal.style.top = (initialTop + deltaY) + 'px';
    });

    // 3. When the mouse button is released anywhere on the page
    document.addEventListener('mouseup', function() {
      isResizing = false;
    });

    widgetButton.addEventListener('click', function() {
      modal.classList.toggle('show');
    });

    // closeButton.addEventListener('click', function() {
    //   modal.classList.remove('show');
    // });

    window.addEventListener('click', function(event) {
      if (modal.classList.contains('show') && !modal.contains(event.target) && !widgetButton.contains(event.target)) {
        modal.classList.remove('show');
      }
    });
  }

  // Run the function when the document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();