/** @license undo-redo

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

import { Node } from "./interfaces/interfaces";

/*
	node = {
		next: <Node>,
		prev: <Node>,
		data: <any>,
	}

 */

class UndoRedo {
	HEAD: Node;
	TAIL: Node;
	CURR: Node;
	size: number;
	length: number;

	constructor(options: Record<string, any>) {
		this.HEAD = undefined;
		this.TAIL = undefined;
		this.CURR = undefined;
		this.size = options?.size || 50;
		this.length = 0;
	}

	constructNode(data: any): Node {
		return {
			next: undefined,
			prev: undefined,
			data,
		};
	}

	undo() {
		if (this.CURR !== this.TAIL) {
			this.CURR = this.CURR!.prev;
			return this.CURR!.data;
		}
	}

	redo() {
		if (this.CURR !== this.HEAD) {
			this.CURR = this.CURR!.next;
			return this.CURR!.data;
		}
	}

	push(data: any) {
		const node = this.constructNode(data);
		if (this.CURR === undefined) {
			this.CURR = node;
			this.HEAD = node;
			this.TAIL = node;
			this.length++;
			this.checkLength();
		} else if (this.CURR === this.HEAD) {
			this.HEAD = node;
			this.HEAD!.prev = this.CURR;
			this.CURR.next = this.HEAD;
			this.CURR = this.HEAD;
			this.length++;
			this.checkLength();
		} else {
			let next = this.CURR.next;
			node!.prev = this.CURR;
			this.CURR.next = node;
			this.CURR = this.CURR.next;
			this.HEAD = this.CURR;

			let count = 0;
			while (next !== undefined) {
				next = next.next;
				count++;
			}
			this.length -= count;
			this.length++;
		}
		return data;
	}

	checkLength() {
		if (this.length > this.size) {
			this.TAIL = this.TAIL!.next;
			this.length--;
		}
	}

	getCurrent() {
		return this.CURR?.data;
	}

	reset(): void {
		this.HEAD = undefined;
		this.TAIL = undefined;
		this.CURR = undefined;
		this.length = 0;
	}
}

export default UndoRedo;
