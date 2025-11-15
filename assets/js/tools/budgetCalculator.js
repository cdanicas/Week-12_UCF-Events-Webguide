/**
 * Budget Calculator
 * Interactive event budget calculator with Excel export
 */

class BudgetCalculator {
    constructor() {
        this.items = [];
        this.categories = [
            'Venue',
            'Catering',
            'Marketing',
            'Entertainment',
            'Equipment',
            'Security',
            'Transportation',
            'Staffing',
            'Permits & Insurance',
            'Miscellaneous'
        ];
        this.chart = null;
        this.localStorageKey = 'ucf-event-budget';

        this.init();
    }

    init() {
        this.loadFromStorage();
        this.renderCalculator();
        this.attachEventListeners();
        this.updateDisplay();
    }

    renderCalculator() {
        const container = document.getElementById('budget-calculator-container');
        if (!container) {
            console.error('Budget calculator container not found');
            return;
        }

        container.innerHTML = `
            <div class="budget-calculator">
                <!-- Header -->
                <div class="budget-header" data-aos="fade-down">
                    <h2 class="section-title">Event Budget Calculator</h2>
                    <p class="section-description">
                        Plan your event budget with our interactive calculator.
                        Add line items, view visual breakdowns, and export to Excel.
                    </p>
                </div>

                <!-- Controls -->
                <div class="budget-controls" data-aos="fade-up">
                    <button class="btn btn-primary" id="add-item-btn">
                        <span>+ Add Line Item</span>
                    </button>
                    <button class="btn btn-secondary" id="export-excel-btn">
                        <span>📊 Export to Excel</span>
                    </button>
                    <button class="btn btn-outline" id="clear-budget-btn">
                        <span>🗑️ Clear All</span>
                    </button>
                </div>

                <!-- Add Item Form -->
                <div class="budget-form-container" id="item-form-container" style="display: none;">
                    <div class="card" data-aos="scale-in">
                        <h3>Add Budget Item</h3>
                        <form id="budget-item-form">
                            <div class="form-group">
                                <label class="form-label">Category</label>
                                <select class="form-select" id="item-category" required>
                                    ${this.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <input type="text" class="form-input" id="item-description" required
                                    placeholder="e.g., Student Union Ballroom rental">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Quantity</label>
                                <input type="number" class="form-input" id="item-quantity"
                                    min="1" value="1" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Unit Price ($)</label>
                                <input type="number" class="form-input" id="item-price"
                                    min="0" step="0.01" required placeholder="0.00">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Notes (optional)</label>
                                <textarea class="form-textarea" id="item-notes"
                                    placeholder="Additional details..."></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Add Item</button>
                                <button type="button" class="btn btn-outline" id="cancel-item-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Budget Items Table -->
                <div class="budget-items-section" data-aos="fade-up" data-aos-delay="100">
                    <h3>Budget Items</h3>
                    <div id="budget-items-container"></div>
                </div>

                <!-- Summary and Chart -->
                <div class="grid grid-2" style="margin-top: 2rem;">
                    <!-- Summary -->
                    <div class="card" data-aos="fade-right">
                        <h3>Budget Summary</h3>
                        <div id="budget-summary"></div>
                    </div>

                    <!-- Chart -->
                    <div class="card" data-aos="fade-left">
                        <h3>Budget Breakdown</h3>
                        <canvas id="budget-chart"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add item button
        document.getElementById('add-item-btn')?.addEventListener('click', () => {
            this.showItemForm();
        });

        // Cancel button
        document.getElementById('cancel-item-btn')?.addEventListener('click', () => {
            this.hideItemForm();
        });

        // Form submission
        document.getElementById('budget-item-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Export to Excel
        document.getElementById('export-excel-btn')?.addEventListener('click', () => {
            this.exportToExcel();
        });

        // Clear budget
        document.getElementById('clear-budget-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all budget items?')) {
                this.clearBudget();
            }
        });
    }

    showItemForm() {
        const formContainer = document.getElementById('item-form-container');
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    hideItemForm() {
        document.getElementById('item-form-container').style.display = 'none';
        document.getElementById('budget-item-form').reset();
    }

    addItem() {
        const category = document.getElementById('item-category').value;
        const description = document.getElementById('item-description').value;
        const quantity = parseFloat(document.getElementById('item-quantity').value);
        const price = parseFloat(document.getElementById('item-price').value);
        const notes = document.getElementById('item-notes').value;

        const item = {
            id: Utils.generateId(),
            category,
            description,
            quantity,
            price,
            total: quantity * price,
            notes,
            createdAt: new Date().toISOString()
        };

        this.items.push(item);
        this.saveToStorage();
        this.updateDisplay();
        this.hideItemForm();

        Utils.showNotification('Budget item added successfully!', 'success');
    }

    removeItem(id) {
        if (confirm('Remove this item from the budget?')) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveToStorage();
            this.updateDisplay();
            Utils.showNotification('Budget item removed', 'info');
        }
    }

    updateDisplay() {
        this.renderItems();
        this.renderSummary();
        this.renderChart();
    }

    renderItems() {
        const container = document.getElementById('budget-items-container');

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <p>No budget items yet. Click "Add Line Item" to get started.</p>
                </div>
            `;
            return;
        }

