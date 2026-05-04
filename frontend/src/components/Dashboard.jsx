// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { speak } from '../utils/voice';
// import { Button, Container, Typography, Box, Grid } from '@mui/material';

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     speak(`Karibu ${user?.full_name?.split(" ")[0] || "Saidia"}`);
//   }, [user]);

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="h4">Karibu Saidia</Typography>

//         <Grid container spacing={3} sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }} onClick={() => speak("Unataka kutuma pesa")}>
//               💰 Tuma Pesa
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }} onClick={() => speak("Nunua airtime")}>
//               📱 Nunua Airtime
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }}>
//               📄 Lipa Bill
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="outlined" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }}>
//               📜 Historia
//             </Button>
//           </Grid>
//         </Grid>

//         <Button variant="text" color="error" sx={{ mt: 6 }} onClick={logout}>
//           Toka
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;
// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { speak } from '../utils/voice';
// import { Button, Container, Typography, Box, Grid } from '@mui/material';

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) speak(`Karibu ${user.full_name?.split(' ')[0] || 'Saidia'}`);
//   }, [user]);

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="h4">Karibu Saidia</Typography>

//         <Grid container spacing={3} sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }} onClick={() => navigate('/transaction')}>
//               💰 Tuma Pesa
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }}>
//               📱 Nunua Airtime
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="contained" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }}>
//               📄 Lipa Bill
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button variant="outlined" size="large" fullWidth sx={{ height: 90, fontSize: '1.2rem' }}>
//               📜 Historia
//             </Button>
//           </Grid>
//         </Grid>

//         <Button variant="text" color="error" sx={{ mt: 6 }} onClick={logout}>
//           Toka (Logout)
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { speak } from '../utils/voice';
import { startVoiceNavigation, stopVoiceNavigation } from '../utils/voiceNavigation';
import { Button, Typography, Box, Paper, Grid, Switch, FormControlLabel } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, toggleLanguage, language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Welcome message
  useEffect(() => {
    if (user) {
      speak(language === 'sw' 
        ? `Karibu ${user.full_name?.split(' ')[0] || ''}` 
        : `Welcome ${user.full_name?.split(' ')[0] || ''}`
      );
    }
  }, [user, language]);

  const toggleVoiceNavigation = () => {
    if (!voiceEnabled) {
      startVoiceNavigation({ navigate, language });
      setVoiceEnabled(true);
    } else {
      stopVoiceNavigation();
      setVoiceEnabled(false);
    }
  };

  return (
    <Box className="app-container">
      <Paper 
        elevation={8} 
        sx={{ 
          width: '100%', 
          maxWidth: 480, 
          p: 5, 
          borderRadius: 4, 
          textAlign: 'center',
          background: 'white'
        }}
      >
        {/* Header with Logo */}
        <Box sx={{ mb: 4 }}>
          <Box 
            sx={{ 
              width: 90, 
              height: 90, 
              bgcolor: '#10b981', 
              borderRadius: '50%', 
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}
          >
            ♿
          </Box>
          <Typography variant="h4" fontWeight="bold" color="#10b981">Saidia</Typography>
          <Typography variant="body2" color="text.secondary">
            Msaidizi wa Sauti kwa M-Pesa
          </Typography>
        </Box>

        {/* Greeting */}
        <Typography variant="h6" gutterBottom>
          {language === 'sw' 
            ? `Karibu, ${user?.full_name?.split(' ')[0] || 'Rafiki'}!` 
            : `Welcome, ${user?.full_name?.split(' ')[0] || 'Friend'}!`}
        </Typography>

        {/* Voice Navigation Toggle */}
        <FormControlLabel
          control={
            <Switch 
              checked={voiceEnabled} 
              onChange={toggleVoiceNavigation} 
              color="success" 
            />
          }
          label={
            voiceEnabled 
              ? "🔊 Voice Navigation: ON" 
              : "🔇 Voice Navigation: OFF"
          }
          sx={{ mt: 1, mb: 3 }}
        />

        {/* Action Buttons */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ height: 85, fontSize: '1.25rem', bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
              onClick={() => navigate('/transaction')}
            >
              💰 {t('send_money')}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ height: 85, fontSize: '1.25rem', bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
            >
              📱 {t('buy_airtime')}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ height: 85, fontSize: '1.25rem', bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
            >
              📄 {t('pay_bill')}
            </Button>
          </Grid>
        </Grid>

        {/* Logout */}
        <Button 
          variant="text" 
          color="error" 
          sx={{ mt: 6, fontSize: '1.1rem' }} 
          onClick={logout}
        >
          {t('logout')}
        </Button>

        {/* Language Toggle */}
        <Button 
          onClick={toggleLanguage} 
          variant="outlined" 
          size="small" 
          sx={{ mt: 3 }}
        >
          {language === 'sw' ? 'English' : 'Kiswahili'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;