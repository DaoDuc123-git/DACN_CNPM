import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api'; // Hãy kiểm tra lại đường dẫn từ thư mục pages ra file api.js cho đúng thực tế dự án của bạn

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 1. Chặn trình duyệt tự reload lại trang
    setError('');
    setLoading(true);

    try {
      // 2. Gọi API đăng nhập kết nối Backend (cổng 5000)
      const data = await loginUser({ username, password });
      
      // 3. Lưu token và thông tin người dùng vào LocalStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 4. Phân quyền và điều hướng dựa trên role trả về từ CSDL PostgreSQL
      const role = data.user.role;
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'SALES') navigate('/sales');
      else if (role === 'INVENTORY') navigate('/inventory');
      else if (role === 'SHIPPER') navigate('/shipper');
      else if (role === 'ACCOUNTANT') navigate('/accountant');
      else navigate('/customer');

    } catch (err) {
      // 5. Bắt lỗi trả về từ server (nếu sai mật khẩu hoặc lỗi kết nối)
      setError(err.response?.data?.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại!');
      console.error("Lỗi đăng nhập:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <form onSubmit={handleLogin}>
        <h2>Đăng Nhập Hệ Thống Bánh Ngọt</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tên đăng nhập:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Nhập username..."
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Nhập mật khẩu..."
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#ff6600', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  );
}