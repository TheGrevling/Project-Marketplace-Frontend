import '../SignIn/SignIn.css'
import { Link, useNavigate } from 'react-router-dom';
import { PostData, environment } from '../../../Services/FetchService';
import { DataContext } from '../../../App';
import { useContext, useState } from 'react';


function SignUp() {
  const navigate = useNavigate()
  const dataContext = useContext(DataContext)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'User'
  });

  // Event handler to update form data when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const errorOccurred = await PostData(environment + '/register', formData, dataContext.updateUserAndSetToken);
    setFormData({
      email: '',
      username: '',
      password: '',
      role: 'User'
    })
    
    if (!errorOccurred) {
      navigate("/");
    }
  };

  return (
    <div className='page'>
      <div className='signin-view'>
      <div className='signin-container-top'>
          <div>Sign Up</div>
        </div>
        <div className='signin-container'>
          <form onSubmit={handleSubmit} className='signin-form'>
            <div className='form-field'>
              <label htmlFor="username">Username:</label>
              <input
                className='custom-input'
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-field'>
              <label htmlFor="email">Email:</label>
              <input
                className='custom-input'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-field'>
              <label htmlFor="password">Password:</label>
              <input
                className='custom-input'
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className='button-submit'>Submit</button>
          </form>

          <Link to="/sign-in">
            Login to existing account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp