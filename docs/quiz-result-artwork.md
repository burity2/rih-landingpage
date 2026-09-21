# Quiz result artwork

Generated with the built-in image_gen tool. Character reference: `src/assets/imgs/ref-quiz-hue.png`. All five original transparent PNG outputs are stored in `src/assets/imgs/quiz-results/`.

Each final prompt consists of this shared prefix followed by the corresponding expression below.

Use case: illustration-story. Create ONE transparent-background waist-up mascot asset for a football quiz result. Reference image is character/style reference ONLY: preserve same friendly adult male referee, short side-parted black hair, peach skin, rounded nose, thick black outlines, black collared referee shirt with yellow chest badge, flat cartoon shading. No desk, props, background, text or watermark. Centered square composition, complete hands and head with generous margin. Expression and pose: 

- `devastated.png`: DEVASTATED at a very low score. Slumped shoulders, head slightly lowered, mouth open in despair, tears and dramatic vertical stress lines on forehead, hands hanging dejectedly. Exaggerated comic emotion, same character.
- `concerned.png`: CONCERNED. Worried raised inner brows, small frown, uneasy eyes, one hand touching chin. Clearly worried but not crying.
- `indifferent.png`: APATHETIC, 'well, okay, I guess'. Half-lidded eyes, crooked uncertain mouth, both shoulders raised in a shrug with open palms. Neither happy nor sad.
- `happy.png`: HAPPY. Warm confident smile, bright normal eyes, one clear thumbs-up hand. Cheerful and approving.
- `delighted.png`: EXTREMELY HAPPY. Huge joyful open grin, TWO clear thumbs-up hands, GOLDEN STARS IN BOTH EYES, a few small celebratory gold sparkles near head. Exuberant celebration.

Scores 0 and 1 share the devastated reaction; scores 2–5 map to the remaining images in order. The meter is rendered as SVG in quiz-result.tsx.

