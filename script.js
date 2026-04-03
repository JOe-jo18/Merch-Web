// script.js - JavaScript for Merchandise Management System

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL

// Utility Functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Hamburger Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// API Helper Functions
async function apiGet(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('API GET error:', error);
        return null; // Fallback to localStorage or mock data if needed
    }
}

async function apiPost(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('API POST error:', error);
        return null;
    }
}

// Dashboard Functions
async function loadDashboardStats() {
    const stats = await apiGet('/dashboard');
    if (stats) {
        document.getElementById('total-products').textContent = stats.totalProducts || 0;
        document.getElementById('total-inventory').textContent = stats.totalInventory || 0;
        document.getElementById('today-sales').textContent = `$${stats.todaySales || 0}`;
        document.getElementById('active-vendors').textContent = stats.activeVendors || 0;
    }
}

function addSale() {
    // Redirect to sales page or show modal
    window.location.href = 'sales.html';
}

function addExpense() {
    window.location.href = 'expenses.html';
}

function viewReports() {
    window.location.href = 'reports.html';
}

// Collections Functions
async function loadCollections() {
    const collections = await apiGet('/collections');
    const list = document.getElementById('collections-list');
    if (collections) {
        list.innerHTML = collections.map(col => `
            <div class="item-card">
                <h3>${col.name}</h3>
                <p>${col.description}</p>
            </div>
        `).join('');
    }
}

function showAddCollectionModal() {
    showModal('addCollectionModal');
}

document.getElementById('addCollectionForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('collectionName').value;
    const description = document.getElementById('collectionDescription').value;
    const result = await apiPost('/collections', { name, description });
    if (result) {
        closeModal('addCollectionModal');
        loadCollections();
        e.target.reset();
    }
});

// Vendors Functions
async function loadVendors() {
    const vendors = await apiGet('/vendors');
    const list = document.getElementById('vendors-list');
    if (vendors) {
        list.innerHTML = vendors.map(vendor => `
            <div class="item-card">
                <h3>${vendor.name}</h3>
                <p>PIN: ****</p>
                <p>Collection: ${vendor.collection}</p>
            </div>
        `).join('');
    }
    // Populate vendor selects
    const selects = document.querySelectorAll('#expenseVendor, #saleVendor');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Select Vendor</option>' +
            vendors.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
    });
}

function showAddVendorModal() {
    showModal('addVendorModal');
}

document.getElementById('addVendorForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('vendorName').value;
    const pin = document.getElementById('vendorPin').value;
    const collection = document.getElementById('vendorCollection').value;
    const result = await apiPost('/vendors', { name, pin, collection });
    if (result) {
        closeModal('addVendorModal');
        loadVendors();
        e.target.reset();
    }
});

// Inventory Functions
async function loadInventory() {
    const inventory = await apiGet('/inventory');
    const list = document.getElementById('inventory-list');
    if (inventory) {
        list.innerHTML = inventory.map(item => `
            <div class="item-card">
                <h3>${item.collection} - ${item.type}</h3>
                <p>Design: ${item.design}</p>
                <p>Color: ${item.color}, Size: ${item.size}</p>
                <p>Cost: $${item.cost}, Selling: $${item.selling}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `).join('');
    }
    // Populate collection filter
    const collections = await apiGet('/collections');
    if (collections) {
        const filter = document.getElementById('collectionFilter');
        if (filter) {
            filter.innerHTML = '<option value="">All Collections</option>' +
                collections.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
        // Populate skuCollection
        const skuSelect = document.getElementById('skuCollection');
        if (skuSelect) {
            skuSelect.innerHTML = '<option value="">Select Collection</option>' +
                collections.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
        // Populate vendorCollection
        const vendorSelect = document.getElementById('vendorCollection');
        if (vendorSelect) {
            vendorSelect.innerHTML = '<option value="">Select Collection</option>' +
                collections.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
    }
}

function applyFilters() {
    // Implement filtering logic
    console.log('Filters applied');
}

function showAddSkuModal() {
    showModal('addSkuModal');
}

document.getElementById('addSkuForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        collection: document.getElementById('skuCollection').value,
        type: document.getElementById('skuType').value,
        design: document.getElementById('skuDesign').value,
        color: document.getElementById('skuColor').value,
        size: document.getElementById('skuSize').value,
        cost: parseFloat(document.getElementById('skuCost').value),
        selling: parseFloat(document.getElementById('skuSelling').value),
        quantity: parseInt(document.getElementById('skuQuantity').value),
    };
    const result = await apiPost('/inventory', data);
    if (result) {
        closeModal('addSkuModal');
        loadInventory();
        e.target.reset();
    }
});

// Expenses Functions
async function loadExpenses() {
    const expenses = await apiGet('/expenses');
    const list = document.getElementById('expenses-list');
    if (expenses) {
        list.innerHTML = expenses.map(exp => `
            <div class="item-card">
                <h3>${exp.description}</h3>
                <p>Amount: $${exp.amount}</p>
                <p>Date: ${exp.date}</p>
                <p>Category: ${exp.category}</p>
                <p>Vendor: ${exp.vendor}</p>
            </div>
        `).join('');
    }
}

function showAddExpenseModal() {
    showModal('addExpenseModal');
}

document.getElementById('addExpenseForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        description: document.getElementById('expenseDescription').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        date: document.getElementById('expenseDate').value,
        category: document.getElementById('expenseCategory').value,
        vendor: document.getElementById('expenseVendor').value,
    };
    const result = await apiPost('/expenses', data);
    if (result) {
        closeModal('addExpenseModal');
        loadExpenses();
        e.target.reset();
    }
});

// Sales Functions (assuming sales.html exists)
async function loadSales() {
    const sales = await apiGet('/sales');
    const list = document.getElementById('sales-list');
    if (sales) {
        list.innerHTML = sales.map(sale => `
            <div class="item-card">
                <h3>${sale.product}</h3>
                <p>Quantity: ${sale.quantity}</p>
                <p>Price: $${sale.price}</p>
                <p>Date: ${sale.date}</p>
                <p>Vendor: ${sale.vendor}</p>
            </div>
        `).join('');
    }
}

function showAddSaleModal() {
    showModal('addSaleModal');
}

document.getElementById('addSaleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        product: document.getElementById('saleProduct').value,
        quantity: parseInt(document.getElementById('saleQuantity').value),
        price: parseFloat(document.getElementById('salePrice').value),
        date: document.getElementById('saleDate').value,
        vendor: document.getElementById('saleVendor').value,
    };
    const result = await apiPost('/sales', data);
    if (result) {
        closeModal('addSaleModal');
        loadSales();
        e.target.reset();
    }
});

// Reports Functions
function generateReport() {
    const from = document.getElementById('reportDateFrom').value;
    const to = document.getElementById('reportDateTo').value;
    // Fetch report data
    console.log('Generating report from', from, 'to', to);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dashboard')) loadDashboardStats();
    if (document.getElementById('collections-list')) loadCollections();
    if (document.getElementById('vendors-list')) loadVendors();
    if (document.getElementById('inventory-list')) loadInventory();
    if (document.getElementById('expenses-list')) loadExpenses();
    if (document.getElementById('sales-list')) loadSales();
});