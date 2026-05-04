// import { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { transactionAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { Button, TextField, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// const TransactionForm = () => {
//   const [form, setForm] = useState({
//     type: 'SEND_MONEY',
//     amount: '',
//     recipient: '',
//     description: ''
//   });

//   const { user } = useContext(AuthContext);

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         type: form.type,
//         amount: parseFloat(form.amount),
//         metadata: {
//           recipient_phone: form.recipient,
//           description: form.description
//         }
//       };

//       await transactionAPI.create(payload);
//       speak(`Ombi la ${form.type} la shilingi ${form.amount} limeundwa. Subiri idhini.`);
//       alert("Muamala umetumwa kwa idhini");
//     } catch (err) {
//       speak("Hitilafu imetokea.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5">Fanya Muamala</Typography>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Aina ya Muamala</InputLabel>
//           <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
//             <MenuItem value="SEND_MONEY">Tuma Pesa</MenuItem>
//             <MenuItem value="BUY_AIRTIME">Nunua Airtime</MenuItem>
//             <MenuItem value="PAYBILL">Lipa Bill</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField fullWidth label="Kiasi (KSh)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} margin="normal" />

//         {form.type === 'SEND_MONEY' && (
//           <TextField fullWidth label="Namba ya Simu" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} margin="normal" />
//         )}

//         <Button variant="contained" size="large" fullWidth sx={{ mt: 4, height: 70 }} onClick={handleSubmit}>
//           Tuma Ombi
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default TransactionForm;
// import { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { transactionAPI } from '../services/api';
// import { speak } from '../utils/voice';
// import { 
//   Button, 
//   TextField, 
//   Container, 
//   Typography, 
//   Box, 
//   MenuItem, 
//   Select, 
//   FormControl, 
//   InputLabel 
// } from '@mui/material';

// const TransactionForm = () => {
//   const [form, setForm] = useState({
//     type: 'SEND_MONEY',
//     amount: '',
//     recipient: '',
//     description: ''
//   });

//   const { user } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!form.amount) {
//       speak("Tafadhali weka kiasi");
//       return;
//     }

//     try {
//       const payload = {
//         type: form.type,
//         amount: parseFloat(form.amount),
//         metadata: {
//           recipient_phone: form.recipient || null,
//           description: form.description || ''
//         }
//       };

//       const res = await transactionAPI.create(payload);
      
//       speak(`Ombi la ${form.type.replace('_', ' ')} la shilingi ${form.amount} limeundwa. Subiri idhini kutoka kwa mmiliki.`);
      
//       alert("Muamala umetumwa kwa idhini");
      
//       // Reset form
//       setForm({
//         type: 'SEND_MONEY',
//         amount: '',
//         recipient: '',
//         description: ''
//       });
//     } catch (err) {
//       speak("Hitilafu imetokea. Jaribu tena.");
//       console.error(err);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="h5" gutterBottom>
//           Fanya Muamala
//         </Typography>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Aina ya Muamala</InputLabel>
//           <Select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//           >
//             <MenuItem value="SEND_MONEY">Tuma Pesa</MenuItem>
//             <MenuItem value="BUY_AIRTIME">Nunua Airtime</MenuItem>
//             <MenuItem value="PAYBILL">Lipa Bill</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           fullWidth
//           label="Kiasi (KSh)"
//           name="amount"
//           type="number"
//           value={form.amount}
//           onChange={handleChange}
//           margin="normal"
//           size="medium"
//         />

//         {form.type === 'SEND_MONEY' && (
//           <TextField
//             fullWidth
//             label="Namba ya Simu ya Mpokeaji"
//             name="recipient"
//             value={form.recipient}
//             onChange={handleChange}
//             margin="normal"
//             size="medium"
//           />
//         )}

//         <TextField
//           fullWidth
//           label="Maelezo (Hiari)"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           margin="normal"
//           multiline
//           rows={2}
//         />

//         <Button 
//           variant="contained" 
//           size="large" 
//           fullWidth 
//           sx={{ mt: 4, height: 70, fontSize: '1.1rem' }}
//           onClick={handleSubmit}
//         >
//           Tuma Ombi la Muamala
//         </Button>

//         <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
//           Muamala utahitaji idhini kutoka kwa mmiliki
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default TransactionForm;
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { transactionAPI } from '../services/api';
import { speak } from '../utils/voice';
import { Button, TextField, Typography, Box, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const TransactionForm = () => {
  const [form, setForm] = useState({
    type: 'SEND_MONEY',
    amount: '',
    recipient: '',
    description: ''
  });

  const { t, language } = useContext(LanguageContext);

  const handleSubmit = async () => {
    try {
      const payload = {
        type: form.type,
        amount: parseFloat(form.amount),
        metadata: {
          recipient_phone: form.recipient,
          description: form.description
        }
      };

      await transactionAPI.create(payload);
      speak(language === 'sw' ? `Ombi la ${form.type} limeundwa` : `Transaction request created`);
      alert(t('submit_request'));
    } catch (err) {
      speak("Hitilafu imetokea");
    }
  };

  return (
    <Box className="app-container">
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 420, p: 5, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Transact</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type of Transaction</InputLabel>
          <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <MenuItem value="SEND_MONEY">{t('send_money')}</MenuItem>
            <MenuItem value="BUY_AIRTIME">{t('buy_airtime')}</MenuItem>
            <MenuItem value="PAYBILL">{t('pay_bill')}</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label={t('amount')} type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} margin="normal" />

        {form.type === 'SEND_MONEY' && (
          <TextField fullWidth label={t('recipient_phone')} value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} margin="normal" />
        )}

        <Button 
          variant="contained" 
          fullWidth 
          size="large"
          sx={{ mt: 4, height: 56, bgcolor: '#10b981' }}
          onClick={handleSubmit}
        >
          {t('submit_request')}
        </Button>
      </Paper>
    </Box>
  );
};

export default TransactionForm;