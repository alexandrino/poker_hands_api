# List of Poker Hands API

This API categorizes a poker hand based on the cards provided by the player.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:
```bash
cd <project-name>
```

3. Install the dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run start:dev
```

### Running Tests
To run the test suite:
```bash
npm test
```

To run tests with coverage report:
```bash
npm run test:coverage
```

Run linting for the project
```bash
npm run lint
```

### Running with Docker
```bash
docker-compose up
```

### Usage
To categorize a poker hand, make a POST request to http://localhost:3000/api/hand with a JSON body containing the hand array. Each object in the hand array should have a suit and rank.

```bash
curl --location 'http://localhost:3000/api/hand' \
--header 'Content-Type: application/json' \
--data '{
   "hand": [
       {"suit": "spades", "rank": 10},
       {"suit": "spades", "rank": "J"},
       {"suit": "spades", "rank": "Q"},
       {"suit": "spades", "rank": "K"},
       {"suit": "spades", "rank": "A"}
    ]
}'
```

The response will contain the category of the hand and the hand itself:
```bash
{
    "rankCategory": "StraightFlush",
    "hand": [
        {
            "suit": "spades",
            "rank": 10
        },
        {
            "suit": "spades",
            "rank": "J"
        },
        {
            "suit": "spades",
            "rank": "Q"
        },
        {
            "suit": "spades",
            "rank": "K"
        },
        {
            "suit": "spades",
            "rank": "A"
        }
    ]
}
```