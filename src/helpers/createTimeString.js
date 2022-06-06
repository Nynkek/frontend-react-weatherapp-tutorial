function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit' });
}

export default createDateString;