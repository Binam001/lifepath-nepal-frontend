import { calculateEIScores } from "../data/EmotionalIntelligence-test";

// Construct mock answers
const userSelfReportAnswers: Record<number, number> = {
  // Self-awareness (Q1-Q5)
  1: 5, // normal -> 5
  2: 5, // reverse -> 6-5 = 1
  3: 5, // normal -> 5
  4: 5, // reverse -> 6-5 = 1
  5: 5, // normal -> 5
  // Self-regulation (Q6-Q10)
  6: 4, // normal -> 4
  7: 4, // reverse -> 6-4 = 2
  8: 4, // normal -> 4
  9: 4, // reverse -> 6-4 = 2
  10: 4, // normal -> 4
  // Motivation (Q11-Q15)
  11: 5, // normal -> 5
  12: 5, // reverse -> 1
  13: 5, // normal -> 5
  14: 5, // reverse -> 1
  15: 5, // normal -> 5
  // Empathy (Q16-Q20)
  16: 5, // normal -> 5
  17: 5, // reverse -> 1
  18: 5, // normal -> 5
  19: 5, // reverse -> 1
  20: 5, // normal -> 5
  // Social skills (Q21-Q25)
  21: 5, // normal -> 5
  22: 5, // reverse -> 1
  23: 5, // normal -> 5
  24: 5, // reverse -> 1
  25: 5, // normal -> 5
};

const userScenarioAnswers: Record<number, number> = {
  // Self-awareness (S101-S103)
  101: 5,
  102: 5,
  103: 5,
  // Self-regulation (S104-S106)
  104: 1, // average: 1.0 (difference from self-report 3.2 is 2.2, self-report is higher, so hasBlindSpot: true)
  105: 1,
  106: 1,
  // Motivation (S107-S109)
  107: 3, // average: 3.0 (difference from self-report 3.4 is 0.4, no flags)
  108: 3,
  109: 3,
  // Empathy (S110-S112)
  110: 5,
  111: 5,
  112: 5,
  // Social skills (S113-S115)
  113: 5,
  114: 5,
  115: 5,
};

const result = calculateEIScores(userSelfReportAnswers, userScenarioAnswers);

console.log("=== EI RESULT TEST ===");
console.log("Total True Score:", result.totalTrueScore);
console.log("\n--- Domain: self-awareness ---");
console.log(JSON.stringify(result.domains["self-awareness"], null, 2));
console.log("\n--- Domain: self-regulation ---");
console.log(JSON.stringify(result.domains["self-regulation"], null, 2));
console.log("\n--- Domain: motivation ---");
console.log(JSON.stringify(result.domains["motivation"], null, 2));

console.log("\n--- Micro-Inconsistencies ---");
console.log(JSON.stringify(result.microInconsistencies, null, 2));
