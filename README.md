# MoodMate ❤️

**Your personal AI-powered mental wellness companion.**

MoodMate is a comprehensive web application designed to provide a safe and supportive space for users to track their mental well-being, find relief through guided exercises, and access helpful resources. Built with a modern tech stack, it offers a seamless, responsive, and engaging user experience.

---

## ✨ Features

-   **AI-Powered Journaling ("Ask Aura"):** Users can write down their thoughts and receive instant, compassionate feedback and actionable suggestions from an AI assistant powered by the Gemini API.
-   **AI Journal Prompts:** Never run out of things to write about. Get a thoughtful, open-ended prompt from Aura with the click of a button.
-   **Mood Tracking:** A beautiful, color-coded slider allows for nuanced mood tracking on a scale from "Awful" to "Great".
-   **Journal History & AI Summaries:** View past entries and get an AI-generated summary of your mood trends and themes from the past week.
-   **Mental Wellness Assessment:** A quick, 5-question check-in to help users get a snapshot of their current stress levels.
-   **Anxiety Relief Exercises:** A dedicated section with guided exercises, including:
    -   Box Breathing with an interactive timer.
    -   5-4-3-2-1 Grounding technique.
    -   Progressive Muscle Relaxation.
    -   Mindful Observation.
-   **Gamified Rewards:** A reward system that tracks completed exercises and congratulates the user, encouraging consistent practice.
-   **Soothing Music Player:** A built-in ambient music player in the Relief section to enhance relaxation.
-   **Curated Resources:** A hand-picked list of helpful videos and guides for stress management.
-   **User Feedback System:** An integrated star rating and review system where users can share their thoughts.
-   **Light & Dark Mode:** A beautiful, persistent light/dark theme toggle for user comfort.
-   **Fully Responsive Design:** A seamless experience on all devices, from mobile phones to desktops.

---

## 🛠️ Tech Stack

-   **Frontend:** [React.js](https://reactjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Functionality:** [Google Gemini API](https://ai.google.dev/)
-   **Audio Synthesis:** [Tone.js](https://tonejs.github.io/)
-   **Local Storage:** All user data (journal entries, feedback, etc.) is saved securely in the browser's `localStorage`.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/moodmate-app.git](https://github.com/your-username/moodmate-app.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd moodmate-app
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Enable Music Player:**
    Open the `public/index.html` file and add this script tag inside the `<head>` section:
    ```html
    <script src="[https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js](https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js)"></script>
    ```
5.  **Enable AI Features (Important):**
    -   Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Run the app using the command below.
    -   A yellow banner will appear at the top of the app. Paste your API key into the input field and click "Save Key". The key will be saved in your browser's local storage for future use.

6.  **Start the application:**
    ```bash
    npm start
    ```
    This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 👥 Credits

This project was brought to life by a dedicated team:

-   **Developer:** Aryan Jaiswal
-   **Designer:** Alok Jha

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
