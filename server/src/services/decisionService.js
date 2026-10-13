
const makeMachineDecision = (analysis) => {
    const { condition } = analysis;

    // 🟢 Normal condition
    if (condition === "NORMAL") {
        return {
            riskLevel: "LOW",
            decision: "CONTINUE_MONITORING",
            message: "✅ Machine is operating normally. Continue monitoring."
        };
    }

    // 🟡 Warning condition
    if (condition === "WARNING") {
        return {
            riskLevel: "MEDIUM",
            decision: "SCHEDULE_INSPECTION",
            message: "⚠️ Schedule a machine inspection and monitor readings closely."
        };
    }

    // 🔴 Critical condition
    if (condition === "CRITICAL") {
        return {
            riskLevel: "HIGH",
            decision: "URGENT_MAINTENANCE",
            message: "🚨 Critical condition detected. Urgent inspection and maintenance are recommended."
        };
    }

    // Handle unexpected condition values
    return {
        riskLevel: "UNKNOWN",
        emoji: "❓",
        decision: "REVIEW_REQUIRED",
        message: "❗ Machine condition is unknown. Review the sensor data."
    };
};

export { makeMachineDecision };
