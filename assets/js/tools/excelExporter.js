/**
 * Excel Exporter Utility
 * Reusable Excel export functionality for all tools
 */

class ExcelExporter {
    /**
     * Export data to Excel file
     * @param {Array} data - Array of objects to export
     * @param {String} filename - Output filename
     * @param {String} sheetName - Worksheet name
     * @param {Object} options - Additional options
     */
    static export(data, filename, sheetName = 'Sheet1', options = {}) {
        try {
            if (!data || data.length === 0) {
                throw new Error('No data to export');
            }

            // Create workbook
            const wb = XLSX.utils.book_new();

            // Convert data to worksheet
            const ws = XLSX.utils.json_to_sheet(data);

            // Apply column widths if provided
            if (options.columnWidths) {
                ws['!cols'] = options.columnWidths.map(w => ({ wch: w }));
            }

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, sheetName);

            // Generate filename with timestamp if not provided
            const finalFilename = filename || `export-${new Date().toISOString().split('T')[0]}.xlsx`;

            // Download file
            XLSX.writeFile(wb, finalFilename);

            return true;
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            return false;
        }
    }

    /**
     * Export from array of arrays (for more control)
     */
    static exportFromArray(arrayData, filename, sheetName = 'Sheet1', options = {}) {
        try {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(arrayData);

            if (options.columnWidths) {
                ws['!cols'] = options.columnWidths.map(w => ({ wch: w }));
            }

            XLSX.utils.book_append_sheet(wb, ws, sheetName);
            XLSX.writeFile(wb, filename);

            return true;
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            return false;
        }
    }

    /**
     * Export multiple sheets
     */
    static exportMultiSheet(sheets, filename) {
        try {
            const wb = XLSX.utils.book_new();

            sheets.forEach(sheet => {
                const ws = XLSX.utils.json_to_sheet(sheet.data);

                if (sheet.columnWidths) {
                    ws['!cols'] = sheet.columnWidths.map(w => ({ wch: w }));
                }

                XLSX.utils.book_append_sheet(wb, ws, sheet.name);
            });

            XLSX.writeFile(wb, filename);

            return true;
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            return false;
        }
    }
}

// Make available globally
window.ExcelExporter = ExcelExporter;