        const table = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.items.map(item => `
                        <tr>
                            <td><span class="badge">${item.category}</span></td>
                            <td>
                                ${item.description}
                                ${item.notes ? `<br><small style="color: var(--gray-500)">${item.notes}</small>` : ''}
                            </td>
                            <td>${item.quantity}</td>
                            <td>${Utils.formatCurrency(item.price)}</td>
                            <td><strong>${Utils.formatCurrency(item.total)}</strong></td>
                            <td>
                                <button class="btn btn-sm btn-outline" onclick="window.budgetCalc.removeItem('${item.id}')">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = table;
    }

    renderSummary() {
        const container = document.getElementById('budget-summary');

        const categoryTotals = this.getCategoryTotals();
        const grandTotal = this.items.reduce((sum, item) => sum + item.total, 0);

        const summary = `
            <div class="budget-summary-list">
                ${Object.entries(categoryTotals).map(([category, total]) => `
                    <div class="summary-item">
                        <span>${category}</span>
                        <strong>${Utils.formatCurrency(total)}</strong>
                    </div>
                `).join('')}
                <hr style="margin: 1rem 0; border-color: var(--ucf-gold);">
                <div class="summary-item" style="font-size: 1.25rem;">
                    <strong>Grand Total</strong>
                    <strong style="color: var(--ucf-gold);">${Utils.formatCurrency(grandTotal)}</strong>
                </div>
            </div>
        `;

        container.innerHTML = summary;
    }

    getCategoryTotals() {
        const totals = {};

        this.items.forEach(item => {
            if (!totals[item.category]) {
                totals[item.category] = 0;
            }
            totals[item.category] += item.total;
        });

        return totals;
    }

    renderChart() {
        const canvas = document.getElementById('budget-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const categoryTotals = this.getCategoryTotals();

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        // Create new chart
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        '#FFC904', '#000000', '#FFD700', '#333333',
                        '#FFDB58', '#555555', '#FFE87C', '#777777',
                        '#FFF4A3', '#999999'
                    ],
                    borderWidth: 2,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Montserrat',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = Utils.formatCurrency(context.raw);
                                return `${label}: ${value}`;
                            }
                        }
                    }
                }
            }
        });
    }

    exportToExcel() {
        if (this.items.length === 0) {
            Utils.showNotification('Add some budget items first!', 'warning');
            return;
        }

        try {
            // Prepare data for Excel
            const worksheetData = [
                ['UCF Event Budget Calculator'],
                ['Generated:', new Date().toLocaleString()],
                [],
                ['Category', 'Description', 'Quantity', 'Unit Price', 'Total', 'Notes']
            ];

            // Add items
            this.items.forEach(item => {
                worksheetData.push([
                    item.category,
                    item.description,
                    item.quantity,
                    item.price,
                    item.total,
                    item.notes || ''
                ]);
            });

            // Add summary
            worksheetData.push([]);
            worksheetData.push(['Category Summary']);
            const categoryTotals = this.getCategoryTotals();
            Object.entries(categoryTotals).forEach(([category, total]) => {
                worksheetData.push([category, '', '', '', total]);
            });

            worksheetData.push([]);
            const grandTotal = this.items.reduce((sum, item) => sum + item.total, 0);
            worksheetData.push(['GRAND TOTAL', '', '', '', grandTotal]);

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(worksheetData);

            // Set column widths
            ws['!cols'] = [
                { wch: 20 }, // Category
                { wch: 40 }, // Description
                { wch: 10 }, // Quantity
                { wch: 12 }, // Unit Price
                { wch: 12 }, // Total
                { wch: 30 }  // Notes
            ];

            XLSX.utils.book_append_sheet(wb, ws, 'Budget');

            // Generate filename
            const filename = `UCF-Event-Budget-${new Date().toISOString().split('T')[0]}.xlsx`;

            // Download
            XLSX.writeFile(wb, filename);

            Utils.showNotification('Budget exported to Excel successfully!', 'success');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            Utils.showNotification('Error exporting to Excel', 'error');
        }
    }

    clearBudget() {
        this.items = [];
        this.saveToStorage();
        this.updateDisplay();
        Utils.showNotification('Budget cleared', 'info');
    }

    saveToStorage() {
        Utils.saveToLocal(this.localStorageKey, this.items);
    }

    loadFromStorage() {
        const stored = Utils.loadFromLocal(this.localStorageKey);
        if (stored && Array.isArray(stored)) {
            this.items = stored;
        }
    }
}

// Add custom styles for budget calculator
const style = document.createElement('style');
style.textContent = `
    .budget-calculator {
        max-width: 1200px;
        margin: 0 auto;
    }

    .budget-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .budget-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .budget-form-container {
        margin-bottom: 2rem;
    }

    .budget-items-section {
        margin-bottom: 2rem;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--gray-200);
    }

    @media (max-width: 768px) {
        .budget-controls {
            flex-direction: column;
        }

        .budget-controls .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

// Make accessible globally
window.BudgetCalculator = BudgetCalculator;
window.budgetCalc = null; // Will be initialized when budgeting module loads
