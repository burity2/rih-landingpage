# Quiz Content Audit Report
**Date:** 2025-07-23
**Repository:** rih-landingpage
**Scope:** Referee education and protection quiz

---

## Executive Summary

The current quiz contains **110 questions** across two data files that together exhibit critical design flaws:

- **Exact duplicates**: QAdata.json contains questions 41-70 as verbatim repeats of questions 11-40
- **Wrong question types in scored quiz**: "Behavioral Self-Assessment" and "Pattern Recognition" items ask for personal reflection, not knowledge
- **Agency violations**: Many questions describe a harmful action already taken, then ask "what would you do?"—contradicting user agency
- **Missing protection coverage**: Zero questions about bystander intervention, safe reporting, or post-match safety
- **Factual claims**: Statistics and suspension lengths contain placeholder citations requiring verification

**Recommended action**: Retain 24-30 high-quality knowledge questions (referee education + awareness), create separate reflection prompts, add 8-10 protection questions.

---

## 1. Files Inspected

| File | Path | Questions | Notes |
|------|------|-----------|-------|
| QAdata.json | `src/assets/QAdata.json` | 70 | Contains duplicates (41-70 repeat 11-40) |
| QAdata40.json | `src/assets/QAdata40.json` | 40 | Unique content; differs from QAdata.json |
| Quiz Component | `src/pages/quizz-page/quiz.tsx` | N/A | Randomly selects 5 from combined 110 |

---

## 2. Current Data Schema

```typescript
{
  questions: Array<{
    id: number;                    // Unique within file; duplicates across files
    tag: string;                   // RAP level, awareness category, or self-assessment
    title: string;                 // Scenario name
    scenario: string;              // User-perspective prompt, often presupposes action
    options: Array<{
      letter: "A" | "B" | "C" | "D";
      text: string;
      pts: number;                 // 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
    }>;
    reveal: string;                // HTML with inline [cite: n] placeholders
  }>;
  tiers?: Array<{                  // Scoring brackets (optional)
    max: number;
    color: string;
    title: string;
    desc: string;
  }>;
}
```

**Current tag values:**
- `RAP Non-Physical Level 1` (verbal taunting)
- `RAP Non-Physical Level 2` (harassment/intimidation)
- `RAP Non-Physical Level 3` (threats/cyberbullying)
- `RAP Non-Physical Level 4` (discriminatory abuse)
- `RAP Physical Level 1` (minor contact)
- `RAP Physical Level 2` (confrontation/intimidation)
- `RAP Physical Level 3` (violent contact/assault)
- `Youth Referee Awareness`
- `Behavioral Self-Assessment`
- `Pattern Recognition`

---

## 3. Duplicate Analysis

### Exact Duplicates (QAdata.json)

