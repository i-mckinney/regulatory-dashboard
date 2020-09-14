const getTimeStamp = () => {
	const date = new Date();
	return date.toISOString();
}

exports.getTimeStamp = getTimeStamp;