// import { useState, useEffect } from 'react';
// import { speak } from '../utils/voice';
// import { 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions, 
//   Button, 
//   Typography, 
//   Box 
// } from '@mui/material';

// const ApprovalModal = ({ open, transaction, onApprove, onReject, onClose }) => {
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open && transaction) {
//       const message = `
//         Ombi kutoka kwa ${transaction.principal_name || 'Mmiliki'}.
//         ${transaction.type.replace('_', ' ')} 
//         shilingi ${transaction.amount}.
//         ${transaction.metadata?.recipient_phone ? `Kwa namba ${transaction.metadata.recipient_phone}` : ''}.
//         Sema YES kukubali au NO kukataa.
//       `;
//       speak(message);
//     }
//   }, [open, transaction]);

//   const handleApprove = async () => {
//     setLoading(true);
//     speak("Muamala umekubaliwa.");
//     await onApprove(transaction.id);
//     setLoading(false);
//     onClose();
//   };

//   const handleReject = async () => {
//     setLoading(true);
//     speak("Muamala umekataliwa.");
//     await onReject(transaction.id);
//     setLoading(false);
//     onClose();
//   };

//   if (!transaction) return null;

//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//     >
//       <DialogTitle>
//         <Typography variant="h6">Idhini ya Muamala</Typography>
//       </DialogTitle>

//       <DialogContent>
//         <Box sx={{ textAlign: 'center', py: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Kiasi: KSh {parseFloat(transaction.amount).toLocaleString()}
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             Aina: {transaction.type.replace('_', ' ')}
//           </Typography>

//           {transaction.metadata?.recipient_phone && (
//             <Typography variant="body1" gutterBottom>
//               Kwa: {transaction.metadata.recipient_phone}
//             </Typography>
//           )}

//           {transaction.metadata?.description && (
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//               Maelezo: {transaction.metadata.description}
//             </Typography>
//           )}

//           <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
//             Unataka kukubali muamala huu?
//           </Typography>
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
//         <Button
//           variant="outlined"
//           color="error"
//           size="large"
//           onClick={handleReject}
//           disabled={loading}
//           sx={{ minWidth: 140, height: 60 }}
//         >
//           KATAZA (NO)
//         </Button>

//         <Button
//           variant="contained"
//           color="success"
//           size="large"
//           onClick={handleApprove}
//           disabled={loading}
//           sx={{ minWidth: 160, height: 60, fontSize: '1.1rem' }}
//         >
//           KUBALI (YES)
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ApprovalModal;
import { useEffect } from 'react';
import { speak } from '../utils/voice';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { LanguageContext } from '../context/LanguageContext';
import { useContext } from 'react';

const ApprovalModal = ({ open, transaction, onApprove, onReject, onClose }) => {
  const { t, language } = useContext(LanguageContext);

  useEffect(() => {
    if (open && transaction) {
      const msg = language === 'sw' 
        ? `Ombi: ${transaction.type} shilingi ${transaction.amount}. NDIYO au HAPANA?`
        : `Request: ${transaction.type} KSh ${transaction.amount}. YES or NO?`;
      speak(msg);
    }
  }, [open, transaction, language]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('transaction_approval')}</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            KSh {transaction?.amount?.toLocaleString()}
          </Typography>
          <Typography variant="h6" color="primary">
            {transaction?.type?.replace('_', ' ')}
          </Typography>
          {transaction?.metadata?.recipient_phone && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              Kwa: {transaction.metadata.recipient_phone}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          color="error" 
          size="large" 
          onClick={onReject}
          sx={{ minWidth: 140 }}
        >
          {t('no')}
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          size="large" 
          onClick={onApprove}
          sx={{ minWidth: 160 }}
        >
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalModal;