
const classifyMachineCondition = (reading) => {
    const { temperature, vibration, pressure, rpm } = reading;

    //  Critical condition
    if (
        temperature >= 90 ||
        vibration >= 70 ||
        pressure < 40 ||
        pressure > 80
    ) {
        return {
            condition: "CRITICAL",
            message: "🚨 Machine is operating under critical conditions!"
        };
    }

    //  Warning condition
    if (
        temperature >= 80 ||
        vibration >= 50 ||
        pressure < 50 ||
        pressure > 70 ||
        rpm < 1000 ||
        rpm > 1800
    ) {
        return {
            condition: "WARNING",
            message: "⚠️ Machine requires attention."
        };
    }

    //  Normal condition
    return {
        condition: "NORMAL",
        message: "✅ Machine is operating within configured limits."
    };
};

export { classifyMachineCondition };
