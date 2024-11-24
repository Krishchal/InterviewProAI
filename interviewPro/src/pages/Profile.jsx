
import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [expertise, setExpertise] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [userExpertise, setUserExpertise] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data (replace with API call if needed)
    const storedUsername = localStorage.getItem('loggedInUser') || 'Guest';
    const storedUseremail = localStorage.getItem('loggedInEmail') || 'NA';
    setUserData({ username: storedUsername, email: storedUseremail });

    // Fetch user expertise from backend
    fetchUserExpertise();
  }, []);

  const fetchUserExpertise = async () => {
    try {
      const { data } = await axios.get('http://localhost:8001/api/getUserExpertise');
      setUserExpertise(data); // Load existing expertise and level
      setEditMode(true); // Enable edit mode if expertise exists
    } catch (error) {
      console.error('Error fetching expertise:', error.message);
    }
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or edit expertise
  const handleAddEditExpertise = async () => {
    if (!expertise) {
      toast.error('Please enter expertise');
      return;
    }

    try {
      const endpoint = editMode
        ? `http://localhost:8001/api/updateUserExpertise/${userExpertise._id}`
        : 'http://localhost:8001/api/createUserExpertise';

      const method = editMode ? 'put' : 'post';

      const response = await axios[method](endpoint, {
        expertise: [expertise],
        level,
      });

      if (response.status === 200) {
        toast.success(editMode ? 'Expertise updated successfully!' : 'Expertise added successfully!');
        setUserExpertise(response.data); // Update displayed expertise
        setExpertise(''); // Reset form
        setLevel('Beginner');
        setEditMode(true); // Enable edit mode after adding
      }
    } catch (error) {
      toast.error('Failed to add/update expertise');
      console.error('Error adding/updating expertise:', error.message);
    }
  };

  // Download profile as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Candidate Profile', 20, 20);
    doc.text(`Username: ${userData.username}`, 20, 30);
    doc.text(`Email: ${userData.email}`, 20, 40);

    if (userExpertise) {
      doc.text(`Expertise: ${userExpertise.expertise.join(', ')}`, 20, 50);
      doc.text(`Level: ${userExpertise.level}`, 20, 60);
    }

    doc.save('profile.pdf');
  };

  return (
    <div className="profile-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="profile-card">
        {/* Left Side */}
        <div className="left-side">
          <div className="avatar-container">
            <label htmlFor="profile-upload" className="upload-label">
              <img
                src={
                  profileImage || 'https://via.placeholder.com/150?text=Upload'
                }
                alt="Profile Avatar"
                className="profile-avatar"
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <h3>Candidate Profile</h3>
          <div className="user-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
          <button className="pdf-btn" onClick={handleDownloadPDF}>
            Download PDF
          </button>
          {userExpertise && (
            <div className="expertise-display">
              <p><strong>Expertise:</strong> {userExpertise.expertise.join(', ')}</p>
              <p><strong>Level:</strong> {userExpertise.level}</p>
            </div>
          )}
        </div>

        {/* Expertise Section */}
        <div className="right-side">
          <h4>{editMode ? 'Edit Expertise' : 'Add Expertise'}</h4>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="form-input"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="form-select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <button className="add-btn" onClick={handleAddEditExpertise}>
            {editMode ? 'Edit Expertise' : 'Add Expertise'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
