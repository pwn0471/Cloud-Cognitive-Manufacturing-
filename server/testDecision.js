
import { makeMachineDecision } from "./src/services/decisionService.js";

const testCases = [
    { condition: "NORMAL" },
    { condition: "WARNING" },
    { condition: "CRITICAL" }
];

testCases.forEach((testCase) => {
    const result = makeMachineDecision(testCase);

    console.log("\nInput condition:", testCase.condition);
    console.log("Decision result:", result);
});
