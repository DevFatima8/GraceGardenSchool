'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function PageManager({ page }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({ json_data: [] });
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, [page]); // re-fetch if page changes

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/home-content');
      const data = await res.json();
      if (data.success) {
        // filter by page if necessary. For now, assuming home page.
        setContent(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section.section_id);
    const data = { ...section };
    // Ensure json_data is a parsed array
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
      const res = await fetch('/api/home-content', {
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
      <h3 className="fw-bold mb-4">Manage Content</h3>
      <p className="text-muted mb-4">Select a section to update its text, images, and list items.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0">
        <div className="list-group list-group-flush">
          {content.slice().sort((a, b) => {
            const order = ['hero', 'about', 'academics', 'faculty', 'admissions', 'facilities', 'achievements', 'extracurricular', 'future'];
            const indexA = order.indexOf(a.section_id);
            const indexB = order.indexOf(b.section_id);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
          }).map((section) => {
            let listCount = 0;
            if (typeof section.json_data === 'string') {
                try { listCount = JSON.parse(section.json_data).length; } catch(e) {}
            } else if (section.json_data && typeof section.json_data === 'object') {
                listCount = section.json_data.length;
            }

            return (
              <button 
                key={section.section_id} 
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
                onClick={() => handleEdit(section)}
              >
                <div className="d-flex align-items-center">
                  {section.image_url ? (
                    <img src={section.image_url} alt="thumb" className="rounded shadow-sm me-3" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                  ) : (
                    <div className="bg-light rounded shadow-sm me-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                      <i className="fal fa-image text-muted"></i>
                    </div>
                  )}
                  <div>
                    <h6 className="fw-bold mb-1 text-capitalize">{section.section_id} Section</h6>
                    <div className="d-flex align-items-center">
                      <small className="text-muted">{section.title || 'No Title Set'}</small>
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

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Edit {formData.section_id?.toUpperCase()}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Configuration Logic */}
                  {(() => {
                    const sectionId = formData.section_id;
                      const config = {
                        hasTitle: false,
                        hasSubtitle: false,
                        hasDesc: ['about', 'faculty', 'extracurricular', 'admissions', 'academics'].includes(sectionId),
                        hasImage: ['about', 'faculty', 'extracurricular'].includes(sectionId)
                      };
                    const getListLabels = () => {
                      switch (sectionId) {
                        case 'academics': return { title: 'Card Title', sub: 'Category', desc: 'Description', link: 'Link URL', img: 'Icon / Image' };
                        case 'facilities': return { title: 'Facility Name', sub: 'Category', desc: 'Details', link: 'Link URL', img: 'Facility Image' };
                        case 'achievements': return { title: 'Person Name', sub: 'Role / Position', desc: 'Testimonial / Review', link: 'Profile Link', img: 'Avatar Image' };
                        case 'future': return { title: 'News / Event Title', sub: 'Date / Category', desc: 'Excerpt / Summary', link: 'Read More Link', img: 'Blog Cover Image' };
                        case 'hero': return { title: 'Slide Title', sub: 'Slide Subtitle', desc: 'Slide Description', link: 'Button Link', img: 'Background Image' };
                        default: return { title: 'Card Title', sub: 'Subtitle', desc: 'Description', link: 'Link', img: 'Image' };
                      }
                    };
                    const labels = getListLabels();

                    return (
                      <>
                        {/* Premium Main Fields */}
                        <div className="bg-light p-4 rounded mb-4 border border-light shadow-sm">
                          <h6 className="fw-bold mb-3 text-primary"><i className="fal fa-edit me-2"></i>Main Content</h6>
                          <div className="row g-3">
                            {config.hasDesc && (
                              <div className="col-12">
                                <div className="form-floating">
                                  <textarea name="description" className="form-control bg-white" id="descInput" placeholder="Description" style={{ height: '120px' }} value={formData.description || ''} onChange={handleChange}></textarea>
                                  <label htmlFor="descInput">Section Description</label>
                                </div>
                              </div>
                            )}
                            {config.hasImage && (
                              <div className="col-12">
                                <label className="form-label small fw-bold text-muted mb-2">Background / Main Image</label>
                                <div className="d-flex align-items-center gap-3 bg-white p-3 rounded border">
                                  {formData.image_url ? (
                                    <img src={formData.image_url} alt="preview" className="rounded shadow-sm" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                  ) : (
                                    <div className="bg-light rounded d-flex align-items-center justify-content-center border" style={{ width: '80px', height: '80px' }}>
                                        <i className="fal fa-image text-muted fs-4"></i>
                                    </div>
                                  )}
                                  <div className="flex-grow-1">
                                    <input type="file" className="form-control" onChange={handleImageUpload} ref={fileInputRef} accept="image/*" />
                                    {formData.image_url && <button type="button" className="btn btn-link btn-sm text-danger mt-1 p-0 text-decoration-none" onClick={() => setFormData({...formData, image_url: ''})}><i className="far fa-times me-1"></i>Remove Image</button>}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Dynamic Array Editor - ONLY for sections that support cards */}
                        {['academics', 'facilities', 'achievements', 'future', 'hero'].includes(formData.section_id) && (
                          <>
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 mt-5">
                              <h6 className="fw-bold mb-0">List Items (Cards / Sliders)</h6>
                              {(!formData.json_data || formData.json_data.length < (formData.section_id === 'hero' ? 10 : 99)) && (
                                <button type="button" className="btn btn-sm btn-outline-success" onClick={() => {
                                    handleAddJsonItem();
                                    setActiveListIndex(formData.json_data ? formData.json_data.length : 0);
                                }}>
                                  <i className="far fa-plus me-1"></i> Add Card
                                </button>
                              )}
                            </div>
                            
                            {formData.json_data && formData.json_data.length > 0 && (
                              <div className="mb-4">
                                {/* Horizontal List of Cards */}
                                <div className="d-flex gap-2 overflow-auto pb-2 mb-3 px-1" style={{ whiteSpace: 'nowrap' }}>
                                  {formData.json_data.map((item, index) => (
                                    <div 
                                      key={index}
                                      className={`card shadow-sm cursor-pointer flex-shrink-0 ${activeListIndex === index ? 'border-primary' : 'border-light'}`}
                                      style={{ width: '150px', cursor: 'pointer', transition: '0.2s', opacity: activeListIndex === index ? 1 : 0.6 }}
                                      onClick={() => setActiveListIndex(index)}
                                    >
                                      <div className="card-body p-2 text-center position-relative">
                                        {item.image_url ? (
                                          <img src={item.image_url} alt="thumb" className="rounded mb-2" style={{width: '100%', height: '60px', objectFit: 'cover'}} />
                                        ) : (
                                          <div className="bg-light rounded mb-2 d-flex align-items-center justify-content-center" style={{width: '100%', height: '60px'}}>
                                            <i className="fal fa-image text-muted"></i>
                                          </div>
                                        )}
                                        <h6 className="small fw-bold mb-0 text-truncate">{item.title || `Item #${index + 1}`}</h6>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Active Card Form */}
                                {formData.json_data[activeListIndex] && (
                                  <div className="card shadow-sm border-primary">
                                    <div className="card-body bg-light rounded position-relative">
                                      {(formData.section_id !== 'hero' || formData.json_data.length > 3) && (
                                        <button 
                                          type="button" 
                                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                          onClick={() => {
                                            handleRemoveJsonItem(activeListIndex);
                                            setActiveListIndex(Math.max(0, activeListIndex - 1));
                                          }}
                                        >
                                          <i className="far fa-trash me-1"></i> Delete This Card
                                        </button>
                                      )}
                                      <h6 className="fw-bold mb-3" style={{ color: 'var(--primary-color-1)' }}>Editing Item #{activeListIndex + 1}</h6>
                                      
                                      <div className="row g-3">
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input type="text" className="form-control bg-white" id={`cardTitle${activeListIndex}`} placeholder={labels.title} value={formData.json_data[activeListIndex].title || ''} onChange={(e) => handleJsonChange(activeListIndex, 'title', e.target.value)} />
                                            <label htmlFor={`cardTitle${activeListIndex}`}>{labels.title}</label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input type="text" className="form-control bg-white" id={`cardSub${activeListIndex}`} placeholder={labels.sub} value={formData.json_data[activeListIndex].subtitle || ''} onChange={(e) => handleJsonChange(activeListIndex, 'subtitle', e.target.value)} />
                                            <label htmlFor={`cardSub${activeListIndex}`}>{labels.sub}</label>
                                          </div>
                                        </div>
                                        <div className="col-12">
                                          <div className="form-floating">
                                            <textarea className="form-control bg-white" id={`cardDesc${activeListIndex}`} placeholder={labels.desc} style={{ height: '100px' }} value={formData.json_data[activeListIndex].description || ''} onChange={(e) => handleJsonChange(activeListIndex, 'description', e.target.value)}></textarea>
                                            <label htmlFor={`cardDesc${activeListIndex}`}>{labels.desc}</label>
                                          </div>
                                        </div>
                                        <div className="col-12">
                                          <div className="form-floating">
                                            <input type="text" className="form-control bg-white" id={`cardLink${activeListIndex}`} placeholder={labels.link} value={formData.json_data[activeListIndex].link || ''} onChange={(e) => handleJsonChange(activeListIndex, 'link', e.target.value)} />
                                            <label htmlFor={`cardLink${activeListIndex}`}>{labels.link}</label>
                                          </div>
                                        </div>
                                        <div className="col-12">
                                          <label className="form-label small fw-bold text-muted mb-2">{labels.img}</label>
                                          <div className="d-flex align-items-center gap-3 bg-white p-3 rounded border">
                                            {formData.json_data[activeListIndex].image_url ? (
                                              <img src={formData.json_data[activeListIndex].image_url} alt="preview" className="rounded shadow-sm" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                            ) : (
                                              <div className="bg-light rounded d-flex align-items-center justify-content-center border" style={{ width: '60px', height: '60px' }}>
                                                  <i className="fal fa-image text-muted fs-5"></i>
                                              </div>
                                            )}
                                            <div className="flex-grow-1">
                                              <input type="file" className="form-control" onChange={(e) => handleJsonImageUpload(e, activeListIndex)} accept="image/*" />
                                              {formData.json_data[activeListIndex].image_url && <button type="button" className="btn btn-link btn-sm text-danger mt-1 p-0 text-decoration-none" onClick={() => handleJsonChange(activeListIndex, 'image_url', '')}><i className="far fa-times me-1"></i>Remove</button>}
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

                  <div className="modal-footer px-0 pb-0 mt-4 border-top pt-3">
                    <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn text-white px-4 fw-bold" style={{ backgroundColor: 'var(--primary-color-1)' }}>Save Changes</button>
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
