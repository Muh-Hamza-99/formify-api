const formatMessage = message => {
    let finalString = "";
    const messageArray = Object.entries(JSON.parse(message));
    for (let keyValue of messageArray) {
        keyValue[0] = `<h3 style="color: #333">${keyValue[0].charAt(0).toUpperCase() + keyValue[0].slice(1)}</h3>`
        keyValue[1] = `<p style="color: #333">${keyValue[1]}</p>`
        finalString += `${keyValue[0]}\n${keyValue[1]}\n<hr/>\n`
    };
    const submissionDate = new Date(Date.now());
    const submittedAt = `<span style="color: #BBB">Submitted at: ${submissionDate.toLocaleTimeString()} / ${submissionDate.toLocaleDateString()}</span>`;
    finalString += submittedAt;
    return finalString;
};

module.exports = formatMessage;