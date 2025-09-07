import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Download,
  Share2,
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Tag,
} from "lucide-react";

const SubmissionSuccess = ({
  submissionData = {
    id: "SUB-2025-001",
    name: "John Doe",
    email: "john.doe@example.com",
    title: "The Digital Renaissance",
    category: "english-editorial",
    submittedAt: "2025-01-15T10:30:00Z",
    status: "pending",
  },
  onBack = () => console.log("Back clicked"),
  onNewSubmission = () => console.log("New submission clicked"),
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryInfo = (category) => {
    const categories = {
      "art-design": { label: "Art & Design", icon: "🎨", color: "#8b5cf6" },
      "english-editorial": {
        label: "English Editorial",
        icon: "📝",
        color: "#3b82f6",
      },
      "hindi-editorial": {
        label: "Hindi Editorial",
        icon: "✍️",
        color: "#f59e0b",
      },
      photography: { label: "Photography", icon: "📸", color: "#10b981" },
    };
    return categories[category] || categories["english-editorial"];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categoryInfo = getCategoryInfo(submissionData.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Submission Successful - Udaan Magazine",
          text: `I just submitted "${submissionData.title}" to Udaan Magazine!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `I just submitted "${submissionData.title}" to Udaan Magazine! 🎉`;
      navigator.clipboard.writeText(shareText);
      alert("Share text copied to clipboard!");
    }
  };

  const downloadReceipt = () => {
    const receiptData = {
      submissionId: submissionData.id,
      title: submissionData.title,
      category: categoryInfo.label,
      submittedBy: submissionData.name,
      submittedAt: formatDate(submissionData.submittedAt),
      status: submissionData.status,
    };

    const receipt = `
UDAAN MAGAZINE SUBMISSION RECEIPT
================================

Submission ID: ${receiptData.submissionId}
Title: ${receiptData.title}
Category: ${receiptData.category}
Submitted by: ${receiptData.submittedBy}
Date: ${receiptData.submittedAt}
Status: ${receiptData.status.toUpperCase()}

Thank you for your submission to Udaan Magazine!
Our editorial team will review your work and get back to you soon.

© 2025 Udaan Magazine Club, GGV Bilaspur
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([receipt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `udaan-submission-${submissionData.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="submission-success-container">
      <style>{`
        .submission-success-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ffd700;
          animation: confetti-fall 3s linear infinite;
        }

        .confetti:nth-child(1) { left: 10%; animation-delay: 0s; background: #ff6b6b; }
        .confetti:nth-child(2) { left: 20%; animation-delay: 0.5s; background: #4ecdc4; }
        .confetti:nth-child(3) { left: 30%; animation-delay: 1s; background: #45b7d1; }
        .confetti:nth-child(4) { left: 40%; animation-delay: 1.5s; background: #96ceb4; }
        .confetti:nth-child(5) { left: 50%; animation-delay: 2s; background: #ffeaa7; }
        .confetti:nth-child(6) { left: 60%; animation-delay: 2.5s; background: #dda0dd; }
        .confetti:nth-child(7) { left: 70%; animation-delay: 3s; background: #98d8c8; }
        .confetti:nth-child(8) { left: 80%; animation-delay: 3.5s; background: #f7dc6f; }
        .confetti:nth-child(9) { left: 90%; animation-delay: 4s; background: #bb8fce; }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .success-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
          text-align: center;
          transform: ${
            isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)"
          };
          opacity: ${isVisible ? "1" : "0"};
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .success-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
          border-radius: 25px;
          z-index: -1;
          animation: border-glow 2s ease-in-out infinite alternate;
        }

        @keyframes border-glow {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          animation: ${
            isVisible ? "bounce-in" : "none"
          } 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
          animation: ${isVisible ? "slide-up" : "none"} 0.8s ease-out 0.5s both;
        }

        .success-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
          animation: ${isVisible ? "slide-up" : "none"} 0.8s ease-out 0.7s both;
        }

        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .submission-details {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          text-align: left;
          animation: ${
            isVisible ? "fade-in-scale" : "none"
          } 0.8s ease-out 0.9s both;
        }

        @keyframes fade-in-scale {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .detail-icon {
          width: 20px;
          height: 20px;
          color: #667eea;
          flex-shrink: 0;
        }

        .detail-label {
          font-weight: 600;
          color: #374151;
          min-width: 100px;
        }

        .detail-value {
          color: #6b7280;
          flex: 1;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: ${categoryInfo.color}15;
          color: ${categoryInfo.color};
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid ${categoryInfo.color}30;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #fbbf2415;
          color: #d97706;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid #fbbf2430;
          text-transform: uppercase;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          animation: ${isVisible ? "slide-up" : "none"} 0.8s ease-out 1.1s both;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
          flex: 1;
          justify-content: center;
          min-width: 140px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .btn-secondary:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        .next-steps {
          background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
          border-radius: 16px;
          padding: 1.5rem;
          margin-top: 2rem;
          text-align: left;
          animation: ${
            isVisible ? "fade-in-scale" : "none"
          } 0.8s ease-out 1.3s both;
        }

        .next-steps h4 {
          color: #0277bd;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .next-steps ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .next-steps li {
          padding: 0.5rem 0;
          color: #01579b;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .next-steps li::before {
          content: '✓';
          color: #0277bd;
          font-weight: bold;
          margin-top: 0.1rem;
        }

        @media (max-width: 768px) {
          .submission-success-container {
            padding: 1rem;
          }

          .success-card {
            padding: 2rem 1.5rem;
          }

          .success-title {
            font-size: 2rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn {
            min-width: auto;
          }

          .back-button {
            position: relative;
            top: auto;
            left: auto;
            margin-bottom: 2rem;
            align-self: flex-start;
          }

          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .detail-label {
            min-width: auto;
            font-size: 0.9rem;
          }
        }
      `}</style>

      {/* Confetti Animation */}
      {showConfetti && (
        <>
          {[...Array(9)].map((_, i) => (
            <div key={i} className="confetti" />
          ))}
        </>
      )}

      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        Back to Form
      </button>

      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={40} color="white" />
        </div>

        <h1 className="success-title">Submission Successful!</h1>
        <p className="success-subtitle">
          Your creative work has been successfully submitted to Udaan Magazine.
          Our editorial team will review your submission and get back to you
          soon.
        </p>

        <div className="submission-details">
          <div className="detail-row">
            <Tag className="detail-icon" />
            <span className="detail-label">Submission ID:</span>
            <span
              className="detail-value"
              style={{ fontFamily: "monospace", fontWeight: 600 }}
            >
              {submissionData.id}
            </span>
          </div>

          <div className="detail-row">
            <FileText className="detail-icon" />
            <span className="detail-label">Title:</span>
            <span className="detail-value">{submissionData.title}</span>
          </div>

          <div className="detail-row">
            <User className="detail-icon" />
            <span className="detail-label">Submitted by:</span>
            <span className="detail-value">{submissionData.name}</span>
          </div>

          <div className="detail-row">
            <Calendar className="detail-icon" />
            <span className="detail-label">Date:</span>
            <span className="detail-value">
              {formatDate(submissionData.submittedAt)}
            </span>
          </div>

          <div className="detail-row">
            <div className="detail-icon">{categoryInfo.icon}</div>
            <span className="detail-label">Category:</span>
            <div className="category-badge">{categoryInfo.label}</div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">🔄</div>
            <span className="detail-label">Status:</span>
            <div className="status-badge">{submissionData.status}</div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={downloadReceipt}>
            <Download size={18} />
            Download Receipt
          </button>

          <button className="btn btn-secondary" onClick={handleShare}>
            <Share2 size={18} />
            Share
          </button>

          <button className="btn btn-outline" onClick={onNewSubmission}>
            <FileText size={18} />
            New Submission
          </button>
        </div>

        <div className="next-steps">
          <h4>What happens next?</h4>
          <ul>
            <li>
              Our editorial team will review your submission within 7-10
              business days
            </li>
            <li>
              You'll receive an email notification once the review is complete
            </li>
            <li>
              If selected, we'll contact you regarding publication details
            </li>
            <li>
              Keep an eye on your email for updates on your submission status
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
