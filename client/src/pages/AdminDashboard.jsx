import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/Admin.css";
import user from "../images/icon.png";
import logo from "../images/logo.png";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import { FaBars, FaTimes, FaHome, FaPlus, FaTable,FaEdit, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${menuOpen ? "show" : ""}`}>
                <div className="sidebar-header">
                    <h2>
                        <img
                            src={logo}
                            style={{
                                width: '200px',
                                height: 'auto',
                                margin: '0 auto',
                                display: 'block'
                            }}
                        />
                    </h2>
                    <FaTimes className="close-menu" onClick={() => setMenuOpen(false)} />
                </div>
                <ul className="sidebar-menu">
                    <li><Link to="/dashboard" className="active"><FaHome /> Dashboard</Link></li>
                    <li><Link to="insert"><FaPlus /> Add Product</Link></li>
                    <li><Link to="displaycustomer"><FaTable /> Display Customers</Link></li>
                    <li><Link to="customerorders"><MdOutlineProductionQuantityLimits />Customer Orders</Link></li>
                    <li><Link to="updateproducts"><FaEdit /> Update Products</Link></li>
                    <li><Link to="updatecustomer"><FaEdit /> Update Customers</Link></li>
                    <li><Link to="/" className="logout"><FaSignOutAlt /> Logout</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className={`main-content ${menuOpen ? "full" : ""}`}>
                <header>
                    <FaBars className="menu-toggle" onClick={() => setMenuOpen(true)} />
                    <h3> Welcome To Admin Panel-ShopCart </h3>
                    <div className="user-info">
                        <img src={user} alt="User Icon" className="user-icon" />
                    </div>
                </header>
                <main>
                    

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
