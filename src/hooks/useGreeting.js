/**
 * Returns a greeting string based on the current time and user name
 * @param {string} [name]
 * @returns {string}
 */
export const getGreeting = (name) => {
    const hour = new Date().getHours();
    let timeGreeting;

    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";

    // Match the format "Greeting, Name" used in DashboardPage.jsx
    return `${timeGreeting}, ${name || 'User'}`;
};
