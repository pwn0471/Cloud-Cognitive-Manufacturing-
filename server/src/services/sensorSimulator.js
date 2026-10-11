const randomBetween = (min ,max) =>{
    return Math.floor(Math.random() * (max-min +1)) + min;
}

const generateSensorReading = (machineId) => {
    return {
        machineId,
        temperature : randomBetween(65,80),
        vibration : randomBetween(15,35),
        pressure: randomBetween(55,65),
        rpm: randomBetween(1400,1600),
        source : "simulated",
        timestamp : new Date()
    };
};

export { generateSensorReading};