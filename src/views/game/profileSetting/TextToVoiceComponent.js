import React, { useState } from 'react';

const TextToVoiceComponent = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Map text content to corresponding audio file
    const audioFile = mapTextToAudio(text);
    if (audioFile) {
      // Play the audio file
      const audio = new Audio(audioFile);
      audio?.play();
    } else {
      console.error("No audio file found for the entered text.");
    }
  };

  // Function to map text content to corresponding audio file
  const mapTextToAudio = (text) => {
    // Here you should implement your logic to map text to the appropriate audio file
    // For demonstration purposes, let's assume you have a direct mapping
    // In reality, you might need more sophisticated logic
    const audioMapping = {
      'Hello, I am Rajinikanth': '/path/to/rajini_hello.mp3',
      // Add more mappings as needed
    };
    return audioMapping[text];
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange} />
        <button type="submit">Speak</button>
      </form>
    </div>
  );
};

export default TextToVoiceComponent;
