import React, { useState, useEffect } from "react";

const UdaanSubmissionPortal = () => {
  const [activeTab, setActiveTab] = useState("art-design");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "",
    department: "",
    year: "",
    title: "",
    description: "",
    content: "",
    file: null,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: "art-design", label: "Art & Design", icon: "🎨" },
    { id: "english-editorial", label: "English Editorial", icon: "📝" },
    { id: "hindi-editorial", label: "Hindi Editorial", icon: "✍️" },
    { id: "photography", label: "Photography", icon: "📸" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Content submitted successfully!");
  };

  const getContentPlaceholder = () => {
    switch (activeTab) {
      case "art-design":
        return "Describe your artwork, inspiration, and creative process...";
      case "english-editorial":
        return "Write your English editorial content here...";
      case "hindi-editorial":
        return "अपना हिंदी संपादकीय लेख यहाँ लिखें...";
      case "photography":
        return "Describe your photograph, location, story behind the shot...";
      default:
        return "Enter your content here...";
    }
  };

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {/* Header */}
      <header className={`header ${isVisible ? "fade-in" : ""}`}>
        <div className="header-content">
          {/* <h1 className="title">
            <span className="udaan-text">Share Your Voice, Shape Our Story</span>
            <span className="subtitle">GGV University Magazine Club</span>
          </h1> */}
          <p className="tagline">Share Your Voice, Shape Our Story</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Tab Navigation */}
          <nav className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Form Section */}
          <div className="form-container">
            <div className="form-header">
              <h2>
                Submit Your {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p>Fill in your details and share your creative work with us</p>
            </div>

            <div className="submission-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="form-section">
                <h3>Academic Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="degree">Degree Program *</label>
                    <select
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your degree</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="M.Sc">M.Sc</option>
                      <option value="BBA">BBA</option>
                      <option value="MBA">MBA</option>
                      <option value="B.Com">B.Com</option>
                      <option value="M.Com">M.Com</option>
                      <option value="BA">BA</option>
                      <option value="MA">MA</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year of Study *</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Information */}
              <div className="form-section">
                <h3>Content Details</h3>
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter the title of your submission"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Brief Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description of your work"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content *</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="8"
                    placeholder={getContentPlaceholder()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">Upload File (Optional)</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept={
                      activeTab === "photography"
                        ? "image/*"
                        : activeTab === "art-design"
                        ? "image/*,.pdf"
                        : ".doc,.docx,.pdf,.txt"
                    }
                  />
                  <small className="file-info">
                    {activeTab === "photography" &&
                      "Accepted formats: JPG, PNG, GIF (Max 10MB)"}
                    {activeTab === "art-design" &&
                      "Accepted formats: JPG, PNG, PDF (Max 10MB)"}
                    {(activeTab === "english-editorial" ||
                      activeTab === "hindi-editorial") &&
                      "Accepted formats: DOC, DOCX, PDF, TXT (Max 5MB)"}
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                <span>
                  Submit Your {tabs.find((tab) => tab.id === activeTab)?.label}
                </span>
                <span className="submit-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; 2025 Udaan Magazine Club, GGV Bilaspur. All rights reserved.
          </p>
          <p>Empowering voices, celebrating creativity</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: "80px", // <--- ADD THIS LINE (use the actual height of your global header)
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

const cssStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }


  .header {
    background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 100%);
    padding: 2rem 2rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    top:0;
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.1"><polygon points="0,0 1000,0 1000,100"/></svg>');
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  .title {
    margin-bottom: 1rem;
  }

  .udaan-text {
    display: block;
    font-size: 4rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 4px 20px rgba(0,0,0,0.2);
    animation: slideInFromTop 1s ease-out;
    letter-spacing: -2px;
  }

  .subtitle {
    display: block;
    font-size: 1.4rem;
    color: rgba(255,255,255,0.95);
    font-weight: 300;
    margin-top: 0.5rem;
    animation: slideInFromTop 1s ease-out 0.2s both;
  }

  .tagline {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.9);
    font-weight: 400;
    animation: fadeInUp 1s ease-out 0.4s both;
  }

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .main-content {
    padding: 2rem;
    min-height: 80vh;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    transform: translateY(-3rem);
    box-shadow: 0 10px 40px rgba(55, 214, 244, 0.1);
  }

  .tab-navigation {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 1rem;
    background: white;
    border-radius: 20px;
    border: 1px solid #eee;
    box-shadow: 0 10px 40px rgba(55, 214, 244, 0.15);
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 15px;
    background: transparent;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  
  }

  .tab-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(55, 214, 244, 0.1), transparent);
    transition: left 0.6s ease;
  }

  .tab-button:hover::before {
    left: 100%;
  }

  .tab-button:hover {
    color: #37d6f4;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(55, 214, 244, 0.2);
  }

  .tab-button.active {
    background: linear-gradient(135deg, #37d6f4, #2ec5e3);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(55, 214, 244, 0.3);
  }

  .tab-icon {
    font-size: 1.2rem;
  }

  .form-container {
    background: white;
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    animation: slideUp 0.8s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .form-header h2 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 0.8rem;
    font-weight: 700;
  }

  .form-header p {
    color: #666;
    font-size: 1.1rem;
  }

  .form-section {
    margin-bottom: 2.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .form-section:last-child {
    border-bottom: none;
  }

  .form-section h3 {
    color: #37d6f4;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 1rem 1.2rem;
    border: 2px solid #e8e8e8;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #37d6f4;
    background: white;
    box-shadow: 0 0 0 4px rgba(55, 214, 244, 0.1);
    transform: translateY(-1px);
  }

  .form-group input[type="file"] {
    padding: 0.8rem;
    background: white;
    border: 2px dashed #ddd;
    cursor: pointer;
  }

  .form-group input[type="file"]:hover {
    border-color: #37d6f4;
    background: rgba(55, 214, 244, 0.02);
  }

  .file-info {
    color: #666;
    font-size: 0.85rem;
    margin-top: 0.3rem;
  }

  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 100%);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 2rem;
    position: relative;
    overflow: hidden;
  }

  .submit-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
  }

  .submit-button:hover::before {
    left: 100%;
  }

  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(55, 214, 244, 0.4);
  }

  .submit-button:active {
    transform: translateY(-1px);
  }

  .submit-icon {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }

  .submit-button:hover .submit-icon {
    transform: translateX(5px);
  }

  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
  }

  .footer-content p {
    margin: 0.5rem 0;
    opacity: 0.8;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .header {
      padding: 2rem 1rem 4rem;
    }
    
    .udaan-text {
      font-size: 2.5rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
    }
    
    .tab-navigation {
      flex-direction: column;
    }
    
    .tab-button {
      justify-content: center;
    }
    
    .form-container {
      padding: 2rem 1.5rem;
      margin: 1rem;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 1rem;
    }
    
    .form-container {
      padding: 1.5rem 1rem;
    }
    
    .udaan-text {
      font-size: 2rem;
    }
  }

  /* Smooth scrolling enhancement */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #37d6f4;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2ec5e3;
  }
`;

export default UdaanSubmissionPortal;
