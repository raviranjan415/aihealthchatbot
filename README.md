# AI Health Assistant

## Overview
AI Health Assistant is a simple web application that allows users to input their health conditions and receive possible causes, home remedies, medical treatments, medications, and precautions. The app leverages Google's Gemini API to process user input and provide relevant medical insights.

## Features
- Dark-themed gradient UI with a glowing hero section.
- Typing effect on the hero text.
- Input box to enter health conditions.
- AI-powered response providing:
  - Possible causes
  - Home remedies
  - Medical treatments
  - Medications
  - Precautions
- JSON-formatted structured responses.
- Real-time form submission using the **Enter** key.
- Validation checks:
  - If input is empty, a toaster displays a message.
  - If the query is not health-related, an error message is shown.
- Loading animation while processing.
- Success toaster notification after receiving results.

## Installation
### Prerequisites
- Node.js and npm installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-health-assistant.git
   cd ai-health-assistant
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Google Gemini API key in the code:
   ```javascript
   const genAi = new GoogleGenerativeAI("YOUR_API_KEY");
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
You can deploy the app easily on Vercel:
1. Push your code to GitHub.
2. Sign in to **[Vercel](https://vercel.com/)** and import your repository.
3. Click **Deploy** and Vercel will handle the rest.

## Technologies Used
- React.js
- Tailwind CSS
- Google Generative AI (Gemini API)
- React Hot Toast for notifications

## Contributing
Feel free to contribute by creating a pull request or reporting issues.

## License
MIT License

