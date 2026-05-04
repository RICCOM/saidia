// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { Button, TextField, Container, Typography, Box } from '@mui/material';

// const Login = () => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await authAPI.login({ phone_number: phone, password });
//       login(res.data.user, res.data.token);
//       speak("Karibu Saidia! Unakwenda kwa dashboard sasa.");
//       navigate('/dashboard');
//     } catch (err) {
//       speak("Namba au PIN si sahihi. Jaribu tena.");
//       alert("Login failed. Try again.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, textAlign: 'center' }}>
//         <Typography variant="h3" gutterBottom>Saidia</Typography>
//         <Typography variant="h6">Ingia kwenye akaunti yako</Typography>

//         <TextField
//           fullWidth
//           label="Namba ya Simu"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           margin="normal"
//           size="medium"
//         />
//         <TextField
//           fullWidth
//           label="PIN"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           margin="normal"
//           size="medium"
//         />

//         <Button 
//           variant="contained" 
//           size="large" 
//           fullWidth 
//           sx={{ mt: 3, height: 70, fontSize: '1.2rem' }}
//           onClick={handleLogin}
//         >
//           Ingia (Login)
//         </Button>

//         <Button variant="text" onClick={() => navigate('/register')} sx={{ mt: 2 }}>
//           Sina akaunti? Jisajili hapa
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { Button, TextField, Container, Typography, Box } from '@mui/material';

// const Login = () => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await authAPI.login({ phone_number: phone, password });
//       login(res.data.user, res.data.token);
//       speak(`Karibu ${res.data.user.full_name || 'Saidia'}`);
//       navigate('/dashboard');
//     } catch (err) {
//       speak("Namba au PIN si sahihi. Jaribu tena.");
//       alert("Login failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, textAlign: 'center' }}>
//         <Typography variant="h3" gutterBottom>Saidia</Typography>
//         <Typography variant="h6">Ingia kwenye akaunti yako</Typography>

//         <TextField
//           fullWidth
//           label="Namba ya Simu"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           margin="normal"
//           size="medium"
//         />
//         <TextField
//           fullWidth
//           label="PIN"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           margin="normal"
//           size="medium"
//         />

//         <Button 
//           variant="contained" 
//           size="large" 
//           fullWidth 
//           sx={{ mt: 3, height: 70, fontSize: '1.1rem' }}
//           onClick={handleLogin}
//         >
//           Ingia
//         </Button>

//         <Button variant="text" onClick={() => navigate('/register')} sx={{ mt: 2 }}>
//           Sina akaunti? Jisajili
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { authAPI } from '../services/api';
import { speak } from '../utils/voice';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { t, toggleLanguage, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    speak(language === 'sw' ? "Karibu Saidia. Ingia na namba yako" : "Welcome to Saidia. Sign in");
  }, [language]);

  const handleLogin = async () => {
    try {
      const res = await authAPI.login({ phone_number: phone, password });
      login(res.data.user, res.data.token);
      speak(language === 'sw' ? `Karibu ${res.data.user.full_name || ''}` : `Welcome ${res.data.user.full_name || ''}`);
      navigate('/dashboard');
    } catch (err) {
      speak(language === 'sw' ? "Namba au PIN si sahihi" : "Invalid credentials");
    }
  };

  return (
    <Box className="app-container">
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 420, p: 5, borderRadius: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ width: 90, height: 90, bgcolor: '#10b981', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
            ♿
          </Box>
          <Typography variant="h4" fontWeight="bold" color="#10b981">Saidia</Typography>
          <Typography variant="body2" color="text.secondary">Msaidizi wa Sauti kwa M-Pesa</Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          {language === 'sw' ? 'Karibu! Ingia na Nambari yako' : 'Welcome! Sign in with your phone'}
        </Typography>

        <TextField fullWidth label={t('phone_number')} value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />
        <TextField fullWidth label={t('pin')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />

        <Button 
          variant="contained" 
          fullWidth 
          size="large"
          sx={{ mt: 3, height: 56, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
          onClick={handleLogin}
        >
          {t('login')}
        </Button>

        <Button variant="text" onClick={() => navigate('/register')} sx={{ mt: 2 }}>
          {language === 'sw' ? 'Sina akaunti? Jisajili' : "Don't have an account? Register"}
        </Button>

        <Button onClick={toggleLanguage} variant="outlined" size="small" sx={{ mt: 3 }}>
          {language === 'sw' ? 'English' : 'Kiswahili'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;