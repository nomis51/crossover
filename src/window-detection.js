const { getForegroundWindowInfos } = require('@nomis51/crossover-window-detection');

let currentInfos = null;

exports.onWindowChanged = function (callback, interval = 500) {
	return setInterval(() => {
		try {
			getForegroundWindowInfos(infos => {
				if (!infos) return;
				if (!hasChanged(currentInfos, infos)) return;

				currentInfos = infos;
				callback(undefined, simpleClone(currentInfos));
			});
		}
		catch (e) {
			callback(e, undefined);
		}
	}, interval);
}

function simpleClone(a) {
	return JSON.parse(JSON.stringify(a));
}

function hasChanged(currentInfos, newInfos) {
	return !currentInfos || currentInfos.title !== newInfos.title ||
		currentInfos.processPath !== newInfos.processPath;
}