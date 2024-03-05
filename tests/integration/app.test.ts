import request from "supertest";
import { App } from "../../src/app";

const app = new App().server;

describe("GET /api/health", () => {
  it("should return the health check status", async () => {
    const res = await request(app).get("/api/health").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ status: "UP" });
  });
});

describe("POST /api/hand", () => {
  it("should return the straight flush hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "spades", rank: 10 },
            { suit: "spades", rank: "J" },
            { suit: "spades", rank: "Q" },
            { suit: "spades", rank: "K" },
            { suit: "spades", rank: "A" },
          ],
        },
        {
          cards: [
            { suit: "spades", rank: "Q" },
            { suit: "clubs", rank: "Q" },
            { suit: "hearts", rank: 8 },
            { suit: "clubs", rank: 5 },
            { suit: "hearts", rank: 9 },
          ],
        },
      ],
    };
    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("StraightFlush");
    expect(result[0].winner).toEqual(true);
  });

  it("should return the High Card hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("HighCard");
    expect(result[0].winner).toEqual(true);
  });

  it("should return the Four of a Kind hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "hearts", rank: 5 },
            { suit: "diamonds", rank: 5 },
            { suit: "clubs", rank: 5 },
            { suit: "spades", rank: 5 },
            { suit: "hearts", rank: 3 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("FourOfAKind");
    expect(result[0].winner).toEqual(true);
  });

  it("should return Full House hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "hearts", rank: 5 },
            { suit: "diamonds", rank: 5 },
            { suit: "clubs", rank: 5 },
            { suit: "spades", rank: 3 },
            { suit: "hearts", rank: 3 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("FullHouse");
    expect(result[0].winner).toEqual(true);
  });

  it("should return Flush hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "clubs", rank: "A" },
            { suit: "clubs", rank: 5 },
            { suit: "clubs", rank: 10 },
            { suit: "clubs", rank: 5 },
            { suit: "clubs", rank: 2 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("Flush");
    expect(result[0].winner).toEqual(true);
  });

  it("should return Flush hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "spades", rank: 10 },
            { suit: "diamonds", rank: "J" },
            { suit: "clubs", rank: "Q" },
            { suit: "diamonds", rank: "K" },
            { suit: "spades", rank: "A" },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("Straight");
    expect(result[0].winner).toEqual(true);
  });

  it("should return Three of a Kind hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "spades", rank: "Q" },
            { suit: "clubs", rank: "Q" },
            { suit: "hearts", rank: "Q" },
            { suit: "clubs", rank: 2 },
            { suit: "hearts", rank: 9 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("ThreeOfAKind");
    expect(result[0].winner).toEqual(true);
  });

  it("should return Two pair hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "spades", rank: "Q" },
            { suit: "clubs", rank: "Q" },
            { suit: "hearts", rank: 8 },
            { suit: "clubs", rank: 8 },
            { suit: "hearts", rank: 9 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("TwoPair");
    expect(result[0].winner).toEqual(true);
  });

  it("should return One pair hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "hearts", rank: "A" },
            { suit: "clubs", rank: 10 },
            { suit: "spades", rank: 5 },
            { suit: "diamonds", rank: 8 },
            { suit: "hearts", rank: 3 },
          ],
        },
        {
          cards: [
            { suit: "spades", rank: "Q" },
            { suit: "clubs", rank: "Q" },
            { suit: "hearts", rank: 8 },
            { suit: "clubs", rank: 5 },
            { suit: "hearts", rank: 9 },
          ],
        },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { result } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(result[0].rank).toEqual("OnePair");
    expect(result[0].winner).toEqual(true);
  });

  it("should return a validation error for missing hand", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "spades", rank: "J" },
            { suit: "spades", rank: "Q" },
            { suit: "spades", rank: "K" },
            { suit: "spades", rank: "A" },
          ],
        },
      ],
    };
    const res = await request(app).post("/api/hand").send(payload);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      errorMessage: '"hands[0].cards" must contain at least 5 items',
    });
  });

  it("should return a validation error for suits value", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "spadess", rank: 10 },
            { suit: "spades", rank: "J" },
            { suit: "spades", rank: "Q" },
            { suit: "spades", rank: "K" },
            { suit: "spades", rank: "A" },
          ],
        },
      ],
    };
    const res = await request(app).post("/api/hand").send(payload);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      errorMessage:
        '"hands[0].cards[0].suit" must be one of [hearts, diamonds, clubs, spades]',
    });
  });

  it("should return a validation error for rank value", async () => {
    const payload = {
      hands: [
        {
          cards: [
            { suit: "spades", rank: 12 },
            { suit: "spades", rank: "J" },
            { suit: "spades", rank: "Q" },
            { suit: "spades", rank: "K" },
            { suit: "spades", rank: "A" },
          ],
        },
      ],
    };
    const res = await request(app).post("/api/hand").send(payload);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      errorMessage:
        '"hands[0].cards[0].rank" must be one of [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]',
    });
  });
});
