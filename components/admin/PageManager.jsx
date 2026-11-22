'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImagePreview from '@/components/admin/ImagePreview';

const HOME_SECTION_ORDER = ['hero', 'about', 'academics', 'faculty', 'facilities', 'achievements', 'extracurricular', 'future'];
const HIDDEN_SECTIONS = new Set(['team_members']);

function parseJsonData(value) {
  if (Array.isArray(value) || (value && typeof value === 'object')) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export default function PageManager({ page }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ json_data: [] });
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, [page]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/home-content', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setContent((data.data || []).filter((section) => !HIDDEN_SECTIONS.has(section.section_id)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    const data = { ...section };
    data.json_data = parseJsonData(data.json_data);
    if (!Array.isArray(data.json_data) && data.section_id !== 'about') {
      data.json_data = [];
    }
    if (data.section_id === 'about' && (!data.json_data || Array.isArray(data.json_data))) {
      const fromArray = Array.isArray(data.json_data) ? data.json_data[0] : null;
      data.json_data = {
        author_name: fromArray?.author_name || data.author_name || 'School Administration',
        author_sub: fromArray?.author_sub || data.author_sub || 'CEO & Principal Office',
        avatar_img: fromArray?.avatar_img || fromArray?.image_url || '',
        bullets: fromArray?.bullets || [
          'Holistic student-centered learning.',
          'Character & moral development.',
          'Extracurricular & STEM enrichment.',
        ],
      };
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

  const handleAboutMetaChange = (field, value) => {
    setFormData({
      ...formData,
      json_data: {
        ...(formData.json_data || {}),
        [field]: value,
      },
    });
  };

  const handleAboutBulletChange = (index, value) => {
    const bullets = [...(formData.json_data?.bullets || [])];
    bullets[index] = value;
    handleAboutMetaChange('bullets', bullets);
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

  const handleAddJsonItem = () => {
    const list = Array.isArray(formData.json_data) ? formData.json_data : [];
    setFormData({
      ...formData,
      json_data: [...list, { title: '', description: '', subtitle: '', link: '', image_url: '' }],
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

  const handleAboutAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.success) {
        handleAboutMetaChange('avatar_img', data.imageUrl);
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

  const listSections = content.slice().sort((a, b) => {
    const indexA = HOME_SECTION_ORDER.indexOf(a.section_id);
    const indexB = HOME_SECTION_ORDER.indexOf(b.section_id);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="fw-bold mb-4">Manage Content</h3>
      <p className="text-muted mb-4">Update titles, subtitles, descriptions, images, and list items for every home section.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0">
        <div className="list-group list-group-flush">
          {listSections.map((section) => {
            let listCount = 0;
            const parsed = parseJsonData(section.json_data);
            if (Array.isArray(parsed)) listCount = parsed.length;

            return (
              <button
                key={section.section_id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
                onClick={() => handleEdit(section)}
              >
                <div className="d-flex align-items-center">
                  {section.image_url ? (
                    <div className="me-3" onClick={(e) => e.stopPropagation()}>
                      <ImagePreview src={section.image_url} alt="thumb" width={60} height={60} showViewButton={false} />
                    </div>
                  ) : (
                    <div className="bg-light rounded shadow-sm me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
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
                  {(() => {
                    const sectionId = formData.section_id;
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
                    const supportsCards = ['academics', 'facilities', 'achievements', 'future', 'hero'].includes(sectionId);
                    const aboutMeta = formData.json_data && !Array.isArray(formData.json_data) ? formData.json_data : {};

                    return (
                      <>
                        <div className="bg-light p-4 rounded mb-4 border border-light shadow-sm">
                          <h6 className="fw-bold mb-3 text-primary"><i className="fal fa-edit me-2"></i>Main Content</h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="form-floating">
                                <input type="text" name="title" className="form-control bg-white" id="titleInput" placeholder="Title" value={formData.title || ''} onChange={handleChange} />
                                <label htmlFor="titleInput">Title</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-floating">
                                <input type="text" name="subtitle" className="form-control bg-white" id="subtitleInput" placeholder="Subtitle" value={formData.subtitle || ''} onChange={handleChange} />
                                <label htmlFor="subtitleInput">Subtitle</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating">
                                <textarea name="description" className="form-control bg-white" id="descInput" placeholder="Description" style={{ height: '120px' }} value={formData.description || ''} onChange={handleChange}></textarea>
                                <label htmlFor="descInput">Section Description</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <label className="form-label small fw-bold text-muted mb-2">Background / Main Image</label>
                              <div className="d-flex align-items-center gap-3 bg-white p-3 rounded border">
                                {formData.image_url ? (
                                  <ImagePreview src={formData.image_url} alt="preview" width={80} height={80} />
                                ) : (
                                  <div className="bg-light rounded d-flex align-items-center justify-content-center border" style={{ width: '80px', height: '80px' }}>
                                    <i className="fal fa-image text-muted fs-4"></i>
                                  </div>
                                )}
                                <div className="flex-grow-1">
                                  <input type="file" className="form-control" onChange={handleImageUpload} ref={fileInputRef} accept="image/*" />
                                  {formData.image_url && (
                                    <button type="button" className="btn btn-link btn-sm text-danger mt-1 p-0 text-decoration-none" onClick={() => setFormData({ ...formData, image_url: '' })}>
                                      <i className="far fa-times me-1"></i>Remove Image
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {sectionId === 'faculty' && (
                          <div className="bg-light p-4 rounded mb-4 border shadow-sm">
                            <h6 className="fw-bold mb-3 text-primary">Secondary Faculty Image</h6>
                            <p className="small text-muted">Shown beside the main faculty image on the home page.</p>
                            <div className="d-flex align-items-center gap-3">
                              {(Array.isArray(formData.json_data) && formData.json_data[0]?.image_url) ? (
                                <ImagePreview src={formData.json_data[0].image_url} alt="Secondary" width={80} height={80} imgClassName="rounded" />
                              ) : null}
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const uploadData = new FormData();
                                  uploadData.append('file', file);
                                  const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
                                  const data = await res.json();
                                  if (data.success) {
                                    setFormData({
                                      ...formData,
                                      json_data: [{ ...(Array.isArray(formData.json_data) ? formData.json_data[0] : {}), image_url: data.imageUrl }],
                                    });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {sectionId === 'about' && (
                          <div className="bg-light p-4 rounded mb-4 border shadow-sm">
                            <h6 className="fw-bold mb-3 text-primary">Administration / Author Block</h6>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label fw-bold">Author Name</label>
                                <input type="text" className="form-control" value={aboutMeta.author_name || ''} onChange={(e) => handleAboutMetaChange('author_name', e.target.value)} />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label fw-bold">Author Role</label>
                                <input type="text" className="form-control" value={aboutMeta.author_sub || ''} onChange={(e) => handleAboutMetaChange('author_sub', e.target.value)} />
                              </div>
                              <div className="col-12">
                                <label className="form-label fw-bold">Author Photo</label>
                                <div className="d-flex align-items-center gap-3">
                                  {aboutMeta.avatar_img ? (
                                    <ImagePreview src={aboutMeta.avatar_img} alt="Author" width={60} height={60} imgClassName="rounded" />
                                  ) : null}
                                  <input type="file" className="form-control" accept="image/*" onChange={handleAboutAvatarUpload} />
                                </div>
                              </div>
                              {(aboutMeta.bullets || []).map((bullet, idx) => (
                                <div className="col-12" key={idx}>
                                  <label className="form-label fw-bold">Highlight #{idx + 1}</label>
                                  <input type="text" className="form-control" value={bullet || ''} onChange={(e) => handleAboutBulletChange(idx, e.target.value)} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {supportsCards && (
                          <>
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 mt-4">
                              <h6 className="fw-bold mb-0">List Items (Cards / Sliders)</h6>
                              {(!formData.json_data || formData.json_data.length < (sectionId === 'hero' ? 10 : 99)) && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => {
                                    handleAddJsonItem();
                                    setActiveListIndex(Array.isArray(formData.json_data) ? formData.json_data.length : 0);
                                  }}
                                >
                                  <i className="far fa-plus me-1"></i> Add Card
                                </button>
                              )}
                            </div>

                            {Array.isArray(formData.json_data) && formData.json_data.length > 0 && (
                              <div className="mb-4">
                                <div className="d-flex gap-2 overflow-auto pb-2 mb-3 px-1" style={{ whiteSpace: 'nowrap' }}>
                                  {formData.json_data.map((item, index) => (
                                    <div
                                      key={index}
                                      className={`card shadow-sm flex-shrink-0 ${activeListIndex === index ? 'border-primary' : 'border-light'}`}
                                      style={{ width: '150px', cursor: 'pointer', transition: '0.2s', opacity: activeListIndex === index ? 1 : 0.6 }}
                                      onClick={() => setActiveListIndex(index)}
                                    >
                                      <div className="card-body p-2 text-center">
                                        {item.image_url ? (
                                          <div className="mb-2" onClick={(e) => e.stopPropagation()}>
                                            <ImagePreview src={item.image_url} alt="thumb" width="100%" height={60} imgClassName="rounded" showViewButton={false} />
                                          </div>
                                        ) : (
                                          <div className="bg-light rounded mb-2 d-flex align-items-center justify-content-center" style={{ width: '100%', height: '60px' }}>
                                            <i className="fal fa-image text-muted"></i>
                                          </div>
                                        )}
                                        <h6 className="small fw-bold mb-0 text-truncate">{item.title || `Item #${index + 1}`}</h6>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {formData.json_data[activeListIndex] && (
                                  <div className="card shadow-sm border-primary">
                                    <div className="card-body bg-light rounded position-relative">
                                      {(sectionId !== 'hero' || formData.json_data.length > 1) && (
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
                                              <ImagePreview src={formData.json_data[activeListIndex].image_url} alt="preview" width={60} height={60} />
                                            ) : (
                                              <div className="bg-light rounded d-flex align-items-center justify-content-center border" style={{ width: '60px', height: '60px' }}>
                                                <i className="fal fa-image text-muted fs-5"></i>
                                              </div>
                                            )}
                                            <div className="flex-grow-1">
                                              <input type="file" className="form-control" onChange={(e) => handleJsonImageUpload(e, activeListIndex)} accept="image/*" />
                                              {formData.json_data[activeListIndex].image_url && (
                                                <button type="button" className="btn btn-link btn-sm text-danger mt-1 p-0 text-decoration-none" onClick={() => handleJsonChange(activeListIndex, 'image_url', '')}>
                                                  <i className="far fa-times me-1"></i>Remove
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
