import React from 'react';
import ReactDOM from 'react-dom/client';

/* ================= CONFIGURATION ================= */
const API_BASE = import.meta.env.VITE_API_BASE;

/* ================= UTILITY FUNCTIONS ================= */
const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const generateIdempotencyKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

/* ================= SVG ICONS ================= */
const Icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="4" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="11" width="7" height="10" rx="1" />
        </svg>
    ),
    orders: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    payments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    ),
    webhooks: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    fraud: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    ),
    // stat icons
    box: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    creditCard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    ),
    checkCircle: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    xCircle: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    ),
    bell: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    flag: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
    ),
    logo: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    // Payment method icons
    upi: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    card: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
            <line x1="6" y1="15" x2="10" y2="15" />
        </svg>
    ),
    qrCode: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" />
            <line x1="21" y1="14" x2="21" y2="14.01" />
            <line x1="21" y1="21" x2="21" y2="21.01" />
            <line x1="17" y1="18" x2="17" y2="18.01" />
        </svg>
    ),
    bank: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M3 10h18" />
            <path d="M12 3l9 7H3l9-7z" />
            <line x1="5" y1="10" x2="5" y2="21" />
            <line x1="9" y1="10" x2="9" y2="21" />
            <line x1="15" y1="10" x2="15" y2="21" />
            <line x1="19" y1="10" x2="19" y2="21" />
        </svg>
    ),
    lock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    ),
    arrowLeft: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
};

/* ================= NAVIGATION CONFIG ================= */
const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard },
    { id: 'orders', label: 'Orders', icon: Icons.orders },
    { id: 'payments', label: 'Payments', icon: Icons.payments },
    { id: 'webhooks', label: 'Webhooks', icon: Icons.webhooks },
    { id: 'fraud', label: 'Fraud Logs', icon: Icons.fraud },
    { id: 'settings', label: 'Settings', icon: Icons.settings },
];

/* ================= TOAST COMPONENT ================= */
function Toast({ message, show, isError }) {
    return (
        <div className={`toast ${show ? 'show' : ''}`}>
            <span className={`toast-icon ${isError ? 'error' : ''}`}>{isError ? '✕' : '✓'}</span>
            {message}
        </div>
    );
}

/* ================= SIDEBAR COMPONENT ================= */
function Sidebar({ activePage, onNavigate }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo" onClick={() => onNavigate('dashboard')}>
                <div className="sidebar-logo-icon">{Icons.logo}</div>
                <span className="sidebar-logo-text">PayNova</span>
            </div>
            <nav className="sidebar-nav">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                        id={`nav-${item.id}`}
                    >
                        <span className="sidebar-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="sidebar-footer">
                PayNova v1.0 · © 2026
            </div>
        </aside>
    );
}

/* ================= STAT CARD COMPONENT ================= */
function StatCard({ label, value, icon, color, sub }) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-card-top">
                <span className="stat-card-label">{label}</span>
                <div className={`stat-card-icon ${color}`}>{icon}</div>
            </div>
            <div className="stat-card-value">{value}</div>
            {sub && <div className="stat-card-sub">{sub}</div>}
        </div>
    );
}

/* ================= STATUS BADGE COMPONENT ================= */
function StatusBadge({ status }) {
    const map = {
        'SUCCESS': 'badge-success',
        'PAID': 'badge-success',
        'CREATED': 'badge-info',
        'PROCESSING': 'badge-warning',
        'FAILED': 'badge-danger',
        'FLAGGED': 'badge-warning',
        'BLOCKED': 'badge-danger',
        'TRUE': 'badge-success',
        'FALSE': 'badge-danger',
        'true': 'badge-success',
        'false': 'badge-danger',
    };
    const cls = map[status] || 'badge-muted';
    return (
        <span className={`badge ${cls}`}>
            <span className="badge-dot" />
            {status}
        </span>
    );
}

