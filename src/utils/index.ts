export class Utils {
	static shuffle(list: Array<string>): Array<string> {
		const result = [...list]
		let currentIndex = result.length;
		while (currentIndex != 0) {
			const randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[result[currentIndex], result[randomIndex]] = [
				result[randomIndex], result[currentIndex]];
		}

		return result
	}

	static nomalize(text: string): string {
		return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	}

}