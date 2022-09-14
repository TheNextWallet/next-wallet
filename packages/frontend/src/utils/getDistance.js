const getDistance = (date) => {
    const currentMinutes = (date/ 1e6 - Date.now()) / 1000 / 60;
    const days = Math.floor(currentMinutes / (60 * 24) % 30);
    const hours = Math.floor((currentMinutes / 60) % 24);
    const minutes = Math.floor(currentMinutes % 60);
    return (days ? `${days}d `: '') + (hours ? `${hours}h ` : '') + `${minutes}m left`;
};

export default getDistance;
