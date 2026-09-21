'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AboutPageManager() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({ json_data: [] });
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  // Define the sections for the About Us page
  const sectionConfig = {
    history: { title: 'Our History', hasDesc: true, hasImage: true, hasList: false },
    motto: { title: 'School Motto', hasDesc: true, hasImage: true, hasList: false },
    vision: { title: 'Vision Statement', hasDesc: true, hasImage: true, hasList: false },
    board: { title: 'Board Of Governors', hasDesc: true, hasImage: false, hasList: true, listLabels: { title: 'Member Name', sub: 'Position', desc: 'Bio', link: 'LinkedIn URL', img: 'Photo' } },
    values: { title: 'Core Values', hasDesc: true, hasImage: true, hasList: true, listLabels: { title: 'Value Title', sub: 'Subtitle', desc: 'Description', link: 'Read More', img: 'Icon/Image' } },
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/about-content');
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

  const handleEdit = (sectionId) => {
    // Find existing content or start fresh
    const existing = content.find(c => c.section_id === sectionId);
    let data = existing ? { ...existing } : { section_id: sectionId, title: '', subtitle: '', description: '', image_url: '', json_data: [] };
    
    if (typeof data.json_data === 'string') {
      try {
        data.json_data = JSON.parse(data.json_data);
      } catch (e) {
        data.json_data = [];
      }
    }
    if (!data.json_data || !Array.isArray(data.json_data)) {
      data.json_data = [];
    }
    
    setEditingSection(sectionId);
    setFormData(data);
    setMessage('');
    setError('');
    setActiveListIndex(0);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image_url: data.imageUrl });
      } else {
        setError('Image upload failed.');
      }
    } catch (err) {
      setError('Image upload error.');
    }
  };

  // --- Dynamic Array List Editor Functions ---
  const handleAddJsonItem = () => {
    setFormData({
      ...formData,
      json_data: [...formData.json_data, { title: '', description: '', subtitle: '', link: '', image_url: '' }]
    });
  };

  const handleRemoveJsonItem = (index) => {
    const newJson = [...formData.json_data];
    newJson.splice(index, 1);
    setFormData({ ...formData, json_data: newJson });
  };

  const handleJsonChange = (index, field, value) => {
    const newJson = [...formData.json_data];
    newJson[index][field] = value;
    setFormData({ ...formData, json_data: newJson });
  };

  const handleJsonImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.success) {
        handleJsonChange(index, 'image_url', data.imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/about-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Section updated successfully.');
        setShowModal(false);
        fetchContent();
      } else {
        setError(data.error || 'Failed to update section.');
      }
    } catch (err) {
      setError('Error updating section.');
    }
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Manage About Us Content</h3>
      <p className="text-muted mb-4">Select a section to update its text, images, and list items.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0">
        <div className="list-group list-group-flush">
          {Object.entries(sectionConfig).map(([sectionId, config]) => {
            const existingContent = content.find(c => c.section_id === sectionId);
            let listCount = 0;
            if (existingContent) {
                if (typeof existingContent.json_data === 'string') {
                    try { listCount = JSON.parse(existingContent.json_data).length; } catch(e) {}
                } else if (existingContent.json_data && typeof existingContent.json_data === 'object') {
                    listCount = existingContent.json_data.length;
                }
            }

            return (
              <button 
                key={sectionId} 
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
                onClick={() => handleEdit(sectionId)}
              >
                <div className="d-flex align-items-center">
                  {existingContent?.image_url ? (
                    <img src={existingContent.image_url} alt="thumb" className="rounded shadow-sm me-3" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                  ) : (
                    <div className="bg-light rounded shadow-sm me-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                      <i className="fal fa-image text-muted"></i>
                    </div>
                  )}
                  <div className="text-start">
                    <h6 className="fw-bold mb-1">{config.title}</h6>
                    <div className="d-flex align-items-center">
                      <small className="text-muted">{existingContent?.title || 'Not Configured Yet'}</small>
                      {listCount > 0 && (
                        <span className="badge bg-light text-dark border ms-2">
                          {listCount} List Items
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center" style={{ color: 'var(--primary-color-1)' }}>
                  <span className="small fw-bold me-2">Edit Section</span>
                  <i className="far fa-chevron-right"></i>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bootstrap/Tailwind Hybrid Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content tw-border-0 tw-shadow-xl tw-rounded-xl">
              <div className="modal-header tw-bg-gray-50 tw-border-b tw-border-gray-200">
                <h5 className="modal-title tw-font-bold tw-text-gray-800">Edit {sectionConfig[formData.section_id]?.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              
              <div className="modal-body tw-p-6">
                <form onSubmit={handleSubmit}>
                  {(() => {
                    const sectionId = formData.section_id;
                    const config = sectionConfig[sectionId];
                    if (!config) return null;
                    const labels = config.listLabels || { title: 'Title', sub: 'Subtitle', desc: 'Description', link: 'Link', img: 'Image' };

                    return (
                      <>
                        <div className="tw-bg-gray-50 tw-p-5 tw-rounded-lg tw-mb-6 tw-border tw-border-gray-200">
                          <h6 className="tw-font-bold tw-mb-4 tw-text-blue-700"><i className="fal fa-edit tw-mr-2"></i>Main Content</h6>
                          <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                            
                            <div>
                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Heading Title</label>
                                <input type="text" name="title" className="form-control" placeholder="Section Heading" value={formData.title || ''} onChange={handleChange} />
                            </div>

                            {config.hasDesc && (
                              <div>
                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Section Description</label>
                                <textarea name="description" className="form-control" placeholder="Description" style={{ height: '120px' }} value={formData.description || ''} onChange={handleChange}></textarea>
                              </div>
                            )}
                            
                            {config.hasImage && (
                              <div>
                                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Background / Main Image</label>
                                <div className="tw-flex tw-items-center tw-gap-4 tw-bg-white tw-p-3 tw-rounded-lg tw-border">
                                  {formData.image_url ? (
                                    <img src={formData.image_url} alt="preview" className="tw-w-20 tw-h-20 tw-object-cover tw-rounded-lg tw-shadow-sm" />
                                  ) : (
                                    <div className="tw-w-20 tw-h-20 tw-bg-gray-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-border">
                                        <i className="fal fa-image tw-text-gray-400 tw-text-2xl"></i>
                                    </div>
                                  )}
                                  <div className="tw-flex-1">
                                    <input type="file" className="form-control" onChange={handleImageUpload} ref={fileInputRef} accept="image/*" />
                                    {formData.image_url && (
                                        <button type="button" className="tw-text-red-500 tw-text-sm tw-mt-2 hover:tw-underline" onClick={() => setFormData({...formData, image_url: ''})}>
                                            <i className="far fa-times tw-mr-1"></i>Remove Image
                                        </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Dynamic Array Editor */}
                        {config.hasList && (
                          <>
                            <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-border-gray-200 tw-pb-3 tw-mb-4 tw-mt-8">
                              <h6 className="tw-font-bold tw-text-gray-800">List Items (Cards)</h6>
                              <button type="button" className="btn btn-sm btn-outline-success" onClick={() => {
                                  handleAddJsonItem();
                                  setActiveListIndex(formData.json_data ? formData.json_data.length : 0);
                              }}>
                                <i className="far fa-plus me-1"></i> Add Item
                              </button>
                            </div>
                            
                            {formData.json_data && formData.json_data.length > 0 && (
                              <div className="mb-4">
                                <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-pb-2 tw-mb-4" style={{ whiteSpace: 'nowrap' }}>
                                  {formData.json_data.map((item, index) => (
                                    <div 
                                      key={index}
                                      className={`tw-w-36 tw-flex-shrink-0 tw-rounded-lg tw-border tw-cursor-pointer tw-transition-all ${activeListIndex === index ? 'tw-border-blue-500 tw-ring-2 tw-ring-blue-100' : 'tw-border-gray-200 tw-opacity-70'}`}
                                      onClick={() => setActiveListIndex(index)}
                                    >
                                      <div className="tw-p-2 tw-text-center">
                                        {item.image_url ? (
                                          <img src={item.image_url} alt="thumb" className="tw-w-full tw-h-16 tw-object-cover tw-rounded-md tw-mb-2" />
                                        ) : (
                                          <div className="tw-w-full tw-h-16 tw-bg-gray-100 tw-rounded-md tw-flex tw-items-center tw-justify-center tw-mb-2">
                                            <i className="fal fa-image tw-text-gray-400"></i>
                                          </div>
                                        )}
                                        <h6 className="tw-text-xs tw-font-bold tw-text-gray-800 tw-truncate">{item.title || `Item #${index + 1}`}</h6>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Active Card Form */}
                                {formData.json_data[activeListIndex] && (
                                  <div className="tw-border tw-border-blue-200 tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
                                    <div className="tw-bg-blue-50 tw-p-5 tw-relative">
                                      <button 
                                        type="button" 
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-3"
                                        onClick={() => {
                                          handleRemoveJsonItem(activeListIndex);
                                          setActiveListIndex(Math.max(0, activeListIndex - 1));
                                        }}
                                      >
                                        <i className="far fa-trash me-1"></i> Delete
                                      </button>
                                      <h6 className="tw-font-bold tw-text-blue-800 tw-mb-4">Editing Item #{activeListIndex + 1}</h6>
                                      
                                      <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="tw-block tw-text-xs tw-font-medium tw-text-gray-600 tw-mb-1">{labels.title}</label>
                                            <input type="text" className="form-control bg-white" placeholder={labels.title} value={formData.json_data[activeListIndex].title || ''} onChange={(e) => handleJsonChange(activeListIndex, 'title', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="tw-block tw-text-xs tw-font-medium tw-text-gray-600 tw-mb-1">{labels.sub}</label>
                                            <input type="text" className="form-control bg-white" placeholder={labels.sub} value={formData.json_data[activeListIndex].subtitle || ''} onChange={(e) => handleJsonChange(activeListIndex, 'subtitle', e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="tw-block tw-text-xs tw-font-medium tw-text-gray-600 tw-mb-1">{labels.desc}</label>
                                            <textarea className="form-control bg-white" placeholder={labels.desc} style={{ height: '80px' }} value={formData.json_data[activeListIndex].description || ''} onChange={(e) => handleJsonChange(activeListIndex, 'description', e.target.value)}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="tw-block tw-text-xs tw-font-medium tw-text-gray-600 tw-mb-1">{labels.link}</label>
                                            <input type="text" className="form-control bg-white" placeholder={labels.link} value={formData.json_data[activeListIndex].link || ''} onChange={(e) => handleJsonChange(activeListIndex, 'link', e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                          <label className="tw-block tw-text-xs tw-font-medium tw-text-gray-600 tw-mb-1">{labels.img}</label>
                                          <div className="tw-flex tw-items-center tw-gap-3 tw-bg-white tw-p-3 tw-rounded-lg tw-border">
                                            {formData.json_data[activeListIndex].image_url ? (
                                              <img src={formData.json_data[activeListIndex].image_url} alt="preview" className="tw-w-16 tw-h-16 tw-object-cover tw-rounded-md tw-shadow-sm" />
                                            ) : (
                                              <div className="tw-w-16 tw-h-16 tw-bg-gray-100 tw-rounded-md tw-flex tw-items-center tw-justify-center tw-border">
                                                  <i className="fal fa-image tw-text-gray-400 tw-text-xl"></i>
                                              </div>
                                            )}
                                            <div className="tw-flex-1">
                                              <input type="file" className="form-control form-control-sm" onChange={(e) => handleJsonImageUpload(e, activeListIndex)} accept="image/*" />
                                              {formData.json_data[activeListIndex].image_url && (
                                                <button type="button" className="tw-text-red-500 tw-text-xs tw-mt-1 hover:tw-underline" onClick={() => handleJsonChange(activeListIndex, 'image_url', '')}>
                                                  <i className="far fa-times tw-mr-1"></i>Remove
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </>
                    );
                  })()}

                  <div className="modal-footer px-0 pb-0 mt-6 border-top pt-4">
                    <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn text-white px-5 fw-bold" style={{ backgroundColor: 'var(--primary-color-1)' }}>Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
