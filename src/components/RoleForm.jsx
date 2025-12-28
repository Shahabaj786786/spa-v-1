import React, { useEffect, useState, useMemo } from "react";
import "./RoleForm.css";

const RoleForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const permissionGroups = [
    {
      title: "Others",
      items: [
        { key: "service_staff", label: "Service staff" },
        { key: "others.export", label: "View export to buttons (csv/excel/print/pdf) on tables" }
      ]
    },
    {
      title: "User",
      items: [
        { key: "user.view", label: "View user" },
        { key: "user.add", label: "Add user" },
        { key: "user.edit", label: "Edit user" },
        { key: "user.delete", label: "Delete user" }
      ]
    },
    {
      title: "Roles",
      items: [
        { key: "roles.view", label: "View role" },
        { key: "roles.add", label: "Add Role" },
        { key: "roles.edit", label: "Edit Role" },
        { key: "roles.delete", label: "Delete role" }
      ]
    },
    {
      title: "Supplier",
      items: [
        { key: "supplier.view_all", label: "View all supplier" },
        { key: "supplier.view_own", label: "View own supplier" },
        { key: "supplier.add", label: "Add supplier" },
        { key: "supplier.edit", label: "Edit supplier" },
        { key: "supplier.delete", label: "Delete supplier" }
      ]
    },
    {
      title: "Customer",
      items: [
        { key: "customer.view_all", label: "View all customer" },
        { key: "customer.view_own", label: "View own customer" },
        { key: "customer.no_sell_1m", label: "View customers with no sell from one month only" },
        { key: "customer.no_sell_3m", label: "View customers with no sell from three months only" },
        { key: "customer.no_sell_6m", label: "View customers with no sell from six months only" },
        { key: "customer.no_sell_1y", label: "View customers with no sell from one year only" },
        { key: "customer.view_irrespective", label: "View customers irrespective of their sell" },
        { key: "customer.add", label: "Add customer" },
        { key: "customer.edit", label: "Edit customer" },
        { key: "customer.delete", label: "Delete customer" }
      ]
    },
    {
      title: "Product",
      items: [
        { key: "product.view", label: "View product" },
        { key: "product.add", label: "Add product" },
        { key: "product.edit", label: "Edit product" },
        { key: "product.delete", label: "Delete product" },
        { key: "product.opening_stock", label: "Add Opening Stock" },
        { key: "product.purchase_price", label: "View Purchase Price" }
      ]
    },
    {
      title: "Purchase & Stock Adjustment",
      items: [
        { key: "purchase.view_all", label: "View all Purchase & Stock Adjustment" },
        { key: "purchase.view_own", label: "View own Purchase & Stock Adjustment" },
        { key: "purchase.add", label: "Add purchase & Stock Adjustment" },
        { key: "purchase.edit", label: "Edit purchase & Stock Adjustment" },
        { key: "purchase.delete", label: "Delete purchase & Stock Adjustment" },
        { key: "purchase.add_payment", label: "Add purchase payment" },
        { key: "purchase.edit_payment", label: "Edit purchase payment" },
        { key: "purchase.delete_payment", label: "Delete purchase payment" },
        { key: "purchase.update_status", label: "Update Status" }
      ]
    },
    {
      title: "Purchase Requisition",
      items: [
        { key: "pr.view_all", label: "View all purchase requisition" },
        { key: "pr.view_own", label: "View own purchase requisition" },
        { key: "pr.create", label: "Create purchase requisition" },
        { key: "pr.delete", label: "Delete purchase requisition" }
      ]
    },
    {
      title: "Purchase Order",
      items: [
        { key: "po.view_all", label: "View all purchase order" },
        { key: "po.view_own", label: "View own purchase order" },
        { key: "po.create", label: "Create purchase order" },
        { key: "po.edit", label: "Edit purchase order" },
        { key: "po.delete", label: "Delete purchase order" }
      ]
    },
    {
      title: "POS",
      items: [
        { key: "pos.view", label: "View POS sell" },
        { key: "pos.add", label: "Add POS sell" },
        { key: "pos.edit", label: "Edit POS sell" },
        { key: "pos.delete", label: "Delete POS sell" },
        { key: "pos.edit_price", label: "Edit product price from POS screen" },
        { key: "pos.edit_discount", label: "Edit product discount from POS screen" },
        { key: "pos.payment", label: "Add/Edit Payment" },
        { key: "pos.print", label: "Print Invoice" },
        { key: "pos.disable_multiple", label: "Disable Multiple Pay" },
        { key: "pos.disable_draft", label: "Disable Draft" },
        { key: "pos.disable_express", label: "Disable Express Checkout" },
        { key: "pos.disable_discount", label: "Disable Discount" },
        { key: "pos.disable_suspend", label: "Disable Suspend Sale" },
        { key: "pos.disable_credit", label: "Disable credit sale button" },
        { key: "pos.disable_quotation", label: "Disable Quotation" },
        { key: "pos.disable_card", label: "Disable Card" }
      ]
    },
    {
      title: "Sell",
      items: [
        { key: "sell.view_all", label: "View all sell" },
        { key: "sell.view_own", label: "View own sell only" },
        { key: "sell.paid", label: "View paid sells only" },
        { key: "sell.due", label: "View due sells only" },
        { key: "sell.partial", label: "View partially paid sells only" },
        { key: "sell.overdue", label: "View overdue sells only" },
        { key: "sell.add", label: "Add Sell" },
        { key: "sell.update", label: "Update Sell" },
        { key: "sell.delete", label: "Delete Sell" },
        { key: "sell.agent", label: "Commission agent can view their own sell" },
        { key: "sell.add_payment", label: "Add sell payment" },
        { key: "sell.edit_payment", label: "Edit sell payment" },
        { key: "sell.delete_payment", label: "Delete sell payment" },
        { key: "sell.edit_price", label: "Edit product price from sales screen" },
        { key: "sell.edit_discount", label: "Edit product discount from Sale screen" },
        { key: "sell.discount_manage", label: "Add/Edit/Delete Discount" },
        { key: "sell.types_of_service", label: "Access types of service" },
        { key: "sell.return_all", label: "Access all sell return" },
        { key: "sell.return_own", label: "Access own sell return" },
        { key: "sell.invoice_edit", label: "Add edit invoice number" }
      ]
    },
    {
      title: "Sales Order",
      items: [
        { key: "so.view_all", label: "View all sales order" },
        { key: "so.view_own", label: "View own sales order" },
        { key: "so.create", label: "Create sales order" },
        { key: "so.edit", label: "Edit sales order" },
        { key: "so.delete", label: "Delete sales order" }
      ]
    },
    {
      title: "Draft",
      items: [
        { key: "draft.view_all", label: "View all drafts" },
        { key: "draft.view_own", label: "View own drafts" },
        { key: "draft.edit", label: "Edit draft" },
        { key: "draft.delete", label: "Delete draft" }
      ]
    },
    {
      title: "Quotation",
      items: [
        { key: "quotation.view_all", label: "View all quotations" },
        { key: "quotation.view_own", label: "View own quotations" },
        { key: "quotation.edit", label: "Edit quotation" },
        { key: "quotation.delete", label: "Delete quotation" }
      ]
    },
    {
      title: "Shipments",
      items: [
        { key: "shipment.all", label: "Access all shipments" },
        { key: "shipment.own", label: "Access own shipments" },
        { key: "shipment.pending", label: "Access pending shipments only" },
        { key: "shipment.agent", label: "Commission agent can access their own shipments" }
      ]
    },
    {
      title: "Cash Register",
      items: [
        { key: "cash.view", label: "View cash register" },
        { key: "cash.close", label: "Close cash register" }
      ]
    },
    {
      title: "Brand",
      items: [
        { key: "brand.view", label: "View brand" },
        { key: "brand.add", label: "Add brand" },
        { key: "brand.edit", label: "Edit brand" },
        { key: "brand.delete", label: "Delete brand" }
      ]
    },
    {
      title: "Tax rate",
      items: [
        { key: "tax.view", label: "View tax rate" },
        { key: "tax.add", label: "Add tax rate" },
        { key: "tax.edit", label: "Edit tax rate" },
        { key: "tax.delete", label: "Delete tax rate" }
      ]
    },
    {
      title: "Unit",
      items: [
        { key: "unit.view", label: "View unit" },
        { key: "unit.add", label: "Add unit" },
        { key: "unit.edit", label: "Edit unit" },
        { key: "unit.delete", label: "Delete unit" }
      ]
    },
    {
      title: "Category",
      items: [
        { key: "category.view", label: "View category" },
        { key: "category.add", label: "Add category" },
        { key: "category.edit", label: "Edit category" },
        { key: "category.delete", label: "Delete category" }
      ]
    },
    {
      title: "Report",
      items: [
        { key: "report.purchase_sell", label: "View purchase & sell report" },
        { key: "report.tax", label: "View Tax report" },
        { key: "report.supplier_customer", label: "View Supplier & Customer report" },
        { key: "report.expense", label: "View expense report" },
        { key: "report.profit_loss", label: "View profit/loss report" },
        { key: "report.stock", label: "View stock report, stock adjustment report & stock expiry report" },
        { key: "report.trending", label: "View trending product report" },
        { key: "report.register", label: "View register report" },
        { key: "report.sales_rep", label: "View sales representative report" },
        { key: "report.product_stock_value", label: "View product stock value" }
      ]
    },
    {
      title: "Settings",
      items: [
        { key: "settings.business", label: "Access business settings" },
        { key: "settings.barcode", label: "Access barcode settings" },
        { key: "settings.invoice", label: "Access invoice settings" },
        { key: "settings.printers", label: "Access printers" }
      ]
    },
    {
      title: "Expense",
      items: [
        { key: "expense.access_all", label: "Access all expenses" },
        { key: "expense.view_own", label: "View own expense only" },
        { key: "expense.add", label: "Add Expense" },
        { key: "expense.edit", label: "Edit Expense" },
        { key: "expense.delete", label: "Delete Expense" }
      ]
    },
    {
      title: "Home",
      items: [{ key: "home.view", label: "View Home data" }]
    },
    {
      title: "Account",
      items: [
        { key: "account.access", label: "Access Accounts" },
        { key: "account.edit_txn", label: "Edit account transaction" },
        { key: "account.delete_txn", label: "Delete account transaction" }
      ]
    },
    {
      title: "Bookings",
      items: [
        { key: "booking.all", label: "Add/Edit/View all bookings" },
        { key: "booking.own", label: "Add/Edit/View own bookings" }
      ]
    },
    {
      title: "Access selling price groups",
      items: [{ key: "spg.default", label: "Default Selling Price" }]
    },
    {
      title: "Restaurant",
      items: [{ key: "restaurant.tables", label: "Access tables" }]
    },
    {
      title: "Accounting",
      items: [
        { key: "accounting.access", label: "Access Accounting Module" },
        { key: "accounting.manage_accounts", label: "Manage Accounts" },
        { key: "accounting.view_journal", label: "View Journal" },
        { key: "accounting.add_journal", label: "Add Journal" },
        { key: "accounting.edit_journal", label: "Edit Journal" },
        { key: "accounting.delete_journal", label: "Delete Journal" },
        { key: "accounting.map_transactions", label: "Map Transactions" },
        { key: "accounting.view_transfer", label: "View Transfer" },
        { key: "accounting.add_transfer", label: "Add Transfer" },
        { key: "accounting.edit_transfer", label: "Edit Transfer" },
        { key: "accounting.delete_transfer", label: "Delete Transfer" },
        { key: "accounting.manage_budget", label: "Manage Budget" },
        { key: "accounting.view_reports", label: "View Reports" }
      ]
    },
    {
      title: "AiAssistance",
      items: [
        { key: "aiassistance::lang.access_aiassistance_module", label: "aiassistance::lang.access_aiassistance_module" }
      ]
    },
    {
      title: "Crm",
      items: [
        { key: "crm.followup_all", label: "Access all follow up" },
        { key: "crm.followup_own", label: "Access own follow up" },
        { key: "crm.leads_all", label: "Access all leads" },
        { key: "crm.leads_own", label: "Access own leads" },
        { key: "crm.campaign_all", label: "Access all campaigns" },
        { key: "crm.campaign_own", label: "Access own campaigns" },
        { key: "crm.contact_login", label: "Access contact login" },
        { key: "crm.sources", label: "Access sources" },
        { key: "crm.life_stage", label: "Access life stage" },
        { key: "crm.proposal", label: "Access proposal" }
      ]
    },
    {
      title: "Essentials",
      items: [
        { key: "essentials.leave_type", label: "Add/Edit/View/Delete leave type" },
        { key: "essentials.leave_all", label: "Add/Edit/View/Delete all leave" },
        { key: "essentials.leave_own", label: "Add/View own leave" },
        { key: "essentials.approve_leave", label: "Approve Leave" },
        { key: "essentials.attendance_all", label: "Add/Edit/View/Delete all attendance" },
        { key: "essentials.attendance_own", label: "View own attendance" },
        { key: "essentials.attendance_web", label: "Allow users to enter their own attendance from web" },
        { key: "essentials.attendance_api", label: "Allow users to enter their own attendance from api" },
        { key: "essentials.view_pay_component", label: "View Pay Component" },
        { key: "essentials.add_pay_component", label: "Add Pay Component" },
        { key: "essentials.department", label: "Add/Edit/View/Delete department" },
        { key: "essentials.designation", label: "Add/Edit/View/Delete designation" },
        { key: "essentials.payroll_view_all", label: "View all Payroll" },
        { key: "essentials.payroll_add", label: "Add Payroll" },
        { key: "essentials.payroll_edit", label: "Edit Payroll" },
        { key: "essentials.payroll_delete", label: "Delete Payroll" },
        { key: "essentials.assign_todos", label: "Assign To Do's to others" },
        { key: "essentials.add_todos", label: "Add To Do's" },
        { key: "essentials.edit_todos", label: "Edit To Do's" },
        { key: "essentials.delete_todos", label: "Delete To Do's" },
        { key: "essentials.create_message", label: "Create Message" },
        { key: "essentials.view_message", label: "View Message" },
        { key: "essentials.sales_targets", label: "Access Sales Targets" }
      ]
    },
    {
      title: "Manufacturing",
      items: [
        { key: "manufacturing.view_recipe", label: "View Recipe" },
        { key: "manufacturing.add_recipe", label: "Add Recipe" },
        { key: "manufacturing.edit_recipe", label: "Edit Recipe" },
        { key: "manufacturing.access_production", label: "Access Production" }
      ]
    },
    {
      title: "Project",
      items: [
        { key: "project.create", label: "Create Project" },
        { key: "project.edit", label: "Edit Project" },
        { key: "project.delete", label: "Delete Project" }
      ]
    },
    {
      title: "Repair",
      items: [
        { key: "repair.add_invoice", label: "Add Invoice" },
        { key: "repair.edit_invoice", label: "Edit Invoice" },
        { key: "repair.view_all_invoice", label: "View all invoice" },
        { key: "repair.view_own_invoice", label: "View own invoice" },
        { key: "repair.delete_invoice", label: "Delete Invoice" },
        { key: "repair.change_invoice_status", label: "Change Invoice Status" },
        { key: "repair.manage_job_sheet_status", label: "Add/Edit/Delete Job Sheet Status" },
        { key: "repair.add_job_sheet", label: "Add job sheet" },
        { key: "repair.edit_job_sheet", label: "Edit Job Sheet" },
        { key: "repair.delete_job_sheet", label: "Delete Job Sheet" },
        { key: "repair.view_only_assigned_job_sheet", label: "View Only Assigned Job Sheet" },
        { key: "repair.view_all_job_sheets", label: "View All Job Sheets" }
      ]
    },
    {
      title: "Superadmin",
      items: [{ key: "superadmin.packages", label: "Access package subscriptions" }]
    },
    {
      title: "Woocommerce",
      items: [
        { key: "woo.sync_categories", label: "Sync Product Categories" },
        { key: "woo.sync_products", label: "Sync Products" },
        { key: "woo.sync_orders", label: "Sync Orders" },
        { key: "woo.map_tax_rates", label: "Map Tax Rates" },
        { key: "woo.access_api", label: "Access Woocommerce API settings" }
      ]
    }
  ];

  const filteredGroups = useMemo(() => {
    if (!searchTerm) return permissionGroups;
    return permissionGroups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
        group.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.items.length > 0);
  }, [searchTerm]);

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.name || "");
      const map = {};
      (initialData.permissions_list || []).forEach(p => (map[p] = true));
      setPermissions(map);
    }
  }, [initialData]);

  const toggleGroup = (items, value) => {
    const update = {};
    items.forEach((i) => (update[i.key] = value));
    setPermissions((prev) => ({ ...prev, ...update }));
  };

  const submit = () => {
    const selected = Object.keys(permissions).filter((k) => permissions[k]);
    onSubmit({ name: roleName, permissions_list: selected });
  };

  return (
    <div className="admin-form-wrapper">
      <header className="form-header-bar">
        <button className="btn-back" onClick={onCancel}>
          <span className="back-arrow">←</span> Back to Roles
        </button>
        <h2 className="form-title">{initialData ? `Edit Role: ${initialData.name}` : "Add New Role"}</h2>
      </header>

      <div className="form-content-container">
        <section className="form-card">
          <div className="card-header">
            <div className="header-content">
              <span className="accent-bar">|</span>
              <h3>Role Information</h3>
            </div>
            <p className="card-subtitle">Enter the basic information for this role</p>
          </div>
          <div className="card-body">
            <div className="input-grid">
              <div className="input-group">
                <label>Role Name *</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter role name"
                />
              </div>
              <div className="input-group search-permissions">
                <label>Search Permissions</label>
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Search permissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                  {searchTerm && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchTerm('')}
                      title="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="form-card permissions-card">
          <div className="card-header">
            <div className="header-content">
              <span className="accent-bar">|</span>
              <h3>Role Permissions</h3>
            </div>
            <p className="card-subtitle">Select the permissions to assign to this role</p>
          </div>
          <div className="card-body permissions-list">
            {filteredGroups.map((group) => (
              <div key={group.title} className="permission-row">
                <div 
                  className="permission-group-header"
                  onClick={() => setCollapsed(p => ({ ...p, [group.title]: !p[group.title] }))}
                >
                  <div className="permission-group-label">
                    <span className={`toggle-icon ${collapsed[group.title] ? "" : "rotated"}`}>▶</span>
                    <strong>{group.title}</strong>
                  </div>
                  <div className="permission-actions">
                    <label className="checkbox-container select-all" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={group.items.length > 0 && group.items.every((i) => !!permissions[i.key])}
                        onChange={(e) => toggleGroup(group.items, e.target.checked)}
                      />
                      <span>Select All</span>
                    </label>
                  </div>
                </div>

                {!collapsed[group.title] && (
                  <div className="permission-items-grid">
                    {group.items.map((item) => (
                      <label key={item.key} className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={!!permissions[item.key]}
                          onChange={() => setPermissions(p => ({ ...p, [item.key]: !p[item.key] }))}
                        />
                        <span className="item-label">{item.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="form-actions-bottom">
        <button
          className="btn btn-cancel"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="btn btn-save"
          onClick={submit}
          disabled={!roleName.trim()}
          type="button"
        >
          <span className="icon">💾</span>
          {initialData ? 'Update Role' : 'Save Role'}
        </button>
      </div>
    </div>
  );
};

export default RoleForm;