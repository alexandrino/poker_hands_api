import Joi from "joi";

// const handRule = Joi.array();

// const handSchema = Joi.object({
//   hand: handRule
//     .min(5)
//     .max(5)
//     .required()
//     .items({
//       suit: Joi.string()
//         .valid("hearts", "diamonds", "clubs", "spades")
//         .required(),
//       rank: Joi.string()
//         .valid(2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A")
//         .required(),
//     }),
// });

const handSchema = Joi.object({
  hands: Joi.array()
    .required()
    .items({
      cards: Joi.array()
        .min(5)
        .max(5)
        .required()
        .items({
          suit: Joi.string()
            .valid("hearts", "diamonds", "clubs", "spades")
            .required(),
          rank: Joi.string()
            .valid(2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A")
            .required(),
        }),
    }),
});

export { handSchema };
