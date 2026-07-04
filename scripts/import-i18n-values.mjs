// import-i18n-values.mjs
import fs from 'node:fs/promises';

const [, , baseJsonPath, valuesTxtPath, outputJsonPath] = process.argv;

if (!baseJsonPath || !valuesTxtPath || !outputJsonPath) {
	console.error('Usage: node import-i18n-values.mjs <base.json> <values.txt> <output.json>');
	process.exit(1);
}

const rawJson = await fs.readFile(baseJsonPath, 'utf8');
const data = JSON.parse(rawJson);

const rawTxt = await fs.readFile(valuesTxtPath, 'utf8');

// Убираем только финальный перенос строки, чтобы не получить пустую строку в конце
const lines = rawTxt.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n');

const messageKeys = Object.keys(data).filter((key) => {
	return !key.startsWith('$') && typeof data[key] === 'string';
});

if (lines.length !== messageKeys.length) {
	console.error(`Values count mismatch.`);
	console.error(`JSON message keys: ${messageKeys.length}`);
	console.error(`TXT lines: ${lines.length}`);
	process.exit(1);
}

for (let i = 0; i < messageKeys.length; i++) {
	const key = messageKeys[i];
	const line = lines[i];

	try {
		// Каждая строка должна быть валидной JSON-строкой:
		// "Text with \n \t and \"quotes\""
		data[key] = JSON.parse(line);
	} catch (error) {
		console.error(`Failed to parse line ${i + 1} for key "${key}"`);
		console.error(`Line content: ${line}`);
		throw error;
	}
}

const output = JSON.stringify(data, null, '\t') + '\n';

await fs.writeFile(outputJsonPath, output, 'utf8');

console.log(`Updated ${messageKeys.length} values and saved to ${outputJsonPath}`);
