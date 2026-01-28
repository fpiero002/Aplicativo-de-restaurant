/*
 * Restaurant App Logic
 * Stores state in localStorage for persistence.
 */

const MENU_DATA = [
    // Entradas
    { id: 6, name: 'Tequeños con queso', price: 10.00, category: 'entradas' },
    { id: 7, name: 'Papa rellena de mariscos', price: 8.00, category: 'entradas' },
    { id: 101, name: 'Papa a la Huancaína', price: 14.00, category: 'entradas' },

    // Ceviches
    { id: 1, name: 'Ceviche clasico', price: 25.00, category: 'ceviches' },
    { id: 2, name: 'Ceviche Mixto', price: 30.00, category: 'ceviches' },
    { id: 102, name: 'Ceviche de Conchas Negras', price: 35.00, category: 'ceviches' },

    // Segundos (Marinos)
    { id: 3, name: 'Jalea de Mariscos', price: 35.00, category: 'segundos' },
    { id: 4, name: 'Arroz con Mariscos', price: 28.00, category: 'segundos' },
    { id: 5, name: 'Chicharrón de Pescado', price: 25.00, category: 'segundos' },
    { id: 103, name: 'Chilcano de Pescado', price: 22.00, category: 'segundos' },

    // Criollos
    { id: 201, name: 'Cabrito a la Norteña', price: 35.00, category: 'criollos' },
    { id: 202, name: 'Arroz con Pato', price: 38.00, category: 'criollos' },
    { id: 203, name: 'Lomo Saltado', price: 32.00, category: 'criollos' },
    { id: 204, name: 'Seco de Cordero', price: 36.00, category: 'criollos' },

    // Pastas
    { id: 301, name: 'Fettuccini a la Huancaína con Lomo', price: 38.00, category: 'pastas' },
    { id: 302, name: 'Tallarines Verdes con Bistec', price: 30.00, category: 'pastas' },
    { id: 303, name: 'Spaghetti con Mariscos', price: 32.00, category: 'pastas' },
    { id: 304, name: 'Fetuccini en Salsa de Langostinos', price: 35.00, category: 'pastas' },

    // Truchas
    { id: 401, name: 'Trucha Frita', price: 25.00, category: 'truchas' },
    { id: 402, name: 'Chicharrón de Trucha', price: 28.00, category: 'truchas' },
    { id: 403, name: 'Sudado de Trucha', price: 26.00, category: 'truchas' },
    { id: 404, name: 'Trucha al Ajo', price: 27.00, category: 'truchas' },

    // Duos y Trios
    { id: 501, name: 'Dúo Marino (Ceviche + Chicharrón)', price: 40.00, category: 'combinados' },
    { id: 502, name: 'Dúo Criollo (Arroz con Pato + Papa a la H.)', price: 42.00, category: 'combinados' },
    { id: 503, name: 'Trío Marino (Cev+Arr+Chich)', price: 50.00, category: 'combinados' },
    { id: 504, name: 'Trío de Causas', price: 30.00, category: 'combinados' },

    // Bebidas
    { id: 8, name: 'Inca Kola 1L', price: 10.00, category: 'bebidas' },
    { id: 9, name: 'Cerveza Pilsen', price: 12.00, category: 'bebidas' },
    { id: 10, name: 'Chicha Morada Jarra', price: 15.00, category: 'bebidas' },
    { id: 11, name: 'Pisco Sour', price: 18.00, category: 'bebidas' },
    { id: 12, name: 'Limonada', price: 8.00, category: 'bebidas' },
    { id: 13, name: 'Agua San Mateo', price: 4.00, category: 'bebidas' },

    // Cumpleaños (Gratis)
    { id: 600, name: '⛵ Barco Botañero (4 Piqueos)', price: 0.00, category: 'cumpleanos' },
    { id: 601, name: '🎁 Tequeños (Cortesía)', price: 0.00, category: 'cumpleanos' },
    { id: 602, name: '🎁 Chalaquitas (Cortesía)', price: 0.00, category: 'cumpleanos' },
    { id: 603, name: '🎁 Leche de Tigre (Shot)', price: 0.00, category: 'cumpleanos' },
    { id: 604, name: '🎁 Yuquitas Fritas', price: 0.00, category: 'cumpleanos' },
    { id: 605, name: '🥂 Brindis: Pisco Sour', price: 0.00, category: 'cumpleanos' },
    { id: 606, name: '🥂 Brindis: Chicha', price: 0.00, category: 'cumpleanos' }
];

