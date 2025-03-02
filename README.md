# Discord Bot Project

This project is a simple Discord bot that responds with "Hello World" when the command `!trb` is issued.

## Prerequisites

- Node.js (version 16.0.0 or higher)
- A Discord account
- A Discord server where you can add the bot

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd discord-bot
   ```

2. **Install dependencies**:
   Make sure you have npm installed, then run:
   ```bash
   npm install
   ```

3. **Create a Discord bot**:
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Create a new application and navigate to the "Bot" tab to create a bot user.
   - Copy the bot token and save it for later.

4. **Add the bot to your server**:
   - In the "OAuth2" tab, select the "bot" scope and the permissions your bot needs.
   - Copy the generated URL and open it in your browser to invite the bot to your server.

5. **Configure the bot**:
   Create a `.env` file in the root of the project and add your bot token:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

6. **Run the bot**:
   Use the following command to start the bot:
   ```bash
   npm start
   ```

## Usage

Once the bot is running, you can type `!trb` in any text channel where the bot has access, and it will respond with "Hello World".