import React, { useState, useEffect } from "react";
import SubmissionSuccess from "./SubmissionSuccess";
const UdaanSubmissionPortal = () => {
  const [activeTab, setActiveTab] = useState("art-design");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [currentView, setCurrentView] = useState("form");
  const [submissionResult, setSubmissionResult] = useState(null);
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

  // Backend API Configuration - Update this URL with your deployed Strapi backend
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:1337/api";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-hide status messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

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

    // Clear any previous status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setStatusMessage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        file: null,
      }));
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setStatusMessage("File size must be less than 10MB");
      setSubmitStatus("error");
      e.target.value = "";
      return;
    }

    // Validate file type based on category
    const allowedTypes = {
      photography: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ],
      "art-design": [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
      ],
      "english-editorial": [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ],
      "hindi-editorial": [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ],
    };

    if (
      allowedTypes[activeTab] &&
      !allowedTypes[activeTab].includes(file.type)
    ) {
      setStatusMessage(
        `Invalid file type for ${
          tabs.find((tab) => tab.id === activeTab)?.label
        }. Please check allowed formats.`
      );
      setSubmitStatus("error");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "degree",
      "department",
      "year",
      "title",
      "content",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    if (missingFields.length > 0) {
      setStatusMessage(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      setSubmitStatus("error");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage("Please enter a valid email address");
      setSubmitStatus("error");
      return false;
    }

    // Photography category requires file
    if (activeTab === "photography" && !formData.file) {
      setStatusMessage("Photography submissions require a file upload");
      setSubmitStatus("error");
      return false;
    }

    return true;
  };

  // Submit form to Strapi backend
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage("");

    try {
      // Create FormData for multipart upload
      const submitData = new FormData();

      // Prepare form data according to Strapi's expected format
      const jsonData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        degree: formData.degree,
        department: formData.department.trim(),
        year: formData.year,
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        content: formData.content.trim(),
        category: activeTab,
        statuses: "pending",
        submittedAt: new Date().toISOString(),
      };

      // Append data as JSON string (Strapi requirement)
      submitData.append("data", JSON.stringify(jsonData));

      // Append file if exists (Strapi will handle Cloudinary upload)
      if (formData.file) {
        submitData.append("files.file", formData.file);
      }

      // Submit to Strapi API
      const response = await fetch(`${API_BASE_URL}/submissions`, {
        method: "POST",
        body: submitData,
        // Don't set Content-Type header - let browser set it with boundary
      });

      if (!response.ok) {
        let errorMessage = "Submission failed";
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;

          // Handle specific validation errors
          if (errorData.error?.details?.errors) {
            const validationErrors = errorData.error.details.errors
              .map((err) => err.message)
              .join(", ");
            errorMessage = `Validation Error: ${validationErrors}`;
          }
        } catch (e) {
          // If error response isn't JSON, use status text
          errorMessage = `${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      const submissionData = {
        id: result.data?.id || `SUB-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        title: formData.title,
        category: activeTab,
        submittedAt: new Date().toISOString(),
        status: "pending",
      };

      setSubmissionResult(submissionData);
      setCurrentView("success");
      setSubmitStatus("success");
      setStatusMessage(
        "Submission successful! Thank you for your contribution."
      );

      // Reset form after successful submission
      setFormData({
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

      // Reset file input
      const fileInput = document.getElementById("file");
      if (fileInput) fileInput.value = "";

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setStatusMessage(`Submission failed: ${error.message}`);

      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBackToForm = () => {
    setCurrentView("form");
    setSubmissionResult(null);
  };
  const handleNewSubmission = () => {
    setCurrentView("form");
    setSubmissionResult(null);
    setActiveTab("art-design");
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
  if (currentView === "success" && submissionResult) {
    return (
      <SubmissionSuccess
        submissionData={submissionResult}
        onBack={handleBackToForm}
        onNewSubmission={handleNewSubmission}
      />
    );
  }

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {/* Status Messages */}
      {submitStatus && (
        <div className={`status-message ${submitStatus}`}>
          <div className="status-content">
            <span className="status-icon">
              {submitStatus === "success" ? "✅" : "❌"}
            </span>
            <span className="status-text">{statusMessage}</span>
            <button
              className="status-close"
              onClick={() => {
                setSubmitStatus(null);
                setStatusMessage("");
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`header ${isVisible ? "fade-in" : ""}`}>
        <div className="header-content">
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
                disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      placeholder="Enter your full name"
                      maxLength="100"
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      placeholder="Your phone number"
                      maxLength="15"
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
                      disabled={isSubmitting}
                    >
                      <option value="B.Tech in Artificial Intelligence & Data Science">
                        B.Tech in Artificial Intelligence & Data Science
                      </option>
                      <option value="B.Tech in VFX & Animation">
                        B.Tech in VFX & Animation
                      </option>
                      <option value="B.C.A.">B.C.A.</option>
                      <option value="B.Sc. (Honours) Physics">
                        B.Sc. (Honours) Physics
                      </option>
                      <option value="B.Sc. (Honours) Botany">
                        B.Sc. (Honours) Botany
                      </option>
                      <option value="B.Sc. (Honours) Chemistry">
                        B.Sc. (Honours) Chemistry
                      </option>
                      <option value="B.Com. (Honours)">B.Com. (Honours)</option>
                      <option value="B.Sc. (Honours) Computer Science">
                        B.Sc. (Honours) Computer Science
                      </option>
                      <option value="B.A. (Honours) Economics">
                        B.A. (Honours) Economics
                      </option>
                      <option value="B.Sc. (Honours) Electronics">
                        B.Sc. (Honours) Electronics
                      </option>
                      <option value="B.A. (Honours) English">
                        B.A. (Honours) English
                      </option>
                      <option value="B.A. (Honours) Hindi">
                        B.A. (Honours) Hindi
                      </option>
                      <option value="B.A. (Honours) History">
                        B.A. (Honours) History
                      </option>
                      <option value="B.A. (Honours) Journalism and Mass Communication">
                        B.A. (Honours) Journalism and Mass Communication
                      </option>
                      <option value="B.Sc. (Honours) Mathematics">
                        B.Sc. (Honours) Mathematics
                      </option>
                      <option value="B.A. (Honours) Political Science">
                        B.A. (Honours) Political Science
                      </option>
                      <option value="B.Sc. (Honours) Rural Technology And Social Development">
                        B.Sc. (Honours) Rural Technology And Social Development
                      </option>
                      <option value="B.Sc. (Honours) Zoology">
                        B.Sc. (Honours) Zoology
                      </option>
                      <option value="B.Sc. (Honours) Forensic Science">
                        B.Sc. (Honours) Forensic Science
                      </option>
                      <option value="B.A. L.L.B.">B.A. L.L.B.</option>
                      <option value="B.Com. L.L.B.">B.Com. L.L.B.</option>
                      <option value="B.S.W.">B.S.W.</option>
                      <option value="B.Sc. (Forestry)">B.Sc. (Forestry)</option>
                      <option value="B.Ed.">B.Ed.</option>
                      <option value="B.Lib.I.Sc.">B.Lib.I.Sc.</option>
                      <option value="B.P.Ed.">B.P.Ed.</option>
                      <option value="B.Pharm. (Pharmaceutical Sciences)">
                        B.Pharm. (Pharmaceutical Sciences)
                      </option>
                      <option value="B.Ed. Spl. Ed. (H.I.)">
                        B.Ed. Spl. Ed. (H.I.)
                      </option>
                      <option value="B.Ed. Spl. Ed. (L.D.)">
                        B.Ed. Spl. Ed. (L.D.)
                      </option>
                      <option value="B.Tech. Electrical Engineering">
                        B.Tech. Electrical Engineering
                      </option>
                      <option value="B.Tech. Chemical Engineering">
                        B.Tech. Chemical Engineering
                      </option>
                      <option value="B.Tech. Civil Engineering">
                        B.Tech. Civil Engineering
                      </option>
                      <option value="B.Tech. Computer Science And Engineering">
                        B.Tech. Computer Science And Engineering
                      </option>
                      <option value="B.Tech. Electronics and Communication Engineering">
                        B.Tech. Electronics and Communication Engineering
                      </option>
                      <option value="B.Tech. Industrial And Production Engineering">
                        B.Tech. Industrial And Production Engineering
                      </option>
                      <option value="B.Tech. Information Technology">
                        B.Tech. Information Technology
                      </option>
                      <option value="B.Tech. Mechanical Engineering">
                        B.Tech. Mechanical Engineering
                      </option>
                      <option value="B.Sc. (Honours) Biotechnology">
                        B.Sc. (Honours) Biotechnology
                      </option>
                      <option value="B.A. (Honours) Anthropology And Tribal Development">
                        B.A. (Honours) Anthropology And Tribal Development
                      </option>
                      <option value="B.Sc. (Honours) Anthropology And Tribal Development">
                        B.Sc. (Honours) Anthropology And Tribal Development
                      </option>
                      <option value="M.Pharm. (Pharmacology)">
                        M.Pharm. (Pharmacology)
                      </option>
                      <option value="M.Pharm. (Pharmacognosy)">
                        M.Pharm. (Pharmacognosy)
                      </option>
                      <option value="M.Pharm. (Pharmaceutical Chemistry)">
                        M.Pharm. (Pharmaceutical Chemistry)
                      </option>
                      <option value="M.Pharm. (Pharmaceutics)">
                        M.Pharm. (Pharmaceutics)
                      </option>
                      <option value="L.L.M.">L.L.M.</option>
                      <option value="M.P.Ed.">M.P.Ed.</option>
                      <option value="M.Ed.">M.Ed.</option>
                      <option value="M.B.A.">M.B.A.</option>
                      <option value="M.A. Anthropology And Tribal Development">
                        M.A. Anthropology And Tribal Development
                      </option>
                      <option value="M.Tech. Mechanical Engineering">
                        M.Tech. Mechanical Engineering
                      </option>
                      <option value="M.Tech. Information Technology">
                        M.Tech. Information Technology
                      </option>
                      <option value="M.Tech. Industrial And Production Engineering">
                        M.Tech. Industrial And Production Engineering
                      </option>
                      <option value="M.Tech. Electronics And Communication Engineering">
                        M.Tech. Electronics And Communication Engineering
                      </option>
                      <option value="M.Tech. Computer Science And Engineering">
                        M.Tech. Computer Science And Engineering
                      </option>
                      <option value="M.Tech. Civil Engineering">
                        M.Tech. Civil Engineering
                      </option>
                      <option value="M.Tech. Chemical Engineering">
                        M.Tech. Chemical Engineering
                      </option>
                      <option value="M.Com.">M.Com.</option>
                      <option value="M.Sc. Forensic Science">
                        M.Sc. Forensic Science
                      </option>
                      <option value="M.A. Political Science">
                        M.A. Political Science
                      </option>
                      <option value="M.Lib.I.Sc.">M.Lib.I.Sc.</option>
                      <option value="M.A. Journalism and Mass Communication">
                        M.A. Journalism and Mass Communication
                      </option>
                      <option value="M.A. English">M.A. English</option>
                      <option value="M.A. Hindi">M.A. Hindi</option>
                      <option value="M.A. Economics">M.A. Economics</option>
                      <option value="M.A. History">M.A. History</option>
                      <option value="M.Sc. Anthropology And Tribal Development">
                        M.Sc. Anthropology And Tribal Development
                      </option>
                      <option value="M.Sc. Forestry">M.Sc. Forestry</option>
                      <option value="M.Sc. Rural Technology And Social Development">
                        M.Sc. Rural Technology And Social Development
                      </option>
                      <option value="M.C.A.">M.C.A.</option>
                      <option value="M.Sc. Computer Science">
                        M.Sc. Computer Science
                      </option>
                      <option value="M.Sc. Biotechnology">
                        M.Sc. Biotechnology
                      </option>
                      <option value="M.Sc. Chemistry">M.Sc. Chemistry</option>
                      <option value="M.Sc. Botany">M.Sc. Botany</option>
                      <option value="M.Sc. Zoology">M.Sc. Zoology</option>
                      <option value="M.Sc. Mathematics">
                        M.Sc. Mathematics
                      </option>
                      <option value="M.Sc. Electronics">
                        M.Sc. Electronics
                      </option>
                      <option value="M.Sc. Physics">M.Sc. Physics</option>
                      <option value="M.S.W.">M.S.W.</option>
                      <option value="M.Sc. (Microbiology)">
                        M.Sc. (Microbiology)
                      </option>
                      <option value="Ph.D. in Management Studies">
                        Ph.D. in Management Studies
                      </option>
                      <option value="Ph.D. in Library And in Information Science">
                        Ph.D. in Library And in Information Science
                      </option>
                      <option value="Ph.D. in Social Work">
                        Ph.D. in Social Work
                      </option>
                      <option value="Ph.D. in Education">
                        Ph.D. in Education
                      </option>
                      <option value="Ph.D. in Chemistry">
                        Ph.D. in Chemistry
                      </option>
                      <option value="Ph.D. in Physics">Ph.D. in Physics</option>
                      <option value="Ph.D. in Physical Education">
                        Ph.D. in Physical Education
                      </option>
                      <option value="Ph.D. in Electronics">
                        Ph.D. in Electronics
                      </option>
                      <option value="Ph.D. in Forensic Science">
                        Ph.D. in Forensic Science
                      </option>
                      <option value="Ph.D. in Biotechnology">
                        Ph.D. in Biotechnology
                      </option>
                      <option value="Ph.D. in Botany">Ph.D. in Botany</option>
                      <option value="Ph.D. in Zoology">Ph.D. in Zoology</option>
                      <option value="Ph.D. in Mathematics">
                        Ph.D. in Mathematics
                      </option>
                      <option value="Ph.D. in Forestry">
                        Ph.D. in Forestry
                      </option>
                      <option value="Ph.D. in Rural Technology And in Social Development">
                        Ph.D. in Rural Technology And in Social Development
                      </option>
                      <option value="Ph.D. in Electronics And Communication in Engineering">
                        Ph.D. in Electronics And Communication in Engineering
                      </option>
                      <option value="Ph.D. in Industrial And in Production Engineering">
                        Ph.D. in Industrial And in Production Engineering
                      </option>
                      <option value="Ph.D. in Civil Engineering">
                        Ph.D. in Civil Engineering
                      </option>
                      <option value="Ph.D. in Mechanical Engineering">
                        Ph.D. in Mechanical Engineering
                      </option>
                      <option value="Ph.D. in Computer Science And in Engineering">
                        Ph.D. in Computer Science And in Engineering
                      </option>
                      <option value="Ph.D. in Anthropology And in Information Technology">
                        Ph.D. in Anthropology And in Information Technology
                      </option>
                      <option value="Ph.D. in Commerce">
                        Ph.D. in Commerce
                      </option>
                      <option value="Ph.D. in Computer Science">
                        Ph.D. in Computer Science
                      </option>
                      <option value="Ph.D. in Pharmaceutical in Sciences">
                        Ph.D. in Pharmaceutical in Sciences
                      </option>
                      <option value="Ph.D. in English">Ph.D. in English</option>
                      <option value="Ph.D. in Journalism And Mass in Communication">
                        Ph.D. in Journalism And Mass in Communication
                      </option>
                      <option value="Ph.D. in Hindi">Ph.D. in Hindi</option>
                      <option value="Ph.D. in Chemical Engineering">
                        Ph.D. in Chemical Engineering
                      </option>
                      <option value="Ph.D. in Political Science">
                        Ph.D. in Political Science
                      </option>
                      <option value="Ph.D. in Economics">
                        Ph.D. in Economics
                      </option>
                      <option value="Ph.D. in Information Technology">
                        Ph.D. in Information Technology
                      </option>
                      <option value="Ph.D. in Law">Ph.D. in Law</option>
                      <option value="P.G. Diploma in Computational Linguistics">
                        P.G. Diploma in Computational Linguistics
                      </option>
                      <option value="Diploma in French">
                        Diploma in French
                      </option>
                      <option value="Diploma in German">
                        Diploma in German
                      </option>
                      <option value="Diploma in Pharmacy">
                        Diploma in Pharmacy
                      </option>
                      <option value="Certificate Course in Computational Linguistics (CCCL)">
                        Certificate Course in Computational Linguistics (CCCL)
                      </option>
                      <option value="Other">Other</option>
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
                      disabled={isSubmitting}
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                      maxLength="100"
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
                      disabled={isSubmitting}
                    >
                      <option value="">Select year</option>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                      <option value="Fifth Year">Fifth Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Other">Other</option>
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
                    disabled={isSubmitting}
                    placeholder="Enter the title of your submission"
                    maxLength="200"
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    placeholder={getContentPlaceholder()}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">
                    Upload File{" "}
                    {activeTab === "photography" ? "*" : "(Optional)"}
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
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
                      "Accepted formats: JPG, PNG, GIF, WebP (Max 10MB)"}
                    {activeTab === "art-design" &&
                      "Accepted formats: JPG, PNG, GIF, WebP, PDF (Max 10MB)"}
                    {(activeTab === "english-editorial" ||
                      activeTab === "hindi-editorial") &&
                      "Accepted formats: DOC, DOCX, PDF, TXT (Max 10MB)"}
                  </small>
                </div>
              </div>

              <button
                type="button"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "Submitting..."
                    : `Submit Your ${
                        tabs.find((tab) => tab.id === activeTab)?.label
                      }`}
                </span>
                {!isSubmitting && <span className="submit-icon">→</span>}
                {isSubmitting && <span className="spinner">⟳</span>}
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
  /* Enhanced Light Theme CSS for Udaan Submission Portal */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  scroll-behavior: smooth;
  overflow-x: hidden;
  line-height: 1.6;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header Enhancements */
.header {
  background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 50%, #1ba8c7 100%);
  padding: 2rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  top: 0;
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.08"><polygon points="0,0 1000,0 1000,100"/></svg>');
  animation: float 6s ease-in-out infinite;
}

.header::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
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
  font-weight: 900;
  color: white;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
  animation: slideInFromTop 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  letter-spacing: -2px;
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  display: block;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 300;
  margin-top: 0.5rem;
  animation: slideInFromTop 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  animation: fadeInUp 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  display: inline-block;
  padding-bottom: 0.5rem;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-80px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Main Content Enhancements */
.main-content {
  padding: 2rem;
  min-height: 80vh;
  background: linear-gradient(to bottom, #f8fcff 0%, #ffffff 100%);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  transform: translateY(-3rem);
  box-shadow: 0 15px 60px rgba(55, 214, 244, 0.15);
  border-radius: 24px;
  overflow: hidden;
  background: white;
}

/* Status Messages Enhancement */
.status-message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.status-message.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-message.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.status-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  margin-left: auto;
  transition: background 0.2s ease;
}

.status-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

/* Tab Navigation Enhancements */
.tab-navigation {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 252, 255, 0.9) 100%);
  border-radius: 20px;
  border: 1px solid rgba(55, 214, 244, 0.1);
  box-shadow: 0 15px 50px rgba(55, 214, 244, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
}

.tab-navigation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(55, 214, 244, 0.03), transparent);
  border-radius: 20px;
  pointer-events: none;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  border: 2px solid transparent;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(55, 214, 244, 0.15), transparent);
  transition: left 0.6s ease;
}

.tab-button:hover::before {
  left: 100%;
}

.tab-button:hover {
  color: #37d6f4;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 35px rgba(55, 214, 244, 0.25);
  border-color: rgba(55, 214, 244, 0.3);
  background: rgba(255, 255, 255, 0.9);
}

.tab-button.active {
  background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 50%, #1ba8c7 100%);
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(55, 214, 244, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.tab-icon {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.tab-button:hover .tab-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Form Container Enhancements */
.form-container {
  background: linear-gradient(135deg, #ffffff 0%, #fafcff 100%);
  border-radius: 24px;
  padding: 3.5rem;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(55, 214, 244, 0.05);
  animation: slideUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
}

.form-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(55, 214, 244, 0.02) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.form-header h2 {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2d3748 0%, #37d6f4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-header p {
  color: #718096;
  font-size: 1.2rem;
  font-weight: 400;
}

/* Form Sections Enhancement */
.form-section {
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #f7fafc;
  position: relative;
  z-index: 1;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h3 {
  color: #37d6f4;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  padding-left: 1rem;
}

.form-section h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 30px;
  background: linear-gradient(135deg, #37d6f4, #2ec5e3);
  border-radius: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  animation: fadeInUp 0.6s ease-out;
}

.form-group label {
  font-weight: 700;
  color: #2d3748;
  font-size: 1rem;
  position: relative;
  padding-left: 0.5rem;
}

/* Input Field Enhancements */
.form-group input,
.form-group select,
.form-group textarea {
  padding: 1.2rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: linear-gradient(135deg, #ffffff 0%, #fafcff 100%);
  font-family: inherit;
  position: relative;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #37d6f4;
  background: #ffffff;
  box-shadow: 
    0 0 0 4px rgba(55, 214, 244, 0.1),
    0 8px 25px rgba(55, 214, 244, 0.15);
  transform: translateY(-2px) scale(1.01);
}

.form-group input:hover,
.form-group select:hover,
.form-group textarea:hover {
  border-color: #cbd5e0;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

/* File Input Enhancement */
.form-group input[type="file"] {
  padding: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
  border: 3px dashed #cbd5e0;
  cursor: pointer;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.form-group input[type="file"]:hover {
  border-color: #37d6f4;
  background: linear-gradient(135deg, #ffffff 0%, rgba(55, 214, 244, 0.03) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(55, 214, 244, 0.1);
}

.form-group input[type="file"]:focus {
  border-color: #37d6f4;
  box-shadow: 0 0 0 4px rgba(55, 214, 244, 0.1);
}

.file-info {
  color: #718096;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
  padding-left: 0.5rem;
}

/* Submit Button Enhancement */
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 2.5rem;
  background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 50%, #1ba8c7 100%);
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(55, 214, 244, 0.3);
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 50px rgba(55, 214, 244, 0.4);
  background: linear-gradient(135deg, #2ec5e3 0%, #1ba8c7 50%, #0e7e9b 100%);
}

.submit-button:active {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 0 10px 30px rgba(55, 214, 244, 0.3);
}

.submit-button.submitting {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.submit-icon {
  font-size: 1.4rem;
  transition: transform 0.3s ease;
}

.submit-button:hover .submit-icon {
  transform: translateX(8px);
}

.spinner {
  animation: spin 1s linear infinite;
  font-size: 1.4rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Footer Enhancement */
.footer {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  text-align: center;
  padding: 3rem 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #37d6f4, #2ec5e3, #37d6f4);
}

.footer-content p {
  margin: 0.8rem 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.footer-content p:first-child {
  font-weight: 600;
}

/* Responsive Design Enhancements */
@media (max-width: 768px) {
  .header {
    padding: 2rem 1rem 4rem;
  }
  
  .udaan-text {
    font-size: 2.8rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
  
  .tab-navigation {
    flex-direction: column;
    padding: 1rem;
  }
  
  .tab-button {
    justify-content: center;
    padding: 1rem 2rem;
  }
  
  .form-container {
    padding: 2.5rem 2rem;
    margin: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem;
  }
  
  .form-container {
    padding: 2rem 1.5rem;
  }
  
  .udaan-text {
    font-size: 2.2rem;
  }
  
  .status-message {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

/* Enhanced smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar enhancement */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #37d6f4 0%, #2ec5e3 100%);
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(55, 214, 244, 0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2ec5e3 0%, #1ba8c7 100%);
}

/* Loading Animation for Form Elements */
.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #f7fafc;
}

/* Focus-visible for better accessibility */
.tab-button:focus-visible,
.submit-button:focus-visible {
  outline: 3px solid rgba(55, 214, 244, 0.5);
  outline-offset: 2px;
}

/* Micro-interactions */
.form-group:hover {
  transform: translateY(-1px);
}

.form-section:hover h3::before {
  height: 35px;
  transition: height 0.3s ease;
}
`;

export default UdaanSubmissionPortal;