/* ================= DASHBOARD PAGE ================= */
function DashboardPage({ stats, loading }) {
    const barChartRef = React.useRef(null);
    const pieChartRef = React.useRef(null);
    const barInstanceRef = React.useRef(null);
    const pieInstanceRef = React.useRef(null);

    React.useEffect(() => {
        if (typeof Chart === 'undefined') return;

        if (barChartRef.current) {
            if (barInstanceRef.current) barInstanceRef.current.destroy();
            const ctx = barChartRef.current.getContext('2d');
            barInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Payments',
                        data: [12, 19, 8, 15, 22, 10, 14],
                        backgroundColor: 'rgba(45, 212, 168, 0.5)',
                        borderColor: 'rgba(45, 212, 168, 0.8)',
                        borderWidth: 1,
                        borderRadius: 4,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#5b6478' } },
                        y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#5b6478' } }
                    }
                }
            });
        }

        if (pieChartRef.current) {
            if (pieInstanceRef.current) pieInstanceRef.current.destroy();
            const ctx2 = pieChartRef.current.getContext('2d');
            pieInstanceRef.current = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['Success', 'Failed', 'Processing'],
                    datasets: [{
                        data: [stats.totalPayments || 65, stats.failedPayments || 12, 8],
                        backgroundColor: ['#22c55e', '#ef4444', '#eab308'],
                        borderWidth: 0,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#8b95a9', padding: 14, font: { size: 12 } }
                        }
                    }
                }
            });
        }

        return () => {
            if (barInstanceRef.current) barInstanceRef.current.destroy();
            if (pieInstanceRef.current) pieInstanceRef.current.destroy();
        };
    }, [stats]);

    return (
        <>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Overview of your payment gateway activity</p>
            </div>

            <div className="stats-grid">
                <StatCard label="Total Orders" value={loading ? '...' : stats.totalOrders ?? 0} icon={Icons.box} color="purple" sub="All time" />
                <StatCard label="Total Payments" value={loading ? '...' : stats.totalPayments ?? 0} icon={Icons.creditCard} color="cyan" sub="Processed" />
                <StatCard label="Success Rate" value={loading ? '...' : `${stats.successRate ?? 0}%`} icon={Icons.checkCircle} color="green" sub="Of all payments" />
            </div>
            <div className="stats-grid">
                <StatCard label="Failed Payments" value={loading ? '...' : stats.failedPayments ?? 0} icon={Icons.xCircle} color="red" sub="Needs attention" />
                <StatCard label="Webhooks Sent" value={loading ? '...' : stats.webhooksSent ?? 0} icon={Icons.bell} color="yellow" sub="Delivery attempts" />
                <StatCard label="Fraud Flags" value={loading ? '...' : stats.fraudFlags ?? 0} icon={Icons.flag} color="pink" sub="Flagged transactions" />
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <div className="chart-card-title">Payments Per Day</div>
                    <div className="chart-container">
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-card-title">Payment Status</div>
                    <div className="chart-container">
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ================= PAYMENT MODAL ================= */
const PAYMENT_METHODS = [
    { id: 'upi', label: 'UPI', icon: Icons.upi },
    { id: 'card', label: 'Card', icon: Icons.card },
    { id: 'qr', label: 'QR Code', icon: Icons.qrCode },
    { id: 'netbanking', label: 'Net Banking', icon: Icons.bank },
];

const UPI_APPS = [
    { id: 'gpay', name: 'Google Pay', color: '#4285F4' },
    { id: 'phonepe', name: 'PhonePe', color: '#5F259F' },
    { id: 'paytm', name: 'Paytm', color: '#00BAF2' },
    { id: 'bhim', name: 'BHIM', color: '#E87C22' },
    { id: 'amazonpay', name: 'Amazon Pay', color: '#FF9900' },
    { id: 'cred', name: 'CRED', color: '#1A1A2E' },
];

const BANKS = [
    { id: 'sbi', name: 'State Bank of India', code: 'SBI', color: '#22407F' },
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC', color: '#004C8F' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICICI', color: '#F37A20' },
    { id: 'axis', name: 'Axis Bank', code: 'AXIS', color: '#97144D' },
    { id: 'kotak', name: 'Kotak Bank', code: 'KOTAK', color: '#ED1C24' },
    { id: 'bob', name: 'Bank of Baroda', code: 'BOB', color: '#E35205' },
    { id: 'pnb', name: 'Punjab National Bank', code: 'PNB', color: '#003399' },
    { id: 'union', name: 'Union Bank', code: 'UBI', color: '#003087' },
];

function detectCardType(num) {
    const n = num.replace(/\s/g, '');
    if (/^4/.test(n)) return 'VISA';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'MC';
    if (/^3[47]/.test(n)) return 'AMEX';
    if (/^6(?:011|5)/.test(n)) return 'DISC';
    if (/^35/.test(n)) return 'JCB';
    return null;
}

function formatCardNumber(val) {
    const v = val.replace(/\D/g, '').slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function PaymentModal({ order, onClose, onSuccess, showToast }) {
    const [method, setMethod] = React.useState('upi');
    const [processing, setProcessing] = React.useState(false);
    const [result, setResult] = React.useState(null); // { success: bool, paymentId, message }

    // UPI state
    const [upiId, setUpiId] = React.useState('');
    const [selectedApp, setSelectedApp] = React.useState(null);

    // Card state
    const [cardNumber, setCardNumber] = React.useState('');
    const [cardExpiry, setCardExpiry] = React.useState('');
    const [cardCvv, setCardCvv] = React.useState('');
    const [cardName, setCardName] = React.useState('');

    // Net Banking state
    const [selectedBank, setSelectedBank] = React.useState(null);

    // QR timer
    const [qrTimer, setQrTimer] = React.useState(300);
    React.useEffect(() => {
        if (method !== 'qr') return;
        setQrTimer(300);
        const interval = setInterval(() => {
            setQrTimer(prev => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [method]);

    const orderId = order.id || order.orderId;
    const amount = order.amount;
    const currency = order.currency || 'INR';

    const handlePay = async () => {
        // Validate
        if (method === 'upi' && !upiId && !selectedApp) {
            showToast('Please enter UPI ID or select an app', true); return;
        }
        if (method === 'card') {
            if (cardNumber.replace(/\s/g, '').length < 15) { showToast('Please enter a valid card number', true); return; }
            if (cardExpiry.length < 5) { showToast('Please enter card expiry', true); return; }
            if (cardCvv.length < 3) { showToast('Please enter CVV', true); return; }
            if (!cardName.trim()) { showToast('Please enter cardholder name', true); return; }
        }
        if (method === 'netbanking' && !selectedBank) {
            showToast('Please select a bank', true); return;
        }
        if (method === 'qr' && qrTimer === 0) {
            showToast('QR code expired. Please refresh.', true); return;
        }

        setProcessing(true);
        try {
            const idempotencyKey = generateIdempotencyKey();
            const res = await fetch(`${API_BASE}/process-payment/${orderId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'idempotencyKey': idempotencyKey },
                body: JSON.stringify({
                    paymentMethod: method.toUpperCase(),
                    upiId: method === 'upi' ? (upiId || `user@${selectedApp}`) : undefined,
                    cardLastFour: method === 'card' ? cardNumber.replace(/\s/g, '').slice(-4) : undefined,
                    bankCode: method === 'netbanking' ? selectedBank : undefined,
                })
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            setResult({
                success: true,
                paymentId: data.id || data.paymentId || `pay_${Date.now()}`,
                message: 'Payment processed successfully!'
            });
        } catch (e) {
            setResult({
                success: false,
                paymentId: null,
                message: e.message || 'Payment failed'
            });
        }
        setProcessing(false);
    };

    const handleDone = () => {
        if (result?.success) onSuccess();
        onClose();
    };

    const cardType = detectCardType(cardNumber);
    const formatTimer = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    // Generate a simple QR-like pattern
    const qrPattern = React.useMemo(() => {
        const cells = [];
        for (let i = 0; i < 225; i++) {
            cells.push(Math.random() > 0.45);
        }
        return cells;
    }, [orderId]);

    // Result screen
    if (result) {
        return (
            <div className="modal-overlay" onClick={handleDone}>
                <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
                    <div className="result-modal-content">
                        <div className={`result-modal-icon ${result.success ? 'success' : 'error'}`}>
                            {result.success ? '✓' : '✕'}
                        </div>
                        <h2>{result.success ? 'Payment Successful!' : 'Payment Failed'}</h2>
                        <p>{result.message}</p>
                        {result.paymentId && (
                            <div className="result-id">{result.paymentId}</div>
                        )}
                        <div className="payment-result-details">
                            <div className="payment-result-row">
                                <span>Amount</span>
                                <span className="payment-result-value">₹{formatPrice(amount)}</span>
                            </div>
                            <div className="payment-result-row">
                                <span>Method</span>
                                <span className="payment-result-value">{method.toUpperCase()}</span>
                            </div>
                            <div className="payment-result-row">
                                <span>Order</span>
                                <span className="payment-result-value">{orderId}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={handleDone} style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Processing overlay
    if (processing) {
        return (
            <div className="modal-overlay">
                <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
                    <div className="payment-processing">
                        <div className="payment-processing-spinner">
                            <div className="payment-processing-ring" />
                            <div className="payment-processing-icon">{Icons.lock}</div>
                        </div>
                        <h3>Processing Payment</h3>
                        <p>Please wait while we securely process your ₹{formatPrice(amount)} payment...</p>
                        <div className="payment-processing-steps">
                            <div className="payment-step active"><span className="payment-step-dot" /> Verifying details</div>
                            <div className="payment-step"><span className="payment-step-dot" /> Connecting to bank</div>
                            <div className="payment-step"><span className="payment-step-dot" /> Processing payment</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="payment-modal-header">
                    <div className="payment-modal-header-left">
                        <button className="payment-back-btn" onClick={onClose}>{Icons.arrowLeft}</button>
                        <div>
                            <div className="payment-modal-title">Complete Payment</div>
                            <div className="payment-modal-subtitle">Order #{orderId}</div>
                        </div>
                    </div>
                    <div className="payment-amount-badge">
                        <span className="payment-amount-currency">{currency}</span>
                        <span className="payment-amount-value">₹{formatPrice(amount)}</span>
                    </div>
                </div>

                {/* Method tabs */}
                <div className="payment-method-tabs">
                    {PAYMENT_METHODS.map(m => (
                        <button
                            key={m.id}
                            className={`payment-method-tab ${method === m.id ? 'active' : ''}`}
                            onClick={() => setMethod(m.id)}
                            id={`pay-method-${m.id}`}
                        >
                            <span className="payment-method-tab-icon">{m.icon}</span>
                            <span>{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* UPI */}
                {method === 'upi' && (
                    <div className="payment-form-section" key="upi">
                        <div className="payment-section-label">Enter UPI ID</div>
                        <div className="upi-input-row">
                            <input
                                className="form-input upi-input"
                                type="text"
                                placeholder="yourname@upi"
                                value={upiId}
                                onChange={e => { setUpiId(e.target.value); setSelectedApp(null); }}
                                id="upi-id-input"
                            />
                            <button className="btn btn-primary" onClick={handlePay} disabled={!upiId && !selectedApp}>Verify & Pay</button>
                        </div>
                        <div className="payment-divider"><span>or pay using</span></div>
                        <div className="upi-apps-grid">
                            {UPI_APPS.map(app => (
                                <button
                                    key={app.id}
                                    className={`upi-app-btn ${selectedApp === app.id ? 'selected' : ''}`}
                                    onClick={() => { setSelectedApp(app.id); setUpiId(''); }}
                                    id={`upi-app-${app.id}`}
                                >
                                    <div className="upi-app-icon" style={{ background: app.color }}>
                                        {app.name.charAt(0)}
                                    </div>
                                    <span className="upi-app-name">{app.name}</span>
                                </button>
                            ))}
                        </div>
                        {selectedApp && (
                            <button className="btn btn-primary" onClick={handlePay} style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                                Pay ₹{formatPrice(amount)} with {UPI_APPS.find(a => a.id === selectedApp)?.name}
                            </button>
                        )}
                    </div>
                )}

                {/* Card */}
                {method === 'card' && (
                    <div className="payment-form-section" key="card">
                        <div className="card-preview">
                            <div className="card-preview-chip" />
                            <div className="card-preview-number">{cardNumber || '•••• •••• •••• ••••'}</div>
                            <div className="card-preview-bottom">
                                <div>
                                    <div className="card-preview-label">CARD HOLDER</div>
                                    <div className="card-preview-name">{cardName || 'YOUR NAME'}</div>
                                </div>
                                <div>
                                    <div className="card-preview-label">EXPIRES</div>
                                    <div className="card-preview-name">{cardExpiry || 'MM/YY'}</div>
                                </div>
                                {cardType && <div className="card-preview-type">{cardType}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Card Number</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={cardNumber}
                                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                maxLength={19}
                                id="card-number-input"
                            />
                        </div>
                        <div className="card-row">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Expiry</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="MM/YY"
                                    value={cardExpiry}
                                    onChange={e => {
                                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                                        setCardExpiry(v);
                                    }}
                                    maxLength={5}
                                    id="card-expiry-input"
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">CVV</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="•••"
                                    value={cardCvv}
                                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    maxLength={4}
                                    id="card-cvv-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Cardholder Name</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Name on card"
                                value={cardName}
                                onChange={e => setCardName(e.target.value.toUpperCase())}
                                id="card-name-input"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handlePay} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                            {Icons.lock} Pay ₹{formatPrice(amount)}
                        </button>
                    </div>
                )}

                {/* QR Code */}
                {method === 'qr' && (
                    <div className="payment-form-section" key="qr">
                        <div className="qr-display">
                            <div className="qr-scan-ring" />
                            <div className="qr-code-grid">
                                {qrPattern.map((filled, i) => (
                                    <div key={i} className={`qr-cell ${filled ? 'filled' : ''}`} />
                                ))}
                            </div>
                        </div>
                        <div className="qr-info">
                            <div className="qr-amount">₹{formatPrice(amount)}</div>
                            <p className="qr-instruction">Scan with any UPI app to pay</p>
                            <div className={`qr-timer ${qrTimer < 60 ? 'warning' : ''}`}>
                                <span className="qr-timer-icon">⏱</span>
                                Expires in {formatTimer(qrTimer)}
                            </div>
                        </div>
                        {qrTimer === 0 && (
                            <button className="btn btn-outline" onClick={() => setQrTimer(300)} style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                                Refresh QR Code
                            </button>
                        )}
                        <div className="qr-footer">
                            <div className="qr-footer-step"><span>1</span> Open any UPI app</div>
                            <div className="qr-footer-step"><span>2</span> Scan the QR code</div>
                            <div className="qr-footer-step"><span>3</span> Confirm payment</div>
                        </div>
                    </div>
                )}

                {/* Net Banking */}
                {method === 'netbanking' && (
                    <div className="payment-form-section" key="netbanking">
                        <div className="payment-section-label">Select Your Bank</div>
                        <div className="bank-grid">
                            {BANKS.map(bank => (
                                <button
                                    key={bank.id}
                                    className={`bank-btn ${selectedBank === bank.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedBank(bank.id)}
                                    id={`bank-${bank.id}`}
                                >
                                    <div className="bank-icon" style={{ background: bank.color }}>
                                        {bank.code.charAt(0)}
                                    </div>
                                    <div className="bank-name">{bank.code}</div>
                                </button>
                            ))}
                        </div>
                        {selectedBank && (
                            <div className="selected-bank-info">
                                <span>Selected: <strong>{BANKS.find(b => b.id === selectedBank)?.name}</strong></span>
                            </div>
                        )}
                        <button
                            className="btn btn-primary"
                            onClick={handlePay}
                            disabled={!selectedBank}
                            style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                        >
                            Pay ₹{formatPrice(amount)} via Net Banking
                        </button>
                    </div>
                )}

                {/* Security footer */}
                <div className="payment-security-footer">
                    <span className="payment-security-icon">{Icons.lock}</span>
                    <span>Secured by PayNova • 256-bit encryption</span>
                </div>
            </div>
        </div>
    );
}

/* ================= ORDERS PAGE ================= */
function OrdersPage({ showToast }) {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [formData, setFormData] = React.useState({ amount: '', currency: 'INR', merchantId: '' });
    const [submitting, setSubmitting] = React.useState(false);
    const [payOrder, setPayOrder] = React.useState(null); // order to pay

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/orders`);
            if (res.ok) {
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            console.error('Failed to fetch orders:', e);
        }
        setLoading(false);
    };

    React.useEffect(() => { fetchOrders(); }, []);

    const handleCreate = async () => {
        if (!formData.amount) { showToast('Please enter an amount', true); return; }
        setSubmitting(true);
        const idempotencyKey = generateIdempotencyKey();
        try {
            const res = await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'idempotencyKey': idempotencyKey },
                body: JSON.stringify({
                    amount: Number(formData.amount),
                    currency: formData.currency,
                    merchantId: formData.merchantId || undefined,
                })
            });
            if (!res.ok) throw new Error(await res.text());
            showToast('Order created successfully!');
            setShowModal(false);
            setFormData({ amount: '', currency: 'INR', merchantId: '' });
            fetchOrders();
        } catch (e) {
            showToast(`Failed: ${e.message}`, true);
        }
        setSubmitting(false);
    };

    return (
        <>
            <div className="page-header">
                <h1>Orders</h1>
                <p>Manage and track all created orders</p>
            </div>

            <div className="table-card">
                <div className="table-card-header">
                    <span className="table-card-title">All Orders ({orders.length})</span>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)} id="create-order-btn">
                        <span className="btn-icon">+</span> Create Order
                    </button>
                </div>
                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '16px' }}>
                            {[1, 2, 3].map(i => <div key={i} className="skeleton skeleton-row" />)}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">{Icons.box}</div>
                            <p>No orders yet</p>
                            <small>Create your first order to get started</small>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, i) => (
                                    <tr key={o.id || i}>
                                        <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{o.id || o.orderId || `ord_${i}`}</td>
                                        <td>₹{formatPrice(o.amount)}</td>
                                        <td>{o.currency || 'INR'}</td>
                                        <td><StatusBadge status={o.status || 'CREATED'} /></td>
                                        <td>{formatDate(o.createdAt)}</td>
                                        <td>
                                            {(o.status === 'CREATED' || !o.status) ? (
                                                <button className="table-action-btn pay" onClick={() => setPayOrder(o)}>Pay</button>
                                            ) : (
                                                <button className="table-action-btn">View</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Create Order Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Create New Order</span>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Amount (₹)</label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="e.g. 5000"
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                id="order-amount-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Currency</label>
                            <select
                                className="form-select"
                                value={formData.currency}
                                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                id="order-currency-select"
                            >
                                <option value="INR">INR — Indian Rupee</option>
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Merchant ID (optional)</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="e.g. merchant_001"
                                value={formData.merchantId}
                                onChange={e => setFormData({ ...formData, merchantId: e.target.value })}
                                id="order-merchant-input"
                            />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleCreate} disabled={submitting} id="submit-order-btn">
                                {submitting ? <><div className="spinner" /> Creating...</> : 'Create Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {payOrder && (
                <PaymentModal
                    order={payOrder}
                    onClose={() => setPayOrder(null)}
                    onSuccess={() => { fetchOrders(); showToast('Payment processed successfully!'); }}
                    showToast={showToast}
                />
            )}
        </>
    );
}

/* ================= PAYMENTS PAGE ================= */
function PaymentsPage() {
    const [payments, setPayments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('ALL');

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/payments`);
                if (res.ok) {
                    const data = await res.json();
                    setPayments(Array.isArray(data) ? data : []);
                }
            } catch (e) { console.error('Failed to fetch payments:', e); }
            setLoading(false);
        })();
    }, []);

    const filtered = filter === 'ALL' ? payments : payments.filter(p => p.status === filter);

    return (
        <>
            <div className="page-header">
                <h1>Payments</h1>
                <p>View all payment transactions</p>
            </div>

            <div className="filter-tabs">
                {['ALL', 'SUCCESS', 'FAILED', 'PROCESSING'].map(f => (
                    <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'ALL' ? `All (${payments.length})` : f}
                    </button>
                ))}
            </div>

            <div className="table-card">
                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '16px' }}>
                            {[1, 2, 3].map(i => <div key={i} className="skeleton skeleton-row" />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">{Icons.creditCard}</div>
                            <p>No payments found</p>
                            <small>{filter !== 'ALL' ? `No ${filter} payments` : 'Process an order to see payments here'}</small>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Order ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Method</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p, i) => (
                                    <tr key={p.id || i}>
                                        <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{p.id || p.paymentId || `pay_${i}`}</td>
                                        <td>{p.order?.id || p.orderId || '—'}</td>
                                        <td>₹{formatPrice(p.order?.amount ?? p.amount)}</td>
                                        <td><StatusBadge status={p.status || 'PROCESSING'} /></td>
                                        <td>{p.method || p.paymentMethod || '—'}</td>
                                        <td>{formatDate(p.localDateTime || p.createdAt || p.timestamp)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

/* ================= WEBHOOKS PAGE ================= */
function WebhooksPage() {
    const [webhooks, setWebhooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/webhook/all`);
                if (res.ok) {
                    const data = await res.json();
                    setWebhooks(Array.isArray(data) ? data : []);
                }
            } catch (e) { console.error('Failed to fetch webhooks:', e); }
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Webhook Logs</h1>
                <p>Track webhook delivery attempts and retries</p>
            </div>

            <div className="table-card">
                <div className="table-card-header">
                    <span className="table-card-title">Delivery Log ({webhooks.length})</span>
                </div>
                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '16px' }}>
                            {[1, 2, 3].map(i => <div key={i} className="skeleton skeleton-row" />)}
                        </div>
                    ) : webhooks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">{Icons.bell}</div>
                            <p>No webhook logs</p>
                            <small>Webhook events will appear here after payments</small>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Payment ID</th>
                                    <th>URL</th>
                                    <th>Delivered</th>
                                    <th>Retry Count</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {webhooks.map((w, i) => (
                                    <tr key={w.id || i}>
                                        <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{w.event || w.eventType || '—'}</td>
                                        <td>{w.paymentId || '—'}</td>
                                        <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.url || w.webhookUrl || '—'}</td>
                                        <td><StatusBadge status={String(w.delivered ?? w.isDelivered ?? '—')} /></td>
                                        <td>{w.retryCount ?? w.retry ?? 0}</td>
                                        <td>{formatDate(w.createdAt || w.timestamp)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

/* ================= FRAUD DETECTION PAGE ================= */
function FraudPage() {
    const [fraudEvents, setFraudEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/frauds`);
                if (res.ok) {
                    const data = await res.json();
                    setFraudEvents(Array.isArray(data) ? data : []);
                }
            } catch (e) { console.error('Failed to fetch fraud events:', e); }
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Fraud Detection</h1>
                <p>Monitor flagged and blocked transactions</p>
            </div>

            <div className="table-card">
                <div className="table-card-header">
                    <span className="table-card-title">Fraud Events ({fraudEvents.length})</span>
                </div>
                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '16px' }}>
                            {[1, 2, 3].map(i => <div key={i} className="skeleton skeleton-row" />)}
                        </div>
                    ) : fraudEvents.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">{Icons.fraud}</div>
                            <p>No fraud events</p>
                            <small>Suspicious transactions will appear here</small>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Amount</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fraudEvents.map((f, i) => (
                                    <tr key={f.id || i}>
                                        <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{f.paymentId || `pay_${i}`}</td>
                                        <td>₹{formatPrice(f.amount)}</td>
                                        <td>{f.reason || '—'}</td>
                                        <td><StatusBadge status={f.status || 'FLAGGED'} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

/* ================= SETTINGS PAGE ================= */
function SettingsPage() {
    return (
        <>
            <div className="page-header">
                <h1>Settings</h1>
                <p>Merchant configuration and API credentials</p>
            </div>

            <div className="settings-grid">
                <div className="settings-card">
                    <div className="settings-card-title">Merchant Info</div>
                    <div className="setting-row">
                        <span className="setting-label">Merchant Name</span>
                        <span className="setting-value">PayNova Demo Merchant</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Merchant ID</span>
                        <span className="setting-value mono">merchant_001</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Status</span>
                        <StatusBadge status="SUCCESS" />
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-title">API Credentials</div>
                    <div className="setting-row">
                        <span className="setting-label">API Key</span>
                        <span className="setting-value mono">sk_test_123456789abcdef</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">API Secret</span>
                        <span className="setting-value mono">••••••••••••••••</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Environment</span>
                        <span className="setting-value">Test / Sandbox</span>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-title">Webhook Configuration</div>
                    <div className="setting-row">
                        <span className="setting-label">Webhook URL</span>
                        <span className="setting-value mono">https://example.com/webhook</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Events</span>
                        <span className="setting-value">payment.success, payment.failed</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Retry Policy</span>
                        <span className="setting-value">3 retries, exponential backoff</span>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-title">Backend Connection</div>
                    <div className="setting-row">
                        <span className="setting-label">API Base URL</span>
                        <span className="setting-value mono">{API_BASE}</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Technology</span>
                        <span className="setting-value">Spring Boot (Java)</span>
                    </div>
                    <div className="setting-row">
                        <span className="setting-label">Database</span>
                        <span className="setting-value">PostgreSQL / H2</span>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ================= MAIN APP COMPONENT ================= */
function App() {
    const [activePage, setActivePage] = React.useState('dashboard');
    const [stats, setStats] = React.useState({});
    const [statsLoading, setStatsLoading] = React.useState(true);
    const [toast, setToast] = React.useState({ show: false, message: '', isError: false });

    /* --- Fetch dashboard stats --- */
    React.useEffect(() => {
        (async () => {
            setStatsLoading(true);
            try {
                const res = await fetch(`${API_BASE}/payments/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (e) {
                console.error('Failed to fetch stats:', e);
                setStats({ totalOrders: 0, totalPayments: 0, successRate: 0, failedPayments: 0, webhooksSent: 0, fraudFlags: 0 });
            }
            setStatsLoading(false);
        })();
    }, [activePage]);

    /* --- Keep-alive: ping backend every 5 min to prevent Render sleep --- */
    React.useEffect(() => {
        const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes
        const ping = async () => {
            try {
                const res = await fetch(`${API_BASE}/orders`, { method: 'GET' });
                console.log(`[Keep-Alive] Pinged backend — ${res.status} ${res.statusText}`);
            } catch (e) {
                console.warn('[Keep-Alive] Backend ping failed:', e.message);
            }
        };
        // Ping immediately on mount, then every 5 minutes
        ping();
        const id = setInterval(ping, PING_INTERVAL);
        return () => clearInterval(id);
    }, []);

    /* --- Toast helper --- */
    const showToast = (message, isError = false) => {
        setToast({ show: true, message, isError });
        setTimeout(() => setToast({ show: false, message: '', isError: false }), 3000);
    };

    /* --- Get page title for header --- */
    const getPageTitle = () => {
        const item = NAV_ITEMS.find(n => n.id === activePage);
        return item ? item.label : 'Dashboard';
    };

    /* --- Route to correct page --- */
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <DashboardPage stats={stats} loading={statsLoading} />;
            case 'orders': return <OrdersPage showToast={showToast} />;
            case 'payments': return <PaymentsPage />;
            case 'webhooks': return <WebhooksPage />;
            case 'fraud': return <FraudPage />;
            case 'settings': return <SettingsPage />;
            default: return <DashboardPage stats={stats} loading={statsLoading} />;
        }
    };

    return (
        <>
            <Sidebar activePage={activePage} onNavigate={setActivePage} />
            <main className="main-content">
                <header className="top-header">
                    <span className="top-header-title">{getPageTitle()}</span>
                    <div className="top-header-right">
                        <div className="header-badge">
                            <span className="header-dot" />
                            Backend Connected
                        </div>
                    </div>
                </header>
                <div className="page-content">
                    {renderPage()}
                </div>
            </main>
            <Toast message={toast.message} show={toast.show} isError={toast.isError} />
        </>
    );
}

/* ================= RENDER ================= */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
