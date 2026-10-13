
const generateMachineReaction = (decision) => {
  const { riskLevel, decision: action } = decision;

  if (riskLevel === "LOW") {
    return {
      reactionType: "MONITORING",
      status: "COMPLETED",
      message: "Machine is operating normally. Continue monitoring."
    };
  }

  if (riskLevel === "MEDIUM") {
    return {
      reactionType: "INSPECTION",
      status: "PENDING",
      message: "Inspection recommended. Maintenance personnel should review the machine."
    };
  }

  if (riskLevel === "HIGH") {
    return {
      reactionType: "URGENT_MAINTENANCE",
      status: "PENDING",
      message: "Urgent maintenance required. Notify the responsible maintenance personnel."
    };
  }

  return {
    reactionType: "MANUAL_REVIEW",
    status: "PENDING",
    message: "Decision is unknown. Manual review is required."
  };
};

export { generateMachineReaction };