const TABLE_COUNT = 58;
const DELIVERY_TABLE_COUNT = 15;

// --- MOCK DATABASE (SIMULATION) ---
const DB = {
    // Simulate Network Latency
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    getTables: async () => {
        await DB.delay(800); // 800ms loading time
        const saved = localStorage.getItem('restApp_state');
        if (saved) return JSON.parse(saved);

        // Default empty state
        const initial = {};
        // Salon Tables: 1 - 58
        for (let i = 1; i <= TABLE_COUNT; i++) {
            initial[i] = { status: 'free', orders: [], total: 0 };
        }
        // Delivery Tables: L1 - L15
        for (let i = 1; i <= DELIVERY_TABLE_COUNT; i++) {
            initial[`L${i}`] = { status: 'free', orders: [], total: 0 };
        }
        return initial;
    },

    saveTables: async (data) => {
        await DB.delay(600); // 600ms save time
        localStorage.setItem('restApp_state', JSON.stringify(data));
        return true;
    },

    getMenuAvailability: async () => {
        const saved = localStorage.getItem('restApp_menu_availability');
        return saved ? JSON.parse(saved) : {};
    },

    saveMenuAvailability: async (data) => {
        localStorage.setItem('restApp_menu_availability', JSON.stringify(data));
        return true;
    }
};

