/**
 * CSV Data Loader
 * Loads and parses CSV files from the data directory
 */

class CSVLoader {
    constructor() {
        this.cache = {};
    }

    /**
     * Load and parse CSV file
     */
    async load(filename) {
        // Check cache first
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        try {
            const response = await fetch(`data/${filename}`);

            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }

            const csvText = await response.text();
            const data = this.parseCSV(csvText);

            // Cache the result
            this.cache[filename] = data;

            return data;
        } catch (error) {
            console.error(`Error loading CSV file ${filename}:`, error);
            return [];
        }
    }

    /**
     * Parse CSV text to array of objects
     */
    parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        if (lines.length === 0) return [];

        // Parse headers
        const headers = this.parseCSVLine(lines[0]);
        const data = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === 0) continue;

            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            data.push(obj);
        }

        return data;
    }

    /**
     * Parse a single CSV line, handling quoted values
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    // Escaped quote
                    current += '"';
                    i++;
                } else {
                    // Toggle quote state
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                // Field separator
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        // Add last field
        result.push(current.trim());

        return result;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache = {};
    }
}

// Create global instance
window.csvLoader = new CSVLoader();
