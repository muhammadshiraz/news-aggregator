# News Aggregator Application

![Screenshot](src/assets/images/screenshot.png)

Welcome to the News Aggregator Application! This React.js-based frontend web application aggregates news articles from various sources, allowing users to search, filter, and view articles from multiple news providers.

## Live Demo

You can view the live application at: [news-aggregator-teal.vercel.app](https://news-aggregator-teal.vercel.app)

## GitHub Repository

The source code for this project is available at: [https://github.com/muhammadshiraz/news-aggregator](https://github.com/muhammadshiraz/news-aggregator)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Data Sources](#data-sources)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Important Note on API Request Restrictions](#important-note-on-api-request-restrictions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project implements a news aggregator application using React.js. It provides a customizable and responsive user interface for fetching and displaying news articles from multiple sources.

## Features

1. **Search and Filter Articles**:
   - Search by keyword.
   - Filter articles by date, category, and source.

2. **Personalized News Feed**:
   - Customize your feed based on selected sources and categories.

3. **Responsive Design**:
   - Optimized for both desktop and mobile devices.

4. **Loading State**:
   - Creative and engaging loading animation while data is being fetched.

5. **Error Handling**:
   - Informative messages if articles cannot be fetched.

## Data Sources

The application integrates with the following APIs to retrieve news articles:

1. **NewsAPI**: Aggregates articles from a wide range of news sources.
2. **The Guardian API**: Retrieves articles from The Guardian newspaper.
3. **The New York Times API**: Provides articles from The New York Times.

## Installation

To set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/muhammadshiraz/news-aggregator.git
   cd news-aggregator
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Running the Application

To run the application in development mode:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Containerizing with Docker

To build and run the application with Docker:

1. **Build the Docker Image**:

   ```bash
   docker build -t news-aggregator .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -p 3000:3000 news-aggregator
   ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

### Search and Filtering

- **Search Bar**: Use the search bar to enter keywords, select a date, choose a category, and specify a source.
- **Article List**: Articles are displayed based on the applied search and filter criteria.
- **Article Cards**: Each card shows the title, description, image, publication date, and source of the article.

### Favicon

A custom favicon is included for better branding.

## Folder Structure

The project structure is as follows:

```
news-aggregator/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── ArticleCard.js
│   │   └── SearchBar.js
│   ├── pages/
│   │   └── Home.js
│   ├── services/
│   │   ├── guardianService.js
│   │   ├── newsAPIService.js
│   │   └── nyTimesService.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       ├── styles.css
│       └── SearchBar.css
│
└── .env
```

- **components/**: Contains reusable components like `ArticleCard` and `SearchBar`.
- **pages/**: Contains page components such as `Home`.
- **services/**: Contains service files for API interactions.
- **styles/**: Contains CSS files for styling.

## Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key_here
REACT_APP_NY_TIMES_API_KEY=your_ny_times_api_key_here
```

Replace the placeholders with your actual API keys.

## Troubleshooting

- **401 Unauthorized Error**: Check that API keys are correctly set in the `.env` file.
- **No Articles Found**: Ensure API endpoints and query parameters are correct and that the APIs are returning data.

## Important Note on API Request Restrictions

If you encounter the following error while using the application:

```
Requests from the browser are not allowed on the Developer plan, except from localhost.
```

This issue occurs because some APIs, like **NewsAPI**, restrict API requests from public domains when using a free or developer plan. As a result, the application may fail to fetch articles from certain APIs when deployed on platforms such as Vercel.

### Possible Solutions:

1. **Upgrade to a Paid API Plan**:
   - Consider upgrading to a paid plan of the affected API (e.g., NewsAPI) that allows requests from public domains.

2. **Use a Proxy Server**:
   - Implement a server-side proxy to handle the API requests. This way, the API key and requests remain on the server, bypassing client-side restrictions. You can set up a simple Node.js proxy or use serverless functions (e.g., on Vercel or Heroku).

3. **Local Development**:
   - The issue does not affect local development. You can continue testing and running the application on `localhost` without restrictions.

### Future Enhancements:

To prevent this issue, the application can be enhanced with server-side API requests to protect API keys and avoid limitations imposed on browser-based requests.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

Please ensure your contributions are well-documented and tested.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.