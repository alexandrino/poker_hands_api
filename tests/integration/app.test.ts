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
      hand: [
        { suit: "spades", rank: 10 },
        { suit: "spades", rank: "J" },
        { suit: "spades", rank: "Q" },
        { suit: "spades", rank: "K" },
        { suit: "spades", rank: "A" },
      ],
    };
    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('StraightFlush');
  });

  it("should return the High Card hand", async () => {
    const payload = {
      hand: [
        { suit: "hearts", rank: "A" },
        { suit: "clubs", rank: 10 },
        { suit: "spades", rank: 5 },
        { suit: "diamonds", rank: 8 },
        { suit: "hearts", rank: 3 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('HighCard');
  });

  it("should return the Four of a Kind hand", async () => {
    const payload = {
      hand: [
        { suit: "hearts", rank: 5 },
        { suit: "diamonds", rank: 5},
        { suit: "clubs", rank: 5 },
        { suit: "spades", rank: 5 },
        { suit: "hearts", rank: 3 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('FourOfAKind');
  });

  it("should return Full House hand", async () => {
    const payload = {
      hand: [
        { suit: "hearts", rank: 5 },
        { suit: "diamonds", rank: 5},
        { suit: "clubs", rank: 5 },
        { suit: "spades", rank: 3 },
        { suit: "hearts", rank: 3 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('FullHouse');
  });

  it("should return Flush hand", async () => {
    const payload = {
      hand: [
        { suit: "clubs", rank: "A" },
        { suit: "clubs", rank: 5},
        { suit: "clubs", rank: 10 },
        { suit: "clubs", rank: 5 },
        { suit: "clubs", rank: 2 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('Flush');
  });

  it("should return Flush hand", async () => {
    const payload = {
      hand: [
        { suit: "spades", rank: 10 },
        { suit: "diamonds", rank: "J" },
        { suit: "clubs", rank: "Q" },
        { suit: "diamonds", rank: "K" },
        { suit: "spades", rank: "A" },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('Straight');
  });

  it("should return Three of a Kind hand", async () => {
    const payload = {
      hand: [
        { suit: "spades", rank: "Q" },
        { suit: "clubs", rank: "Q" },
        { suit: "hearts", rank: "Q" },
        { suit: "clubs", rank: 2 },
        { suit: "hearts", rank: 9 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('ThreeOfAKind');
  });

  it("should return Two pair hand", async () => {
    const payload = {
      hand: [
        { suit: "spades", rank: "Q" },
        { suit: "clubs", rank: "Q" },
        { suit: "hearts", rank: 8 },
        { suit: "clubs", rank: 8 },
        { suit: "hearts", rank: 9 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('TwoPair');
  });

  it("should return One pair hand", async () => {
    const payload = {
      hand: [
        { suit: "spades", rank: "Q" },
        { suit: "clubs", rank: "Q" },
        { suit: "hearts", rank: 8 },
        { suit: "clubs", rank: 5 },
        { suit: "hearts", rank: 9 },
      ],
    };

    const res = await request(app).post("/api/hand").send(payload);
    const { rankCategory } = res.body

    expect(res.statusCode).toEqual(200);
    expect(rankCategory).toEqual('OnePair');
  });
});
