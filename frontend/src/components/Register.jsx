// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { Button, TextField, Container, Typography, Box, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// const Register = () => {
//   const [form, setForm] = useState({
//     phone_number: '',
//     password: '',
//     role: 'PRINCIPAL',
//     full_name: '',
//     ncpwd_card_number: ''
//   });

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await authAPI.register(form);
//       speak("Usajili umefanikiwa! Karibu kwa Saidia.");
//       login(res.data.user, res.data.token || "temp-token");
//       navigate('/dashboard');
//     } catch (err) {
//       speak("Usajili haukufanikiwa. Angalia maelezo.");
//       alert("Registration failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 6, textAlign: 'center' }}>
//         <Typography variant="h4">Jisajili kwa Saidia</Typography>

//         <TextField fullWidth label="Namba ya Simu" name="phone_number" margin="normal" value={form.phone_number} onChange={(e) => setForm({...form, phone_number: e.target.value})} />
//         <TextField fullWidth label="Jina Kamili" name="full_name" margin="normal" value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} />
//         <TextField fullWidth label="PIN" type="password" name="password" margin="normal" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <RadioGroup row name="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
//             <FormControlLabel value="PRINCIPAL" control={<Radio />} label="Mmiliki" />
//             <FormControlLabel value="CAREGIVER" control={<Radio />} label="Msaidizi" />
//           </RadioGroup>
//         </FormControl>

//         {form.role === 'PRINCIPAL' && (
//           <TextField fullWidth label="Namba ya Kadi ya NCPWD" name="ncpwd_card_number" margin="normal" value={form.ncpwd_card_number} onChange={(e) => setForm({...form, ncpwd_card_number: e.target.value})} />
//         )}

//         <Button variant="contained" size="large" fullWidth sx={{ mt: 4, height: 70 }} onClick={handleRegister}>
//           Jisajili
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Register;
// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { Button, TextField, Container, Typography, Box, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// const Register = () => {
//   const [form, setForm] = useState({
//     phone_number: '',
//     password: '',
//     role: 'PRINCIPAL',
//     full_name: '',
//     ncpwd_card_number: ''
//   });

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await authAPI.register(form);
//       speak("Usajili umefanikiwa! Karibu Saidia.");
//       login(res.data.user, res.data.token || "temp");
//       navigate('/dashboard');
//     } catch (err) {
//       speak("Usajili umeshindwa. Angalia maelezo.");
//       alert("Registration failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 6, textAlign: 'center' }}>
//         <Typography variant="h4">Jisajili kwa Saidia</Typography>

//         <TextField fullWidth label="Namba ya Simu" name="phone_number" margin="normal" value={form.phone_number} onChange={(e) => setForm({...form, phone_number: e.target.value})} />
//         <TextField fullWidth label="Jina Kamili" name="full_name" margin="normal" value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} />
//         <TextField fullWidth label="PIN" type="password" name="password" margin="normal" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <RadioGroup row name="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
//             <FormControlLabel value="PRINCIPAL" control={<Radio />} label="Mmiliki" />
//             <FormControlLabel value="CAREGIVER" control={<Radio />} label="Msaidizi" />
//           </RadioGroup>
//         </FormControl>

//         {form.role === 'PRINCIPAL' && (
//           <TextField fullWidth label="Namba ya Kadi ya NCPWD" name="ncpwd_card_number" margin="normal" value={form.ncpwd_card_number} onChange={(e) => setForm({...form, ncpwd_card_number: e.target.value})} />
//         )}

//         <Button variant="contained" size="large" fullWidth sx={{ mt: 4, height: 70 }} onClick={handleRegister}>
//           Jisajili
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Register;
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { authAPI } from '../services/api';
import { speak } from '../utils/voice';
import { Button, TextField, Container, Typography, Box, FormControl, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({
    phone_number: '',
    password: '',
    role: 'PRINCIPAL',
    full_name: '',
    ncpwd_card_number: ''
  });

  const { login } = useContext(AuthContext);
  const { t, toggleLanguage, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await authAPI.register(form);
      speak(language === 'sw' ? "Usajili umefanikiwa" : "Registration successful");
      login(res.data.user, res.data.token || "temp");
      navigate('/dashboard');
    } catch (err) {
      speak(language === 'sw' ? "Usajili umeshindwa" : "Registration failed");
    }
  };

  return (
    <Box className="app-container">
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 420, p: 5, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Jisajili kwa Saidia</Typography>

        <TextField fullWidth label={t('phone_number')} name="phone_number" margin="normal" value={form.phone_number} onChange={(e) => setForm({...form, phone_number: e.target.value})} />
        <TextField fullWidth label={t('full_name')} name="full_name" margin="normal" value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} />
        <TextField fullWidth label={t('pin')} type="password" name="password" margin="normal" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <RadioGroup row name="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
            <FormControlLabel value="PRINCIPAL" control={<Radio />} label={t('principal')} />
            <FormControlLabel value="CAREGIVER" control={<Radio />} label={t('caregiver')} />
          </RadioGroup>
        </FormControl>

        {form.role === 'PRINCIPAL' && (
          <TextField fullWidth label={t('ncpwd_card')} name="ncpwd_card_number" margin="normal" value={form.ncpwd_card_number} onChange={(e) => setForm({...form, ncpwd_card_number: e.target.value})} />
        )}

        <Button variant="contained" fullWidth size="large" sx={{ mt: 4, height: 56, bgcolor: '#10b981' }} onClick={handleRegister}>
          {t('register')}
        </Button>

        <Button onClick={toggleLanguage} variant="outlined" size="small" sx={{ mt: 3 }}>
          {language === 'sw' ? 'English' : 'Kiswahili'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;