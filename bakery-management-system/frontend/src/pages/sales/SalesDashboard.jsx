import React, { useState } from 'react';
import './Sales.css';

const MOCK_ORDERS = [
  {
    order_id: 101,
    customer_name: 'Trần Thị B',
    phone: '0988776655',
    address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    cake_name: 'Bánh Kem Dâu Tây Tươi (Size 20cm)',
    note_text: 'Chúc mừng sinh nhật Mẹ - 20/11',
    delivery_time: '18:00 - 09/11/2026',
    total_amount: 350000,
    status: 'PENDING',
  },
  {
    order_id: 102,
    customer_name: 'Lê Văn C',
    phone: '0912334455',
    address: '12 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    cake_name: 'Bánh Mousse Socola Bỉ',
    note_text: 'Happy Birthday Suboi 3 tuổi',
    delivery_time: '19:30 - 09/11/2026',
    total_amount: 420000,
    status: 'APPROVED',
  },
];

const MOCK_SHIPPERS = [
  { shipper_id: 1, name: 'Nguyễn Văn Shipper 1', phone: '0901112223', active_orders: 1 },
  { shipper_id: 2, name: 'Phạm Văn Shipper 2', phone: '0904445556', active_orders: 0 },
];

const SalesDashboard = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredOrders = orders.filter((o) => o.status === activeTab);

  const handleOpenAssignModal = (order) => {
    setSelectedOrder(order);
    setShowAssignModal(true);
  };

  const handleAssignShipper = (shipper) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === selectedOrder.order_id
          ? { ...o, status: 'APPROVED', shipper_name: shipper.name }
          : o
      )
    );
    setShowAssignModal(false);
    alert(`Đã duyệt đơn #${selectedOrder.order_id} và giao cho Shipper: ${shipper.name}`);
  };

  const handleCancelOrder = (orderId) => {
    const reason = prompt('Nhập lý do hủy đơn hàng:');
    if (!reason) return;

    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, status: 'CANCELLED' } : o))
    );
    alert(`Đã hủy đơn hàng #${orderId}. Lý do: ${reason}`);
  };

  return (
    <div className="sales-container">
      {/* Sidebar */}
      <aside className="sales-sidebar">
        <div className="brand">🎂 Bakery Sales</div>
        <ul className="sidebar-menu">
          <li className="active">📋 Quản lý đơn hàng</li>
          <li>📞 Chăm sóc khách hàng</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="sales-main">
        <div className="sales-header">
          <h2>Bảng Điều Khiển Bán Hàng & Phân Đơn</h2>
        </div>

        {/* Tabs Filter */}
        <div className="order-tabs">
          <button
            className={`tab-btn ${activeTab === 'PENDING' ? 'active' : ''}`}
            onClick={() => setActiveTab('PENDING')}
          >
            Chờ duyệt ({orders.filter((o) => o.status === 'PENDING').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'APPROVED' ? 'active' : ''}`}
            onClick={() => setActiveTab('APPROVED')}
          >
            Đã duyệt ({orders.filter((o) => o.status === 'APPROVED').length})
          </button>
        </div>

        {/* Table */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng & SĐT</th>
              <th>Mẫu bánh & Ghi chú chữ</th>
              <th>Hẹn giờ nhận</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8' }}>
                  Không có đơn hàng nào trong trạng thái này.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.order_id}>
                  <td><strong>#{o.order_id}</strong></td>
                  <td>
                    <div><strong>{o.customer_name}</strong></div>
                    <div style={{ color: '#0284c7', cursor: 'pointer' }}>📞 {o.phone}</div>
                  </td>
                  <td>
                    <div>{o.cake_name}</div>
                    <div className="note-box">📝 Chữ: "{o.note_text}"</div>
                  </td>
                  <td>⏱️ {o.delivery_time}</td>
                  <td><strong>{o.total_amount.toLocaleString('vi-VN')} đ</strong></td>
                  <td>
                    {o.status === 'PENDING' && (
                      <>
                        <button
                          className="btn-approve"
                          onClick={() => handleOpenAssignModal(o)}
                        >
                          Duyệt & Gán Shipper
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelOrder(o.order_id)}
                        >
                          Hủy
                        </button>
                      </>
                    )}
                    {o.status === 'APPROVED' && (
                      <span style={{ color: '#16a34a', fontWeight: '600' }}>
                        ✓ Đã phân shipper
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      {/* Modal Chọn Shipper */}
      {showAssignModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Phân Công Shipper Giao Đơn #{selectedOrder.order_id}</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Địa chỉ: {selectedOrder.address}
            </p>

            <div style={{ marginTop: '15px' }}>
              {MOCK_SHIPPERS.map((s) => (
                <div
                  key={s.shipper_id}
                  className="shipper-option"
                  onClick={() => handleAssignShipper(s)}
                >
                  <div>
                    <strong>{s.name}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>SĐT: {s.phone}</div>
                  </div>
                  <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px' }}>
                    Đang giao {s.active_orders} đơn
                  </span>
                </div>
              ))}
            </div>

            <button
              style={{ width: '100%', padding: '10px', marginTop: '10px', border: 'none', background: '#e2e8f0', borderRadius: '6px', cursor: 'pointer' }}
              onClick={() => setShowAssignModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;