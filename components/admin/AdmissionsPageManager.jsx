'use client';
import React, { useState, useEffect, useRef } from 'react';

const PAGES = [
  { slug: 'admissions', name: 'Admissions Overview Page' },
  { slug: 'fee-structure', name: 'Fee Structure' },
  { slug: 'books-lists', name: 'Books Lists' }
];

export default function AdmissionsPageManager() {
  const [selectedPage, setSelectedPage] = useState(PAGES[0].slug);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({ json_data: [] });
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputListRef = useRef(null);

  useEffect(() => {
    fetchContent(selectedPage);
  }, [selectedPage]);

  const fetchContent = async (slug) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/our-school-content?page_slug=${slug}`);
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    setEditingSection(null);
  };

  const handleEdit = (existing) => {
    let data = { ...existing };
    if (typeof data.json_data === 'string') {
      try { data.json_data = JSON.parse(data.json_data); } catch (e) { data.json_data = []; }
    }
    if (!data.json_data || !Array.isArray(data.json_data)) data.json_data = [];
    
    setEditingSection(data.section_id);
    setFormData(data);
    setActiveListIndex(0);
    setShowModal(true);
    setMessage('');
    setError('');
  };

  const handleAddNewSection = () => {
    const newSectionId = `section_${Date.now()}`;
    setEditingSection(newSectionId);
    setFormData({
      page_slug: selectedPage,
      section_id: newSectionId,
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      json_data: []
    });
    setActiveListIndex(0);
    setShowModal(true);
    setMessage('');
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleListChange = (index, field, value) => {
    const updatedList = [...formData.json_data];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setFormData({ ...formData, json_data: updatedList });
  };

  const handleAddJsonItem = () => {
    const newItem = { title: '', subtitle: '', description: '', link: '', image_url: '' };
    setFormData({ ...formData, json_data: [...(formData.json_data || []), newItem] });
  };

  const handleRemoveJsonItem = (index) => {
    const updatedList = formData.json_data.filter((_, i) => i !== index);
    setFormData({ ...formData, json_data: updatedList });
  };

  const handleImageUpload = async (e, isList = false, listIndex = 0) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.success) {
        if (isList) {
          handleListChange(listIndex, 'image_url', data.url);
        } else {
          setFormData({ ...formData, image_url: data.url });
        }
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/our-school-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Section updated successfully.');
        setShowModal(false);
        fetchContent(selectedPage);
      } else {
        setError(data.error || 'Failed to update section.');
      }
    } catch (err) {
      setError('Error updating section.');
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">Manage Admissions Pages</h3>
      
      <div className="mb-4">
        <label className="form-label fw-bold">Select Page to Edit</label>
        <select className="form-select form-select-lg" value={selectedPage} onChange={handlePageChange}>
          {PAGES.map(p => (
            <option key={p.slug} value={p.slug}>{p.name}</option>
          ))}
        </select>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h5 className="fw-bold m-0">Sections on {PAGES.find(p => p.slug === selectedPage)?.name}</h5>
        <button className="btn btn-primary" onClick={handleAddNewSection}>
          <i className="far fa-plus me-2"></i> Add New Section
        </button>
      </div>

      {loading ? (
        <div>Loading content...</div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="list-group list-group-flush">
            {content.length === 0 ? (
              <div className="p-4 text-muted text-center">
                No custom sections added yet. The default content is currently being shown on the website. Add a section to override the defaults! 
                <br/><small>(Note: to override Admissions page defaults, use section IDs: <b>overview</b>, <b>why_ggs</b>, <b>process</b>)</small>
              </div>
            ) : (
              content.map((section) => {
                let listCount = 0;
                if (typeof section.json_data === 'string') {
                    try { listCount = JSON.parse(section.json_data).length; } catch(e) {}
                }
                return (
                  <button 
                    key={section.section_id} 
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
                    onClick={() => handleEdit(section)}
                  >
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: 'var(--primary-color-1)' }}>
                        {section.title || section.section_id}
                      </h6>
                      <small className="text-muted">
                        Section ID: <span className="badge bg-secondary ms-1">{section.section_id}</span>
                        {listCount > 0 && <span className="badge bg-info ms-2">{listCount} items</span>}
                      </small>
                    </div>
                    <i className="far fa-edit text-primary"></i>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-light border-bottom-0 p-4">
                <h5 className="modal-title fw-bold">Editing Section: {formData.section_id}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 p-md-5">
                <form id="editForm" onSubmit={handleSubmit}>
                  
                  <div className="mb-4">
                    <label className="form-label fw-bold">Section ID <small className="text-muted fw-normal">(Required. e.g. 'overview', 'why_ggs', 'process')</small></label>
                    <input type="text" className="form-control bg-light" name="section_id" value={formData.section_id} onChange={handleChange} required />
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Title <small className="text-muted fw-normal">(Will not show on Admissions Overview)</small></label>
                      <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Subtitle</label>
                      <input type="text" className="form-control" name="subtitle" value={formData.subtitle} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="form-label fw-bold">Description</label>
                    <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange}></textarea>
                  </div>

                  <div className="mt-4 border p-4 rounded bg-light">
                    <label className="form-label fw-bold d-block">Main Image</label>
                    <div className="d-flex align-items-center gap-3">
                      {formData.image_url && (
                        <img src={formData.image_url} alt="Preview" className="rounded shadow-sm" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      )}
                      <div className="flex-grow-1">
                        <input type="text" className="form-control mb-2" placeholder="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
                        <input type="file" className="form-control" accept="image/*" ref={fileInputRef} onChange={(e) => handleImageUpload(e, false)} />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 mt-5">
                    <h6 className="fw-bold mb-0">Dynamic Cards / List Items</h6>
                    <button type="button" className="btn btn-sm btn-outline-success" onClick={() => {
                        handleAddJsonItem();
                        setActiveListIndex(formData.json_data ? formData.json_data.length : 0);
                    }}>
                      <i className="far fa-plus me-1"></i> Add Card
                    </button>
                  </div>
                  
                  {formData.json_data && formData.json_data.length > 0 && (
                    <div className="row">
                      <div className="col-md-3 border-end">
                        <div className="list-group list-group-flush">
                          {formData.json_data.map((item, idx) => (
                            <button 
                              key={idx} 
                              type="button" 
                              className={`list-group-item list-group-item-action ${activeListIndex === idx ? 'active fw-bold' : ''}`}
                              onClick={() => setActiveListIndex(idx)}
                            >
                              Item {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="col-md-9 ps-md-4">
                        {formData.json_data[activeListIndex] && (
                          <div className="card shadow-sm border-primary">
                            <div className="card-body bg-light rounded position-relative">
                              <button 
                                type="button" 
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                onClick={() => {
                                  handleRemoveJsonItem(activeListIndex);
                                  setActiveListIndex(Math.max(0, activeListIndex - 1));
                                }}
                              >
                                <i className="far fa-trash me-1"></i> Delete
                              </button>
                              <h6 className="fw-bold mb-3" style={{ color: 'var(--primary-color-1)' }}>Editing Item #{activeListIndex + 1}</h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <label className="form-label small fw-bold">Title</label>
                                  <input type="text" className="form-control form-control-sm" value={formData.json_data[activeListIndex].title || ''} onChange={(e) => handleListChange(activeListIndex, 'title', e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label small fw-bold">Subtitle</label>
                                  <input type="text" className="form-control form-control-sm" value={formData.json_data[activeListIndex].subtitle || ''} onChange={(e) => handleListChange(activeListIndex, 'subtitle', e.target.value)} />
                                </div>
                                <div className="col-12">
                                  <label className="form-label small fw-bold">Description</label>
                                  <textarea className="form-control form-control-sm" rows="3" value={formData.json_data[activeListIndex].description || ''} onChange={(e) => handleListChange(activeListIndex, 'description', e.target.value)}></textarea>
                                </div>
                                <div className="col-12">
                                  <label className="form-label small fw-bold d-block">Image / Icon Class</label>
                                  <div className="d-flex align-items-center gap-2">
                                    {formData.json_data[activeListIndex].image_url && formData.json_data[activeListIndex].image_url.startsWith('http') && (
                                      <img src={formData.json_data[activeListIndex].image_url} alt="Img" className="rounded shadow-sm" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                    )}
                                    <input type="text" className="form-control form-control-sm" placeholder="URL or FontAwesome class (e.g. fas fa-star)" value={formData.json_data[activeListIndex].image_url || ''} onChange={(e) => handleListChange(activeListIndex, 'image_url', e.target.value)} />
                                    <input type="file" className="form-control form-control-sm w-auto" accept="image/*" ref={fileInputListRef} onChange={(e) => handleImageUpload(e, true, activeListIndex)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </form>
              </div>
              <div className="modal-footer border-top-0 p-4 pt-0 bg-light rounded-bottom-4">
                <button type="button" className="btn btn-secondary px-4 py-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" form="editForm" className="btn btn-primary px-4 py-2 fw-bold text-white shadow">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
