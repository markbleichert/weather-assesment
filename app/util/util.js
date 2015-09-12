module.exports = {
	inRange(num, rangeStart, rangeEnd) {
		return (num <= Math.max(rangeStart, rangeEnd) && num >= Math.min(rangeStart, rangeEnd));
	}
};