Questions 41-70 in QAdata.json are **verbatim duplicates** of questions 11-40 (with ID #40 renamed "The Final Fury (Redux)"):

| Question # | Title | Appears as |
|------------|-------|-----------|
| 11-40 | Various | IDs 11-40 |
| 11-40 | Same | IDs 41-70 (with one rename) |

**Impact:** Reduces effective bank from 110 to 70 unique questions + redundancy within that 70.

### Near-Duplicate Themes

Both files explore similar scenarios with different wording. Examples:

| QAdata.json | QAdata40.json | Theme |
|-------------|---------------|-------|
| #1 "Offside Trigger" | #1 "Offside Disagreement" | Disputed offside call |
| #4 "Selective Hearing Test" | #4 "Bias Accusation" | Perceived one-sided officiating |
| #5 "Emotional Thermometer" | #5 "Emotional Outburst" | Escalating frustration |
| #11 "Accidental Bump" | #17 "Shoulder Brush" | Unintended or intentional contact |
| #12 "Anonymous Emailer" | #3 "Online Critic" | Digital criticism |

**Consolidation potential:** These pairs could be merged or one variant kept after content review.

---

## 4. Category Coverage Analysis

### Current Distribution (by tag)

**QAdata.json (70 questions):**
- RAP Non-Physical Level 1: 8 questions
- RAP Non-Physical Level 2: 9 questions
- RAP Non-Physical Level 3: 7 questions
- RAP Physical Level 1: 4 questions
- RAP Physical Level 2: 6 questions
- RAP Physical Level 3: 4 questions
- Youth Referee Awareness: 5 questions
- Behavioral Self-Assessment: 5 questions
- Pattern Recognition: 6 questions
- RAP Non-Physical Level 4: 0 questions
- **Referee Protection: 0 questions**

**QAdata40.json (40 questions):**
- RAP Non-Physical Level 1: 6 questions
- RAP Non-Physical Level 2: 9 questions
- RAP Non-Physical Level 3: 6 questions
- RAP Physical Level 1: 5 questions
- RAP Physical Level 2: 7 questions
- RAP Physical Level 3: 4 questions
- Youth Referee Awareness: 2 questions
- RAP Non-Physical Level 4: 2 questions
- Behavioral Self-Assessment: 0 questions
- Pattern Recognition: 0 questions
- **Referee Protection: 0 questions**

### Coverage Gaps

| Required Category | Subcategories Needed | Current Count | Status |
|-------------------|---------------------|---------------|--------|
| **Referee Education** | All RAP levels + discrimination | ~55 | Overstocked; needs consolidation |
| **Referee Awareness** | Youth/minors, emotional regulation, coaching impact, rule humility, retention | 7 | Adequate but thin on some topics |
| **Referee Protection** | Safe feedback, bystander intervention, post-match safety, digital protection, incident response, accountability | 0 | **Critical gap** |
| **Reflection** | Behavioral self-assessment, pattern recognition, introspection | 11 | Should be separated from scored quiz |

---

## 5. Design Issues

### Issue 1: Agency Violations

Many questions presuppose a harmful action, then ask what the respondent would do:

**Example (QAdata.json #11):**
> Scenario: "You pull on the referee's jersey during a heated discussion. You…"
> Option A: "I don't touch them."
> Option D: "I shake or yank them aggressively."

**Problem:** The scenario already states you *are* pulling the jersey. Option A contradicts the premise.

**Affected questions:** ~25 questions in both files follow this pattern.

**Solution:** Reframe as:
> "A spectator pulls on the referee's jersey during a heated discussion. What category of abuse is this?"

### Issue 2: Obvious Morality Ladder

Most questions use a predictable A→B→C→D escalation with A always safe:

- A: Perfect behavior (0 pts)
- B: Mildly inappropriate (5-10 pts)
- C: Clearly wrong (25-30 pts)
- D: Cartoonishly bad (40-50 pts)

**Effect:** Users can score 0 without reading by always selecting A.

**Solution:**
- Randomize correct-answer position
- Make distractors plausible (e.g., different policy categories, different impact levels)
- Include questions where the "less bad" option is still wrong

### Issue 3: Misaligned Question Types

Questions tagged "Behavioral Self-Assessment" or "Pattern Recognition" ask for introspection:

Examples:
- "Which sideline archetype describes you best?" (QAdata.json #9)
- "How often do you act like you have VAR replay?" (QAdata.json #23)

**Problem:** These belong in an *unscored reflection* activity, not a *scored knowledge quiz*. Scoring them as "abuse risk assessments" can shame users and reduces quiz validity.

**Solution:** Move to a separate, clearly labeled reflection section with no scoring.

### Issue 4: Mismatched Explanation and Question

Some reveals answer a different question than asked:

**Example (QAdata.json #10, "The Morning After"):**
> Question: "After a game where you were vocal toward the referee… what do you do the next morning?"
> Answers: Range from forgetting about it to writing complaint emails
> Reveal: "90% of referees say abuse has gotten worse in the past 5 years. Refs deserve the same respect as teachers…"

**Problem:** The reveal doesn't explain *why one morning response is better than another*; it pivots to a statistic and guilt appeal.

**Solution:** Explain which response reflects appropriate boundary-setting and emotional regulation; cite the statistic only if it directly supports that distinction.

---

## 6. Factual Claims Requiring Verification

| Claim | Source Ref | Status |
|-------|-----------|--------|
| "72% of U.S. youth refs are under 19" | Varies by question | **Flag for review**: Statistic appears without source document in repo |
| "69% are under 14 in Minnesota" | Varies | **Flag for review**: State-level data unsupported in repo |
| "2-game suspension" for Level 1 | [cite: 40, 108] | **Citation placeholder**; verify against U.S. Soccer RAP policy doc |
| "10-game suspension" for Level 2 confrontation | [cite: 42, 236] | **Citation placeholder**; verify |
| "6-24 month suspension" for Level 3 | [cite: 40, 154] | **Citation placeholder**; verify |
| "Urs Meier received 16,000 emails after Euro 2004" | Inline narrative | **Plausible but unsourced** in repo; consider removing if unverifiable |
| "Lifetime ban" for physical Level 3 | Varies | **Policy claim**; verify scope (league vs. federation vs. criminal) |

**Recommendation:**
- Flag all [cite: n] placeholders for review against official U.S. Soccer RAP policy document
- Remove statistics if not available in repo or official sources
- Convert uncertain claims ("may carry") to "can carry" only if policy confirms

---

## 7. Questions Recommended for Retention

### Criteria for Retention
1. Clear learning objective (user can name what they learned after answering + reading reveal)
2. Plausible distractors (not an obvious morality ladder)
3. Respects user agency (doesn't presuppose harmful action)
4. Aligns question with explanation
5. Teaches distinction, not just guilt/shock

### High-Value Questions (Candidate for Retention)

**Referee Education (Recognition):**
- QAdata.json #1, #2, #3 (policy boundaries)
- QAdata40.json #7, #22, #27 (intimidation, discrimination, physical contact)

**Referee Awareness (Context):**
- QAdata.json #6, #14, #21, #29, #35 (youth referee impact)
- QAdata40.json #6, #26, #32 (minor status, discrimination, identity protection)

**Reflection (Unscored):**
- QAdata.json #9, #23, #25, #30, #37 (sideline identity, escalation, pattern)
- QAdata40.json (none; this file has no reflection items)

### Questions Recommended for Redesign/Removal

| ID | Title | Reason |
|----|-------|--------|
| QAdata.json #10 | "The Morning After" | Reveals don't answer the question; uses shame |
| QAdata.json #18, #32, #39 | Pattern Recognition | Belongs in reflection, not scored quiz |
| QAdata.json #9, #16, #23, #30, #37 | Self-Assessment | Belongs in reflection, not scored quiz |
| QAdata.json #41-70 | Duplicates of 11-40 | Remove entirely |
| QAdata40.json #26, #32 | Stereotype, Religion Jab | Focus on respectful education; these may shame rather than teach |

---

## 8. Missing Content: Referee Protection

The current quiz contains **zero questions** about protecting referees. This is a critical gap. Required topics:

| Topic | Learning Objective | Example Question |
|-------|------------------|-----------------|
| **Safe feedback** | Choose the appropriate time and channel to report a referee | "A referee makes a call you disagree with. What is the correct next step?" |
| **Bystander intervention** | Recognize when to step in and how | "You notice a parent yelling abuse. What action is safest?" |
| **Post-match safety** | Preserve referee safety during departure | "How should spectators position themselves when leaving after a match?" |
| **Digital protection** | Avoid amplifying online abuse | "A social media post about a referee contains harsh criticism. What should you do?" |
| **Incident response** | Report threats or violence correctly | "You witness a threat toward a referee. Who should you contact first?" |
| **Accountability** | Support referee wellbeing after incident | "A coach apologizes after directing abuse at a referee. What else matters?" |

---

## 9. Unsupported and Conflicting Claims

### Classification Ambiguities

**Level 2 vs. Level 3 distinction unclear:**
- Question QAdata40.json #23 ("Parking Lot Standoff") describes threats as Level 3
- Question QAdata.json #2 ("Post-Game Parking Lot") describes confrontation in parking lot as Level 2
- **Problem:** Same location, similar actions, different classifications in source material

**Recommendation:** Clarify in question which specific fact (intent, language, movement) creates the boundary.

### Subjective Harm Claims

Several questions reference undocumented incidents:
- "In one documented case, parents confronted a ref so aggressively in a parking lot that he reached for softball bats" (QAdata.json #2)

**Status:** Plausible but no source in repo; difficult to verify.

---

## 10. Scoring and Point Values

**Current point scale:**
- 0 pts: Safe, appropriate behavior
- 5-15 pts: Borderline or mild violations
- 20-30 pts: Clear policy violations
- 35-50 pts: Serious or repeated violations

**Issues:**
- Point progression is inconsistent across questions
- No clear mapping between points and policy levels
- Current UI does not display final score or tier feedback

**Recommendation:** Standardize point values by policy level (after policy verification):
- Level 1 violations: 10-15 pts
- Level 2 violations: 20-30 pts
- Level 3 violations: 40-50 pts
- Discriminatory abuse (Level 4): 50+ pts

---

## 11. Question Type Distribution (Proposed)

For a balanced final bank of ~28 questions:

| Question Type | Count | Learning Focus |
|----------------|-------|-----------------|
| **Recognition** | 6 | Identify abusive behavior and category |
| **Boundary** | 6 | Understand what fact makes conduct illegal/violating |
| **Response** | 4 | Choose safe immediate action |
| **Protection** | 8 | Protect referee; correct reporting; bystander intervention |
| **Procedure** | 4 | Know reporting channels and processes |

**Separate (unscored reflection):**
- Self-assessment prompts: 5-8 items
- Escalation triggers: 3-5 items

---

## 12. Required Implementation Workflow

### Phase 1: Audit ✓
**Completed:**
- Identified exact duplicates (41-70 in QAdata.json)
- Mapped near duplicates across files
- Categorized all 110 questions by type
- Identified coverage gaps and design flaws
- Flagged unsupported factual claims

### Phase 2: Rewrite (Next)
- Merge/remove duplicates
- Rewrite agency-violating questions
- Randomize correct-answer positions
- Add 8-10 new protection questions
- Create separate reflection prompts
- Verify and update factual claims

### Phase 3: Validation (Next)
- Add automated checks for duplicate IDs
- Validate schema compliance
- Test no answer-position predictability
- Verify all scenarios and reveals align

### Phase 4: Verify (Next)
- Run TypeScript build and type check
- Run linter and formatter
- Test quiz component with new data
- Verify randomization and scoring

---

## 13. Schema Enhancement Recommendations

Proposed additions (optional; adds clarity but requires consumer updates):

```typescript
{
  id: number;
  title: string;
  scenario: string;
  category: "education" | "awareness" | "protection" | "reflection";
  subcategory: string;                // e.g., "verbal-taunting", "youth-ref", "bystander-intervention"
  learningObjective: string;          // e.g., "Distinguish disagreement from verbal taunting"
  questionType: "recognition" | "boundary" | "response" | "protection" | "procedure" | "reflection";
  options: Array<{
    letter: "A" | "B" | "C" | "D";
    text: string;
    pts: number;
  }>;
  correctOption?: "A" | "B" | "C" | "D";  // Required for validation but not revealed in UI
  reveal: string;
  sourceRefs: string[];               // e.g., ["RAP-2024-sec-3.2", "cite-18-87"]
  reviewStatus: "verified" | "flag-for-review" | "needs-source";
}
```

**Migration path:**
- Add new fields as optional (backward compatible)
- Populate for redesigned questions
- Update quiz component to use `learningObjective` for UI hints if desired

---

## 14. Files to Update

| File | Change | Priority |
|------|--------|----------|
| `src/assets/QAdata.json` | Remove questions 41-70; consolidate and redesign remaining | **High** |
| `src/assets/QAdata40.json` | Consolidate duplicates with QAdata.json; add protection content | **High** |
| `src/pages/quizz-page/quiz.tsx` | Update imports if files are consolidated; adjust random sample size | **Medium** |
| `src/types/quiz.ts` (create if missing) | Define schema with optional new fields | **Medium** |
| `tests/quiz-validation.test.ts` (create) | Add content validation tests | **Medium** |
| `docs/quiz-content-audit.md` (this file) | Finalize after implementation | **Low** |

---

## 15. Recommended Action Items

1. **Immediate:**
   - [ ] Remove duplicate questions 41-70 from QAdata.json
   - [ ] Consolidate near-duplicates across files (keep one variant per scenario type)
   - [ ] Move "Behavioral Self-Assessment" and "Pattern Recognition" items to separate reflection file

2. **Before implementation:**
   - [ ] Verify RAP policy document exists in repo; note version and effective date
   - [ ] Flag all [cite: n] placeholders for manual review against policy
   - [ ] List unsourced statistics (72%, etc.) for SME review

3. **Implementation:**
   - [ ] Rewrite 8-10 protection/bystander questions (none currently exist)
   - [ ] Reframe 20+ agency-violating questions
   - [ ] Randomize correct-answer positions across question bank
   - [ ] Create plausible distractors (not obvious morality ladder)
   - [ ] Update reveals to directly answer the question asked

4. **Validation:**
   - [ ] Add automated duplicate-detection tests
   - [ ] Add answer-position distribution test
   - [ ] Manual SME review of all reveals and factual claims

5. **Verification:**
   - [ ] Run TypeScript build (`tsc -b`)
   - [ ] Run linter (`npm run lint`)
   - [ ] Test quiz component loads and randomizes correctly
   - [ ] Manual test of 5-question random sampling

---

## Appendix A: Questions Disposition Matrix

**Legend:** KEEP = retain as-is | REDESIGN = rewrite | CONSOLIDATE = merge with similar | MOVE = transfer to reflection | REMOVE = delete | NEW = add

### QAdata.json (70 questions)

| ID | Title | Category | Disposition | Reason |
|----|-------|----------|-------------|--------|
| 1 | Offside Trigger | Education (Verbal) | REDESIGN | Good foundation; rewrite for agency; randomize answer positions |
| 2 | Post-Game Parking Lot | Education (Confrontation) | REDESIGN | Useful scenario; clarify Level 2 vs Level 3 boundary |
| 3 | Social Media Referee Critic | Education (Cyberbullying) | REDESIGN | Good topic; rewrite for clarity; move to "recognition" type |
| 4 | Selective Hearing Test | Education (Verbal) | CONSOLIDATE | Merge with QAdata40.json #4 "Bias Accusation"; keep one variant |
| 5 | Emotional Thermometer | Awareness (Escalation) | REDESIGN | Useful for escalation teaching; remove shame; clarify level boundaries |
| 6 | Youth Ref Reality Check | Awareness (Youth) | KEEP | Strong content; impacts double/triple penalties; good tone |
| 7 | Halftime Expert | Education (Intimidation) | REDESIGN | Coaching model; good scenario; rewrite for agency |
| 8 | Red Card Meltdown | Education (Threats) | REDESIGN | Threats scenario; reframe as recognition question |
| 9 | Sideline Identity | Reflection (Self-Assessment) | MOVE | Move to unscored reflection; helps users identify triggers |
| 10 | Morning After | Reflection (Pattern) | MOVE | Move to reflection; current reveal doesn't answer question |
| 11 | Accidental Bump | Education (Physical L1) | CONSOLIDATE | Merge with QAdata40.json #17; keep one variant |
| 12 | Anonymous Emailer | Education (Cyberbullying) | CONSOLIDATE | Merge with QAdata40.json #3 or #19; similar scenarios |
| 13 | Staring Contest | Education (Intimidation L2) | REDESIGN | Good boundary example; rewrite for clarity |
| 14 | Teen Ref Tantrum | Awareness (Youth) | CONSOLIDATE | Merge with QAdata40.json #6; keep one variant |
| 15 | Post-Whistle Shove | Education (Physical L3) | REDESIGN | Assault scenario; good for boundary teaching |
| 16 | Coach's Shadow | Reflection (Self-Assessment) | MOVE | Move to reflection; coaching role-modeling |
| 17 | Handball Hysteria | Education (Verbal L1) | REDESIGN | Good example; teach rule humility alongside abuse recognition |
| 18 | Repeat Offender | Reflection (Pattern) | MOVE | Move to reflection; identify escalation patterns |
| 19 | Field Invasion | Education (Confrontation L2) | REDESIGN | Entering field is clear violation; rewrite for recognition |
| 20 | Profanity Parade | Education (Harassment L2) | REDESIGN | Clear violation; good for language/tone teaching |
| 21 | Brace-Faced Blunder | Awareness (Youth) | KEEP | Respectful tone; identity-based triple penalty; strong content |
| 22 | Doxxing Drama | Education (Cyberbullying L3) | REDESIGN | Doxing is serious; rewrite for recognition and protection angle |
| 23 | VAR Wannabe | Reflection (Self-Assessment) | MOVE | Move to reflection; helps identify rule-knowledge gaps |
| 24 | Sideline Swipe | Education (Physical L1) | REDESIGN | Contact scenario; rewrite for agency and clarity |
| 25 | League Legend | Reflection (Pattern) | MOVE | Move to reflection; pattern recognition for self-awareness |
| 26 | Dive Denial | Education (Verbal L1) | CONSOLIDATE | Merge with similar call-disagreement scenarios |
| 27 | Trophy Tantrum | Education (Physical L3) | REDESIGN | Assault scenario; strong teaching point |
| 28 | Whistle Blower | Education (Intimidation L2) | REDESIGN | Mocking authority; rewrite for clarity |
| 29 | Homework Helper | Awareness (Youth) | KEEP | Rule-humility + youth awareness; respectful tone |
| 30 | Fanboy Flop | Reflection (Self-Assessment) | MOVE | Move to reflection; coaching impact |
| 31 | Forum Fury | Education (Cyberbullying L3) | REDESIGN | Online harassment; rewrite for boundary teaching |
| 32 | Escalation Expert | Reflection (Pattern) | MOVE | Move to reflection; personal escalation triggers |
| 33 | Bench Blocker | Education (Intimidation L2) | REDESIGN | Blocking/crowding; good boundary scenario |
| 34 | Corner Kick Critique | Education (Verbal L1) | CONSOLIDATE | Merge with similar "questioning calls" scenarios |
| 35 | Prom Night Pressure | Awareness (Youth) | KEEP | Context for teen refs; life stress factor; strong content |
| 36 | Flag Flap | Education (Physical L1) | CONSOLIDATE | Merge with equipment-interaction scenarios |
| 37 | World Cup Warrior | Reflection (Self-Assessment) | MOVE | Move to reflection; intensity self-check |
| 38 | Chant Starter | Education (Harassment L2) | REDESIGN | Group harassment; incitement; rewrite for clarity |
| 39 | Ban Build-Up | Reflection (Pattern) | MOVE | Move to reflection; escalation and consequences |
| 40 | Final Fury | Education (Physical L3) | REMOVE | Extreme/cartoonish; replace with nuanced protection question |
| 41-70 | (Duplicates of 11-40) | — | **REMOVE** | **Exact duplicates; no unique content** |

### QAdata40.json (40 questions)

| ID | Title | Category | Disposition | Reason |
|----|-------|----------|-------------|--------|
| 1 | Offside Disagreement | Education (Verbal L1) | CONSOLIDATE | Merge with QAdata.json #1; keep one variant |
| 2 | Post-Match Departure | Education (Confrontation L2) | CONSOLIDATE | Merge with QAdata.json #2; similar scenario |
| 3 | Online Critic | Education (Cyberbullying L3) | CONSOLIDATE | Merge with QAdata.json #12 or #22 |
| 4 | Bias Accusation | Education (Verbal L1) | CONSOLIDATE | Merge with QAdata.json #4; keep one variant |
| 5 | Emotional Outburst | Awareness (Escalation) | CONSOLIDATE | Merge with QAdata.json #5 |
| 6 | Junior Referee | Awareness (Youth) | CONSOLIDATE | Merge with QAdata.json #14 or #21 |
| 7 | Personal Space Test | Education (Intimidation L2) | KEEP | Clear boundary (face-to-face); good learning scenario |
| 8 | Parking Lot Threat | Education (Threats L3) | KEEP | Clear threat language; good for boundary teaching |
| 9 | Attention Grabber | Education (Physical L1) | KEEP | Deliberate unwanted touch; good recognition item |
| 10 | Pitch Invasion | Education (Confrontation L2) | CONSOLIDATE | Merge with QAdata.json #19 |
| 11 | Boundary Line Dispute | Education (Verbal L1) | CONSOLIDATE | Merge with similar scenarios |
| 12 | Object Throw | Education (Physical L3) | KEEP | Assault scenario; good distinction from L2 |
| 13 | Dignity Rule | Education (Discrimination L4) | KEEP | Identity-based abuse; important coverage |
| 14 | Equipment Tantrum | Education (Physical L2) | KEEP | Property damage; property interaction scenario |
| 15 | Sarcastic Clap | Education (Intimidation L2) | KEEP | Gesture/body language intimidation; good boundary |
| 16 | Rule Expert | Education (Verbal L1) | CONSOLIDATE | Merge with similar rule-knowledge scenarios |
| 17 | Shoulder Brush | Education (Physical L1) | CONSOLIDATE | Merge with QAdata.json #11 |
| 18 | Sideline Pacing | Education (Harassment L2) | KEEP | Following referee; intimidation through movement |
| 19 | Digital Threat | Education (Cyberbullying L3) | KEEP | Online threats; good for digital protection teaching |
| 20 | Water Splash | Education (Physical L2) | KEEP | Object use (non-striking); L2 boundary |
| 21 | Insinuation | Education (Verbal L1) | CONSOLIDATE | Merge with bias/taunting scenarios |
| 22 | Face-to-Face | Education (Intimidation L2) | CONSOLIDATE | Merge with QAdata40.json #7; similar scenario |
| 23 | Parking Lot Standoff | Education (Threats L3) | CONSOLIDATE | Merge with QAdata40.json #8; clarify level boundary |
| 24 | Finger Point | Education (Physical L1) | KEEP | Deliberate touch; good boundary marker |
| 25 | Mocking Tone | Education (Verbal L1-L2) | CONSOLIDATE | Merge with other verbal scenarios |
| 26 | Stereotype | Education (Discrimination L4) | FLAG | Content appropriate but may reinforce stereotypes; use carefully |
| 27 | Arm Grab | Education (Physical L2) | KEEP | Grabbing = escalation to L2; good distinction from L1 |
| 28 | Dismissive Comment | Education (Verbal L1) | CONSOLIDATE | Merge with other verbal scenarios |
| 29 | Identity Hunt | Education (Cyberbullying L3) | KEEP | Doxing scenario; good for digital protection |
| 30 | Ball Kick | Education (Physical L2-L3) | KEEP | Object use with intent; L2/L3 boundary |
| 31 | Threatening Stare | Education (Intimidation L2) | FLAG | Body language alone as L2; unclear boundary; redesign |
| 32 | Religion Jab | Education (Discrimination L4) | FLAG | Identity-based abuse; content appropriate but may reinforce; review tone |
| 33 | Attention Tap | Education (Physical L1) | CONSOLIDATE | Merge with other minor-contact scenarios |
| 34 | Appearance Mock | Education (Verbal L1) | CONSOLIDATE | Merge with other verbal mockery scenarios |
| 35 | Flag Tug | Education (Physical L2) | CONSOLIDATE | Merge with equipment interaction scenarios |
| 36 | Throat Gesture | Education (Threats L3) | KEEP | Threatening gesture; good for non-verbal threat |
| 37 | Path Block | Education (Intimidation L2) | KEEP | Blocking exit; clear intimidation boundary |
| 38 | Jersey Pull | Education (Physical L1) | CONSOLIDATE | Merge with QAdata.json #38 or other grabbing scenarios |
| 39 | Tone Test | Education (Verbal L1) | CONSOLIDATE | Merge with other verbal scenarios |
| 40 | Ultimate Line | Education (Physical L3) | KEEP | Spitting = assault; clear L3 boundary |

---

## Appendix B: New Questions to Commission (Referee Protection)

These 8-10 items should be created to fill the protection gap:

1. **Bystander Intervention (Response)**
   - Scenario: Parent notices another spectator yelling abuse at referee
   - Learning: Recognize when to step in; safe intervention methods
   - Distractors: Ignore, join in, confront aggressively, create distance and report

2. **Safe Reporting (Procedure)**
   - Scenario: You witness a threatening gesture toward a referee during a match
   - Learning: Correct immediate reporting channel (game official, league, not social media)
   - Distractors: Call police immediately, post on league Facebook, wait until next meeting

3. **Digital Protection (Procedure)**
   - Scenario: You see a social media post targeting a referee with personal threats
   - Learning: Report to platform, league, and relevant authority; don't amplify
   - Distractors: Share to gather support, comment with own criticism, ignore

4. **Post-Match Safety (Response)**
   - Scenario: After a heated match, you're leaving the venue at the same time as the referee
   - Learning: Give referee clear exit path; don't linger; don't block parking
   - Distractors: Wait to talk later, follow to parking lot, stand in their path

5. **Immediate Incident (Response)**
   - Scenario: You witness a coach grab a referee's arm during halftime
   - Learning: Separate parties, alert league official, document incident
   - Distractors: Confront the coach, take a video, wait and report later

6. **Bystander Courage (Protection)**
   - Scenario: A young referee is being heavily criticized by spectators
   - Learning: Publicly support the referee; validate their effort; offer perspective
   - Distractors: Stay quiet, join criticism, defend specific call (don't—acknowledge difficulty)

7. **Apology & Accountability (Response)**
   - Scenario: You've been warned about referee abuse; next match, you slip up again
   - Learning: Apologize directly to referee, ask what restoration looks like, follow through
   - Distractors: Avoid the referee, apologize publicly only, justify behavior

8. **Digital Evidence (Procedure)**
   - Scenario: You receive a threatening private message from someone about a referee
   - Learning: Capture evidence, report to league/platform, provide to authority
   - Distractors: Respond to the threat, ignore, share publicly to shame sender

9. **Rule Humility (Awareness)**
   - Scenario: You're certain a referee made an error; video confirms it later
   - Learning: Acknowledge the difficulty of live judgment; respect the referee despite error
   - Distractors: Criticize more harshly because you were right, demand apology, avoid referee

10. **Coach Modeling (Awareness)**
    - Scenario: You're a parent watching a coach aggressively argue with a referee
    - Learning: Recognize coach impact on player/spectator behavior; contribute differently
    - Distractors: Emulate the coach to show solidarity, ignore, criticize coach's method only

---

## Appendix C: Reflection Prompts (Unscored)

These items should NOT be scored; they facilitate self-awareness and are presented separately:

### Self-Assessment Module (No score)

1. "Which sideline behavior most describes you?" (identify yourself: silent supporter, commentator, assistant ref, main character)
2. "How do you typically react to a call you disagree with?" (emotional trajectory)
3. "What's your biggest trigger in youth sports?" (identify personal escalation point)
4. "Have you ever followed a referee or waited to speak after a match?" (pattern recognition)
5. "If you've been warned or sanctioned, what triggered it?" (learning from consequences)

### Escalation & Emotion Regulation Module (No score)

1. "When you feel frustrated at a game, how long does it typically last?" (emotional regulation)
2. "What's one thing that helps you cool down?" (coping strategy)
3. "Have you ever regretted something said at a game?" (reflection)
4. "What would help you stay calm at your next game?" (action planning)

---

**End of Audit Report**
