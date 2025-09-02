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
      bottom: 100px;
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
  `;

  // HTML for the button and modal
  const htmlContent = `
    <div id="website-widget-btn" class="website-widget-btn">
      <img src="http://assets.sochitelignite.com/images/logo.svg" alt="Website Icon" class="widget-icon">
    </div>
    <div class="website-widget-text">
      <small>Sochitel E-Sims</small>
    </div>
    <div id="website-modal" class="website-modal">
      <div class="modal-content">
        <!--<span class="close-btn">&times;</span>-->
        <iframe id="website-iframe" src="https://vend-widget.sochitelignite.com"></iframe>
      </div>
    </div>
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
    const modal = document.getElementById('website-modal');
    const closeButton = document.querySelector('.close-btn');

    widgetButton.addEventListener('click', function() {
      modal.classList.toggle('show');
    });

    closeButton.addEventListener('click', function() {
      modal.classList.remove('show');
    });

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