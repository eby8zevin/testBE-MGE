module.exports = (counter) => {
    const date = new Date();
    const YY = date.getFullYear().toString().slice(-2);
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    return `BRG/${YY}/${MM}/${counter.toString().padStart(5, '0')}`;
};
