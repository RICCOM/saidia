// src/utils/voiceNavigation.js
import { speak } from './voice';

let recognition = null;

export const startVoiceNavigation = (callbacks) => {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    speak("Voice navigation haipatikani katika browser hii. Tumia Chrome.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'sw-KE';           // Swahili + English mix

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
    console.log("🎤 Voice Command:", transcript);
    
    handleVoiceCommand(transcript, callbacks);
  };

  recognition.onerror = (event) => {
    console.error('Voice recognition error:', event);
    speak("Samahani, sikuelewa. Jaribu tena.");
  };

  recognition.onend = () => {
    // Auto-restart if still active
    if (recognition) recognition.start();
  };

  recognition.start();
  speak("Voice navigation imeanza. Sema: Dashboard, Tuma Pesa, Jisajili, au Stop.");
};

export const stopVoiceNavigation = () => {
  if (recognition) {
    recognition.stop();
    recognition = null;
    speak("Voice navigation imesimama.");
  }
};

const handleVoiceCommand = (command, { navigate }) => {
  if (command.includes("dashboard") || command.includes("nyumbani") || command.includes("home")) {
    navigate("/dashboard");
    speak("Inakwenda Dashboard");
  } 
  else if (command.includes("tuma pesa") || command.includes("send money") || command.includes("transaction")) {
    navigate("/transaction");
    speak("Inakwenda Tuma Pesa");
  } 
  else if (command.includes("jisajili") || command.includes("register")) {
    navigate("/register");
    speak("Inakwenda Jisajili");
  } 
  else if (command.includes("stop") || command.includes("simama")) {
    stopVoiceNavigation();
  } 
  else if (command.includes("msaada") || command.includes("help")) {
    speak("Amri zinazopatikana: Dashboard, Tuma Pesa, Jisajili, Stop");
  }
};