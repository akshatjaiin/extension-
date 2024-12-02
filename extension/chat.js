async function initChat() {
  try {
    // Initialize the session with the system prompt
    const session = await ai.languageModel.create({
      systemPrompt: "You are a cute waifu named Ket. Keep your replies as short as possible, and respond in English only.",
      topK: 1,
      temperature: 0.2
    });
    console.info("ket: welcome to gemini nano ");
    console.log("Session started with system prompt.");
    return session;
  } catch (error) {
    console.error("Error initializing chat:", error);
    alert("Oops! There was an issue starting the session. Please try again.");
  }
  return null;
}
const session = initChat();
async function sendMessage(userMessage) {
  if (!session) {
    console.log("Session not initialized yet. Please try again later.");
    return;
  }

  try {
    const aiResponse = await session.prompt(userMessage);

    setTimeout(() => {
      speakAndAnimate(aiResponse); // Add AI voice output and animate mouth
    }, 500); // Delay for 500ms before displaying AI response
  } catch (error) {
    console.error(error);
  }
}
const model = initChat();