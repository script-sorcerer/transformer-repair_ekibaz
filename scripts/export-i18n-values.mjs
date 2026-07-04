// export-i18n-values.mjs
import fs from 'node:fs/promises';

const [, , inputJsonPath, outputTxtPath] = process.argv;

if (!inputJsonPath || !outputTxtPath) {
	console.error('Usage: node export-i18n-values.mjs <input.json> <output.txt>');
	process.exit(1);
}

const raw = await fs.readFile(inputJsonPath, 'utf8');
const data = JSON.parse(raw);

const values = [];

for (const [key, value] of Object.entries(data)) {
	// Не экспортируем служебные поля типа $schema
	if (key.startsWith('$')) continue;

	if (typeof value !== 'string') {
		console.warn(`Skip non-string key: ${key}`);
		continue;
	}

	// Важно: JSON.stringify сохраняет \n, \t, \" безопасно в одну строку
	values.push(JSON.stringify(value));
}

await fs.writeFile(outputTxtPath, values.join('\n') + '\n', 'utf8');

console.log(`Exported ${values.length} values to ${outputTxtPath}`);
