module.exports = (string) =>  {
    try { new String(string); } catch { return string; };
    let RegEX = /[#, %, &, { , }, \, <, >, *, ?, /, $, !, ', ", :, @, +, `, |, =]/g;

    if (string.match(RegEX)) return string
    else return string
}