const app = {
    state: {
        currentUser: null,
        currentView: 'salon', // 'salon' or 'delivery'
        tables: {},
        menuAvailability: {}, // { itemId: true/false }
        currentTableId: null,
        tempOrder: []
    },

    showLoader: (msg) => {
        document.getElementById('loader-text').textContent = msg || 'Cargando...';
        document.getElementById('loader').classList.remove('hidden');
    },

    hideLoader: () => {
        document.getElementById('loader').classList.add('hidden');
    },

    showToast: (msg, type = 'info') => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';

        toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
        container.appendChild(toast);

        // Remove after animation (3s total: 0.3s in + 2.4s wait + 0.3s out)
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    init: async () => {
        // Check session
        const savedUser = localStorage.getItem('restApp_currentUser');
        const savedName = localStorage.getItem('restApp_currentUserName');

        if (savedUser) {
            app.state.currentUser = savedUser;
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('dashboard-screen').classList.remove('hidden');
            document.getElementById('current-user-role').textContent = `Rol: ${savedName || savedUser.toUpperCase()}`;

            // Apply Theme
            document.body.classList.remove('theme-mozo', 'theme-caja', 'theme-delivery');
            document.body.classList.add(`theme-${savedUser}`);

            // Load data
            await app.sync();
        }

        app.startClock();
    },

    startClock: () => {
        const update = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const el = document.getElementById('clock');
            if (el) el.textContent = timeString;
        };
        update();
        setInterval(update, 1000);
    },

    loadState: () => {
        const saved = localStorage.getItem('restApp_state');
        if (saved) {
            app.state.tables = JSON.parse(saved);
        }
    },

    saveState: () => {
        localStorage.setItem('restApp_state', JSON.stringify(app.state.tables));
        app.renderTables();
    },

    // --- AUTHENTICATION ---

    // Config: Valid Credentials
    CREDENTIALS: {
        'caja': {
            email: 'caja@restaurant.com',
            pass: '123456'
        },
        'delivery': {
            email: 'delivery@restaurant.com',
            pass: '123456'
        }
    },

    // Mock verification for "mozo" with dynamic ID support
    verifyMozo: (email, pass) => {
        // Allow mozo1, mozo2, ... mozo99
        // Regex: ^mozo[0-9]+@restaurant\.com$
        const emailRegex = /^mozo([0-9]+)@restaurant\.com$/i;
        const match = email.match(emailRegex);

        if (match && pass === '123456') {
            return { valid: true, id: `Mozo ${match[1]}` };
        }
        return { valid: false };
    },

    // UI: Show Modal
    showLogin: (role) => {
        app.state.tempLoginRole = role;

        // Update Title
        const titleMap = {
            'mozo': 'Mozo',
            'caja': 'Caja',
            'delivery': 'Delivery'
        };
        document.getElementById('login-role-title').textContent = `Ingresar como ${titleMap[role]}`;

        // Reset Form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-error').classList.add('hidden');

        // Show Modal
        document.getElementById('login-modal').classList.remove('hidden');
        document.getElementById('login-email').focus();
    },

    closeLoginModal: () => {
        document.getElementById('login-modal').classList.add('hidden');
        app.state.tempLoginRole = null;
    },

    attemptLogin: () => {
        const role = app.state.tempLoginRole;
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value.trim();
        const errorMsg = document.getElementById('login-error');

        let isValid = false;
        let displayName = role.toUpperCase();

        if (role === 'mozo') {
            const check = app.verifyMozo(email, pass);
            if (check.valid) {
                isValid = true;
                displayName = check.id.toUpperCase();
            }
        } else {
            const expected = app.CREDENTIALS[role];
            if (expected && email === expected.email && pass === expected.pass) {
                isValid = true;
            }
        }

        if (isValid) {
            app.login(role, displayName);
            app.closeLoginModal();
        } else {
            errorMsg.classList.remove('hidden');
            // Shake effect
            const form = document.querySelector('.login-form');
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 400);
        }
    },

    setView: (viewName) => {
        if (app.state.currentUser !== 'caja') return;
        app.state.currentView = viewName;
        app.renderTables();
    },

    login: async (role, displayName) => {
        app.showLoader('Autenticando...');
        await DB.delay(500); // Fake login delay

        app.state.currentUser = role;
        // Identify specifically which mozo (e.g. MOZO 1)
        const uiName = displayName || role.toUpperCase();

        localStorage.setItem('restApp_currentUser', role); // Persist session role
        localStorage.setItem('restApp_currentUserName', uiName); // Persist specific name

        // Set View based on Role
        if (role === 'delivery') {
            app.state.currentView = 'delivery';
        } else {
            app.state.currentView = 'salon';
        }

        // Show/Hide Control Buttons
        const controls = document.getElementById('caja-controls');
        if (controls) {
            if (role === 'caja') {
                controls.classList.remove('hidden');
                controls.style.display = 'flex'; // Ensure flex layout restoration
            } else {
                controls.classList.add('hidden');
                controls.style.display = 'none';
            }
        }
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');

        document.getElementById('current-user-role').textContent = `Rol: ${uiName}`;

        // Apply Theme
        document.body.classList.remove('theme-mozo', 'theme-caja', 'theme-delivery');
        document.body.classList.add(`theme-${role}`);

        await app.sync(); // Load tables after login
    },

    logout: () => {
        app.state.currentUser = null;
        localStorage.removeItem('restApp_currentUser');
        localStorage.removeItem('restApp_currentUserName');

        document.getElementById('dashboard-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('login-screen').classList.add('active');
    },

    renderTables: () => {
        const grid = document.getElementById('tables-container');
        grid.innerHTML = '';
        const titleEl = document.querySelector('.app-header h2');

        let tablesToShow = [];

        if (app.state.currentView === 'delivery') {
            titleEl.textContent = 'Pedidos Delivery';
            for (let i = 1; i <= DELIVERY_TABLE_COUNT; i++) {
                tablesToShow.push(`L${i}`);
            }
        } else {
            titleEl.textContent = 'Salón Principal';
            for (let i = 1; i <= TABLE_COUNT; i++) {
                tablesToShow.push(i);
            }
        }

        tablesToShow.forEach(id => {
            const table = app.state.tables[id] || { status: 'free' };
            const el = document.createElement('div');
            el.className = `table-card ${table.status}`;
            el.onclick = () => app.openTable(id);

            let statusText = '';
            let iconDisplay = '';

            if (table.status === 'free') {
                statusText = 'Libre';
                iconDisplay = ''; // No icon for free
            } else if (table.status === 'payment-pending') {
                statusText = 'Por Pagar';
                iconDisplay = '💸';
            } else {
                statusText = `S/ ${table.total.toFixed(2)}`;
                // Show Boat if takeout, else Plate
                iconDisplay = table.isTakeout ? '⛵' : '🍽️';
            }

            el.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 5px;">${iconDisplay}</div>
                <div class="table-number">${typeof id === 'string' && id.startsWith('L') ? id : 'Mesa ' + id}</div>
                <div class="table-status">${statusText}</div>
            `;
            grid.appendChild(el);
        });
    },

    toggleTakeout: () => {
        const btn = document.getElementById('btn-takeout');
        const isNowActive = !btn.classList.contains('btn-takeout-active');

        if (isNowActive) {
            btn.classList.add('btn-takeout-active');
        } else {
            btn.classList.remove('btn-takeout-active');
        }

        // Re-render items to show/hide "Para Llevar" label
        app.renderCurrentOrder();
    },

    openTable: (id) => {
        app.state.currentTableId = id;
        app.state.currentTableId = id;
        // Load existing orders and mark them as CONFIRMED
        const existing = app.state.tables[id].orders || [];
        app.state.tempOrder = existing.map(item => ({ ...item, confirmed: true }));

        document.getElementById('modal-table-title').textContent = `Mesa #${id}`;
        document.getElementById('order-modal').classList.remove('hidden');

        // Restore Takeout Button State
        const btnTakeout = document.getElementById('btn-takeout');
        if (app.state.tables[id].isTakeout) {
            btnTakeout.classList.add('btn-takeout-active');
        } else {
            btnTakeout.classList.remove('btn-takeout-active');
        }

        // Show Pay button only for Caja
        const summaryDiv = document.querySelector('.order-summary');
        const existingPayBtn = document.getElementById('pay-btn');
        if (existingPayBtn) existingPayBtn.remove(); // Clean up previous

        const isOccupied = app.state.tables[id].status === 'occupied';
        const isPending = app.state.tables[id].status === 'payment-pending';

        if (app.state.currentUser === 'caja' && (isOccupied || isPending)) {
            const btn = document.createElement('button');
            btn.id = 'pay-btn';
            btn.className = 'btn-primary full-width';
            btn.style.marginTop = '10px';
            btn.style.backgroundColor = '#22c55e'; // Green
            btn.textContent = 'Cobrar y Liberar Mesa';
            btn.onclick = app.payAndFreeTable;
            summaryDiv.appendChild(btn);
        }



        app.filterMenu('todos');
        app.renderCurrentOrder();

        // Start Timer Update
        app.updateModalTimer(id);
        if (app.state.modaltimerInterval) clearInterval(app.state.modaltimerInterval);
        app.state.modaltimerInterval = setInterval(() => app.updateModalTimer(id), 1000);
    },

    updateModalTimer: (tableId) => {
        const table = app.state.tables[tableId];
        const timerEl = document.getElementById('table-timer');

        if (table && table.startTime && table.status !== 'free') {
            const diff = Date.now() - table.startTime;
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            timerEl.textContent = `⏱️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timerEl.classList.remove('hidden');
            timerEl.classList.add('active');
        } else {
            timerEl.classList.add('hidden');
            timerEl.classList.remove('active');
        }
    },

    openMoveModal: () => {
        const grid = document.getElementById('move-target-grid');
        grid.innerHTML = '';

        // Show only free tables
        // Sort keys: 1, 2, ... L1, L2...
        const keys = Object.keys(app.state.tables).sort((a, b) => {
            const isANum = !isNaN(a);
            const isBNum = !isNaN(b);
            if (isANum && isBNum) return a - b;
            if (!isANum && !isBNum) return a.localeCompare(b);
            return isANum ? -1 : 1;
        });

        keys.forEach(id => {
            const table = app.state.tables[id];
            if (table.status === 'free') {
                const el = document.createElement('div');
                el.className = 'table-card free';
                el.style.height = '100px';
                el.innerHTML = `<div class="table-number">${id}</div><div>Libre</div>`;
                el.onclick = () => app.performMoveTable(id);
                grid.appendChild(el);
            }
        });
        document.getElementById('move-modal').classList.remove('hidden');
    },

    closeMoveModal: () => {
        document.getElementById('move-modal').classList.add('hidden');
    },

    performMoveTable: async (targetId) => {
        if (!confirm(`¿Mover Mesa ${app.state.currentTableId} a Mesa ${targetId}?`)) return;

        const sourceId = app.state.currentTableId;
        const sourceData = app.state.tables[sourceId];

        app.showLoader('Moviendo Mesa...');

        // Copy data
        app.state.tables[targetId] = JSON.parse(JSON.stringify(sourceData));
        app.state.tables[targetId].status = sourceData.status; // Ensure status copy

        // Clear source
        app.state.tables[sourceId] = { status: 'free', orders: [], total: 0 };

        await DB.saveTables(app.state.tables);

        app.closeMoveModal();
        app.closeModal(); // Close order modal of source
        app.renderTables();
        app.hideLoader();

        // Open the new table
        setTimeout(() => app.openTable(targetId), 200);
        app.showToast(`Mesa movida a ${targetId}`, 'success');
    },

    closeModal: () => {
        if (app.state.modaltimerInterval) {
            clearInterval(app.state.modaltimerInterval);
            app.state.modaltimerInterval = null;
        }
        document.getElementById('order-modal').classList.add('hidden');
        app.state.currentTableId = null;
        app.state.tempOrder = [];
    },

    filterMenu: (category) => {
        // Update tabs
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));

        // Find the button to activate
        const buttons = Array.from(document.querySelectorAll('.cat-btn'));
        const targetBtn = buttons.find(b => b.textContent.toLowerCase() === category) || buttons[0];
        if (targetBtn) targetBtn.classList.add('active');

        const items = category === 'todos'
            ? MENU_DATA
            : MENU_DATA.filter(i => i.category === category);

        app.renderMenuGrid(items);
    },

    searchMenu: (query) => {
        const term = query.toLowerCase();
        // Unselect categories visually
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));

        const items = MENU_DATA.filter(i => i.name.toLowerCase().includes(term));
        app.renderMenuGrid(items);
    },

    renderMenuGrid: (items) => {
        app.state.lastRenderedItems = items; // Save for re-render
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';
        items.forEach(item => {
            // Availability Logic: true, false, or number (stock)
            const availability = app.state.menuAvailability[item.id];
            const isAvailable = availability !== false && (typeof availability !== 'number' || availability > 0);
            const stockCount = typeof availability === 'number' ? availability : null;

            const el = document.createElement('div');
            el.className = `menu-item-card ${!isAvailable ? 'sold-out' : ''}`;
            el.onclick = (e) => app.addToOrder(item, e.currentTarget);

            let stockBadge = '';
            if (stockCount !== null) {
                stockBadge = `<span class="stock-badge ${stockCount < 5 ? 'low' : ''}">🥡 ${stockCount}</span>`;
            }

            el.innerHTML = `
                <div class="availability-toggle" onclick="app.toggleAvailability(${item.id}, event)" title="Gestionar Disponibilidad">
                    <div class="toggle-track ${isAvailable ? 'on' : 'off'}">
                        <div class="toggle-thumb"></div>
                    </div>
                </div>
                <h3>${item.name}</h3>
                ${item.price === 0
                    ? '<span class="item-price price-free">✨ ¡GRATIS! ✨</span>'
                    : `<span class="item-price">S/ ${item.price.toFixed(2)}</span>`
                }
                ${stockBadge}
                ${!isAvailable ? '<span class="sold-out-badge">AGOTADO</span>' : ''}
            `;
            grid.appendChild(el);
        });
    },

    addToOrder: (item, cardElement) => {
        const availability = app.state.menuAvailability[item.id];

        // Check Sold Out
        if (availability === false) {
            app.showToast('Este plato está agotado', 'error');
            return;
        }

        // Check Stock Limit
        if (typeof availability === 'number') {
            const inCart = app.state.tempOrder.filter(i => i.id === item.id).length;
            if (inCart >= availability) {
                app.showToast(`Solo quedan ${availability} unidades`, 'error');
                return;
            }
        }

        // New items are NOT confirmed
        app.state.tempOrder.push({ ...item, uniqueId: Date.now(), comment: '', quantity: 1, confirmed: false });
        app.renderCurrentOrder();

        // Micro-interaction
        if (cardElement) {
            cardElement.classList.remove('pulse-active');
            void cardElement.offsetWidth; // trigger reflow
            cardElement.classList.add('pulse-active');
        }
    },

    updateItemComment: (uniqueId, text) => {
        const item = app.state.tempOrder.find(i => i.uniqueId === uniqueId);
        if (item) {
            item.comment = text;
        }
    },

    changeQuantity: (uniqueId, delta) => {
        const item = app.state.tempOrder.find(i => i.uniqueId === uniqueId);
        if (item) {
            const newQty = (item.quantity || 1) + delta;
            if (newQty > 0) {
                item.quantity = newQty;
                app.renderCurrentOrder();
            }
        }
    },

    removeFromOrder: (uniqueId) => {
        const item = app.state.tempOrder.find(i => i.uniqueId === uniqueId);
        if (!item) return;

        // If item is already confirmed (sent to kitchen), require auth
        if (item.confirmed) {
            // If user is Caja, they can likely void without PIN (or we can still ask for consistency)
            // Let's ask for PIN unless we want to streamline for Caja. 
            // User requested "Contraseña de Caja", so we should probably always verify or auto-verify if role==caja.
            if (app.state.currentUser === 'caja') {
                // Auto-void for Caja
                if (!confirm("¿Confirmar anulación de item enviado?")) return;
                app.executeVoid(uniqueId);
            } else {
                // Mozo needs PIN
                app.state.itemToVoid = uniqueId;
                document.getElementById('void-modal').classList.remove('hidden');
                document.getElementById('void-pin').value = '';
                document.getElementById('void-pin').focus();
            }
        } else {
            // Unconfirmed (draft) item - delete immediately
            app.executeVoid(uniqueId);
        }
    },

    closeVoidModal: () => {
        document.getElementById('void-modal').classList.add('hidden');
        app.state.itemToVoid = null;
    },

    confirmVoid: () => {
        const pin = document.getElementById('void-pin').value;
        // Verify PIN (Hardcoded CAJA PIN)
        if (pin === '123456') {
            app.executeVoid(app.state.itemToVoid);
            app.closeVoidModal();
            app.showToast('Ítem anulado correctamente', 'success');
        } else {
            app.showToast('PIN Incorrecto', 'error');
            // Shake input
            const input = document.getElementById('void-pin');
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 400);
        }
    },

    executeVoid: (uniqueId) => {
        app.state.tempOrder = app.state.tempOrder.filter(i => i.uniqueId !== uniqueId);
        app.renderCurrentOrder();
    },

    renderCurrentOrder: () => {
        const container = document.getElementById('order-list');
        container.innerHTML = '';

        let total = 0;

        // Check if Takeout is active
        const btnTakeout = document.getElementById('btn-takeout');
        const isTakeout = btnTakeout && btnTakeout.classList.contains('btn-takeout-active');

        app.state.tempOrder.forEach(item => {
            const qty = item.quantity || 1;
            total += item.price * qty;
            const el = document.createElement('div');
            el.className = 'order-item';

            let nameDisplay = item.name;
            if (isTakeout) {
                nameDisplay += ` <span style="font-size: 1.5rem; vertical-align: middle;">⛵</span>`;
            }

            el.innerHTML = `
                <div class="order-item-header">
                    <span style="flex:1;">
                        ${nameDisplay}
                        ${item.confirmed ? '<span title="Enviado a Cocina" style="font-size:0.8rem; margin-left:5px;">✅</span>' : ''}
                    </span>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <div class="qty-controls" style="${item.confirmed ? 'opacity:0.6; pointer-events:none;' : ''}">
                            <button onclick="app.changeQuantity(${item.uniqueId}, -1)">−</button>
                            <span>${qty}</span>
                            <button onclick="app.changeQuantity(${item.uniqueId}, 1)">+</button>
                        </div>
                        <span style="min-width:60px; text-align:right;">S/ ${(item.price * qty).toFixed(2)}</span>
                        <button onclick="app.removeFromOrder(${item.uniqueId})" 
                            class="btn-delete-item ${item.confirmed ? 'confirmed' : ''}"
                            title="${item.confirmed ? 'Requiere autorización' : 'Eliminar'}"
                        >
                            ${item.confirmed ? '🗑️' : '✖'}
                        </button>
                    </div>
                </div>
                <input type="text" 
                    placeholder="Nota (ej. sin hielo, picante...)" 
                    class="order-note-input"
                    value="${item.comment || ''}"
                    onkeyup="app.updateItemComment(${item.uniqueId}, this.value)"
                >
            `;
            container.appendChild(el);
        });

        document.getElementById('total-amount').textContent = `S/ ${total.toFixed(2)}`;
    },

    sendOrder: async () => {
        if (app.state.tempOrder.length === 0) {
            app.showToast("El pedido está vacío", 'error');
            return;
        }

        const tableId = app.state.currentTableId;
        const total = app.state.tempOrder.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        // Check Takeout Status
        const isTakeout = document.getElementById('btn-takeout').classList.contains('btn-takeout-active');

        // Update local state first
        app.state.tables[tableId].orders = [...app.state.tempOrder];
        app.state.tables[tableId].status = 'occupied';
        app.state.tables[tableId].total = total;
        app.state.tables[tableId].isTakeout = isTakeout;

        // Reduce Stock for NEW items (unconfirmed)
        let stockChanged = false;
        app.state.tempOrder.forEach(item => {
            if (!item.confirmed && typeof app.state.menuAvailability[item.id] === 'number') {
                app.state.menuAvailability[item.id]--;
                if (app.state.menuAvailability[item.id] < 0) app.state.menuAvailability[item.id] = 0;
                stockChanged = true;
            }
            // Mark as confirmed now
            item.confirmed = true;
        });

        // Start Timer if not already started
        if (!app.state.tables[tableId].startTime) {
            app.state.tables[tableId].startTime = Date.now();
        }

        // DB Call
        app.closeModal();
        app.showLoader('Enviando pedido a cocina...');

        await DB.saveTables(app.state.tables);
        if (stockChanged) await DB.saveMenuAvailability(app.state.menuAvailability);

        app.hideLoader();
        app.renderTables();
        app.showToast(`Pedido enviado para Mesa ${tableId}!`, 'success');
    },

    printBill: async () => {
        const tableId = app.state.currentTableId;
        const orders = app.state.tables[tableId].orders || app.state.tempOrder;

        if (orders.length === 0) return;

        let text = `=== PRE-CUENTA MESA ${tableId} ===\n`;
        orders.forEach(item => {
            const qty = item.quantity || 1;
            const lineTotal = item.price * qty;
            text += `(${qty}) ${item.name.padEnd(16)} S/ ${lineTotal.toFixed(2)}\n`;
            if (item.comment) {
                text += `   NOTE: ${item.comment}\n`;
            }
        });
        text += `\nTOTAL: S/ ${app.state.tables[tableId].total?.toFixed(2) || '0.00'}\n\n`;
        text += `(Estado cambiado a: POR PAGAR)`;

        // alert(text); // replaced by print bill logic or toast
        console.log(text); // Keep in console for debugging
        app.showToast(`Pre-cuenta generada para Mesa ${tableId}`, 'info');

        // Change status to Payment Pending (Blue)
        app.showLoader('Solicitando Cuenta...');
        app.state.tables[tableId].status = 'payment-pending';
        // Keep orders until paid

        await DB.saveTables(app.state.tables);

        app.hideLoader();
        app.renderTables();
        app.closeModal();
    },

    payAndFreeTable: async () => {
        const tableId = app.state.currentTableId;
        // DIRECT ACTION - Removed confirmation dialog

        app.showLoader('Procesando Pago...');

        // Explicitly reset the table object
        app.state.tables[tableId] = {
            status: 'free',
            orders: [],
            total: 0
        };

        // Wait for DB save to complete
        await DB.saveTables(app.state.tables);

        // Force re-render of the grid
        app.renderTables();

        app.hideLoader();
        app.closeModal();
        app.showToast(`Pago realizado. Mesa ${tableId} liberada.`, 'success');
    },

    cancelOrder: () => {
        app.closeModal();
    },

    sync: async () => {
        app.showLoader('Sincronizando con Servidor...');
        const data = await DB.getTables();
        app.state.tables = data;
        app.state.menuAvailability = await DB.getMenuAvailability();
        app.renderTables();
        app.hideLoader();
    },

    toggleAvailability: async (itemId, event) => {
        event.stopPropagation();

        const current = app.state.menuAvailability[itemId];

        if (app.state.currentUser === 'caja') {
            // Advanced Mode for Caja: Set Stock
            const options = "Escriba cantidad de stock (ej. 10)\nDeje vacío para 'Infinito'\nEscriba 0 para 'Agotado'";
            let input = prompt(options, typeof current === 'number' ? current : '');

            if (input === null) return; // Cancel

            let newValue;
            input = input.trim();

            if (input === '') {
                newValue = true; // Infinite
            } else if (input === '0') {
                newValue = false; // Sold Out
            } else {
                const num = parseInt(input);
                if (isNaN(num)) {
                    alert("Número inválido");
                    return;
                }
                newValue = num;
            }

            app.state.menuAvailability[itemId] = newValue;

        } else {
            // Simple Mode for Mozo: Toggle Item Availability (prevent usage to set stock)
            // If currently numeric stock, toggle to FALSE (Sold Out).
            // If False, toggle to TRUE (Infinite - or maybe prompt error?). 
            // Ideally Mozo shouldn't mess with stock, only declare "Sold Out".

            if (current === false) {
                app.state.menuAvailability[itemId] = true; // Make available (infinite)
            } else {
                app.state.menuAvailability[itemId] = false; // Make unavailable
            }
        }

        // Update UI
        app.renderMenuGrid(app.state.lastRenderedItems || MENU_DATA);
        await DB.saveMenuAvailability(app.state.menuAvailability);
    }
};

// Initialize
window.addEventListener('load', app.init);