/*

undo-redo, a undo redo stack data structure.

Copyright © 2020-2021 Subendra Kumar Sharma. All rights reserved. (jobs.sharma.subendra.kr@gmail.com)

This file is part of undo-redo.

undo-redo is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

undo-redo is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with undo-redo.  If not, see <https://www.gnu.org/licenses/>.

Written by Subendra Kumar Sharma.

*/

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	devtool: "none",
	output: {
		path: __dirname + "/dist/umd/",
		filename:
			process.env.MINIMIZE === "true"
				? "undo.redo.production.min.js"
				: "undo.redo.development.js",
	},
	externals: {
		Queue: {
			commonjs: "Queue",
			commonjs2: "Queue",
			amd: "Queue",
			root: "Queue",
		},
		Stack: {
			commonjs: "Stack",
			commonjs2: "Stack",
			amd: "Stack",
			root: "Stack",
		},
	},
});
