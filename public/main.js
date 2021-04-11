window.onload = function () {
	console.log("onload");

	window.ur = new UndoRedo.default();
	var $contentBody = document.getElementsByClassName("content-body")[0];

	window.remove = function (obj, d) {};

	window.insert = function (obj, d) {};

	window.find = function (obj, exact, all, comp) {};

	window.getData = function () {};

	window.printTree = function () {};
};
