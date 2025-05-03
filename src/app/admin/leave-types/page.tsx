'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';

export default function LeaveTypesPage() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newLeaveType, setNewLeaveType] = useState({
    name: '',
    description: '',
    defaultBalance: 0,
    accrualRate: 'monthly', // monthly, quarterly, yearly
    accrualAmount: 0,
    carryoverLimit: 0,
    carryoverExpiry: 90, // days
    color: '#3b82f6',
  });

  useEffect(() => {
    // Load leave types from localStorage
    const storedLeaveTypes = JSON.parse(localStorage.getItem('leaveTypes') || '[]');
    
    // If no leave types exist, create some defaults
    if (storedLeaveTypes.length === 0) {
      const defaultLeaveTypes = [
        {
          id: 1,
          name: 'Annual Leave',
          description: 'Regular vacation time',
          defaultBalance: 20,
          accrualRate: 'yearly',
          accrualAmount: 20,
          carryoverLimit: 5,
          carryoverExpiry: 90,
          color: '#3b82f6',
        },
        {
          id: 2,
          name: 'Sick Leave',
          description: 'Time off due to illness',
          defaultBalance: 10,
          accrualRate: 'yearly',
          accrualAmount: 10,
          carryoverLimit: 0,
          carryoverExpiry: 0,
          color: '#ef4444',
        },
        {
          id: 3,
          name: 'Personal Leave',
          description: 'Time off for personal matters',
          defaultBalance: 3,
          accrualRate: 'yearly',
          accrualAmount: 3,
          carryoverLimit: 0,
          carryoverExpiry: 0,
          color: '#8b5cf6',
        },
        {
          id: 4,
          name: 'Comp Off',
          description: 'Compensatory time off',
          defaultBalance: 0,
          accrualRate: 'none',
          accrualAmount: 0,
          carryoverLimit: 0,
          carryoverExpiry: 30,
          color: '#10b981',
        },
      ];
      
      localStorage.setItem('leaveTypes', JSON.stringify(defaultLeaveTypes));
      setLeaveTypes(defaultLeaveTypes);
    } else {
      setLeaveTypes(storedLeaveTypes);
    }
  }, []);

  const handleAddNew = () => {
    const newId = leaveTypes.length > 0 
      ? Math.max(...leaveTypes.map(type => type.id)) + 1 
      : 1;
      
    const leaveTypeToAdd = {
      ...newLeaveType,
      id: newId
    };
    
    const updatedLeaveTypes = [...leaveTypes, leaveTypeToAdd];
    setLeaveTypes(updatedLeaveTypes);
    localStorage.setItem('leaveTypes', JSON.stringify(updatedLeaveTypes));
    
    // Reset form
    setNewLeaveType({
      name: '',
      description: '',
      defaultBalance: 0,
      accrualRate: 'monthly',
      accrualAmount: 0,
      carryoverLimit: 0,
      carryoverExpiry: 90,
      color: '#3b82f6',
    });
    setIsAddingNew(false);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id) => {
    const updatedLeaveTypes = leaveTypes.map(type => {
      if (type.id === id) {
        return { ...type };
      }
      return type;
    });
    
    setLeaveTypes(updatedLeaveTypes);
    localStorage.setItem('leaveTypes', JSON.stringify(updatedLeaveTypes));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave type? This may affect existing leave balances.')) {
      const updatedLeaveTypes = leaveTypes.filter(type => type.id !== id);
      setLeaveTypes(updatedLeaveTypes);
      localStorage.setItem('leaveTypes', JSON.stringify(updatedLeaveTypes));
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedLeaveTypes = leaveTypes.map(type => {
      if (type.id === id) {
        return { ...type, [field]: value };
      }
      return type;
    });
    
    setLeaveTypes(updatedLeaveTypes);
  };

  const handleNewLeaveTypeChange = (field, value) => {
    setNewLeaveType({
      ...newLeaveType,
      [field]: value
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Types Management</h1>
        <button 
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          {isAddingNew ? (
            <>
              <X className="w-5 h-5 mr-1" /> Cancel
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-1" /> Add Leave Type
            </>
          )}
        </button>
      </div>

      {isAddingNew && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Leave Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newLeaveType.name}
                onChange={(e) => handleNewLeaveTypeChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g. Maternity Leave"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newLeaveType.description}
                onChange={(e) => handleNewLeaveTypeChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Brief description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Balance (days)</label>
              <input
                type="number"
                value={newLeaveType.defaultBalance}
                onChange={(e) => handleNewLeaveTypeChange('defaultBalance', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accrual Rate</label>
              <select
                value={newLeaveType.accrualRate}
                onChange={(e) => handleNewLeaveTypeChange('accrualRate', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="none">No Accrual</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accrual Amount (days)</label>
              <input
                type="number"
                value={newLeaveType.accrualAmount}
                onChange={(e) => handleNewLeaveTypeChange('accrualAmount', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
                step="0.5"
                disabled={newLeaveType.accrualRate === 'none'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carryover Limit (days)</label>
              <input
                type="number"
                value={newLeaveType.carryoverLimit}
                onChange={(e) => handleNewLeaveTypeChange('carryoverLimit', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carryover Expiry (days)</label>
              <input
                type="number"
                value={newLeaveType.carryoverExpiry}
                onChange={(e) => handleNewLeaveTypeChange('carryoverExpiry', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={newLeaveType.color}
                  onChange={(e) => handleNewLeaveTypeChange('color', e.target.value)}
                  className="h-10 w-16 border border-gray-300 rounded-md mr-2"
                />
                <input
                  type="text"
                  value={newLeaveType.color}
                  onChange={(e) => handleNewLeaveTypeChange('color', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAddNew}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
              disabled={!newLeaveType.name}
            >
              <Save className="w-5 h-5 mr-1" /> Save Leave Type
            </button>
          </div>
        </div>
      )}

      <div className="bg-white overflow-hidden rounded-lg shadow border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default (days)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accrual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carryover</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveTypes.map((type) => (
                <tr key={type.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: type.color }}></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === type.id ? (
                      <input
                        type="text"
                        value={type.name}
                        onChange={(e) => handleInputChange(type.id, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      type.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === type.id ? (
                      <input
                        type="text"
                        value={type.description}
                        onChange={(e) => handleInputChange(type.id, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      type.description
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === type.id ? (
                      <input
                        type="number"
                        value={type.defaultBalance}
                        onChange={(e) => handleInputChange(type.id, 'defaultBalance', Number(e.target.value))}
                        className="w-20 border border-gray-300 rounded-md px-2 py-1"
                        min="0"
                      />
                    ) : (
                      type.defaultBalance
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === type.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={type.accrualRate}
                          onChange={(e) => handleInputChange(type.id, 'accrualRate', e.target.value)}
                          className="w-28 border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="none">No Accrual</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                        <input
                          type="number"
                          value={type.accrualAmount}
                          onChange={(e) => handleInputChange(type.id, 'accrualAmount', Number(e.target.value))}
                          className="w-16 border border-gray-300 rounded-md px-2 py-1"
                          min="0"
                          step="0.5"
                          disabled={type.accrualRate === 'none'}
                        />
                      </div>
                    ) : (
                      type.accrualRate === 'none' 
                        ? "None" 
                        : `${type.accrualAmount} days ${type.accrualRate}`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === type.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={type.carryoverLimit}
                          onChange={(e) => handleInputChange(type.id, 'carryoverLimit', Number(e.target.value))}
                          className="w-16 border border-gray-300 rounded-md px-2 py-1"
                          min="0"
                        />
                        <span>days /</span>
                        <input
                          type="number"
                          value={type.carryoverExpiry}
                          onChange={(e) => handleInputChange(type.id, 'carryoverExpiry', Number(e.target.value))}
                          className="w-16 border border-gray-300 rounded-md px-2 py-1"
                          min="0"
                        />
                        <span>expiry</span>
                      </div>
                    ) : (
                      type.carryoverLimit === 0 
                        ? "No carryover" 
                        : `${type.carryoverLimit} days / ${type.carryoverExpiry} days expiry`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === type.id ? (
                      <button 
                        onClick={() => handleSaveEdit(type.id)}
                        className="text-green-500 hover:text-green-700 mr-3"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleEdit(type.id)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(type.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}