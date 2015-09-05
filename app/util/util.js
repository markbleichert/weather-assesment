module.exports = {
	inRange: function  (num, rangeStart, rangeEnd) {
		return (num <= Math.max(rangeStart, rangeEnd) && num >= Math.min(rangeStart, rangeEnd));
	}
};