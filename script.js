// Attach event listeners to the buttons
document.getElementById('drawButton').addEventListener('click', () => {
    const prompt = document.getElementById('prompt').value.toLowerCase();
    processPrompt(prompt);
  });
  
  document.getElementById('voiceButton').addEventListener('click', startVoiceRecognition);
  
  // Function to process the prompt and draw the shapes
  function processPrompt(promptText) {
    const prompt = promptText.toLowerCase();
    const drawingArea = document.getElementById('drawingArea');
  
    // Clear previous drawings
    drawingArea.innerHTML = '';
  
    // Define Serbian and English regex patterns for parsing
    const colorPattern = /(crvena|plava|zelena|žuta|crna|bela|ljubičasta|pink|narandžasta|siva|red|blue|green|yellow|black|white|purple|pink|orange|gray)/;
    const sizePattern = /\b(\d+)\b/;
    const shapePattern = /(krug|pravougaonik|kvadrat|trougao|linija|dijamant|srce|pacman|mesec|strela|zvezda|circle|rectangle|square|triangle|line|diamond|heart|pacman|crescent|arrow|star)/;
    const positionPattern = /(gore-levo|gore-desno|dole-levo|dole-desno|sredina|gore|dole|levo|desno|top-left|top-right|bottom-left|bottom-right|center|top|bottom|left|right)/;
  
    // Mapping Serbian words to English for drawing logic
    const colorMap = {
      crvena: 'red',
      plava: 'blue',
      zelena: 'green',
      žuta: 'yellow',
      crna: 'black',
      bela: 'white',
      ljubičasta: 'purple',
      pink: 'pink',
      narandžasta: 'orange',
      siva: 'gray',
      // English colors
      red: 'red',
      blue: 'blue',
      green: 'green',
      yellow: 'yellow',
      black: 'black',
      white: 'white',
      purple: 'purple',
      pink: 'pink',
      orange: 'orange',
      gray: 'gray'
    };
  
    const shapeMap = {
      krug: 'circle',
      pravougaonik: 'rectangle',
      kvadrat: 'square',
      trougao: 'triangle',
      linija: 'line',
      dijamant: 'diamond',
      srce: 'heart',
      pacman: 'pacman',
      mesec: 'crescent',
      strela: 'arrow',
      zvezda: 'star',
      // English shapes
      circle: 'circle',
      rectangle: 'rectangle',
      square: 'square',
      triangle: 'triangle',
      line: 'line',
      diamond: 'diamond',
      heart: 'heart',
      pacman: 'pacman',
      crescent: 'crescent',
      arrow: 'arrow',
      star: 'star'
    };
  
    const positionMap = {
      'gore-levo': 'top-left',
      'gore-desno': 'top-right',
      'dole-levo': 'bottom-left',
      'dole-desno': 'bottom-right',
      sredina: 'center',
      gore: 'top',
      dole: 'bottom',
      levo: 'left',
      desno: 'right',
      // English positions
      'top-left': 'top-left',
      'top-right': 'top-right',
      'bottom-left': 'bottom-left',
      'bottom-right': 'bottom-right',
      center: 'center',
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right'
    };
  
    // Extract attributes from the prompt
    const colorMatch = prompt.match(colorPattern)?.[0];
    const color = colorMap[colorMatch] || 'black'; // Default to black if no match
    const size = parseInt(prompt.match(sizePattern)?.[0]) || 100;
    const shapeMatch = prompt.match(shapePattern)?.[0];
    const shape = shapeMap[shapeMatch] || 'circle'; // Default to circle if no shape found
    const positionMatch = prompt.match(positionPattern)?.[0];
    const position = positionMap[positionMatch] || 'center'; // Default to center if no position found
  
    if (!shape) {
      alert('Please specify a shape to draw!');
      return;
    }
  
    // Create the shape dynamically
    const element = document.createElement('div');
    element.style.position = 'absolute';
  
    // Shape-specific styles
    switch (shape) {
      case 'circle':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.borderRadius = '50%';
        element.style.backgroundColor = color;
        break;
      case 'rectangle':
        element.style.width = `${size * 2}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        break;
      case 'square':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        break;
      case 'triangle':
        element.style.width = '0';
        element.style.height = '0';
        element.style.borderLeft = `${size}px solid transparent`;
        element.style.borderRight = `${size}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
        break;
      case 'line':
        element.style.width = `${size * 2}px`;
        element.style.height = '5px';
        element.style.backgroundColor = color;
        break;
      case 'diamond':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.transform = 'rotate(45deg)';
        break;
      case 'heart':
        element.innerHTML = `
          <div style="
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
          "></div>
          <div style="
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            top: 0;
            left: 0;
          "></div>
          <div style="
            position: absolute;
            width: 0;
            height: 0;
            border-left: ${size}px solid transparent;
            border-right: ${size}px solid transparent;
            border-top: ${size}px solid ${color};
            top: ${size / 2}px;
            left: 0;
          "></div>
        `;
        break;
      // Add other shapes here...
      default:
        alert('Shape not supported yet!');
        return;
    }
  
    // Position the shape based on the prompt
    const areaBounds = drawingArea.getBoundingClientRect();
    let x = areaBounds.width / 2 - size / 2;
    let y = areaBounds.height / 2 - size / 2;
  
    switch (position) {
      case 'top-left':
        x = 0;
        y = 0;
        break;
      case 'top-right':
        x = areaBounds.width - size;
        y = 0;
        break;
      case 'bottom-left':
        x = 0;
        y = areaBounds.height - size;
        break;
      case 'bottom-right':
        x = areaBounds.width - size;
        y = areaBounds.height - size;
        break;
      case 'top':
        y = 0;
        break;
      case 'bottom':
        y = areaBounds.height - size;
        break;
      case 'left':
        x = 0;
        break;
      case 'right':
        x = areaBounds.width - size;
        break;
    }
  
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  
    // Append the element to the drawing area
    drawingArea.appendChild(element);
  }
  
  // Function to handle voice recognition in Serbian
  function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sr-RS'; // Serbian language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
  
    recognition.onresult = (event) => {
      const spokenPrompt = event.results[0][0].transcript;
      console.log('Recognized Prompt:', spokenPrompt);
      processPrompt(spokenPrompt);
    };
  
    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      alert('Speech recognition failed. Please try again.');
    };
  
    recognition.onend = () => {
      console.log('Speech recognition ended.');
    };
  }
  