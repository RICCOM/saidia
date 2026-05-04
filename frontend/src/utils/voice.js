export const speak = (text, lang = 'sw-KE', options = {}) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};