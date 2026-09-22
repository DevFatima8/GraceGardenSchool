'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function TeamAdminPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/api/team');
      if (response.data.success) {
        setTeamMembers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put('/api/team', teamMembers);
      if (response.data.success) {
        toast.success('Team members updated successfully');
      } else {
        toast.error('Failed to update team members');
      }
    } catch (error) {
      console.error('Error updating team members:', error);
      toast.error('Failed to update team members');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const toastId = toast.loading('Uploading image...');
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        handleChange(index, 'image.src', response.data.imageUrl);
        toast.success('Image uploaded successfully', { id: toastId });
      } else {
        toast.error('Failed to upload image', { id: toastId });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updatedMembers[index][parent][child] = value;
    } else {
        updatedMembers[index][field] = value;
    }
    setTeamMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: `teacher-${Date.now()}`,
        image: { src: '/assets/img/team/teacher-placeholder.jpg' },
        position: 'Teacher',
        name: 'New Teacher',
        mail: 'teacher@gracegardenschool.com',
        phone: '+92 000 000 0000',
        category: 'teacher',
        social_link: [
          { link: '#', target: '_blank', icon: '<i className="fab fa-facebook-f"></i>' },
          { link: '#', target: '_blank', icon: '<i className="fab fa-instagram"></i>' },
        ],
      },
    ]);
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Toaster position="top-right" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Manage Teachers / Team</h4>
        <button className="btn btn-primary" onClick={handleAddMember}>
          <i className="fas fa-plus me-2"></i> Add Teacher
        </button>
      </div>

      {teamMembers.length === 0 && (
        <div className="alert alert-info">No team members found. Click 'Add Teacher' to create one.</div>
      )}

      {teamMembers.map((member, index) => (
        <div key={index} className="card mb-4 border-0 shadow-sm">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Member #{index + 1}</h5>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMember(index)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={member.name || ''}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Position</label>
                <input
                  type="text"
                  className="form-control"
                  value={member.position || ''}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Image</label>
                <div className="d-flex align-items-center gap-2">
                  <img src={member.image?.src || '/assets/img/team/teacher-placeholder.jpg'} alt="Avatar" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={member.mail || ''}
                  onChange={(e) => handleChange(index, 'mail', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={member.phone || ''}
                  onChange={(e) => handleChange(index, 'phone', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Unique ID (lowercase, no spaces)</label>
                <input
                  type="text"
                  className="form-control"
                  value={member.id || ''}
                  onChange={(e) => handleChange(index, 'id', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success px-4 py-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
}
