export const getWxIcon = (icon) => {
    const iconMapping = {
        'clear-day': 'day-sunny',
        'clear-night': 'night-clear',
        'rain': 'rain',
        'snow': 'snow',
        'sleet': 'sleet',
        'wind': 'strong-wind',
        'fog': 'fog',
        'cloudy': 'cloudy',
        'partly-cloudy-day': 'day-cloudy',
        'partly-cloudy-night': 'night-cloudy',
        'hail': 'hail',
        'thunderstorm': 'thunderstorm',
        'tornado': 'tornado'
    };
    return iconMapping[icon];
};

export const getMoonIcon = (icon) => {
    const phase = parseFloat(icon);
    const iconMapping = ['new', 'waxing-cresent-1', 'waxing-cresent-2', 'waxing-cresent-3',
        'waxing-cresent-4', 'waxing-cresent-5', 'waxing-cresent-6',
        'first-quarter', 'waxing-gibbous-1', 'waxing-gibbous-2', 'waxing-gibbous-3',
        'waxing-gibbous-4', 'waxing-gibbous-5', 'waxing-gibbous-6', 'full', 'waning-gibbous-1',
        'waning-gibbous-2', 'waning-gibbous-3', 'waning-gibbous-4', 'waning-gibbous-5',
        'waning-gibbous-6', 'third-quarter', 'waning-crescent-1', 'waning-crescent-2',
        'waning-crescent-3', 'waning-crescent-4', 'waning-crescent-5', 'waning-crescent-6', 'new' 
    ];
    return iconMapping[Math.round(phase / 0.0357)];
};